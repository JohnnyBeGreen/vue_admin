const state = {
    NEWS_ID: null //id of a just saved news item
};

const getters = {
    NEWS_ID: state => {
      return state.NEWS_ID
    }
};

const mutations = {
    NEWS_ID: (state, payload) => {
        return state.NEWS_ID = payload
    }
};

const actions = {
  news_id({commit}, data) {
    commit('NEWS_ID', data)
  }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}