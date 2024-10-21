import tokenize from "./tokenizeRule.js";
import parseTokensToAST from "./parseTokensToAST.js";

const createAST=(ruleStr)=>{
    const tokens = tokenize(ruleStr);
    console.log("tokenize: ");
    console.log(tokens);
    const ast = parseTokensToAST(tokens);
    
    // console.log(ast);
    return ast;


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

}

export default createAST;

