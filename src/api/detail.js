import request from '../utils/request'

//详情
export function getHouses(id) {
  return request({
    url: `/houses/${id}`,
    method: "get",
  });
}

//猜你喜欢
export function getLike(params) {
  return request({
    url: "/home/news",
    method: "get",
    params
  });
}