const evaluateAST = (node, data) => {
    if (node.type === 'operand') {
        // Extract the attribute, operator, and value from the node's value
        const [attribute, operator, value] = node.value.split(' ');

        // Get the actual value from the data object
        const dataVal = data[attribute.toLowerCase()];
        const dataValue=isNaN(dataVal) ? dataVal.toLowerCase() : dataVal;

        // Convert value to the correct type (number or string)
        const parsedValue = isNaN(value) ? value.replace(/'/g, '').toLowerCase() : Number(value);
        
        console.log("Data Val",dataVal)
        console.log("Data Value",dataValue)
        console.log("Parsed Val",parsedValue)

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
            case '=':
            case '==':
                return dataValue == parsedValue;
            case '!=':
                return dataValue != parsedValue;
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    } else if (node.type === 'operator') {
        // Check for NOT operator, which only has a left node
        if (node.value === 'NOT') {
            return !evaluateAST(node.left, data);
        }

        // Recursively evaluate the left and right nodes for AND/OR operators
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
};

export default evaluateAST;
