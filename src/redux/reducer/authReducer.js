// Auth Reducer for Mock Authentication
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOCK_LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case 'MOCK_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer; 