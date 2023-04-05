import React, { useState } from 'react';
import  {useEffect} from 'react';
import Menu from '../navigationMenu/menu';
// Import the jstat library for statistical calculations
import jstat from 'jstat';
import NormalDistributionGraph from './normalDistrabutionGragh';

function Normal() {
    const[Mean, setMean] = useState("");
    const[StdDev, setStdDev] = useState("");
    const[X, setX] = useState("");
    
    const [pXlessThanX, setpXlessThanX] = useState('');
    const [pXequalsX, setpXequalsX] = useState('');
    const [pXgreaterThanX, setpXgreaterThanX] = useState('');

    const[isAValid, setIsAValid] = useState(true);
    const[isBValid, setIsBValid] = useState(true);
    const[isCValid, setIsCValid] = useState(true);

    // console.log("--->>> "+ N, P, X)
 
     const mean = isNaN(Number(Mean)) || Mean == "" ? 0 : Number(Mean);
     const stdDev = isNaN(Number(StdDev)) || StdDev == "" ? 0 : Number(StdDev);
     const x = isNaN(Number(X)) || X == "" ? 0 : Number(X);
   
     const pdf = jstat.normal.pdf(x, mean, stdDev); // Calculate the probability density function (pdf) for a normal distribution with the given mean, standard deviation, and x value using jstat library
     const cdf = jstat.normal.cdf(x, mean, stdDev); // Calculate the cumulative distribution function (cdf) for a normal distribution with the given mean, standard deviation, and x value using jstat library
 
    useEffect(() => {
    if (!isNaN(Number(Mean)) && !isNaN(Number(StdDev)) && !isNaN(Number(X)) && StdDev > 0 && Mean !== "" && StdDev!== "" && X!== "") {
            setpXequalsX(pdf.toFixed(4)); // Round the pdf value to 4 decimal places and store it in a variable called pXequalsX
            setpXgreaterThanX((1 - cdf).toFixed(4)); // Subtract the cdf from 1, round the result to 4 decimal places, and store it in a variable called pXgreaterThanX
            setpXlessThanX(cdf.toFixed(4)); // Round the cdf value to 4 decimal places and store it in a variable called pXlessThanX   
    }
    else{
        setpXequalsX("")
        setpXlessThanX("")
        setpXgreaterThanX("")
    }

}, [setpXequalsX, setpXgreaterThanX, setpXlessThanX, Mean, StdDev, X]);

useEffect(() => {
    setIsAValid(!isNaN(Number(Mean)) ? true : false && "" &&  window.navigator.vibrate(200));
    setIsBValid(!isNaN(Number(StdDev)) ? true : false && "" &&  window.navigator.vibrate(200));
    setIsCValid(!isNaN(Number(X)) ? true : false && "" &&  window.navigator.vibrate(200));


}, [setpXequalsX, setpXgreaterThanX, setpXlessThanX, Mean, StdDev, X]);
 

console.log("--->>>result  "+ pXequalsX, pXgreaterThanX, pXlessThanX)
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
        <div className="card-control">
        <div className='card-container'>
                    <div className='card-body height' >
                        <h1 className='card-title'>Normal Distribution</h1>
                        <p className='card-text'>Enter the Mean, SD, X values</p>
                        <div className= 'input-container'>
                            <input className='inputA, inputs' style={inputStylea} type='text'  placeholder='Mean' onChange={e => setMean(e.target.value)}></input>
                            
                            <input className='inputB, inputs' style={inputStyleb} type='text' placeholder='Standard Deviation' onChange={e => setStdDev(e.target.value)}></input>
                          
                            <input className='inputC, inputs' style={inputStylec} type='text' placeholder='x' onChange={e => setX(e.target.value)}></input>


                        </div>

                        <form action='submit' className='result-con'>
                        
                           
                            {pXequalsX && <div className='result'>P(X = {x}): {pXequalsX}<br></br> P(X less than {x}): {pXlessThanX}<br></br> P(X more than {x}): {pXgreaterThanX} </div>}


                
                        </form>
                    </div>
           
            </div>
            
            </div>
            <NormalDistributionGraph mean={Mean} stdDev={StdDev} x={X}/>
        </>
    )
}

export default Normal;
 