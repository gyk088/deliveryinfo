import Module from "OneDeckCore/module"
import App from "Map/App.vue"
import Vue from "vue"


/**
 * Модуль карта
 * @module Module/Map
 */
export default class Auth extends Module {
  init(path, state) {
    this.App = new Vue(App)

    this.eventHandler()
  }

  /**
   * Уничтожаем объект моудля и чистим интервалы
   */
  destroy() {
    this.App.$destroy()
    document.getElementById("MainContent").innerHTML = ""
  }
}
