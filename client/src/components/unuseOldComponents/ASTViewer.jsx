import React from 'react';

// Node component to display each node of the AST
const Node = ({ node }) => {
    if (!node) return null;

    // If the node is an operand, display its value
    if (node.type === 'operand') {
        return <li>{node.value}</li>;
    }

    // If the node is an operator, recursively display its children
    if (node.type === 'operator') {
        return (
            <li>
                <strong>{node.value}</strong>
                <ul>
                    <Node node={node.left} />
                    <Node node={node.right} />
                </ul>
            </li>
        );
    }

    return null;
};

// ASTViewer component to display the entire AST
const ASTViewer = ({ ast }) => {
    return (
        <div>
            <h3>Abstract Syntax Tree</h3>
            <ul>
                <Node node={ast} />
            </ul>
        </div>
    );
};

export default ASTViewer;