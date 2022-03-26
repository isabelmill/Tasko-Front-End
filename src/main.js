import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./styles/styles.scss";
import vClickOutside from 'click-outside-vue3'
import { focusDirective } from './directives'
import datePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const app = createApp(App)


app.directive('clickOutside', vClickOutside.directive)
app.directive('focus', focusDirective)

app.component('datepicker', datePicker);

app.use(router)
app.use(store)



app.mount('#app')