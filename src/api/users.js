import axios from "axios";
import { server } from "@/constans/constants";
import { getCredentials } from "@/utils/localStorage";

const getUsers = async () => {
  try {
    const id = getCredentials().id
    const { data } = await axios.get(`${server}users/?userid=${id}`, {
      headers: { "Access-Control-Allow-Origin": "https://user-test-back.onrender.com/" },
    });

    return data.users;
  } catch (e) {
    return e;
  }
};

const blockUser = async (usersId) => {
  try {
    const id = getCredentials().id
    const postData = {usersId: usersId}
    await axios.post(`${server}users/block/?userid=${id}`, postData, {
      headers: { "Access-Control-Allow-Origin": "https://user-test-back.onrender.com/" },
    });

    return "Users blocked";
  } catch (e) {
    console.log(e);
    return e;
  }
};

const unBlockUser = async (usersId) => {
  try {
    const id = getCredentials().id
    const postData = {usersId: usersId}
    await axios.post(`${server}users/unblock/?userid=${id}`, postData, {
      headers: { "Access-Control-Allow-Origin": "https://user-test-back.onrender.com/" },
    });

    return "Users unblocked";
  } catch (e) {
    console.log(e);
    return e;
  }
};

const deleteUser = async (usersId) => {
  try {
    const id = getCredentials().id
    const postData = {usersId: usersId}
    await axios.post(`${server}users/delete/?userid=${id}`, postData, {
      headers: { "Access-Control-Allow-Origin": "https://user-test-back.onrender.com/" },
    });

    return "Users deleted";
  } catch (e) {
    console.log(e);
    return e;
  }
};

export {getUsers, blockUser, unBlockUser, deleteUser}