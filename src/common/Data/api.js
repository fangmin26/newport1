
import axios from "axios";
export default axios.create({ baseURL: "http://localhost:3000/" });
export const common = {
  baseURL: "http://localhost:3000/",
};