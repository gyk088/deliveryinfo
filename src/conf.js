import QuasarConfif from "./quasar.config"
import VueApp from "ExampleVue/vue.main"
import Map from "Map/map.module"
import ExampleRootVue from "ExampleRootVue/root.main"


QuasarConfif()

export default {
  apiUrl: "http://localhost:3000/api/",
  modules: {
    root: {
      name: "root",
      hidden: true,
      class: ExampleRootVue,
    },
    main: {
      name: "График",
      hidden: false,
      class: Map
    },
    Map: {
      name: "Крата",
      hidden: false,
      class: VueApp
    },
  }
}
