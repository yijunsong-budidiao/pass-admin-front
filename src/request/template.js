import axios from "../http";

// 模板列表
export function templatesList() {
  let res = axios.get("/templates");
  return res;
}
// 创建模板
export function addTemplate(data) {
  let res = axios.post("/templates", data);
  return res;
}
// 环境列表
export function environmentsList() {
  let res = axios.get("/environments");
  return res;
}
