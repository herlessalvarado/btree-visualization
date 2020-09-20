export default function viewTree(state = false, action: any) {
    switch (action.type) {
      case 'SET_VIEW_TREE':
        return action.text
      default:
        return state
    }
  }