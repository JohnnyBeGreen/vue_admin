import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {i18n} from './plugins/i18n'

/* Axios setup */
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL_API

if (store.getters['auth/TOKEN']) axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['auth/TOKEN']

axios.defaults.headers.post['Content-Type'] = 'application/json'

//Global components
import TextInput from './components/ui/forms/text-input/TextInput'
import SelectInput from './components/ui/forms/select-input/SelectInput'
import Button from './components/ui/controls/Button'
import ViewTemplate from './components/templates/BaseViewTemplate'
import Notification from './components/ui/notifications/default/BaseNotification'
import Tabs from './components/ui/tabs/BaseTabs'
import TextEditor from './components/ui/text-editor/TextEditor'
import DatePicker from './components/ui/date/Date'

//Mixins
import notification from './mixins/notifications/base-notification'

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(i18n)

    .mixin(notification)
    
    .component('JG-TextInput', TextInput)
    .component('JG-SelectInput', SelectInput)
    .component('JG-Button', Button)
    .component('jg-view-template', ViewTemplate)
    .component('JG-Notification', Notification)
    .component('JG-Tabs', Tabs)
    .component('JG-TextEditor', TextEditor)
    .component('JG-Date', DatePicker)
    
    .mount('#app')

i18n.global.locale = 'ru'
