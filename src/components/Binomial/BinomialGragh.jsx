import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./graghstyle.css"
function binomialProb(N, P, X) {
  let coef = factorial(N) / (factorial(X) * factorial(N - X));
  let prob = coef * Math.pow(P, X) * Math.pow(1 - P, N - X);
  return prob;
}

function factorial(num) {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}

function binomialDist(N, P) {
  let data = [];
  let pLessThan = 0;
  let pMoreThan = 0;
  for (let i = 0; i <= N; i++) {
    let prob = binomialProb(N, P, i);
    pLessThan += prob;
    pMoreThan = 1 - pLessThan + prob;
    data.push({ x: i, p: prob, pLessThan: pLessThan, pMoreThan: pMoreThan });
  }
  return data;
}

function BinomialChart({ N, P }) {
  const [selectedBar, setSelectedBar] = useState(null);

  const handleBarClick = (data, index) => {
    setSelectedBar(index);
  };

  const handleBarMouseLeave = () => {
    setSelectedBar(null);
  };

  const binomialData = binomialDist(N, P);
  const selectedData = selectedBar !== null ? [binomialData[selectedBar]] : [];

  return (
    <div className="con">
      <div className="s-con">
    <BarChart width={600} height={400} data={binomialData} onClick={handleBarClick} onMouseLeave={handleBarMouseLeave}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" label={{ value: "X", position: "insideBottomRight", offset: -10 }} />
      <YAxis label={{ value: "Probability", angle: -90, position: "insideLeft" }} />
      <Tooltip formatter={(value, name) => [value, name]} />
      <Legend/>
      <Bar dataKey="p" name="P(X=x)" fill="#8884d8" />
      <Bar dataKey="pLessThan" name="P(X<=x)" fill="#82ca9d" />
      <Bar dataKey="pMoreThan" name="P(X>=x)" fill="#ff7f50" />
      <Bar dataKey="selected" data={selectedData} fill="#00C49F" />
    </BarChart>
    </div>
    </div>
  );
}

export default BinomialChart;
