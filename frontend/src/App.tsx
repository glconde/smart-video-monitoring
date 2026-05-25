import { useState } from "react";
import { validateConfig } from "./config";
import {
  searchVideoDetections,
  type VideoSearchResult,
} from "./services/videoSearchService";
import "./App.css";

validateConfig();

function App() {
  const [query, setQuery] = useState("person");
  const [results, setResults] = useState<VideoSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    setIsLoading(true);
    setError("");

    try {
      const data = await searchVideoDetections(query);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected search error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Smart Video Monitoring Search</h1>
        <p>
          Search detected video entities indexed from AWS Rekognition into
          OpenSearch.
        </p>

        <div className="search-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search label, e.g. person, car, animal"
          />
          <button onClick={handleSearch} disabled={isLoading || !query.trim()}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Confidence</th>
              <th>Offset</th>
              <th>Detected Time</th>
              <th>Clip</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={`${result.videoClipName}-${result.offsetMs}-${index}`}>
                <td>{result.name}</td>
                <td>{result.confidence.toFixed(2)}%</td>
                <td>{(result.offsetMs / 1000).toFixed(1)}s</td>
                <td>{new Date(result.timestampMs).toLocaleString()}</td>
                <td>{result.videoClipName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
