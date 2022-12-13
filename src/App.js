import Button from 'react-bootstrap/Button';
import logo from './assets/Miami-Heat-logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="d-grid gap-2">
        <br />
          <Button variant="danger" size="lg">
            League & Player Information
          </Button>
          <Button variant="danger" size="lg">
            Manage Scouting Reports
          </Button>
        </div>
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
