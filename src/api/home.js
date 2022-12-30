import request from '../utils/request'

//轮播
export function getSwiper() {
  return request({
    url: "/home/swiper",
    method: "get",
  });
}

//租房小组
export function getGroups(params) {
  return request({
    url: "/home/groups",
    method: "get",
    params
  });
}

//最新资讯
export function getNews(params) {
  return request({
    url: "/home/news",
    method: "get",
    params
  });
}