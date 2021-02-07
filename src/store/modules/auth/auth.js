const state = {
    TOKEN: localStorage.getItem('token'),
    REFRESH_TOKEN: localStorage.getItem('refresh_token'),
    ID: localStorage.getItem('id'),
    EMAIL: localStorage.getItem('email'),
    ROLE: localStorage.getItem('role'),
    STATUS: localStorage.getItem('status')
};

const getters = {
    TOKEN: state => {
        return state.TOKEN
    },
    REFRESH_TOKEN: state => {
        return state.REFRESH_TOKEN
    },
    ID: state => {
        return state.ID
    },
    EMAIL: state => {
        return state.EMAIL
    },
    ROLE: state => {
        return state.ROLE
    },
    STATUS: state => {
        return state.STATUS
    }
};

export default {
    namespaced: true,
    state,
    getters
}