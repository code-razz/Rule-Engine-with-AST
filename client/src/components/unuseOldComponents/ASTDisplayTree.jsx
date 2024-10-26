import React from 'react';
import './TreeStyle.css'; // We'll use some custom CSS for tree styling

// Function to recursively render the AST
const RenderASTNode = ({ node }) => {
  console.log(node)
  if (!node) return null;

  return (
    <li>
      {/* Display the operator or operand */}
      <div className="node">
        {node.type === 'operator' ? `Operator: ${node.value}` : `Operand: ${node.value}`}
      </div>

      {/* Recursively render child nodes */}
      {(node.left || node.right) && (
        <ul>
          {node.left && <RenderASTNode node={node.left} />}
          {node.right && <RenderASTNode node={node.right} />}
        </ul>
      )}
    </li>
  );
};

// Main component to render the AST tree
const ASTDisplayTree = ({ ast }) => {
  return (
    <div>
      <h2>Abstract Syntax Tree (AST)</h2>
      <div className="tree">
        <ul>
          <RenderASTNode node={ast} />
        </ul>
      </div>
    </div>
  );
};

export default ASTDisplayTree