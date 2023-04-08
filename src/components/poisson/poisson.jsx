import React, { useState, useEffect } from 'react';
import Menu from '../navigationMenu/navbar';
import PoissonChart from './poissongragh';
import "./poisson.css"
import { checkIfValid } from '../../modules/checkValidity';

function Poisson({L}) {
//
  const check = checkIfValid()

  // define state variables for inputs 
  const [lambda, setLambda] = useState('');
  const [k, setK] = useState('');
  L = lambda
  // define state variables for outputs
  const [result, setResult] = useState('');
  const [pxGreaterThanX, setPxGreaterThanX] = useState(0);
  const [pxLessThanX, setPxLessThanX] = useState(0);
  useEffect(() => {
    // Parse lambda to float and k to int
    const lambdaFloat = parseFloat(lambda);
    const kInt = parseInt(k);
  
    // If lambda or k are not valid, set result to empty string and set pxGreaterThanX and pxLessThanX to 0
    if (isNaN(lambdaFloat) || isNaN(kInt) || lambdaFloat <= 0 || kInt <= 0) {
      setResult('');
      setPxGreaterThanX(0);
      setPxLessThanX(0);
      return;
    }
  
    // Define a factorial function
    const factorial = (n) => {
      if (n === 0) {
        return 1;
      } else {
        return n * factorial(n - 1);
      }
    };
    
    // Calculate f(x)
    const numerator = Math.pow(lambdaFloat, kInt) * Math.exp(-lambdaFloat);
    const denominator = factorial(kInt);
    const f = numerator / denominator;
    setResult(f);
    
   // Calculate pxGreaterThanX and pxLessThanX
let pxGreaterThanX = 0;
let pxLessThanX = 0;
const tolerance = 1e-15; // set a tolerance level
for (let i = kInt + 1; i < 1000; i++) {
  const term = Math.pow(lambdaFloat, i) * Math.exp(-lambdaFloat) / factorial(i);
  if (term < tolerance) {
    break; // stop adding terms when term is very small
  }
  pxGreaterThanX += term;
}
for (let i = 0; i < kInt; i++) {
  pxLessThanX += Math.pow(lambdaFloat, i) * Math.exp(-lambdaFloat) / factorial(i);
}
setPxGreaterThanX(pxGreaterThanX);
setPxLessThanX(pxLessThanX);

  }, [lambda, k]);
  
  return (
    <>
      <Menu />
      <div className="card-control">
        <div className="card-container con">
          <div className="card-body">
            <h1 className="card-title">Poisson Calculator</h1>
            <p className="card-text">Enter the lambda and X</p>
            <div className="input-container">
              <input
                className="inputA, inputs"
                style={check.inputStylea}
                type="text"
                placeholder="Average rate of success (lambda)"
                value={lambda}
                onChange={(e) => setLambda(e.target.value)}
              />
  
              <input
                className="inputC, inputs"
                style={check.inputStylec}
                type="text"
                placeholder="Poisson random variable (X)"
                value={k}
                onChange={(e) => setK(e.target.value)}
              />
            </div>
  
            <form action="submit" className="result-con">
              {result && (
                <div className="result">
                  P(X {'='} {Number(k)}): {result} <br></br> P(X {'>'} {Number(k)}): {pxGreaterThanX} <br></br> P(X {'<'} {Number(k)}): {pxLessThanX}{' '}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    <div className='gragh'>
      <PoissonChart lambda={lambda} k = {k}/>
      </div>
    </>
  );
              }
export default Poisson;  