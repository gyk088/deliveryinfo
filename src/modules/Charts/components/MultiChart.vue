<template>
  <div class="chart__body" data-controller="chart">
    <div class="ch" :id="name"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
/**
 * Компонент график
 */
export default {
  name: "MultiChart",
  props: {
    data: Object,
    name: String,
    title: String
  },
  data() {
    return {
      highcharts: undefined
    };
  },
  mounted() {
    let series = [];
    Object.keys(this.data).forEach(key => {
      series.push({
        name: this.data[key].title,
        data: this.data[key].data,
        color: this.data[key].color,
        marker: {
          radius: 4
        }
      });
    });

    Highcharts.setOptions({
      lang: {
        months: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь"
        ],
        weekdays: [
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
          "Воскресенье"
        ],
        shortMonths: [
          "Янв",
          "Фев",
          "Мрт",
          "Апр",
          "Май",
          "Июн",
          "Июл",
          "Авг",
          "Сен",
          "Окт",
          "Нбр",
          "Дек"
        ]
      }
    });

    this.highcharts = Highcharts.chart(this.name, {
      chart: {
        zoomType: "x"
      },
      title: {
        text: this.title
      },
      xAxis: {
        tickInterval: 3600 * 1000,
        type: "datetime"
      },
      yAxis: {
        min: 0,
        gridLineWidth: 0,
        title: {
          text: this.title
        }
      },
      legend: {
        align: "left",
        verticalAlign: "top",
        borderWidth: 0
      },
      series: series
    });
  }
};
</script>

<style scoped>
.chart__body {
  margin-top: 50px;
}
</style>
