import axios from "axios";
const token = JSON.parse(localStorage.getItem("token") || "null");
const headers = {
  Authorization: `${token}`,
  "Content-Type": "application/json",
};

const baseUrl = process.env.REACT_APP_BASEURL;

const getUsers = async (page: number) => {
  return await axios
    .get(`${baseUrl}/user/all?page=${page}&limit=10&order=asc`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getSingleUser = async (userId: string) => {
  return await axios
    .get(`${baseUrl}/user?userId=${userId}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addUser = async (reqBody: any) => {
  return await axios
    .post(`${baseUrl}/user/add`, reqBody, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response.data.message);
      return error.response.data.message;
    });
};

const editUser = async (reqBody: any) => {
  return await axios
    .patch(`${baseUrl}/user`, reqBody, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response.data.message);
      return error.response.data.message;
    });
};

const deleteUser = async (id: string) => {
  return await axios
    .delete(`${baseUrl}/user?id=${id}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response.data.message);
      return error.response.data.message;
    });
};

const loginUser = async (reqBody: any) => {
  return await axios
    .post(`${baseUrl}/admin/signin`, reqBody)
    .then((response) => {
      localStorage.setItem("token", JSON.stringify(response.data?.data?.token));
      localStorage.setItem("user", JSON.stringify(response.data?.data?.user));
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response.data.message);
      return error.response.data.message;
    });
};

const createJob = async (reqBody: any) => {
  return await axios
    .post(`${baseUrl}/job`, reqBody, { headers })
    .then((response) => {
      let jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      jobs.push(response.data?.data);
      localStorage.setItem("jobs", JSON.stringify(jobs));
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response.data.message);
      return error.response.data.message;
    });
};

const getJobById = async (jobId: any) => {
  return await axios
    .get(`${baseUrl}/job?id=${jobId}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response.data.message);
      return error.response.data.message;
    });
};

export const service = {
  getUsers,
  getSingleUser,
  addUser,
  editUser,
  deleteUser,
  loginUser,
  createJob,
  getJobById,
};
