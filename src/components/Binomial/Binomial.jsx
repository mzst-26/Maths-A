import React, { useState } from 'react';
import  {useEffect} from 'react';
import Menu from '../navigationMenu/menu';
import BinomialDistributionGraph from './BinomialGragh';
import './Prabibility.css';

function Probability() {
    const[N, setN] = useState("");
    const[P, setP] = useState("");
    const[X, setX] = useState("");
    
    const [result, setresult] = useState('');
    const [resultXSmallerThan, setresultXSmallerThan] = useState('');
    const [resultXGreaterThan, setresultXGreaterThan] = useState('');
    const[isAValid, setIsAValid] = useState(true);
    const[isBValid, setIsBValid] = useState(true);
    const[isCValid, setIsCValid] = useState(true);

    
    console.log("--->>> "+ N, P, X)
 
     const n = isNaN(Number(N)) || N <= 0 || N == "" ? 1 : Number(N);
     const p = isNaN(Number(P)) || P <= 0 || P == "" ? 1 : Number(P);
     const x = isNaN(Number(X)) || X <= 0 || X == "" ? 1 : Number(X);
        console.log("npx--> "+ n, p, x);
     const calculateProbability = () => {
        const q = 1 - p;
        const probX = binomialCoefficient(n, x) * Math.pow(p, x) * Math.pow(q, n - x);
        console.log("exact : "+probX);

        let probLessThanX = 0;
        for (let i = 0; i <= x; i++) {
         probLessThanX += binomialCoefficient(n, i) * Math.pow(p, i) * Math.pow(q, n - i);
          console.log("Less: "+probLessThanX);
        }
        let probMoreThanX = 0;
        for (let i = x; i <= n; i++) {
         probMoreThanX += binomialCoefficient(n, i) * Math.pow(p, i) * Math.pow(q, n - i);
          console.log("More: "+probMoreThanX);
        }
        return { probX, probLessThanX, probMoreThanX };
      };
      const binomialCoefficient = (n, k) => {
        if (k === 0 || k === n) {
          return 1;
        } else {
          return binomialCoefficient(n - 1, k - 1) * n / k;
        }
      };
    
    useEffect(() => {
    if (!isNaN(Number(N)) && !isNaN(Number(P)) && !isNaN(Number(X)) && N > 0 && P > 0 && X > 0 && N !== "" && P!== "" && X!== "") {
        // preventDefault();
        const { probX, probLessThanX, probMoreThanX } = calculateProbability(x, n, p);
        console.log(`P(X=${x}) = ${probX.toFixed(4)}`);
        console.log(`P(X<=${x}) = ${probLessThanX.toFixed(4)}`);
        console.log(`P(X>=${x}) = ${probMoreThanX.toFixed(4)}`);
        setresult(` P(X=${x}): ` + probX);
        setresultXSmallerThan(` P(X<${x}): ` + probLessThanX);
        setresultXGreaterThan(` P(X>${x}): ` + probMoreThanX);
    }
    else{
       setresult("")
       setresultXSmallerThan("")
       setresultXGreaterThan("")
  
    }
}, [setresult, setresultXSmallerThan, setresultXGreaterThan, N, P, X]);

console.log("---> "+ N, P, X)
useEffect(() => {
    if (!isNaN(Number(N)) && N > 0 || N == "") {
        setIsAValid(true);
    }else{
        setIsAValid(false);
        setresult("")
        setresultXSmallerThan("")
        setresultXGreaterThan("")
        window.navigator.vibrate(200)
        
    }
    if (!isNaN(Number(P))&& P > 0 || P == "") {
        setIsBValid(true);
    }else{
        setIsBValid(false);
        setresult("")
        setresultXSmallerThan("")
        setresultXGreaterThan("")
        window.navigator.vibrate(200)
    }
    if (!isNaN(Number(X))&& X > 0 || X == "" ){
        setIsCValid(true);
    }else{
        setIsCValid(false);
        setresult("")
        setresultXSmallerThan("")
       setresultXGreaterThan("")
        window.navigator.vibrate(200)
    }
    console.log("---> "+ N, P, X)


});
 


    const inputStylea = {
        border: `1px solid ${isAValid ? 'rgb(94, 147, 14)' : 'red'}`
    }
    const inputStyleb = {
        border: `1px solid ${isBValid? 'rgb(94, 147, 14)' :'red'}`
    }
    const inputStylec = {
        border: `1px solid ${isCValid? 'rgb(94, 147, 14)' :'red'}`
    }


    return(
        <>
        <Menu/>
        <div className="card-control c">
        <div className='card-container con'>
                    <div className='card-body-p'>
                        <h1 className='card-title'>Binomial distribution calculator</h1>
                        <p className='card-text'>Enter the N,P,X values</p>
                        <div className= 'input-container'>
                            <input className='inputA, inputs' style={inputStylea} type='text'  placeholder='Number of trial' onChange={e => setN(e.target.value)}></input>
                            
                            <input className='inputB, inputs' style={inputStyleb} type='text' placeholder='Probibility' onChange={e => setP(e.target.value)}></input>
                          
                            <input className='inputC, inputs' style={inputStylec} type='text' placeholder='Number of successes (X)' onChange={e => setX(e.target.value)}></input>


                        </div>

                        <form action='submit' className='result-con'>
                        
                           
                            {result && <div className='result'>{result}<br></br> {resultXSmallerThan}<br></br> {resultXGreaterThan} </div>}


                
                        </form>
                    </div>
            <BinomialDistributionGraph X={X} P={P} N={N} />
            </div>
            
            </div>
        </>
    )
}

export default Probability;

