<template>
  <div id="MainContent">
    <MultiChart :data="ChartMultiData" name="ChartMulti" title="Количество заказов по часам" />
    <ColumnChart :data="chartOrderDoneDayData" name="ChartDay" title="Количество заказов по дням" />
  </div>
</template>

<script>
import DELIVERY_INFO_ALL from "../../delivery_info_all.js";
import ColumnChart from "Charts/components/ColumnChart.vue";
import MultiChart from "Charts/components/MultiChart.vue";
/**
 * Компонент график
 */
export default {
  el: "#MainContent",
  name: "DashboardChart",
  components: {
    ColumnChart,
    MultiChart
  },
  computed: {
    chartOrderDoneData: function() {
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
        if (order.point_number !== "1" && order.status === "done") {
          let date = new Date(order.create_time);
          countOrders[
            `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
          ] = countOrders[
            `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
          ]
            ? ++countOrders[
                `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
              ]
            : 1;
          data.push([
            date.getTime() + 10800000,
            countOrders[
              `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
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
            `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
          ] = countOrders[
            `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
          ]
            ? ++countOrders[
                `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
              ]
            : 1;
          data.push([
            date.getTime() + 10800000,
            countOrders[
              `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
            ]
          ]);
        }
      });
      return data;
    },
    ChartOrderData: function() {
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
        if (order.point_number === "1" && order.status === "done") {
          let date = new Date(order.create_time);
          countOrders[
            `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
          ] = countOrders[
            `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
          ]
            ? ++countOrders[
                `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
              ]
            : 1;
          data.push([
            date.getTime() + 10800000,
            countOrders[
              `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`
            ]
          ]);
        }
      });
      return data;
    },
    chartOrderDoneDayData: function() {
      let data = [];
      let countOrders = {};

      DELIVERY_INFO_ALL.sort((a, b) => {
        let aDate = new Date(a.create_time).getTime();
        let bDate = new Date(b.create_time).getTime();

        if (aDate > bDate) return 1;
        if (aDate < bDate) return -1;
        return 0;
      });

      let timeToPush;
      DELIVERY_INFO_ALL.forEach((order, index) => {
        if (order.point_number === "1" && order.status === "done") {
          let date = new Date(order.create_time);
          let dayDate = new Date(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          );
          countOrders[dayDate.getTime()] = countOrders[dayDate.getTime()]
            ? ++countOrders[dayDate.getTime()]
            : 1;
        }
      });

      Object.keys(countOrders).forEach(key => {
        data.push([parseInt(key), countOrders[key]]);
      });

      return data;
    },
    ChartMultiData: function() {
      return {
        chartOrderCancelData: {
          data: this.ChartOrderCancelData,
          title: "Отмененные заказы по часам",
          color: "#b71c1c"
        },
        chartOrderData: {
          title: "Выполненые заказы по часам (без n точек)",
          data: this.ChartOrderData,
          color: "#1b5e20"
        },
        chartOrderDoneData: {
          title: "Выполненые заказы по часам (с учетом n точек)",
          data: this.chartOrderDoneData,
          color: "#2979ff"
        }
      };
    }
  }
};
</script>


