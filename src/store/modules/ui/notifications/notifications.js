const state = {
    NOTIFICATION: null
};

const getters = {
    NOTIFICATION: state => {
        return state.NOTIFICATION
    }
};

const mutations = {
    NOTIFICATION: (state, payload) => {
        return state.NOTIFICATION = payload
    }
};

const actions = {
    notification({commit, dispatch}, payload) {
        dispatch('notificationClear')
        
        let notification = []
        let isError = false
        
        if (payload.error) {
            isError = true
            if (!Array.isArray(payload.error)) {
                notification.push(payload.error.error_message)                
            }
            else {
                payload.error.forEach(error => {
                    notification.push(error.error_message)
                })
            }
        } else {
            notification.push(payload.message)                
        }
        
        const autohide = payload.autohide

        commit('NOTIFICATION', {
            code: payload.code, 
            data: notification, 
            isError: isError, 
            autohide: autohide
        })
    },
    notificationClear({commit}) {
        commit('NOTIFICATION', null)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}