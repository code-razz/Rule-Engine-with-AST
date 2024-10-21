const evaluateAST=(node, data)=>{
    if (node.type === 'operand') {
        // Extract the attribute, operator, and value from the node's value
        const [attribute, operator, value] = node.value.split(' ');

        // Get the actual value from the data object
        const dataValue = data[attribute];

        // Convert value to the correct type (number or string)
        const parsedValue = isNaN(value) ? value.replace(/'/g, '') : Number(value);

        // Evaluate the condition based on the operator
        switch (operator) {
            case '>':
                return dataValue > parsedValue;
            case '<':
                return dataValue < parsedValue;
            case '>=':
                return dataValue >= parsedValue;
            case '<=':
                return dataValue <= parsedValue;
            case '==':
                return dataValue == parsedValue;
            case '!=':
                return dataValue != parsedValue;
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    } else if (node.type === 'operator') {
        // Recursively evaluate the left and right nodes
        const leftResult = evaluateAST(node.left, data);
        const rightResult = evaluateAST(node.right, data);

        // Combine the results using the logical operator
        if (node.value === 'AND') {
            return leftResult && rightResult;
        } else if (node.value === 'OR') {
            return leftResult || rightResult;
        } else {
            throw new Error(`Unsupported logical operator: ${node.value}`);
        }
    } else {
        throw new Error(`Unsupported node type: ${node.type}`);
    }
}


export default evaluateAST
