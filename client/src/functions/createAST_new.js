function tokenize(ruleString) {
    // Match parentheses, logical operators, comparison operators, and terms without requiring spaces
    return ruleString.match(/([()])|AND|OR|NOT|[a-zA-Z_]+|[><=!]+|'[^']+'|\d+/g);
}

function parseRuleString(ruleString) {
    const tokens = tokenize(ruleString);
    let index = 0;

    function parseExpression() {
        let left = parseTerm();

        while (index < tokens.length) {
            const operator = tokens[index];

            if (operator === 'AND' || operator === 'OR') {
                index++; // Consume operator
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

    function parseTerm() {
        const token = tokens[index];

        if (token === '(') {
            index++; // Consume '('
            const expr = parseExpression();
            index++; // Consume ')'
            return expr;
        } else if (token === 'NOT') {
            index++; // Consume 'NOT'
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

    return parseExpression();
}

// Example usage
// const ruleString = "((age>30 AND department='Sales') OR (age<25 AND department='Marketing'))";
// const ast = parseRuleString(ruleString);
// console.log(JSON.stringify(ast, null, 2));

export default parseRuleString;
