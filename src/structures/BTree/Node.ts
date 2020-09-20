export class Node<T>{
    public data: Array<T>;
    public children: Array<Node<T>>;
    public isLeaf: boolean;

    constructor(isLeaf: boolean){
        this.data = [];
        this.children = [];
        this.isLeaf = isLeaf;
    }

    public insert_data(value: T) : void { 
        let pos = 0;
        while (this.data[pos] < value && pos < this.data.length) {
            pos++;
        }
        this.data.splice(pos, 0, value);
    };

    public insert_child(node: Node<T>, pos: number) : void {
        this.children.splice(pos, 0, node);
    }
}