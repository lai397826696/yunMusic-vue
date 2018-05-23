import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:3333';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const local = (arr = '') => {
	let star = window.localStorage.getItem("userinfo");
	if (!!arr && star != "undefined") return JSON.parse(star)[arr];
	return !!star ? true : false;
}

const state = {
  banners: [], 
  newMusic: [], //最新音乐
  resource: [], //每日推荐
  sole: [], //独家放送
  dj: [], //dj
  songs: [], //推荐音乐
  play_list_data: [], //播放目录
  playdataing: {
    album: {},
    alias: [],
    artists: [],
    id: ''
  }, //正在播放的歌曲
  barList: 0,
  audiodata: {
    id: '',
    playing: false
  },
  song_catalogue: [], //播放目录
  indexcat: 0, //正在播放歌曲的序列号
}

const mutations = {
  indexfn(state, { banners, resource, newMusic, sole, dj }) {
    state.banners = banners;
    newMusic.length = 6;
    state.newMusic = newMusic;
    state.resource = resource;
    state.sole = sole;
    state.dj = dj;
  },
  recommendfn(state, { songs }) {
    state.songs = songs
    state.song_catalogue = JSON.parse(JSON.stringify(state.songs));
  },
  changePlaylistfn(state, {key}) { //播放全部
    state.song_catalogue = JSON.parse(JSON.stringify(state[key]));
    state.audiodata.id=state.song_catalogue[0].id
  },
  playingfn(state, { key, id, playing, type }) { //点击歌曲播放
    //如果播放目录有删减，把当前歌单配置给播放目录
    if (type!=="popup") {
      if(state.song_catalogue.length!=state.songs.length) state.song_catalogue = JSON.parse(JSON.stringify(state.songs));
    }
    state.audiodata.id = id;
    state.audiodata.playing = playing;
  },
  modify_songCatalogue(state, { index, id }) {
    let length = state.song_catalogue.length;
    if(length==1) state.audiodata.id=''
    for (let i = 0; i < length; i++) {
      if (state.song_catalogue[i].id == id && state.audiodata.id == id) {
        if (i == length - 1) {
          state.audiodata.id = state.song_catalogue[0].id
        } else {
          state.audiodata.id = state.song_catalogue[i + 1].id
        }
        break;
      }
    }
    state.song_catalogue.splice(index, 1);
  },
  audiodatafn(state, { playing }) {
    state.audiodata.playing = playing;
  }
}

const actions = {
  indexapi({ commit }) {
    axios.all([
      axios.get('/banner'),
      axios.get('/personalized', { params: { limit: 2 } }),
      axios.get('/recommend/resource', { withCredentials: true }),
      axios.get('/personalized/newsong'),
      axios.get('/personalized/privatecontent'),
      axios.get('/dj/recommend', { withCredentials: true }),
      // axios.get('/program/recommend'),
      // axios.get('/personalized/djprogram'),
      // axios.get('/personal_fm', { withCredentials: true, params: { timestamp: new Date().getTime() } }),
    ]).then(axios.spread((res1, res2, res3, res4, res5, res6) => {
      commit('indexfn', {
        banners: res1.data.banners,
        resource: [].concat(res2.data.result, res3.data.recommend),
        newMusic: res4.data.result,
        sole: res5.data.result.reverse(),
        dj: res6.data.djRadios
      })
    }))
  },
  recommendapi({ commit }) {
    axios.get('/recommend/songs', { withCredentials: true }).then(res => {
      commit('recommendfn',{ songs: res.data.recommend })
    })
  }
}

const getters = {
  playdatasing(state) { //正在播放的歌曲
    if (!!state.audiodata.id && state.song_catalogue.length > 0) {
      return state.song_catalogue.find(v => v.id == state.audiodata.id);
    }
    return state.playdataing;
  },
  playidURL(state, getters) {
    return !!getters.playdatasing.id ? `http://music.163.com/song/media/outer/url?id=${getters.playdatasing.id}.mp3` : '';
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: true
})