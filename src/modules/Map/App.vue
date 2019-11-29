<template>
  <div id="MainContent">
    <div id="ToolBar">
      <div class="row">
        <div class="col-1">
          <div class="q-pa-md">
            <div class="q-mb-sm" style="z-index: 10; position: relative">
              <q-badge color="teal">От: {{ dateFrom }}</q-badge>
            </div>

            <q-btn icon="event" round color="primary" style="z-index: 10; position: relative">
              <q-popup-proxy
                @before-show="updateProxyFrom"
                transition-show="scale"
                transition-hide="scale"
                ref="qDateProxyFrom"
              >
                <div class="flex_row">
                  <div class="fex_col">
                    <q-date v-model="proxyDateFrom" mask="YYYY-MM-DD HH:mm" />
                  </div>
                  <div class="fex_col">
                    <q-time v-model="proxyDateFrom" @input="saveFrom" mask="YYYY-MM-DD HH:mm" />
                  </div>
                </div>
              </q-popup-proxy>
            </q-btn>
          </div>
        </div>

        <div class="col-1">
          <div class="q-pa-md">
            <div class="q-mb-sm" style="z-index: 10; position: relative">
              <q-badge color="teal">До: {{ dateTo }}</q-badge>
            </div>

            <q-btn icon="event" round color="primary" style="z-index: 10; position: relative">
              <q-popup-proxy
                @before-show="updateProxyTo"
                transition-show="scale"
                transition-hide="scale"
                ref="qDateProxyTo"
              >
                <div class="flex_row">
                  <div class="fex_col">
                    <q-date v-model="proxyDateTo" mask="YYYY-MM-DD HH:mm" />
                  </div>
                  <div class="fex_col">
                    <q-time v-model="proxyDateTo" @input="saveTo" mask="YYYY-MM-DD HH:mm" />
                  </div>
                </div>
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
      console.log(this.dateFrom);
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
      this.ordersToMap();
    },
    saveTo() {
      this.dateTo = this.proxyDateTo;
      this.$refs.qDateProxyTo.hide();
      this.ordersToMap();
    },
    /**
     * Инициализация краты
     * @param {Object} center - объект типа google.maps.LatLng, центр карты
     */
    initMap(center) {
      this.map = new google.maps.Map(document.getElementById("DeliveryMap"), {
        zoom: 11,
        center: center,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
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
        if (order.point_number !== "1") {
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
        }
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
.flex_row {
  display: flex;
  flex-direction: row;
}
.q-time {
  box-shadow: none;
}
.q-date {
  box-shadow: none;
}
#MainContent {
  width: 100%;
  height: 93vh;
}
#DeliveryMap {
  margin-top: 5px;
  width: 100vw;
  height: 100%;
}
#ToolBar {
  width: 100vw;
  height: 0vh;
}
.q-toolbar {
  min-height: 8vh;
}
</style>
