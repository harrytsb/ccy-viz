import './App.css';
import Chart from './charting/chart.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">Currency Visualisation</header>
      <span>
        <Chart baseCcy="EUR" targetCcy="JPY" startDate="2021-04-15" endDate="2021-06-12" />
      </span>
    </div>
  );
}

export default App;
