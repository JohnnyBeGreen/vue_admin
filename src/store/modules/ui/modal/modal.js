const state = {
    //Отображает/неотображает модальное окно    
    open: false,
    /** 
     * Компонент с данными, передаваемый в модальное окно 
     * для отображения (может содержать объект данных, включая компонент и т.д.) 
    */
    component: null
};

const getters = {
    open: state => {
      return state.open
    },
    component: state => {
      return state.component
    }
};

const mutations = {
    component: (state, payload) => {
        return state.component = payload
    },
    open: state => {
      return state.open = true
    },
    close: state => {
      return state.open = false
    }
};

const actions = {
  open({commit}, data) {
    commit('open')
    commit('component', data)
  },
  close({commit}) {
    commit('close')
    commit('component', null)
  }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}