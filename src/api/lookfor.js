import request from '../utils/request'

//轮播
export function lkHouses() {
  return request({
    url: "/houses",
    method: "get",
  });
}