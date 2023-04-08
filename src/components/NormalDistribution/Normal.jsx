import React, { useState } from 'react';
import  {useEffect} from 'react';
import Menu from '../navigationMenu/navbar';
// Import the jstat library for statistical calculations
import jstat from 'jstat';
import NormalDistributionGraph from './normalDistrabutionGragh';
import { checkIfValid } from '../../modules/checkValidity';
function Normal() {
    const check = checkIfValid()
    //define state variables for inputs
    const[Mean, setMean] = useState("");
    const[StdDev, setStdDev] = useState("");
    const[X, setX] = useState("");
    //define state variables for the output
    const [pXlessThanX, setpXlessThanX] = useState('');
    const [pXequalsX, setpXequalsX] = useState('');
    const [pXgreaterThanX, setpXgreaterThanX] = useState('');
   
    // console.log("--->>> "+ N, P, X)
     //set the inputs to 0 if the value is not a number or nothing
     const mean = isNaN(Number(Mean)) || Mean == "" ? 0 : Number(Mean);
     const stdDev = isNaN(Number(StdDev)) || StdDev == "" ? 0 : Number(StdDev);
     const x = isNaN(Number(X)) || X == "" ? 0 : Number(X);

     // Calculate the probability density function (pdf) for a normal distribution with the given mean, standard deviation, and x value using jstat library
     const pdf = jstat.normal.pdf(x, mean, stdDev);

      // Calculate the cumulative distribution function (cdf) for a normal distribution with the given mean, standard deviation, and x value using jstat library
     const cdf = jstat.normal.cdf(x, mean, stdDev);
 
    useEffect(() => {
    if (!isNaN(Number(Mean)) && !isNaN(Number(StdDev)) && !isNaN(Number(X)) && StdDev > 0 && Mean !== "" && StdDev!== "" && X!== "") {
            setpXequalsX(pdf.toFixed(4)); // Round the pdf value to 4 decimal places and store it in a variable called pXequalsX
            setpXgreaterThanX((1 - cdf).toFixed(4)); // Subtract the cdf from 1, round the result to 4 decimal places, and store it in a variable called pXgreaterThanX
            setpXlessThanX(cdf.toFixed(4)); // Round the cdf value to 4 decimal places and store it in a variable called pXlessThanX   
    }
    else{
        //disappear the results if the inputs dont meet the required format
        setpXequalsX("")
        setpXlessThanX("")
        setpXgreaterThanX("")
    }

}, [setpXequalsX, setpXgreaterThanX, setpXlessThanX, Mean, StdDev, X]);


// check whether the inputs are valid if not generate vibrate, turn the inputs color into red and disappear the result 
useEffect(() => {
    check.setIsAValid(!isNaN(Number(Mean)) ? true : false && "" &&  window.navigator.vibrate(200));
    check.setIsBValid(!isNaN(Number(StdDev)) ? true : false && "" &&  window.navigator.vibrate(200));
    check.setIsCValid(!isNaN(Number(X)) ? true : false && "" &&  window.navigator.vibrate(200));

}, [setpXequalsX, setpXgreaterThanX, setpXlessThanX, Mean, StdDev, X]);
 

// console.log("--->>>result  "+ pXequalsX, pXgreaterThanX, pXlessThanX)



    return(
        <>
        <Menu/>
        <div className="card-control">
        <div className='card-container'>
                    <div className='card-body height' >
                        <h1 className='card-title'>Normal Distribution</h1>
                        <p className='card-text'>Enter the Mean, SD, X values</p>
                        <div className= 'input-container'>
                            <input className='inputA, inputs' style={check.inputStylea} type='text'  placeholder='Mean' onChange={e => setMean(e.target.value)}></input>
                            
                            <input className='inputB, inputs' style={check.inputStyleb} type='text' placeholder='Standard Deviation' onChange={e => setStdDev(e.target.value)}></input>
                          
                            <input className='inputC, inputs' style={check.inputStylec} type='text' placeholder='x' onChange={e => setX(e.target.value)}></input>


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
 