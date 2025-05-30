export const setLS = ({ token, userID, email }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userID", userID);
  localStorage.setItem("email", email);
};

export const getLS = () => {
  const token = localStorage.getItem("token");
  const userID = localStorage.getItem("userID");
  const email = localStorage.getItem("email");

  return { token, userID, email };
};
