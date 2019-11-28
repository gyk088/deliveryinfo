<template>
  <div id="MainContent">
    <div id="ToolBar">
      <div class="row" style="z-index: 10; position: relative">
        <div class="col-1">
          <div class="q-pa-md">
            <div class="q-mb-sm">
              <q-badge color="teal">От: {{ dateFrom }}</q-badge>
            </div>

            <q-btn icon="event" round color="primary">
              <q-popup-proxy
                @before-show="updateProxyFrom"
                transition-show="scale"
                transition-hide="scale"
                ref="qDateProxyFrom"
              >
                <q-date v-model="proxyDateFrom" @input="saveFrom" />
              </q-popup-proxy>
            </q-btn>
          </div>
        </div>

        <div class="col-1">
          <div class="q-pa-md">
            <div class="q-mb-sm">
              <q-badge color="teal">До: {{ dateTo }}</q-badge>
            </div>

            <q-btn icon="event" round color="primary">
              <q-popup-proxy
                @before-show="updateProxyTo"
                transition-show="scale"
                transition-hide="scale"
                ref="qDateProxyTo"
              >
                <q-date v-model="proxyDateTo" @input="saveTo" />
              </q-popup-proxy>
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <div id="DeliveryMap"></div>
  </div>
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
      dateFrom: null,
      proxyDateFrom: null,
      dateTo: null,
      proxyDateTo: null
    };
  },
  computed: {
    deliveryInfo: function() {
      if (this.dateFrom && this.dateTo) {
        let dateFrom = new Date(this.dateFrom).getTime();
        let dateTo = new Date(this.dateTo).getTime();
        let deliveryInfo = DELIVERY_INFO.filter(order => {
          let ctime = new Date(order.create_time).getTime();
          if (ctime < dateTo && ctime > dateFrom) {
            console.log(order);
            return order;
          }
        });
        console.log(deliveryInfo);
        return deliveryInfo;
      } else {
        return [];
      }
    }
  },
  watch: {
    dateTo() {
      this.ordersToMap();
    },
    dateFrom() {
      this.ordersToMap();
    }
  },
  methods: {
    updateProxyTo() {
      this.proxyDateTo = this.dateTo;
    },
    updateProxyFrom() {
      this.proxyDateFrom = this.dateFrom;
    },
    saveFrom() {
      this.dateFrom = this.proxyDateFrom;
      this.$refs.qDateProxyFrom.hide();
    },
    saveTo() {
      this.dateTo = this.proxyDateTo;
      this.$refs.qDateProxyTo.hide();
    },
    /**
     * Инициализация краты
     * @param {Object} center - объект типа google.maps.LatLng, центр карты
     */
    initMap(center) {
      this.map = new google.maps.Map(document.getElementById("DeliveryMap"), {
        zoom: 11,
        center: center,
        mapTypeControl: false
      });
      this.bounds = new google.maps.LatLngBounds();
      this.bounds.extend(center);
    },
    // pinSymbol(color) {
    //   return {
    //     path:
    //       "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0",
    //     fillColor: color,
    //     fillOpacity: 1,
    //     strokeColor: "#000",
    //     strokeWeight: 2,
    //     scale: 1
    //   };
    // },
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
      if (this.deliveryInfo.length) this.map.fitBounds(this.bounds);
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
  mounted() {
    // инициализируем карту
    this.initMap(new google.maps.LatLng(45.03547, 38.975313));
  }
};
</script>

<style lang="scss" scoped>
#MainContent {
  width: 100%;
  height: 100%;
}
#DeliveryMap {
  width: 100vw;
  height: 95vh;
}
#ToolBar {
  width: 100vw;
  height: 0vh;
}
</style>
