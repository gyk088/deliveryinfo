import QuasarConfif from "./quasar.config"
import Charts from "Charts/vue.main"
import Map from "Map/map.module"
import Root from "Root/root.main"


QuasarConfif()

export default {
  apiUrl: "http://localhost:3000/api/",
  modules: {
    root: {
      name: "root",
      hidden: true,
      class: Root,
    },
    main: {
      name: "График",
      hidden: false,
      class: Charts
    },
    Map: {
      name: "Карта",
      hidden: false,
      class: Map
    },
  }
}
