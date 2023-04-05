import React, { useState, useEffect } from 'react';
import Menu from '../navigationMenu/menu';
import PoissonChart from './poissongragh';
import "./poisson.css"
function Poisson() {
  const [lambda, setLambda] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState('');
  const [pxGreaterThanX, setPxGreaterThanX] = useState(0);
  const [pxLessThanX, setPxLessThanX] = useState(0);
  const [isAValid, setIsAValid] = useState(true);
  const [isCValid, setIsCValid] = useState(true);

  useEffect(() => {
    const lambdaFloat = parseFloat(lambda);
    const kInt = parseInt(k);

    if (isNaN(lambdaFloat) || isNaN(kInt) || lambdaFloat <= 0 || kInt <= 0) {
      setResult('');
      setPxGreaterThanX(0);
      setPxLessThanX(0);
      return;
    }

    const factorial = (n) => {
      if (n === 0) {
        return 1;
      } else {
        return n * factorial(n - 1);
      }
    };
    
    const numerator = Math.pow(lambdaFloat, kInt) * Math.exp(-lambdaFloat);
    const denominator = factorial(kInt);
    const f = numerator / denominator;
    setResult(f);
    
    let pxGreaterThanX = 0;
    let pxLessThanX = 0;
    for (let i = kInt + 1; i < 1000; i++) {
      pxGreaterThanX += Math.pow(lambdaFloat, i) * Math.exp(-lambdaFloat) / factorial(i);
    }
    for (let i = 0; i < kInt; i++) {
      pxLessThanX += Math.pow(lambdaFloat, i) * Math.exp(-lambdaFloat) / factorial(i);
    }
    setPxGreaterThanX(pxGreaterThanX);
    setPxLessThanX(pxLessThanX);
  }, [lambda, k]);

  useEffect(() => {
    setIsAValid(!isNaN(Number(lambda)));
    setIsCValid(!isNaN(Number(k)));
  }, [lambda, k]);

  const inputStylea = {
    border: `1px solid ${isAValid ? 'rgb(94, 147, 14)' : 'red'}`,
  };
  const inputStylec = {
    border: `1px solid ${isCValid ? 'rgb(94, 147, 14)' : 'red'}`,
  };

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
                style={inputStylea}
                type="text"
                placeholder="Average rate of success (lambda)"
                value={lambda}
                onChange={(e) => setLambda(e.target.value)}
              />
  
              <input
                className="inputC, inputs"
                style={inputStylec}
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