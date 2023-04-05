import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function Grraph({a, b, c}) {
  

  const data = [];
  for (let x = -20; x <= 20; x++) {
    const y = a * x * x + b * x + c;
    data.push({ x, y });
  }

  // const linearData = [];
  // for (var x = -20; x <= 20; x++) {
  //   const y =  x** 2;
  //   linearData.push({ x, y });
  // }

  return (
   
    <div>
      <h2>Quadratic Graph y = Ax^2 + Bx + C</h2>

      <LineChart width={600} height={300} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>


      {/* <h2>Linear Graph y = x</h2>

      <LineChart width={600} height={300} data={linearData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis dataKey="y" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart> */}
      
    </div>
  );
}
export default Grraph;
