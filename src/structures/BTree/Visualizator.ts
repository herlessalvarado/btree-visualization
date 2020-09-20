export class NodeHierarchy<T> {
    public leaves : LeafHierarchy<T>;
    public children : NodeHierarchy<T>[];
    
    constructor() {
        this.leaves = new LeafHierarchy();
        this.children = [];
    }

    pushChild(node: NodeHierarchy<T>){
        this.children.push(node);
    }
}

export class LeafHierarchy<T> {
    public keys : Object[];

    constructor() {
        this.keys = [];
    }

    pushKey(value: T, highlighted=false) {
        this.keys.push({value, highlighted});
    }
}