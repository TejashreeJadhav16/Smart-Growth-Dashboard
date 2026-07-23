export const useAuth = () => {
  const user = useState("user", () => null);

  const login = (data) => {
    user.value = data;
  };

  const logout = () => {
    user.value = null;
  };

  return { user, login, logout };
};