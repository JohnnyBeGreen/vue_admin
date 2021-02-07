import axios from 'axios'

const state = {
    FILES_COUNT: null
};

const getters = {
    FILES_COUNT: state => {
      return state.FILES_COUNT
    }
};

const mutations = {
    FILES_COUNT: (state, payload) => {
        return state.FILES_COUNT = payload
    }
};

const actions = {
  async files_count({commit}, id) {    
    try {
        const result = await axios({
            method: 'GET',
            url: 'files/count-by-refer/' + id
        })

        commit('FILES_COUNT', result.data.data)
    } catch(e) {
        console.log(e)
    }
  },
  files_count_local({commit}, count) {    
    commit('FILES_COUNT', count)
  }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}