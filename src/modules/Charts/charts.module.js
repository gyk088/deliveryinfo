import App from "Charts/App.vue"
import Vue from "vue"
import Module from "OneDeckCore/module"

export default class ExampleVue extends Module {
  init() {
    this.App = new Vue(App)
  }

  destroy() {
    this.App.$destroy()
    document.getElementById("MainContent").innerHTML = ""
  }
}
