import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [report, setReport] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const fetchReport = () => {
    fetch('http://localhost:8080/api/performance/report')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch performance report');
        }

        return response.json();
      })
      .then((data) => {
        setReport(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/health')
      .then((response) => response.text())
      .then((data) => {
        setApiStatus(data);
      })
      .catch(() => {
        setApiStatus('API is unavailable');
      });

    fetchReport();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!file.name.endsWith('.json')) {
      setSelectedFile(null);
      setUploadStatus('Please select a JSON file.');
      return;
    }

    setSelectedFile(file);
    setUploadStatus('');
  };

  const uploadReport = () => {
    if (!selectedFile) {
      setUploadStatus('Please select a JSON file first.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading and analyzing report...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:8080/api/performance/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Upload failed');
        }

        return response.text();
      })
      .then(() => {
        setUploadStatus('Report uploaded successfully!');
        fetchReport();
      })
      .catch((error) => {
        console.error(error);
        setUploadStatus('Upload failed. Please try again.');
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <div className="app">

      <header className="header">
        <div>
          <h1>Cloud Performance Platform</h1>
          <p>Application Performance Dashboard</p>
        </div>

        <div className="status-badge">
          <span className="status-dot"></span>
          API Online
        </div>
      </header>

      <main className="dashboard">

        {/* API Status */}
        <section className="status-card">
          <div>
            <p className="label">API STATUS</p>
            <h2>{apiStatus}</h2>
          </div>

          <div className="health-icon">✓</div>
        </section>

        {/* Upload Report */}
        <section className="upload-card">
          <div>
            <p className="label">PERFORMANCE REPORT</p>

            <h2>Upload Performance Report</h2>

            <p className="upload-description">
              Upload a k6 JSON report to analyze your application's performance.
            </p>
          </div>

          <div className="upload-controls">

            <label className="file-input">
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
              />

              <span>
                {selectedFile
                  ? selectedFile.name
                  : 'Choose JSON file'}
              </span>
            </label>

            <button
              onClick={uploadReport}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload & Analyze'}
            </button>

          </div>

          {uploadStatus && (
            <p className="upload-status">
              {uploadStatus}
            </p>
          )}
        </section>

        {/* Performance Report */}
        {report ? (
          <>
            <h2 className="section-title">Response Time</h2>

            <section className="metrics-grid">

              <div className="metric-card">
                <p className="label">AVERAGE RESPONSE</p>
                <h2>
                  {report.averageResponseTime.toFixed(2)}
                  <span> ms</span>
                </h2>
              </div>

              <div className="metric-card">
                <p className="label">P95 RESPONSE</p>
                <h2>
                  {report.p95ResponseTime.toFixed(2)}
                  <span> ms</span>
                </h2>
              </div>

              <div className="metric-card">
                <p className="label">MAX RESPONSE</p>
                <h2>
                  {report.maxResponseTime.toFixed(2)}
                  <span> ms</span>
                </h2>
              </div>

            </section>

            <h2 className="section-title">Request Metrics</h2>

            <section className="metrics-grid">

              <div className="metric-card">
                <p className="label">TOTAL REQUESTS</p>
                <h2>{report.totalRequests}</h2>
              </div>

              <div className="metric-card">
                <p className="label">ERROR RATE</p>
                <h2>
                  {report.errorRate.toFixed(2)}
                  <span> %</span>
                </h2>
              </div>

              <div className="metric-card">
                <p className="label">REQUESTS / SEC</p>
                <h2>
                  {report.requestsPerSecond.toFixed(2)}
                </h2>
              </div>

            </section>

            <h2 className="section-title">Performance Thresholds</h2>

            <section className="threshold-card">

              <div className="threshold-row">
                <div>
                  <strong>P95 Response Time</strong>
                  <p>Requirement: less than 500 ms</p>
                </div>

                <span className={
                  report.p95ResponseTime < 500
                    ? 'pass'
                    : 'fail'
                }>
                  {report.p95ResponseTime < 500
                    ? '✓ PASS'
                    : '✗ FAIL'}
                </span>
              </div>

              <div className="threshold-row">
                <div>
                  <strong>Error Rate</strong>
                  <p>Requirement: less than 1%</p>
                </div>

                <span className={
                  report.errorRate < 1
                    ? 'pass'
                    : 'fail'
                }>
                  {report.errorRate < 1
                    ? '✓ PASS'
                    : '✗ FAIL'}
                </span>
              </div>

            </section>

          </>
        ) : (
          <section className="status-card">
            <div>
              <p className="label">PERFORMANCE REPORT</p>
              <h2>No performance report available</h2>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default App;