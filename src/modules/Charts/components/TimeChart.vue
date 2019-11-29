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
  name: "TimeChart",
  props: {
    data: Array,
    name: String,
    title: String
  },
  data() {
    return {
      highcharts: undefined
    };
  },
  mounted() {
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
        text: ""
      },
      subtitle: {
        text: ""
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
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [
                1,
                Highcharts.Color(Highcharts.getOptions().colors[0])
                  .setOpacity(0)
                  .get("rgba")
              ]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },
      series: [
        {
          type: "area",
          name: "Данные:",
          data: this.data,
          marker: {
            radius: 4
          }
        }
      ]
    });
  }
};
</script>

<style scoped>
.chart__body {
  margin-top: 50px;
}
</style>
