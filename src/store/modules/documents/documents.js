const state = {
    DOCUMENT: null, //Just saved file item
    DOCUMENT_ID: null, //id of a just saved file item
    DOCUMENT_PATH: null
};

const getters = {
    DOCUMENT: state => {
      return state.DOCUMENT
    },
    DOCUMENT_ID: state => {
      return state.DOCUMENT_ID
    },
    DOCUMENT_PATH: state => {
      return state.DOCUMENT_PATH
    }
};

const mutations = {
    DOCUMENT: (state, payload) => {
        return state.DOCUMENT = payload
    },
    DOCUMENT_ID: (state, payload) => {
        return state.DOCUMENT_ID = payload
    },
    DOCUMENT_PATH: (state, payload) => {
        return state.DOCUMENT_PATH = payload
    }
};

const actions = {
  document({commit}, data) {
    commit('DOCUMENT', data)
  },
  document_id({commit}, data) {
    commit('DOCUMENT_ID', data)
  },
  document_path({commit}, data) {
    commit('DOCUMENT_PATH', data)
  }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}