import './card.css'
import './cardPhoneSize.css'
import {useState, useEffect} from 'react';
import Graph from './graph/gragh';
import Menu from '../navigationMenu/menu';
import { checkIfValid } from '../../modules/checkValidity';

export default function Card({a, b, c}){
    const check= checkIfValid() 
    
    // initialize inputs state variable
    const[inputa, setinputa] = useState(''); 
    const[inputb, setinputb] = useState('');
    const[inputc, setinputc] = useState(''); 

    const [result, setresult] = useState(''); // initialize result state variable

    // console.log("A: ", inputa,"B: ", inputb,"C: ", inputc);

    // Update values of a,b,c using the input values
     a= isNaN(Number(inputa)) ? 0 : Number(inputa);
     b = isNaN(Number(inputb)) ? 0 : Number(inputb);
     c = isNaN(Number(inputc)) ? 0 : Number(inputc);

    // initialize root1 and root2
    root1 = isNaN(Number(root1))? 0 : Number(root1);
    root2 = isNaN(Number(root2))? 0 : Number(root2);
    
    // console.log("A: ", a,"B: ", b,"C: ", c);

    // calculate the discriminant
    var discriminant = (b * b) - 4 * a * c;
    
    // calculate roots based on discriminant
    if (discriminant > 0) {
      var  root1= (-b + Math.sqrt(discriminant)) / (2 * a);
      var  root2= (-b - Math.sqrt(discriminant)) / (2 * a);
    } else if (discriminant == 0) {
      root1 = root2 = -b / (2 * a);
    } else {
      var realPart = parseFloat((-b / (2 * a)).toFixed(2));
      var imagPart = parseFloat((Math.sqrt(-discriminant) / (2 * a)).toFixed(2));
    //   console.log(realPart, imagPart);
      root1 = `${realPart} + ${imagPart} i`;
      root2 = `${realPart} - ${imagPart} i`;
    }

    // update result based on root1 and root2
    useEffect(() => {
      if (!isNaN(Number(root1)) || !isNaN(Number(root2)) && (realPart == "" && imagPart == "") && (isNaN(Number(root1)) && isNaN(Number(root2)))) {
        setresult("The roots are (" + root2+ ", \n" + root1 + ")");
      } else if  (!isNaN(Number(root1)) && !isNaN(Number(root2)) && (root1 !== root2) && (realPart !== "" || imagPart !== "") || (!isNaN(Number(imagPart)) && !isNaN(Number(realPart)))) {
        setresult("No real root --> (" + root2+ "),\n(" + root1 + ") i");
      } else {
        setresult("");
      }
    }, [root1, root2]);

// check if input values for a,b,c are valid
useEffect(() => {
    if (!isNaN(Number(inputa))){
        check.setIsAValid(true);
    }else{
        check.setIsAValid(false);
        setresult("")
        window.navigator.vibrate(200)
    }
    if (!isNaN(Number(inputb))){
        check.setIsBValid(true);
    }else{
        check.setIsBValid(false);
        setresult("")
        window.navigator.vibrate(200)
    }
    if (!isNaN(Number(inputc))){
        check.setIsCValid(true);
    }else{
        check.setIsCValid(false);
        setresult("")
        window.navigator.vibrate(200)
    }

});
    

    return (
        <>
        <Menu/>
        <div className="card-control">
        <div className='card-container'>
                    <div className='card-body'>
                        <h1 className='card-title'>Quadratic Equation Calculator</h1>
                        <p className='card-text'>Enter A,B,C values</p>
                        <div className= 'input-container'>
                            <input className='inputA, inputs' style={check.inputStylea} type='text'  placeholder='Enter A' onChange={e => setinputa(e.target.value)}></input>
                            
                            <input className='inputB, inputs' style={check.inputStyleb} type='text' placeholder='Enter B' onChange={e => setinputb(e.target.value)}></input>
                          
                            <input className='inputC, inputs' style={check.inputStylec} type='text' placeholder='Enter C' onChange={e => setinputc(e.target.value)}></input>     
                        </div>
                        <form action='submit' className='result-con'>
                        
                            {result && <div className='result'>{result}</div>}
                        </form>
                    </div>
            </div>
            <div className='QuadraticG-B-container'>
            <Graph a={a} b = {b} c = {c}/>
            </div>
            </div>
        </>
    )
}




