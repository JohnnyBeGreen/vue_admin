const state = {
    NEWS_COVER: 1,
    NEWS_GALLERY: 2,
    PROFILE_AVATAR: 3,
    DOCUMENT: 6
};

const getters = {
    NEWS_COVER: state => {
        return state.NEWS_COVER
    },
    NEWS_GALLERY: state => {
        return state.NEWS_GALLERY
    },
    PROFILE_AVATAR: state => {
        return state.PROFILE_AVATAR
    },
    DOCUMENT: state => {
        return state.DOCUMENT
    }
};

export default {
    namespaced: true,
    state,
    getters
}