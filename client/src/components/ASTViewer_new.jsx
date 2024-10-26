import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";

// Helper function to convert AST to `react-d3-tree` format
const transformAST = (node) => {
    if (!node) return null;
    return {
        name: node.value,
        children: [
            node.left ? transformAST(node.left) : null,
            node.right ? transformAST(node.right) : null
        ].filter(Boolean)
    };
};

const ASTViewer = ({ ast }) => {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Update dimensions based on the container size
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }

        // Handle resizing dynamically
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const data = transformAST(ast);

    const renderCustomNode = ({ nodeDatum }) => (
        <g>
            <rect
                width="150"
                height="40"
                x="-75"          // Centering rectangle horizontally
                y="-20"          // Centering rectangle vertically
                fill="#ddd"
                stroke="#999"
                ry="10"          // Rounded corners for styling
            />
            <text
                fill="black"
                fontSize="12"
                textAnchor="middle"           // Centers text horizontally
                alignmentBaseline="middle"     // Centers text vertically
                x="0"                          // Center of rectangle
                y="0"                          // Center of rectangle
            >
                {nodeDatum.name}
            </text>
        </g>
    );

    return (
        <>
                <h2 className="text-2xl mt-6 -mb-10 font-bold text-gray-700 text-center">AST Tree</h2>
        <div ref={containerRef} style={{ width: "100%", height: "500px" }}>

            <Tree
                data={data}
                orientation="vertical"
                renderCustomNodeElement={renderCustomNode}
                translate={{
                    x: dimensions.width / 2,   // Center tree horizontally
                    y: dimensions.height / 4,  // Center tree vertically with some padding
                }}
                nodeSize={{ x: 200, y: 100 }}
                zoomable
                scaleExtent={{ min: 0.5, max: 2 }}  // Enables zoom with min and max limits
            />
        </div>
        </>
    );
};

export default ASTViewer;
