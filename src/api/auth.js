import axios from "axios";
import { server } from "@/constans/constants";

const login = async (userData) => {
  try {
    const { data } = await axios.post(`${server}auth/login`, userData, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });

    return data;
  } catch (e) {
    console.log(e.response.data.message)
    return { error: e, message: e.response.data.message };
  }
};

const registerUser = async (userData) => {
  try {
    const { data } = await axios.post(`${server}auth/register`, userData, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });

    return data;
  } catch (e) {
    return { error: e, message: e.response.data.message };
  }
};

export { login, registerUser };
