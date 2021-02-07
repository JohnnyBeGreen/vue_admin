import { createApp } from 'vue'
import App from '../App'
const app = createApp(App)

//Forms
import TextInput from '../components/ui/forms/text-input/TextInput'

app.component('JG-TextInput', TextInput)