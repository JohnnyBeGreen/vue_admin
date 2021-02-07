import { createStore } from 'vuex'

//MODULES
//Auth
import auth from './modules/auth/auth'
import news from './modules/news/news'
import gallery from './modules/gallery/gallery'
import documents from './modules/documents/documents'
//UI
import notifications from './modules/ui/notifications/notifications'
import modal from './modules/ui/modal/modal'
//Libs
import file_types from './libs/file-types/file-types'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    news,
    gallery,
    documents,
    notifications,
    modal,
    file_types
  }
})
