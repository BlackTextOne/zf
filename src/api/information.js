import request from '../utils/request'

//资讯
export function getInfoNews(params) {
  return request({
    url: "/home/news",
    method: "get",
    params
  });
}