import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import { AjaxPlugin as axios } from 'vux'
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
  play_list_data: [],
  barList: 0,
  audiodata: {
    id: '',
    playing: false
  },
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
    state.play_list_data = JSON.parse(JSON.stringify(state.songs));
  },
  changePlaylistfn(state) {
    state.play_list_data = JSON.parse(JSON.stringify(state.songs));
  },
  barListfn(state, {data}) {
    
  },
  playidfn(state, { data }) {
    state.playid = data.id;
  },
  playingfn(state, {data}) {
    //点击播放
    state.audiodata.id = data.id;
    state.audiodata.playing = data.playing;
    console.log(data);
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
  playidURL(state) {
    // return `http://music.163.com/song/media/outer/url?id=${state.audiodata.id}.mp3`;
    if(!!state.audiodata.playing) {
      console.log(11);
      return `http://music.163.com/song/media/outer/url?id=${state.audiodata.id}.mp3`;
    } else {
      return ''
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: true
})