function areParenthesesBalanced(str) {
    let stack = [];
    for (let char of str) {
      if (char === '(') {
        stack.push(char);
      } else if (char === ')') {
        if (stack.length === 0) {
          return false; // Unmatched closing parenthesis
        }
        stack.pop();
      }
    }
    return stack.length === 0; // True if all parentheses are matched
  }

function validateRule(rule){
    return areParenthesesBalanced(rule);
}
export default validateRule;