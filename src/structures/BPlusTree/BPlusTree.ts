import { LeafHierarchy, NodeHierarchy } from './Visualizator';
import { Node } from './Node';

export class BPlusTree<T>{
    private root: Node<T>;
    private order: number;

    constructor(order: number){
        this.order = order;
        this.root = new Node<T>(true);
    }

    public insert(value: T) : void {
        let current = this.root;
        this.insertNotFull(current,value);
        if(current.data.length === this.order) {
            const newRoot = new Node<T>(false);
            this.root = newRoot;
            newRoot.insert_child(current, 0);
            this.split(current, newRoot, 1);
        }
    }

    private insertNotFull(node: Node<T>, value: T) : void {
        if(!node.isLeaf){
            let pos = node.data.length;
            while(pos > 0 && node.data[pos-1] > value){
                pos--;
            }
            this.insertNotFull(node.children[pos], value);
            if (node.children[pos].data.length === this.order) {
                this.split(node.children[pos], node, pos + 1);
            }
        }else{
            node.insert_data(value);
        }
    }

    private split(child: Node<T>, parent: Node<T>, pos: number) : void {
        let newChild = new Node<T>(child.isLeaf);
        for(let i = 0 ; i < this.order/2 ; i++){
            newChild.insert_data(child.data.pop()!);
        }
        if(!child.isLeaf){
            for (let i = 0 ; i < this.order/2 ; i++) {
                newChild.insert_child(child.children.splice(this.order/2 + 1, 1)[0], i);
            }
        }
        parent.insert_child(newChild, pos);
        parent.insert_data(newChild.data[0]);
        if(!newChild.isLeaf) newChild.data.splice(0,1);
        parent.isLeaf = false;
        if(child.isLeaf) child.right = newChild;
    }

    public getRoot() : Node<T>{
        return this.root;
    }

    public toHierarchy(node: Node<T>) {
        const hierarchy = new NodeHierarchy<T>();
        hierarchy.leaves = new LeafHierarchy<T>();
        for(let i=0; i<node.data.length; i++){
            hierarchy.leaves.pushKey(node.data[i]);
        }
        hierarchy.children = node.children.map((node) => this.toHierarchy(node));
        return hierarchy;
    }
}