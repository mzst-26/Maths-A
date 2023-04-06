import { useState } from "react";
export const checkIfValid= () => {
 const[isAValid, setIsAValid] = useState(true);
 const[isBValid, setIsBValid] = useState(true);
 const[isCValid, setIsCValid] = useState(true);

 const inputStylea = {
    border: `1px solid ${isAValid ? 'rgb(94, 147, 14)' : 'red'}`
}
 const inputStyleb = {
    border: `1px solid ${isBValid? 'rgb(94, 147, 14)' :'red'}`
}
 const inputStylec = {
    border: `1px solid ${isCValid? 'rgb(94, 147, 14)' :'red'}`
}

return {
    isAValid,
    setIsAValid,
    isBValid,
    setIsBValid,
    isCValid,
    setIsCValid,
    inputStylea,
    inputStyleb,
    inputStylec,
  };

}