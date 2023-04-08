import React, { useState, useEffect } from "react";
import Menu from "../navigationMenu/navbar";
import ChiSquaredGraph from "./ChiAquaredGraph";
import './ChiStyle.css';
import { checkIfValid } from "../../modules/checkValidity";

function ChiSquared() {

  const check = checkIfValid()
  //define state variables to get the value of inputs
  const [observed, setObserved] = useState("");
  const [expected, setExpected] = useState("");

  // console.log("observed "+observed + typeof(observed));

  // define state variables for the output
  const [result, setResult] = useState(0);

    //Observed value and expexted values can be seperated using comma or each number in a line
    const observedValues = (observed.split("\n").map(Number)) == 'NaN'  ? observed.split(",").map(Number) : (observed.split("\n").map(Number)) ;
    const expectedValues = (expected.split("\n").map(Number))  == 'NaN' ? expected.split(",").map(Number): (expected.split("\n").map(Number)) ;
   
    // Calculate chi-squared value
    let chiSquared = 0;
    for (let i = 0; i < observedValues.length; i++) {
      chiSquared += Math.pow(observedValues[i] - expectedValues[i], 2) / expectedValues[i];
    }

    // Round result to 2 decimal places
    const roundedResult = parseFloat(chiSquared.toFixed(4));

    //seting the input formats and rections to the result if the inputs are not valid
useEffect(() => {
    check.setIsAValid(observedValues >= 0 || isNaN(Number(observedValues)));
    check.setIsCValid(expectedValues >= 0 || isNaN(Number(expectedValues)));

    const regex = /^[0-9]+(?:,[0-9]+)*(?: [0-9]+(?:,[0-9]+)*)*$/;
    const isValidInputA = regex.test(observedValues);
    const isValidInputB = regex.test(expectedValues);
  
    if ( isValidInputA && isValidInputB) {
        // console.log(typeof(roundedResult))
        setResult(isNaN(Number(roundedResult)) ? '' : roundedResult)
    }else{
        setResult('')
    }
    // console.log(typeof(roundedResult))
  }, [observed, expected, roundedResult, setResult]);


// console.log(roundedResult)


  return (
    <>
    <Menu/>
    <div className="card-control">
      <div className="card-container con">
        <div className="card-body">
          <h1 className="card-title">Chi-Squared Calculator</h1>
          <p className="card-text">Enter the Observed and Expected values.</p>
          <div className="input-container">
            <textarea
              className="inputA, inputs a"
              style={check.inputStylea}
              type="text"
              value={observed}
              placeholder="observed"
              onChange={(e) => setObserved(e.target.value)}
            />

            <textarea
              className="inputC, inputs a"
              style={check.inputStylec}
              type="text"
              value={expected}
              placeholder="expected"
              onChange={(e) => setExpected(e.target.value)}
            />
          </div>

          <form action="submit" className="result-con">
            {result && (
              <div className="result">
                  The total Chi-Squared value: {result}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    <ChiSquaredGraph observed={observed} expected = {expected}/>
     
  </>
  
  );
}

export default ChiSquared;
