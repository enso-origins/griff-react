import React from 'react';
import { DataProvider, LineChart, Series } from '@cognite/griff-react';

const TIME_DOMAIN = [Date.now() - 1000 * 60 * 60 * 24 * 30, Date.now()];

// Generates 250 random data points across the given time domain.
const staticLoader = ({ timeDomain, oldSeries, reason }) => {
  if (reason !== 'MOUNTED') {
    return { data: oldSeries.data };
  }
  const n = 250;
  const dt = (timeDomain[1] - timeDomain[0]) / n;
  const data = [];
  for (let t = timeDomain[0]; t <= timeDomain[1]; t += dt) {
    data.push({ timestamp: t, value: Math.random() });
  }
  return { data };
};

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>griff-react — line chart</h2>
      <DataProvider defaultLoader={staticLoader} timeDomain={TIME_DOMAIN}>
        <Series id={1} color="steelblue" />
        <Series id={2} color="tomato" />
        <LineChart height={400} />
      </DataProvider>
    </div>
  );
}
