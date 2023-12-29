import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};
export const signupUser = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const res = await axios.post("/user/signup", {
    name,
    email,
    password,
    confirmPassword,
  });
  if (res.status !== 200) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};
export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chats/new", {
    message,
  });

  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};
export const getAllChats = async () => {
  const res = await axios.get("/chats/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to get all chat");
  }
  const data = await res.data;
  return data;
};

export const deleteAllChats = async () => {
  const res = await axios.delete("/chats/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete all chat");
  }
  const data = await res.data;
  return data;
};

export const passwordChange = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const res = await axios.post("/user/change-password", {
    email,
    oldPassword,
    newPassword,
  });
  if (res.status !== 200) {
    throw new Error("Unable to change Password");
  }
  const data = await res.data;
  return data;
};

export const googleSignupUser = async (
  name: string,
  email: string,
  jti: string
) => {
  const res = await axios.post("/user/google-signup", {
    name,
    email,
    jti,
  });
  if (res.status !== 200) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const googleLoginUser = async (
  name: string,
  email: string,
  jti: string
) => {
  const res = await axios.post("/user/google-login", {
    name,
    email,
    jti,
  });
  if (res.status !== 200) {
    throw new Error("Unable to Login");
  }
  const data = await res.data;
  return data;
};


