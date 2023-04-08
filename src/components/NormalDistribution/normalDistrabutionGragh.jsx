import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './normalGragh.css';

function NormalDistributionGraph({ mean, stdDev, x}) {
  const minX = - mean 
  const maxX = mean - ((mean / 0.63))
  // Calculate the y value of the normal distribution at a given x
  const normalDistribution = (x, mean, stdDev) => {
    const numerator = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
    const denominator = stdDev * Math.sqrt(2 * Math.PI);
    return numerator / denominator;
  };

  // Create an array of x values to use for the chart
  const xValues = Array.from({ length: 100 }, (_, i) => i / 10 * parseInt(maxX - minX) + parseInt(minX));

  // Create an array of data objects with x and y properties based on the normal distribution formula
  const data = xValues.map(xValue => ({ x: xValue, y: normalDistribution(xValue, mean, stdDev) }));

  // Find the index of the x value closest to the provided X parameter
  const xIndex = data.findIndex(datum => Math.abs(datum.x - x) < 0.05);

  return (
    <div className='chart-con setting'>
      <LineChart width={600} height={400}  className='chart-con' data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          dataKey="y"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          dot={xIndex !== -1 ? { r: 8, fill: '#ff7300', stroke: '#ff7300' } : false}
        />
      </LineChart>
    </div>
  );
}

export default NormalDistributionGraph;
