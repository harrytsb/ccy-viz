import Plot from 'react-plotly.js';
import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Chart({ baseCcy, targetCcy, startDate, endDate }) {
  const myHeaders = new Headers();
  myHeaders.append('apikey', 'OnHP4Wo5ZHrQGktL4s0SGEvTSauIL3nj');
  const [xs, setXs] = useState([]);
  const [ys, setYs] = useState([]);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  async function fetchExchangeApiData() {
    let exchangeApiData;
    try {
      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${startDate}&end_date=${endDate}&base=${baseCcy}&symbols=${targetCcy}`,
        requestOptions
      );
      exchangeApiData = await response.json();
    } catch (err) {
      console.log('Could not retrieve currencies');
    }
    return exchangeApiData;
  }

  useEffect(() => {
    let active = true;
    const load = async () => {
      const retrievedData = await fetchExchangeApiData();
      const xs = Object.keys(retrievedData.rates);
      const ys = Object.values(retrievedData.rates).map((data) => data[targetCcy]);

      if (!active) {
        return;
      }

      setXs(xs);
      setYs(ys);
    };

    load();
    return () => {
      active = false;
    };
  }, [startDate, endDate, baseCcy, targetCcy]);

  return (
    <Plot
      data={[
        {
          x: xs,
          y: ys,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' }
        }
      ]}
      layout={{
        title: `Base Currency: ${baseCcy}`,
        autosize: true,
        xaxis: { title: 'Time' },
        yaxis: { title: `${targetCcy}` }
      }}
      useResizeHandler={true}
    />
  );
}

Chart.propTypes = {
  baseCcy: PropTypes.string,
  targetCcy: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

export default Chart;
