import axiosConfig from "../utils/axios";

export const getUser = async () => {
  const response = await axiosConfig.get("users.json");
  const data = await response.data;
  const users = [];
  console.log(data);
  for (const user in data) {
    const newUser = data[user];
    newUser.id = user;
    newUser.key = user;
    users.push(newUser);
  }
  return users;
};
