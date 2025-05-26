// Mock Authentication Actions
export const mockLogin = () => {
  return {
    type: 'MOCK_LOGIN',
    payload: {
      _id: 'test123',
      name: 'Test User',
      email: 'test@example.com'
    }
  };
};

export const mockLogout = () => {
  return {
    type: 'MOCK_LOGOUT'
  };
}; 