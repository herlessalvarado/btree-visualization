export default function treeType(state = '', action: any) {
    switch (action.type) {
      case 'SET_TREE_TYPE':
        return action.text
      default:
        return state
    }
  }