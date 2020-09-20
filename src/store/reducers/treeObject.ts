import { BPlusTree } from '../../structures/BPlusTree/BPlusTree';
import { BTree } from '../../structures/BTree/BTree';

type alias = BTree<number | string> | BPlusTree<number | string> | null

export default function treeObject(state: alias = null, action: any) {
    switch (action.type) {
        case 'CREATE_BTREE_OBJECT':
            if(action.dataType === 'number'){
                return new BTree<number>(parseInt(action.maxDegree));
            }
            if(action.dataType === 'string'){
                return new BTree<string>(parseInt(action.maxDegree));
            }
        case 'CREATE_BPLUSTREE_OBJECT':
            if(action.dataType === 'number'){
                return new BPlusTree<number>(parseInt(action.maxDegree));
            }
            if(action.dataType === 'string'){
                return new BPlusTree<string>(parseInt(action.maxDegree));
            }
        case 'INSERT_TREE':
            state!.insert(action.value);
            return state;
        default:
            return state
    }
  }