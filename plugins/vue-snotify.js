import Vue from 'vue'
import snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/dark.css'

const options = {
  toast: {
    timeout: 3000,
    position: SnotifyPosition.rightTop,
    pauseOnHover: false
  }
}

Vue.use(snotify, options)
