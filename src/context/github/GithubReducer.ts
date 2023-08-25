interface StateType {
  users: any[];
  loading: boolean;
}

interface ActionType {
  type: string;
  payload?: any;
}

const githubReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
