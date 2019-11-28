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
      // data:  [
      //   [1167609600000, 1],
      //   [1167696000000, 3],
      //   [1167782400000, 4],
      //   [1167868800000, 1],
      //   [1167955200000, 3]
      // ],
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

      DELIVERY_INFO.forEach((order, index) => {
        let date = new Date(order.create_time);
        countOrders[`${date.getMonth()}-${date.getDay()}`] = countOrders[`${date.getMonth()}-${date.getDay()}`] ? ++countOrders[`${date.getMonth()}-${date.getDay()}`] : 1;
        data.push([new Date(order.create_time).getTime(), countOrders[`${date.getMonth()}-${date.getDay()}`]])
      })

      data.sort((a, b) => {
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
      })

      console.log(data)

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
        title: {
          text: ""
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
