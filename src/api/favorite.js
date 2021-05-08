import { request } from "./api.js";
import Cookie from "js-cookie";

//点赞
export let addFavorite = item => {
  console.log("=============");
  var slug = item.slug;
  //   console.log(Cookie.get("auth"));
  //  定义一个请求拦截
  request.interceptors.request.use(
    function(config) {
      //携带token   保存到请求头
      config.headers.Authorization = "Token " + Cookie.get("auth");
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  //发送点赞的请求
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`
  });
};

//取消点赞
export let deleFavorite = item => {
  //     //发送取消点赞的请求
  //   console.log("取消点赞=============");
  var slug = item.slug;
  //  定义一个请求拦截
  request.interceptors.request.use(
    function(config) {
      //携带token   保存到请求头
      config.headers.Authorization = "Token " + Cookie.get("auth");
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  //发送点赞的请求
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`
  });
};
