export const setLS = ({ token, userID, email, username }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userID", userID);
  localStorage.setItem("email", email);
  localStorage.setItem("username", username);
};

export const getLS = () => {
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  return { token, userID, email, username };
};
