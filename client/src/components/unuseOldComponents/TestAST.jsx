import React from "react";
import ASTViewer from "./TestAST2";

// Component to render each node in the AST
const ASTNode = ({ node }) => {
    if (!node) return null;

    // Render operand nodes as simple text
    if (node.type === "operand") {
        return <span>{node.value}</span>;
    }

    // Render operator nodes recursively
    return (
        <div style={{ marginLeft: "20px", borderLeft: "1px solid #ccc", paddingLeft: "10px" }}>
            <div style={{ fontWeight: "bold" }}>{node.value}</div>
            <div>
                <ASTNode node={node.left} />
            </div>
            <div>
                <ASTNode node={node.right} />
            </div>
        </div>
    );
};

// Main AST component that takes the root node of the AST
// const ASTViewer = ({ ast }) => {
//     return (
//         <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
//             <h3>Abstract Syntax Tree</h3>
//             <ASTNode node={ast} />
//         </div>
//     );
// };

// Usage example with the given AST structure
const TestAST = () => {
    const ast ={
        "type": "operator",
        "value": "AND",
        "left": {
            "type": "operator",
            "value": "OR",
            "left": {
                "type": "operand",
                "value": "salary > 50000"
            },
            "right": {
                "type": "operator",
                "value": "AND",
                "left": {
                    "type": "operand",
                    "value": "department == 'Engineering'"
                },
                "right": {
                    "type": "operator",
                    "value": "OR",
                    "left": {
                        "type": "operand",
                        "value": "age < 30"
                    },
                    "right": {
                        "type": "operand",
                        "value": "yearsOfExperience >= 5"
                    }
                }
            }
        },
        "right": {
            "type": "operator",
            "value": "NOT",
            "left": {
                "type": "operator",
                "value": "OR",
                "left": {
                    "type": "operand",
                    "value": "location == 'Remote'"
                },
                "right": {
                    "type": "operator",
                    "value": "AND",
                    "left": {
                        "type": "operand",
                        "value": "age >= 40"
                    },
                    "right": {
                        "type": "operand",
                        "value": "title == 'Manager'"
                    }
                }
            }
        }
    };

    return (
        <div>
            <ASTViewer ast={ast} />
        </div>
    );
};

export default TestAST;
