import axiosConfig from "../utils/axios";

export const getUserById = async (id) => {
  console.log(id);
  const response = await axiosConfig.get(`users/${id}.json`);
  const data = await response.data;
  data.id = id;
  data.key = id;
  return data;
};
