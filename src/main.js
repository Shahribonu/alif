import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";

import 'vuetify/styles'
import "vue-toastification/dist/index.css";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

import App from './App.vue'
import router from './router'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Toast);


app.mount('#app')
