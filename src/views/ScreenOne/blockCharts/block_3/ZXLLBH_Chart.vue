<template>
  <div class="full-width-height g-pt--10">
    <div class="chart-header">
      <h4 class="chart-header-title">最小流量变化曲线</h4>
      <div class="chart-header__tool">
        <!-- <el-select v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select> -->
      </div>
    </div>
    <div class="chart-body">
      <hd-chart auto-resize :options="chartOptions"></hd-chart>
    </div>
  </div>
</template>

<script>
import hdChart from "../../../../components/chart";
import api from "../../../../api";

export default {
  name: "ZXLLBH_Chart",
  data() {
    return {
      chartOptions: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: ""
    };
  },
  components: {
    "hd-chart": hdChart
  },
  methods: {
    refleshData(station_id) {
      let tmp_chart_options = this.getChartTemplate();
      let that = this;

      api._zxllbh(station_id).then(res => {
        console.log(res);
        tmp_chart_options.xAxis.data = res.xAris_data;
        tmp_chart_options.series[1].data = res.ssll_data;
        tmp_chart_options.series[0].data = res.yjzx_data;
        that.chartOptions = tmp_chart_options;
      });
    },

    getChartTemplate() {
      let Template = {
        legend: {
          left: "15%",
          textStyle: {
            color: "#d7e7f0"
          },
          data: [
            {
              name: "最小流量",
              icon:
                "path://M49.7,47.8 C31.8,47.8 17.3,33.3 17.3,15.4 C17.3,10.6 18.3,6.1 20.2,2.1 C8.9,7.2 1.1,18.5 1.1,31.7 C1.1,49.6 15.6,64.1 33.5,64.1 C46.7,64.1 58,56.3 63.1,45 C58.9,46.8 54.4,47.8 49.7,47.8 L49.7,47.8 Z"
            },
            {
              name: "异常",
              icon:
                "path://M49.7,47.8 C31.8,47.8 17.3,33.3 17.3,15.4 C17.3,10.6 18.3,6.1 20.2,2.1 C8.9,7.2 1.1,18.5 1.1,31.7 C1.1,49.6 15.6,64.1 33.5,64.1 C46.7,64.1 58,56.3 63.1,45 C58.9,46.8 54.4,47.8 49.7,47.8 L49.7,47.8 Z"
            }
          ]
        },
        grid: {
          left: 50,
          top: 70
        },
        xAxis: {
          type: "value",
          data: [
            1548143910,
            1548143915,
            1548143920,
            1548143925,
            15481430,
            1548143935
          ],
          axisLine: {
            show: false,
            lineStyle: {
              color: "#d7e7f0"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: "dataMin",
          max: "dataMax",
          axisLabel: {
            formatter: function(value, index) {
              var date = new Date(value * 1000);
              var texts = [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
              ];
              return texts.join("/");
            },
            rotate: 30
          }
        },

        yAxis: {
          type: "value",
          axisLine: {
            show: false,
            onZero: false,
            lineStyle: {
              color: "#d7e7f0"
            }
          },

          splitLine: {
            show: false
          },
          name: "m³/h",
          nameLocation: "end",
          nameGap: 30,
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 2,
            formatter: function(value, index) {
              if (value >= 10000 && value < 10000000) {
                value = value / 10000 + "万";
              } else if (value >= 10000000) {
                value = value / 10000000 + "千万";
              }
              return value;
            }
          }
        },

        color: ["#ffe404", "#595f95", "#ff0000"],

        series: [
          {
            name: "最小流量",
            data: [
              [1548143910, 10],
              [1548143915, 25],
              [1548143920, 15],
              [1548143925, 23],
              [1548143930, 12],
              [1548143935, 28]
            ],
            type: "line"
            // symbol:"none"
          },

          {
            name: "未知线-需求待明确",
            data: [
              [1548143910, 10],
              [1548143913, 10],
              [1548143915, 25],
              [1548143918, 40],
              [1548143920, 15],
              [1548143923, 60],
              [1548143925, 23],
              [1548143928, 50],
              [1548143930, 12],
              [1548143933, 40],
              [1548143935, 28]
            ],
            type: "line",
            symbol: "none"
          }
          // {
          //     name:"异常",
          //     // data: [[2,25],[3,15],[4,23]],
          //     type: 'line',
          //     markPoint:{
          //         itemStyle:{
          //             normal:{
          //                 color:'rgba(11,28,77,0.25)',
          //             }
          //         },
          //         symbol:"path://m31.34375,244.5l30.66667,0l0,0l46,0l107.33333,0l0,-34.84008l0,0l0,-14.93145c0.10417,-3.3181 0.20833,-6.63621 0.3125,-9.95431l-82,0l-10,-29.27417l-10,29.27417l-82.3125,0l0,9.95431l0,14.93145l0,0l0,34.84008z",
          //         symbolSize:[80,40],
          //         symbolOffset:["0","50%"],
          //         label:{
          //             normal:{
          //                 position:["20%","50%"],
          //                 color:"#87a7ce",
          //                 formatter:function (params) {
          //                     return params.data.value
          //                 }
          //             }
          //         },
          //         data: [
          //             {
          //                 coord: [2, 25],
          //                 value:"11:11:11",

          //             },
          //             {
          //                 coord: [4,23],
          //                 value:"22:22:22"
          //             },
          //         ]
          //     },
          //     symbol:"none"
          // },
        ]
      };

      return Template;
    },

    get_divisions(is_first) {
      let that = this;
      that.options = [
        { value: 1, label: "港北区" },
        { value: 2, label: "港南区" },
        { value: 3, label: "江北区" }
      ];
      that.value = that.options[0].value;
    }
  },
  mounted: function() {
    this.get_divisions(true);
  },

  watch: {
    value: function(new_value, old_value) {
      if (new_value) {
        this.refleshData(new_value);
      }
    }
  }
};
</script>

<style>
.el-input__inner {
  background-color: transparent !important;
  color: #dae2ea;
}

.el-select-dropdown {
  background-color: transparent !important;
}
</style>
