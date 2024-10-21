class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;   // 'operator' or 'operand'
        this.left = left;   // left child (Node)
        this.right = right; // right child (Node)
        this.value = value; // operand or operator value (e.g., 'age > 30')
    }
}

export default Node