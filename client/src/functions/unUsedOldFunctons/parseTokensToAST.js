import Node from "./RuleNode";
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

export default parseTokensToAST