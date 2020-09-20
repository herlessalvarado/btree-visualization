export default function maxDegree(state = '', action: any) {
    switch (action.type) {
      case 'SET_MAX_DEGREE':
        return action.text
      default:
        return state
    }
  }