* {
  box-sizing: border-box;
}

:root {
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;

  color: #172033;
  background: #f5f7fb;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  min-width: 320px;
  background: #f5f7fb;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app {
  min-height: 100vh;
  display: flex;
}

.sidebar {
  width: 250px;
  min-height: 100vh;
  background: #101828;
  color: white;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.brand {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 4px 10px 30px;
}

.brand-icon {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #315efb;
}

.brand h1 {
  margin: 0;
  font-size: 17px;
  letter-spacing: -0.3px;
}

.brand span {
  color: #98a2b3;
  font-size: 11px;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  border: 0;
  background: transparent;
  color: #98a2b3;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: center;
  text-align: left;
  transition: 0.2s;
}

.nav-item:hover {
  background: #1d2939;
  color: white;
}

.nav-item.active {
  background: #1d4ed8;
  color: white;
}

.sidebar-bottom {
  margin-top: auto;
}

.server-status {
  border: 1px solid #344054;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.server-status strong {
  display: block;
  font-size: 12px;
}

.server-status small {
  color: #98a2b3;
  font-size: 10px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #12b76a;
  display: inline-block;
  box-shadow: 0 0 0 3px rgba(18, 183, 106, 0.12);
}

.main {
  margin-left: 250px;
  width: calc(100% - 250px);
}

.topbar {
  height: 88px;
  padding: 0 40px;
  background: white;
  border-bottom: 1px solid #eaecf0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb {
  color: #98a2b3;
  font-size: 12px;
  margin-bottom: 4px;
}

.topbar h2 {
  margin: 0;
  font-size: 23px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.connection {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: #475467;
}

.menu-button {
  display: none;
  background: transparent;
  border: 0;
}

.content {
  max-width: 1500px;
  margin: 0 auto;
  padding: 32px 40px 50px;
}

.hero {
  background: #172554;
  border-radius: 14px;
  color: white;
  padding: 30px 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: #667085;
  margin: 0 0 8px;
}

.hero .eyebrow {
  color: #93c5fd;
}

.hero h3 {
  font-size: 27px;
  margin: 0 0 8px;
}

.hero p:last-of-type {
  color: #c7d2fe;
  max-width: 650px;
  margin: 0;
  line-height: 1.6;
  font-size: 14px;
}

.hero-icon {
  width: 90px;
  height: 90px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 22px;
}

.metric-card,
.card {
  background: white;
  border: 1px solid #eaecf0;
  border-radius: 12px;
}

.metric-card {
  padding: 20px;
}

.metric-icon {
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background: #eff4ff;
  color: #315efb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.metric-icon svg {
  width: 18px;
}

.metric-title {
  color: #667085;
  font-size: 12px;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  margin-top: 5px;
}

.metric-value span {
  font-size: 14px;
  font-weight: 500;
  color: #667085;
  margin-left: 3px;
}

.metric-description {
  color: #12b76a;
  font-size: 11px;
  margin-top: 6px;
}

.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
  margin-bottom: 22px;
}

.card {
  padding: 22px;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-header h3 {
  margin: 0 0 4px;
  font-size: 16px;
}

.card-header p {
  margin: 0;
  color: #98a2b3;
  font-size: 12px;
}

.tag {
  font-size: 10px;
  font-weight: 700;
  color: #12b76a;
  background: #ecfdf3;
  padding: 5px 8px;
  border-radius: 5px;
}

.chart {
  height: 260px;
  position: relative;
  padding-left: 50px;
  padding-top: 8px;
}

.chart-grid {
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 35px;
  width: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-grid span {
  font-size: 9px;
  color: #98a2b3;
}

.chart-svg {
  width: 100%;
  height: 220px;
  color: #315efb;
  overflow: visible;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  color: #98a2b3;
  font-size: 9px;
}

.upload-box {
  border: 1.5px dashed #cbd5e1;
  border-radius: 10px;
  min-height: 205px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #315efb;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.upload-box:hover {
  border-color: #315efb;
  background: #f8faff;
}

.upload-box input {
  display: none;
}

.upload-box strong {
  color: #172033;
  margin-top: 12px;
  font-size: 14px;
}

.upload-box span {
  color: #98a2b3;
  font-size: 11px;
  margin-top: 5px;
}

.selected-project {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #12b76a !important;
}

.primary-button {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  border: 0;
  border-radius: 8px;
  background: #315efb;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.primary-button:hover {
  background: #1d4ed8;
}

.runs-card {
  padding-bottom: 8px;
}

.view-all {
  background: transparent;
  border: 0;
  color: #315efb;
  font-size: 12px;
  display: flex;
  gap: 3px;
  align-items: center;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1.3fr 1fr 1fr 0.7fr;
  gap: 15px;
  align-items: center;
}

.table-head {
  color: #98a2b3;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 0;
  border-bottom: 1px solid #eaecf0;
}

.table-row {
  min-height: 62px;
  border-bottom: 1px solid #f2f4f7;
  font-size: 12px;
  color: #475467;
}

.status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.status.success {
  color: #12b76a;
}

.status.failed {
  color: #f04438;
}

.score {
  color: #315efb;
}

.page-heading {
  margin-bottom: 25px;
}

.page-heading h3 {
  margin: 0 0 8px;
  font-size: 28px;
}

.page-heading p:last-child {
  color: #667085;
  margin: 0;
}

.project-empty {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #98a2b3;
}

.project-empty h3 {
  color: #344054;
  margin: 15px 0 5px;
}

.project-empty p {
  font-size: 13px;
}

@media (max-width: 1000px) {
  .metrics {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .sidebar {
    width: 70px;
    padding: 20px 8px;
  }

  .brand div:last-child,
  .nav-item:not(.active)::after,
  .nav-item {
    font-size: 0;
  }

  .brand {
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }

  .navigation {
    align-items: center;
  }

  .nav-item {
    justify-content: center;
    width: 48px;
  }

  .server-status {
    justify-content: center;
  }

  .server-status div {
    display: none;
  }

  .main {
    margin-left: 70px;
    width: calc(100% - 70px);
  }

  .topbar {
    padding: 0 20px;
  }

  .content {
    padding: 22px 20px;
  }

  .metrics {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: 24px;
  }

  .hero-icon {
    display: none;
  }

  .table-head {
    display: none;
  }

  .table-row {
    grid-template-columns: 1fr 1fr;
    padding: 15px 0;
  }
}