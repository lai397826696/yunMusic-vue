import axios from 'axios';
import store from '../store';
import router from '../router/index';
import { AjaxPlugin } from 'vux'

// 环境的切换
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'http://api.123dailu.com/';
}

console.log(axios.defaults.baseURL);


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // const token = store.state.token;        
    // token && (config.headers.Authorization = token);        
    // return config;
  if (!document.cookie) {
    router.push("/login");
    return false;
  }
  return config;
}, function (error) {
  return Promise.reject(error)
})

// // 返回结果拦截
// axios.interceptors.response.use(function (response) {
//   if(response.hasOwnProperty("data") && typeof response.data == "object"){
//       if(response.data.code === 998){// 登录超时 跳转至登录页面
//           router.push('/login')
//           return Promise.reject(response)
//       }else if (response.data.code === 1000) {// 成功
//         return Promise.resolve(response)
//       }
//   } else {
//     return Promise.resolve(response)
//   }
// }, function (error) {
//   // 请求取消 不弹出
//   if(error.message != '0000'){
//     iView.Message.error('请求失败')
//   }
//   // 请求错误时做些事
//   return Promise.reject(error)
// })


const get = (url, param, bool = false) => {
  let config = {
    method: "get",
    url: url,
    params: param
  }
  if (!!bool) config['withCredentials'] = true
  return axios(config);
}

const post = (url, param, bool = false) => {
  let config = {
    method: "get",
    url: url,
    data: param
  }
  if (!!bool) config['withCredentials'] = true
  return axios(config);
}

//默认导出axios
export default axios;
//登录
export const login = param => {
  return post('/login/cellphone', param, true)
}
//轮播图
export const banner = param => {
  return get('/banner', param)
}

export const songs = param => {
  return get('/recommend/songs', param, true)
}

export const personalized = param => {
  return get('/personalized', param)
}

export const newsong = param => {
  return get('/personalized/newsong', param)
}

export const privatecontent = param => {
  return get('/personalized/privatecontent', param)
}

export const resource = param => {
  return get('/recommend/resource', param, true)
}

export const recommend = param => {
  return get('/dj/recommend', param)
}

//歌曲评论 param=>id, ..limit：评论数,默认=20，offset：页数
export const musicComment = param => {
  return get('/comment/music', param, true)
}
//喜欢音乐 param=>id, ..like
export const like = param => {
  return get('/like', param)
}
// 评论点赞
// id: 资源id
// cid: 评论id
// t: 是否点赞: 1是 / 0否
// type: 资源类型 0: 歌曲, 1: mv, 2: 歌单, 3: 专辑, 4: 电台
export const commentLiked = param => {
  return get('/comment/like', param, true)
}
//用户详情，uid：用户id
export const userDetail = param => {
  return get('/user/detail', param)
}
//用户歌单 uid: 用户id
export const userPlaylist = param => {
  return get('/user/playlist', param)
}
//歌单详情  id:歌单id， 可选参数  s：歌单最近的s个收藏者
export const playlistDetail = param => {
  return get('/playlist/detail', param)
}
//私人fm
export const personal_fm = param => {
  return get('/personal_fm', param, true)
}
//私人fm移至垃圾桶 id:歌曲id
export const fm_trash = param => {
  return get('/fm_trash', param, true)
}

//精品歌单
// 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 20
export const highquality = param => {
  return get('/top/playlist/highquality', param)
}

//歌单 ( 网友精选碟 )
// order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
export const playlist = param => {
  return get('/top/playlist', param)
}
// 歌单分类
export const catlist = param => {
  return get('/playlist/catlist', param)
}
// 热门歌单分类
export const hotcatlist = param => {
  return get('/playlist/hot', param)
}
// 排行榜 idx: 对象 key, 对应以下排行榜
// "0": 云音乐新歌榜, "1": 云音乐热歌榜, "2": 网易原创歌曲榜, "3": 云音乐飙升榜, "4": 云音乐电音榜, "5": UK排行榜周榜, "6": 美国Billboard周榜, "7": KTV嗨榜, "8": iTunes榜, "9": Hit FM Top榜, "10": 日本Oricon周榜, "11": 韩国Melon排行榜周榜, "12": 韩国Mnet排行榜周榜,"13": 韩国Melon原声周榜,"14": 中国TOP排行榜(港台榜),"15": 中国TOP排行榜(内地榜), "16": 香港电台中文歌曲龙虎榜, "17": 华语金曲榜, "18": 中国嘻哈榜, "19": 法国 NRJ EuroHot 30周榜, "20": 台湾Hito排行榜, "21": Beatport全球电子舞曲榜, "22": 云音乐ACG音乐榜, "23": 云音乐嘻哈榜
export const toplist = param => {
  return get('/top/list', param)
}

// 获取排行榜中的歌手榜
export const artist = param => {
  return get('/toplist/artist', param)
}

//歌词 id
export const lyric = param => {
  return get('/lyric', param)
}