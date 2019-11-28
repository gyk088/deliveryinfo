<template>
  <div id="MainContent">
      <div class="chart__body" data-controller="chart">
        <div class="ch" id="chart-00"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import DELIVERY_INFO from "../../delivery_info";
/**
 * Компонент график
 */
export default {
  el: "#MainContent",
  name: "DashboardChart",
  data() {
    return {
      highcharts: undefined,
      timeInterval: "all",
      selected: 'fb',
      select: undefined,
      options: [
        {
          label: 'Google',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        }
      ],
    };
  },
  computed: {
    data: function() {
      let data = [];
      let countOrders = {}

      DELIVERY_INFO.sort((a, b) => {
        let aDate = new Date(a.create_time).getTime()
        let bDate = new Date(b.create_time).getTime()

        if (aDate > bDate) return 1;
        if (aDate < bDate) return -1;
        return 0;
      })

      DELIVERY_INFO.forEach((order, index) => {
        if (order.point_number !== "1") {
          let date = new Date(order.create_time);
          countOrders[`${date.getMonth()}-${date.getDay()}-${date.getHours()}`] = countOrders[`${date.getMonth()}-${date.getDay()}-${date.getHours()}`] ? ++countOrders[`${date.getMonth()}-${date.getDay()}-${date.getHours()}`] : 1;
          data.push([date.getTime() + 10800000, countOrders[`${date.getMonth()}-${date.getDay()}-${date.getHours()}`]])
        }
      })

      return data
    }
  },
  methods: {
    /**
     * Выбрать фильтры на гарфике.
     *
     * @param {string} timeInterval - временной интервал.
     */
    filter(timeInterval) {
      let $this = this;
      if (timeInterval) $this.timeInterval = timeInterval;

      $this.$emit("filter", {
        timeInerval: $this.timeInterval,
        select: $this.select
      });

      $this.highcharts.update({
        series: [
          {
            data: $this.data
          }
        ]
      });
    }
  },
  mounted() {
    let $this = this;
    console.log($this.testData)
    $this.select = $this.selected ? $this.selected : $this.options[0].value;
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

    this.highcharts = Highcharts.chart("chart-00", {
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
        type: "datetime"
      },
      yAxis: {
        min: 0,
        title: {
          text: "количество заказов в течении часа"
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
          data: $this.data
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
