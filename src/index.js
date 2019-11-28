import "Images"
import Config from "./conf"

document.addEventListener("DOMContentLoaded", () => {
  new Config.modules["root"].class(Config)
})