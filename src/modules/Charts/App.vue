<template>
  <div id="MainContent">
    <TimeChart
      :data="chartOrderDoneData"
      name="ChartOrderDone"
      title="количество выполненных заказов в течении часа (с учетом n точек)"
    />
    <div
      class="text-h6 text-center"
    >количество выполненных заказов в течении часа (с учетом n точек)</div>
    <TimeChart
      :data="ChartOrderData"
      name="ChartOrder"
      title="количество заказов в течении часа (без учета n точек)"
    />
    <div class="text-h6 text-center">количество заказов в течении часа (без учета n точек)</div>
    <TimeChart
      :data="ChartOrderCancelData"
      name="ChartOrderCancel"
      title="количество отмененыых заказов в течении часа (без учета n точек)"
    />
    <div
      class="text-h6 text-center"
    >количество отмененных заказов в течении часа (без учета n точек)</div>
  </div>
</template>

<script>
import DELIVERY_INFO from "../../delivery_info";
import DELIVERY_INFO_ALL from "../../delivery_info_all";
import TimeChart from "Charts/components/TimeChart.vue";
/**
 * Компонент график
 */
export default {
  el: "#MainContent",
  name: "DashboardChart",
  components: {
    TimeChart
  },
  computed: {
    chartOrderDoneData: function() {
      let data = [];
      let countOrders = {};

      DELIVERY_INFO.sort((a, b) => {
        let aDate = new Date(a.create_time).getTime();
        let bDate = new Date(b.create_time).getTime();

        if (aDate > bDate) return 1;
        if (aDate < bDate) return -1;
        return 0;
      });

      DELIVERY_INFO.forEach((order, index) => {
        if (order.point_number !== "1") {
          let date = new Date(order.create_time);
          countOrders[
            `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
          ] = countOrders[
            `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
          ]
            ? ++countOrders[
                `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
              ]
            : 1;
          data.push([
            date.getTime() + 10800000,
            countOrders[
              `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
            ]
          ]);
        }
      });

      return data;
    },
    ChartOrderCancelData: function() {
      let data = [];
      let countOrders = {};

      DELIVERY_INFO_ALL.sort((a, b) => {
        let aDate = new Date(a.create_time).getTime();
        let bDate = new Date(b.create_time).getTime();

        if (aDate > bDate) return 1;
        if (aDate < bDate) return -1;
        return 0;
      });

      DELIVERY_INFO_ALL.forEach((order, index) => {
        if (order.point_number === "1" && order.status === "canceled") {
          let date = new Date(order.create_time);
          countOrders[
            `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
          ] = countOrders[
            `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
          ]
            ? ++countOrders[
                `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
              ]
            : 1;
          data.push([
            date.getTime() + 10800000,
            countOrders[
              `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
            ]
          ]);
        }
      });
      return data;
    },
    ChartOrderData: function() {
      let data = [];
      let countOrders = {};

      DELIVERY_INFO.sort((a, b) => {
        let aDate = new Date(a.create_time).getTime();
        let bDate = new Date(b.create_time).getTime();

        if (aDate > bDate) return 1;
        if (aDate < bDate) return -1;
        return 0;
      });

      DELIVERY_INFO.forEach((order, index) => {
        if (order.point_number === "1") {
          let date = new Date(order.create_time);
          countOrders[
            `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
          ] = countOrders[
            `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
          ]
            ? ++countOrders[
                `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
              ]
            : 1;
          data.push([
            date.getTime() + 10800000,
            countOrders[
              `${date.getMonth()}-${date.getDay()}-${date.getHours()}`
            ]
          ]);
        }
      });
      return data;
    }
  }
};
</script>


