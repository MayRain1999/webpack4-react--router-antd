import { INCREMENT, DECREMENT, RESET } from '../actions/counter';

const initState = {
  count: 0,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        count: state.count - 1,
      };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
}
