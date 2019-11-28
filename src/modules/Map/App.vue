<template>
  <div id="MainContent"></div>
</template>

<script>
import "Images";
import DELIVERY_INFO from "../../delivery_info";

/**
 * Модуль карта с водитлеями и с заказами
 * @module Module/Map/App
 *
 * @vue-data {Object} adminSettings - настройки администратора
 * @vue-data {Object} map - объект карты google.maps
 * @vue-data {Object} bounds - объект для центрирования google.maps
 * @vue-data {Array} driversMarkers - массив с объектами маркеров водителей
 * @vue-data {Array} orderMarkers - массив с объектами маркеров закзаов
 * @vue-data {number} driverTimerId - id таймера для получения данных о водителях
 * @vue-data {number} orderTimerId - id таймера для получения данных о заказах
 */
export default {
  el: "#MainContent",
  name: "FullMap",
  data() {
    return {
      orderMarkers: [],
      driversMarkers: [],
      adminSettings: undefined,
      map: undefined,
      bounds: undefined,
      deliveryInfo: DELIVERY_INFO
    };
  },
  methods: {
    /**
     * Инициализация краты
     * @param {Object} center - объект типа google.maps.LatLng, центр карты
     */
    initMap(center) {
      this.map = new google.maps.Map(document.getElementById("MainContent"), {
        zoom: 11,
        center: center
      });
      this.bounds = new google.maps.LatLngBounds();
      this.bounds.extend(center);
    },
    /**
     *  Метод получает заказы из бэкенда, и помещает их на крату
     */
    async ordersToMap() {
      // удаляем все заказы на карте
      this.orderMarkers.forEach(marker => {
        marker.setMap(null);
      });
      // чистим массив с маркерами заказов
      this.orderMarkers = [];

      this.deliveryInfo.forEach(order => {
        // создаем маркер
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(order.latitude, order.longitude),
          title: order.address,
          map: this.map
        });

        // помещаем маркер в массив маркеров
        this.orderMarkers.push(marker);
        // помещаем координаты маркера для центрироавния карты
        this.bounds.extend(marker.position);
        // вешам событие на маркер
        marker.addListener("click", () => this.showOrderInfo(order, marker));
      });
      // центрируем карту
      this.map.fitBounds(this.bounds);
    },
    /**
     *  Показать данные заказа
     */
    showOrderInfo(order, marker) {
      // если есть открытые окна - закрываем их
      if (this.infowindow) this.infowindow.close();

      // создаем окно с данными о заказе
      this.infowindow = new google.maps.InfoWindow({
        content: `<p>Заказ № ${order.id_delivery}</p>
        <p>Компания: ${order.admin_name} </p>
          <p>Дата: ${order.create_time}</p>`
      });

      // открываем окно
      this.infowindow.open(this.map, marker);
    }
  },
  async mounted() {
    // инициализируем карту
    this.initMap(new google.maps.LatLng(45.03547, 38.975313));
    this.ordersToMap();
  }
};
</script>

<style lang="scss" scoped>
#MainContent {
  width: 100%;
  height: 100%;
}
</style>
