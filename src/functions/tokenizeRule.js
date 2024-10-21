function tokenize(ruleStr) {
    // return ruleStr.match(/([()])|([a-zA-Z_]+)|([><=!]+)|('[^']+')|(\d+)|AND|OR/g);
    return ruleStr.replace(/=/g, '==').match(/([()])|([a-zA-Z_]+)|([><=!]+)|('[^']+')|(\d+)|AND|OR/g);
}

export default tokenize;