import { useEffect, useState } from 'react';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cloud,
  FileJson,
  Gauge,
  LayoutDashboard,
  Menu,
  Upload,
  XCircle,
  Zap,
} from 'lucide-react';

import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [apiOnline, setApiOnline] = useState(false);
  const [report, setReport] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [activePage, setActivePage] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        setReport(null);
      });
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/health')
      .then(async (response) => {
        const data = await response.text();

        if (!response.ok) {
          throw new Error(data || `HTTP ${response.status}`);
        }

        setApiStatus(data);
        setApiOnline(true);
      })
      .catch(() => {
        setApiStatus('API unavailable');
        setApiOnline(false);
      });

    fetchReport();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!file.name.toLowerCase().endsWith('.json')) {
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
        setSelectedFile(null);
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

  const formatNumber = (value, digits = 2) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
      return '—';
    }

    return Number(value).toFixed(digits);
  };

  const avgResponse = Number(report?.averageResponseTime || 0);
  const p95Response = Number(report?.p95ResponseTime || 0);
  const maxResponse = Number(report?.maxResponseTime || 0);

  const maxChartValue = Math.max(avgResponse, p95Response, maxResponse, 1);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const renderMetric = (label, value, unit, icon) => (
    <div className="metric-card">
      <div className="metric-card-top">
        <span className="metric-label">{label}</span>
        <div className="metric-icon">{icon}</div>
      </div>

      <div className="metric-value">
        {value}
        {unit && <span>{unit}</span>}
      </div>
    </div>
  );

  return (
    <div className="app-shell">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">
            <Cloud size={23} />
          </div>

          <div>
            <h1>CloudPerf</h1>
            <p>Performance Platform</p>
          </div>

          <button
            className="mobile-close"
            onClick={closeSidebar}
          >
            <XCircle size={20} />
          </button>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-title">WORKSPACE</p>

          <button
            className={`nav-item ${
              activePage === 'Dashboard' ? 'active' : ''
            }`}
            onClick={() => {
              setActivePage('Dashboard');
              closeSidebar();
            }}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${
              activePage === 'Performance' ? 'active' : ''
            }`}
            onClick={() => {
              setActivePage('Performance');
              closeSidebar();
            }}
          >
            <BarChart3 size={19} />
            <span>Performance</span>
          </button>

          <button
            className={`nav-item ${
              activePage === 'Reports' ? 'active' : ''
            }`}
            onClick={() => {
              setActivePage('Reports');
              closeSidebar();
            }}
          >
            <FileJson size={19} />
            <span>Reports</span>
          </button>
        </div>

        <div className="sidebar-bottom">
          <div className="system-card">
            <div className="system-card-icon">
              <Activity size={18} />
            </div>

            <div>
              <strong>System Status</strong>
              <span className={apiOnline ? 'online-text' : 'offline-text'}>
                {apiOnline ? 'Operational' : 'Unavailable'}
              </span>
            </div>

            <span
              className={`system-dot ${
                apiOnline ? 'online' : 'offline'
              }`}
            />
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* HEADER */}
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            <span>CloudPerf</span>
            <ChevronRight size={15} />
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-status">
            <span
              className={`status-dot ${
                apiOnline ? 'online' : 'offline'
              }`}
            />

            {apiOnline ? 'API Online' : 'API Offline'}
          </div>
        </header>

        <div className="page-content">

          {activePage === 'Dashboard' && (
            <>
              {/* HERO */}
              <section className="hero">
                <div className="hero-content">
                  <div className="hero-tag">
                    <Zap size={15} />
                    PERFORMANCE MONITORING
                  </div>

                  <h2>Application Performance Dashboard</h2>

                  <p>
                    Monitor response times, request throughput,
                    errors and performance thresholds from your
                    latest k6 performance report.
                  </p>
                </div>

                <div className="hero-decoration">
                  <Gauge size={105} strokeWidth={1} />
                </div>
              </section>

              {/* API STATUS */}
              <section className="api-card">
                <div className="api-card-left">
                  <div className="api-icon">
                    <Activity size={22} />
                  </div>

                  <div>
                    <span className="small-label">BACKEND API</span>
                    <h3>
                      {apiOnline
                        ? 'Connected to Performance API'
                        : 'Performance API unavailable'}
                    </h3>

                    <p>
                      {apiOnline
                        ? apiStatus
                        : 'Make sure the Spring Boot backend is running on port 8080.'}
                    </p>
                  </div>
                </div>

                <div
                  className={`large-status ${
                    apiOnline ? 'success' : 'danger'
                  }`}
                >
                  {apiOnline ? (
                    <>
                      <CheckCircle2 size={18} />
                      Online
                    </>
                  ) : (
                    <>
                      <XCircle size={18} />
                      Offline
                    </>
                  )}
                </div>
              </section>

              {/* METRICS */}
              <div className="section-heading">
                <div>
                  <span>OVERVIEW</span>
                  <h2>Performance Metrics</h2>
                </div>
              </div>

              <section className="metrics-grid">

                {renderMetric(
                  'AVERAGE RESPONSE',
                  formatNumber(report?.averageResponseTime),
                  'ms',
                  <Clock3 size={19} />
                )}

                {renderMetric(
                  'P95 RESPONSE',
                  formatNumber(report?.p95ResponseTime),
                  'ms',
                  <Gauge size={19} />
                )}

                {renderMetric(
                  'MAX RESPONSE',
                  formatNumber(report?.maxResponseTime),
                  'ms',
                  <Zap size={19} />
                )}

                {renderMetric(
                  'TOTAL REQUESTS',
                  report?.totalRequests ?? '—',
                  '',
                  <Activity size={19} />
                )}

                {renderMetric(
                  'ERROR RATE',
                  formatNumber(report?.errorRate),
                  '%',
                  <XCircle size={19} />
                )}

                {renderMetric(
                  'REQUESTS / SEC',
                  formatNumber(report?.requestsPerSecond),
                  '',
                  <BarChart3 size={19} />
                )}

              </section>

              {/* LOWER GRID */}
              <section className="dashboard-grid">

                {/* RESPONSE OVERVIEW */}
                <div className="panel">
                  <div className="panel-header">
                    <div>
                      <span className="small-label">ANALYSIS</span>
                      <h3>Response Time Overview</h3>
                    </div>

                    <div className="panel-icon">
                      <BarChart3 size={19} />
                    </div>
                  </div>

                  {report ? (
                    <div className="response-bars">

                      <div className="bar-row">
                        <div className="bar-label">
                          <span>Average</span>
                          <strong>
                            {formatNumber(report.averageResponseTime)} ms
                          </strong>
                        </div>

                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              width: `${Math.max(
                                (avgResponse / maxChartValue) * 100,
                                3
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="bar-row">
                        <div className="bar-label">
                          <span>P95</span>
                          <strong>
                            {formatNumber(report.p95ResponseTime)} ms
                          </strong>
                        </div>

                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              width: `${Math.max(
                                (p95Response / maxChartValue) * 100,
                                3
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="bar-row">
                        <div className="bar-label">
                          <span>Maximum</span>
                          <strong>
                            {formatNumber(report.maxResponseTime)} ms
                          </strong>
                        </div>

                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              width: `${Math.max(
                                (maxResponse / maxChartValue) * 100,
                                3
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="empty-state">
                      <BarChart3 size={30} />
                      <p>No performance report available yet.</p>
                      <span>
                        Upload a k6 JSON report to see the analysis.
                      </span>
                    </div>
                  )}
                </div>

                {/* UPLOAD */}
                <div className="panel upload-panel">
                  <div className="panel-header">
                    <div>
                      <span className="small-label">NEW ANALYSIS</span>
                      <h3>Upload Report</h3>
                    </div>

                    <div className="panel-icon">
                      <Upload size={19} />
                    </div>
                  </div>

                  <label className="upload-area">
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleFileChange}
                    />

                    <div className="upload-icon">
                      <Upload size={24} />
                    </div>

                    <strong>
                      {selectedFile
                        ? selectedFile.name
                        : 'Choose a JSON report'}
                    </strong>

                    <span>
                      {selectedFile
                        ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                        : 'k6 performance report'}
                    </span>
                  </label>

                  <button
                    className="primary-button"
                    onClick={uploadReport}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      'Analyzing...'
                    ) : (
                      <>
                        <Upload size={17} />
                        Upload & Analyze
                      </>
                    )}
                  </button>

                  {uploadStatus && (
                    <div
                      className={`upload-message ${
                        uploadStatus.includes('successfully')
                          ? 'success-message'
                          : uploadStatus.includes('Uploading')
                          ? 'info-message'
                          : 'error-message'
                      }`}
                    >
                      {uploadStatus}
                    </div>
                  )}
                </div>

              </section>

              {/* THRESHOLDS */}
              <div className="section-heading threshold-heading">
                <div>
                  <span>QUALITY GATES</span>
                  <h2>Performance Thresholds</h2>
                </div>
              </div>

              <section className="threshold-grid">

                <div className="threshold-card">
                  <div className="threshold-icon">
                    <Gauge size={20} />
                  </div>

                  <div className="threshold-info">
                    <strong>P95 Response Time</strong>
                    <span>Requirement: less than 500 ms</span>
                  </div>

                  {report ? (
                    <div
                      className={`threshold-result ${
                        p95Response < 500 ? 'pass' : 'fail'
                      }`}
                    >
                      {p95Response < 500 ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <XCircle size={17} />
                      )}

                      {p95Response < 500 ? 'PASS' : 'FAIL'}
                    </div>
                  ) : (
                    <div className="threshold-result pending">
                      PENDING
                    </div>
                  )}
                </div>

                <div className="threshold-card">
                  <div className="threshold-icon">
                    <Activity size={20} />
                  </div>

                  <div className="threshold-info">
                    <strong>Error Rate</strong>
                    <span>Requirement: less than 1%</span>
                  </div>

                  {report ? (
                    <div
                      className={`threshold-result ${
                        Number(report.errorRate) < 1
                          ? 'pass'
                          : 'fail'
                      }`}
                    >
                      {Number(report.errorRate) < 1 ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <XCircle size={17} />
                      )}

                      {Number(report.errorRate) < 1
                        ? 'PASS'
                        : 'FAIL'}
                    </div>
                  ) : (
                    <div className="threshold-result pending">
                      PENDING
                    </div>
                  )}
                </div>

              </section>
            </>
          )}

          {/* PERFORMANCE PAGE */}
          {activePage === 'Performance' && (
            <section className="page-section">
              <div className="page-title">
                <span>ANALYTICS</span>
                <h2>Performance Details</h2>
                <p>
                  Detailed metrics from the latest uploaded performance report.
                </p>
              </div>

              {report ? (
                <div className="detail-table">

                  <div className="detail-row detail-header">
                    <span>Metric</span>
                    <span>Value</span>
                  </div>

                  <div className="detail-row">
                    <span>Average Response Time</span>
                    <strong>
                      {formatNumber(report.averageResponseTime)} ms
                    </strong>
                  </div>

                  <div className="detail-row">
                    <span>P95 Response Time</span>
                    <strong>
                      {formatNumber(report.p95ResponseTime)} ms
                    </strong>
                  </div>

                  <div className="detail-row">
                    <span>Maximum Response Time</span>
                    <strong>
                      {formatNumber(report.maxResponseTime)} ms
                    </strong>
                  </div>

                  <div className="detail-row">
                    <span>Total Requests</span>
                    <strong>{report.totalRequests}</strong>
                  </div>

                  <div className="detail-row">
                    <span>Error Rate</span>
                    <strong>
                      {formatNumber(report.errorRate)} %
                    </strong>
                  </div>

                  <div className="detail-row">
                    <span>Requests Per Second</span>
                    <strong>
                      {formatNumber(report.requestsPerSecond)}
                    </strong>
                  </div>

                </div>
              ) : (
                <div className="large-empty">
                  <FileJson size={45} />
                  <h3>No report loaded</h3>
                  <p>Upload a JSON performance report from the Dashboard.</p>
                </div>
              )}
            </section>
          )}

          {/* REPORTS PAGE */}
          {activePage === 'Reports' && (
            <section className="page-section">
              <div className="page-title">
                <span>REPORT CENTER</span>
                <h2>Performance Reports</h2>
                <p>
                  Upload and analyze k6 JSON performance reports.
                </p>
              </div>

              <div className="reports-card">

                <div className="reports-icon">
                  <FileJson size={32} />
                </div>

                <div>
                  <h3>Latest Performance Report</h3>

                  {report ? (
                    <p>
                      A performance report is currently loaded
                      and available for analysis.
                    </p>
                  ) : (
                    <p>
                      No performance report has been uploaded yet.
                    </p>
                  )}
                </div>

                <button
                  className="primary-button reports-button"
                  onClick={() => setActivePage('Dashboard')}
                >
                  <Upload size={17} />
                  Upload Report
                </button>

              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;