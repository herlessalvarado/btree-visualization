export default function dataType(state = '', action: any) {
    switch (action.type) {
      case 'SET_DATA_TYPE':
        return action.text
      default:
        return state
    }
  }