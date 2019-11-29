<template>
  <div id="MainContent">
    <MultiChart
      :data="ChartMultiData"
      name="ChartMulti"
      title="Общий график (объединяющий 4 нижних)"
    />

    <TimeChart
      :data="chartOrderDoneData"
      name="ChartOrderDone"
      title="Количество выполненных заказов в течении часа (с учетом n точек)"
    />

    <TimeChart
      :data="ChartOrderData"
      name="ChartOrder"
      title="Количество заказов в течении часа (без учета n точек)"
    />

    <TimeChart
      :data="ChartOrderCancelData"
      name="ChartOrderCancel"
      title="Количество отмененных заказов в течении часа"
    />

    <TimeChart
      :data="chartOrderDoneDayData"
      name="ChartOrderCancel"
      title="Количество выполненных заказов по дням (с учетом n точек)"
    />
  </div>
</template>

<script>
import DELIVERY_INFO from "../../delivery_info";
import DELIVERY_INFO_ALL from "../../delivery_info_all";
import TimeChart from "Charts/components/TimeChart.vue";
import MultiChart from "Charts/components/MultiChart.vue";
/**
 * Компонент график
 */
export default {
  el: "#MainContent",
  name: "DashboardChart",
  components: {
    TimeChart,
    MultiChart
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
    },
    chartOrderDoneDayData: function() {
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
          countOrders[`${date.getMonth()}-${date.getDay()}`] = countOrders[
            `${date.getMonth()}-${date.getDay()}`
          ]
            ? ++countOrders[`${date.getMonth()}-${date.getDay()}`]
            : 1;
          data.push([
            date.getTime() + 10800000,
            countOrders[`${date.getMonth()}-${date.getDay()}`]
          ]);
        }
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
        },
        chartOrderDoneDayData: {
          title: "Выполненые заказы по дням (с учетом n точек)",
          data: this.chartOrderDoneDayData,
          color: "#f57f17"
        }
      };
    }
  }
};
</script>


