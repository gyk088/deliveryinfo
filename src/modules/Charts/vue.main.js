import App from "Charts/App.vue"
import Vue from "vue"
import Module from "OneDeckCore/module"
/**
 * Class ExampleVue
 * module use Vue and Quasar
 */
export default class ExampleVue extends Module {
  init(path, state) {
    console.log(path, state)

    this.App = new Vue(App)
  }

  destroy() {
    this.VueApp.$destroy()
    document.getElementById("MainContent").innerHTML = ""
  }
}
