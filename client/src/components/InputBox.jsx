import React, { useState } from 'react'
import createAST from '../functions/createASt'
import evaluateAST from '../functions/evaluateRule'
import combineRules from '../functions/combineRules'

function InputBox() {
    // const [ruleStr,setRuleStr]=useState("((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing'))")
    const [ruleStr,setRuleStr]=useState("(((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5))")
    const handleSubmit=(e)=>{
        e.preventDefault()

    }
    // const ast=createAST(ruleStr)
    // console.log(ast)

    // Example usage
  // const data = {
  //   age: 35,
  //   department: 'Sales',
  //   salary: 60000,
  //   experience: 3
  // };
  // console.log(data);

  // const result = evaluateAST(ast, data);
  // console.log(result); // Output: true or false based on the data and rule

  //Test of evaluateAst function
//   const dataObjects = [
//       { age: 35, department: 'Sales', salary: 60000, experience: 3 }, // true
//       { age: 22, department: 'Marketing', salary: 45000, experience: 6 }, // true
//       { age: 28, department: 'Engineering', salary: 70000, experience: 4 }, // false
//       { age: 40, department: 'Sales', salary: 55000, experience: 2 }, // true
//       { age: 24, department: 'Marketing', salary: 48000, experience: 7 }, // true
//       { age: 31, department: 'HR', salary: 52000, experience: 6 }, // false
//       { age: 23, department: 'Marketing', salary: 51000, experience: 4 }, // true
//       { age: 45, department: 'Sales', salary: 49000, experience: 8 }, // true
//       { age: 29, department: 'Sales', salary: 60000, experience: 5 }, // false
//       { age: 21, department: 'Marketing', salary: 47000, experience: 6 }, // true
//   ];

//   // Evaluate each data object
//   dataObjects.forEach((data, index) => {
//       const result = evaluateAST(ast, data);
//       console.log(`Data Object ${index + 1} Evaluation: ${result}`);
//   });


//   example usages combineRules
const ruleStrings = [
"((age > 30 AND department == 'Sales') OR (age < 25 AND department == 'Marketing'))",
"(salary > 50000 OR experience > 5)"
];

    const ast1=createAST(ruleStrings[0])
    console.log("1st ast")
    console.log(ast1)
    const ast2=createAST(ruleStrings[1])
    console.log("2nd ast")
    console.log(ast2)
    
    const combinedAST = combineRules(ruleStrings);
    console.log("combiend ast")
    console.log(combinedAST);



  return (
    <>
    <form className='m-2' onSubmit={handleSubmit}>
        <input type='text' className='bg-blue-200 rounded-xl p-2' placeholder='Enter your rule to add' onChange={(e)=>setRuleStr(e.target.value)} value={ruleStr}/>
        <button type="submit" className='bg-green-500 p-2 m-2 text-white rounded active:bg-green-700'>Add Rule</button>
        <br/>
        <input type='text' className='w-screen' value={ruleStr} readOnly />
    </form>
    <br/>
    </>
  )
}

export default InputBox