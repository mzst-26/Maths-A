import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./graphpoisson.css"
function poissonProb(lambda, x) {
  let numerator = Math.pow(lambda, x) * Math.exp(-lambda);
  let denominator = factorial(x);
  return numerator / denominator;
}

function factorial(num) {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

function poissonDist(lambda) {
  let data = [];
  let pLessThan = 0;
  let pMoreThan = 0;
  for (let i = 0; i <= 20; i++) { // you can change the range based on your lambda value
    let prob = poissonProb(lambda, i);
    pLessThan += prob;
    pMoreThan = 1 - pLessThan + prob;
    data.push({ x: i, p: prob, pLessThan: pLessThan, pMoreThan: pMoreThan });
  }
  return data;
}

function PoissonChart({ lambda }) {
  const [selectedBar, setSelectedBar] = useState(null);

  const handleBarClick = (data, index) => {
    setSelectedBar(index);
  };

  const handleBarMouseLeave = () => {
    setSelectedBar(null);
  };

  const poissonData = poissonDist(lambda);
  const selectedData = selectedBar !== null ? [poissonData[selectedBar]] : [];

  return (
    <div className="con component">
      <LineChart width={600} height={400} data={poissonData} onClick={handleBarClick} onMouseLeave={handleBarMouseLeave}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" label={{ value: "X", position: "insideBottomRight", offset: -10 }} />
        <YAxis label={{ value: "Probability", angle: -90, position: "insideLeft" }} />
        <Tooltip formatter={(value, name) => [value, name]} />
        <Legend className=""/>
        <Line type="monotone" dataKey="p" name="P(X=x)" stroke="#8884d8" />
        <Line type="monotone" dataKey="pLessThan" name="P(X<=x)" stroke="#82ca9d" />
        <Line type="monotone" dataKey="pMoreThan" name="P(X>=x)" stroke="#ff7f50" />
        <Line type="monotone" dataKey="selected" data={selectedData} stroke="#00C49F" />
      </LineChart>
    </div>
  );
}

export default PoissonChart;
