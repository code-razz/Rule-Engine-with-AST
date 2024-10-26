function parseRuleString(ruleString) {
    console.log("newAst")
    // Tokenize the input string
    const tokens = ruleString.match(/\(|\)|[^\s()]+/g);

    let index = 0;

    // Parse tokens into an AST
    function parseExpression() {
        let left = parseTerm();

        while (index < tokens.length) {
            const operator = tokens[index];

            if (operator === 'AND' || operator === 'OR') {
                index++; // consume operator
                const right = parseTerm();
                left = {
                    type: 'operator',
                    value: operator,
                    left: left,
                    right: right
                };
            } else {
                break;
            }
        }

        return left;
    }

    // Parse terms, which could be operands or expressions within parentheses
    function parseTerm() {
        const token = tokens[index];

        if (token === '(') {
            index++; // consume '('
            const expr = parseExpression();
            index++; // consume ')'
            return expr;
        } else if (token === 'NOT') {
            index++; // consume 'NOT'
            const operand = parseTerm();
            return {
                type: 'operator',
                value: 'NOT',
                left: operand,
                right: null
            };
        } else {
            return parseOperand();
        }
    }

    // Parse a single operand (e.g., "age > 30" or "department = 'Sales'")
    function parseOperand() {
        const field = tokens[index++];
        const operator = tokens[index++];
        const value = tokens[index++];

        return {
            type: 'operand',
            value: `${field} ${operator} ${value}`,
            left: null,
            right: null
        };
    }

    // Initiate parsing and return the result
    return parseExpression();
}

// Example usage:
// const ruleString = "((salary > 50000 OR (department = 'Engineering' AND (age < 30 OR yearsOfExperience >= 5))) AND NOT (location = 'Remote' OR (age >= 40 AND title = 'Manager')))";
// const ast = parseRuleString(ruleString);
// console.log(JSON.stringify(ast, null, 2));

export default parseRuleString