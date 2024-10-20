import React, { useState } from 'react'

function InputBox() {
    const [ruleStr,setRuleStr]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()

    }

    class Node {
      constructor(type, left = null, right = null, value = null) {
          this.type = type;   // 'operator' or 'operand'
          this.left = left;   // left child (Node)
          this.right = right; // right child (Node)
          this.value = value; // operand or operator value (e.g., 'age > 30')
      }
    }
    
    function tokenize(ruleString) {
        return ruleString.match(/([()])|([a-zA-Z_]+)|([><=!]+)|('[^']+')|(\d+)|AND|OR/g);
    }
    
    function parseTokensToAST(tokens) {
        let index = 0;
    
        // Recursive function to parse sub-expressions
        function parseExpression() {
            if (tokens[index] === '(') {
                index++;  // Skip '('
                const left = parseExpression(); // Parse the left-hand expression
                const operator = tokens[index++]; // AND or OR
                const right = parseExpression(); // Parse the right-hand expression
                index++;  // Skip ')'
                return new Node('operator', left, right, operator);
            } else {
                // Build a condition from the tokens like "age > 30"
                const attribute = tokens[index++];  // e.g., age or department
                const operator = tokens[index++];   // e.g., > or =
                const value = tokens[index++];      // e.g., 30 or 'Sales'
                return new Node('operand', null, null, `${attribute} ${operator} ${value}`);
            }
        }
    
        return parseExpression();
    }
    
    // Example usage
    const ruleString = "(((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5))";
    const tokens = tokenize(ruleString);
    console.log("tokenize: ");
    console.log(tokens);
    const ast = parseTokensToAST(tokens);
    
    console.log(ast);
  

    // function parseTokensToAST(tokens) {
    //   let index = 0;
    
    //   function parseExpression() {
    //       if (tokens[index] === '(') {
    //           index++;  // Skip '('
    //           const left = parseExpression();  // Parse the left-hand side of the expression
    //           const operator = tokens[index++];  // Logical operator (AND/OR)
    //           const right = parseExpression();  // Parse the right-hand side of the expression
    //           index++;  // Skip ')'
    //           return new Node('operator', left, right, operator);
    //       } else {
    //           // Parse individual conditions like "salary > 50000"
    //           const attribute = tokens[index++];  // e.g., salary, experience
    //           const operator = tokens[index++];   // e.g., >, <
    //           const value = tokens[index++];      // e.g., 50000, 5
    //           return new Node('operand', null, null, `${attribute} ${operator} ${value}`);
    //       }
    //   }
    
    //   return parseExpression();
    // }

  return (
    <>
    <form className='m-2' onSubmit={handleSubmit}>
        <input type='text' className='bg-blue-200 rounded-xl p-2' placeholder='Enter your rule to add' onChange={(e)=>setRuleStr(e.target.value)} value={ruleStr}/>
        <button type="submit" className='bg-green-500 p-2 m-2 text-white rounded active:bg-green-700'>Add Rule</button>
        <br/>
        <input type='text' className='w-screen' value={ruleString} readOnly />
    </form>
    <br/>
    </>
  )
}

export default InputBox