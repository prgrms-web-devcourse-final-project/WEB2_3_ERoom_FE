import axios from "axios";

export const getProjectList = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/projects");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
