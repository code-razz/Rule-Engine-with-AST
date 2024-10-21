import parseTokensToAST from "./parseTokensToAST";
import Node from "./RuleNode";
import tokenize from "./tokenizeRule";

function combineRules(ruleStrings) {
    // Helper function to create a combined AST node
    function combineASTs(ast1, ast2, operator) {
        return new Node('operator', ast1, ast2, operator);
    }

    // Parse each rule string into an AST
    const asts = ruleStrings.map(ruleStr => {
        const tokens = tokenize(ruleStr);
        return parseTokensToAST(tokens);
    });

    // Combine all ASTs into a single AST using a chosen operator
    // Here, we use 'AND' as an example, but this can be adjusted based on heuristics
    let combinedAST = asts[0];
    for (let i = 1; i < asts.length; i++) {
        combinedAST = combineASTs(combinedAST, asts[i], 'AND');
    }

    return combinedAST;
}


// Example usage

export default combineRules