import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './phoneSize.css';
import './Quadratic.css';
function Graph({ a, b, c }) {
  const data = [];
  for (let x = -100; x <= 100; x++) {
    const y = a * x * x + b * x + c;
    data.push({ x, y });
  }

  const xIntercepts = [];
  if (b * b - 4 * a * c >= 0) {
    const x1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    const x2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    xIntercepts.push({ x: x1, y: 0 });
    xIntercepts.push({ x: x2, y: 0 });
  }
  


  return (

 
        <div className='QuadraticG-container'>
      <h2 className='title'>Quadratic Graph y = Ax^2 + Bx + C</h2>
      <Plot
        data={[{x: data.map((point) => point.x),y: data.map((point) => point.y), type: 'scatter',mode: 'lines', name: 'quadratic',line: { shape: 'spline' },},{x: xIntercepts.map((point) => point.x),y: xIntercepts.map((point) => point.y),type: 'scatter',mode: 'markers',name: 'x-intercepts',marker: { symbol: 'x', size: 10 },},]}
        layout={{
          xaxis: { title: 'x' },
          yaxis: { title: 'y' },
          width: screen.width * 0.9,
        }}
        className = 'QuadraticG'
      />
      </div>

  );
}

export default Graph;
