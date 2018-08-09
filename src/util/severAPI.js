import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
// 设置默认请求头
// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest'
// };

const cookie = {
  withCredentials: true
}

const get = (url, param, bool = false) => {
  let config = {
    method: "get",
    url: url,
    params: param
  }
  if (!!bool) config['withCredentials'] = true
  return new Promise((resolve, reject) => {
    axios(config).then(Response => {
      resolve(Response)
    }).catch(error => {
      reject(error)
    })
  })
}

const post = (url, data, bool = false) => {
  let config = {
    method: "post",
    url: url,
    params: data
  }
  if (!!bool) config['withCredentials'] = true
  return new Promise((resolve, reject) => {
    axios(config).then(Response => {
      resolve(Response)
    }).catch(error => {
      reject(error)
    })
  })
}

// axios.all([
//   axios.get('/banner'),
//   axios.get('/personalized', { params: { limit: 2 } }),
// ]).then(axios.spread((res1, res2, res3, res4, res5, res6) => {
// }))
export const all = (arr=[]) => {
  return new Promise((resolve, reject) => {
    axios.all(arr).then().catch(error => {
      reject(error)
    })
  })
}

//登录
export const login = param => {
  return get('/login/cellphone', param, true)
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