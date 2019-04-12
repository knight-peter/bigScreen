<template>
  <div class="full-width-height g-pt--10">
    <div class="chart-header">
      <h4 class="chart-header-title">区域压力变化曲线</h4>
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
  name: "QYYLBH_Chart",
  data() {
    return {
      chartOptions: {},
      chartOptionsTemplate: {
        color: ["#0a9bc1", "#893787", "#3eb984"],
        legend: {
          left: "15%",
          textStyle: {
            color: "#d7e7f0"
          },
          itemGap: 50,
          data: [
            {
              name: "最小压力",
              icon:
                "path://M49.7,47.8 C31.8,47.8 17.3,33.3 17.3,15.4 C17.3,10.6 18.3,6.1 20.2,2.1 C8.9,7.2 1.1,18.5 1.1,31.7 C1.1,49.6 15.6,64.1 33.5,64.1 C46.7,64.1 58,56.3 63.1,45 C58.9,46.8 54.4,47.8 49.7,47.8 L49.7,47.8 Z"
            },
            {
              name: "平均压力",
              icon:
                "path://M49.7,47.8 C31.8,47.8 17.3,33.3 17.3,15.4 C17.3,10.6 18.3,6.1 20.2,2.1 C8.9,7.2 1.1,18.5 1.1,31.7 C1.1,49.6 15.6,64.1 33.5,64.1 C46.7,64.1 58,56.3 63.1,45 C58.9,46.8 54.4,47.8 49.7,47.8 L49.7,47.8 Z"
            },
            {
              name: "最大压力",
              icon:
                "path://M49.7,47.8 C31.8,47.8 17.3,33.3 17.3,15.4 C17.3,10.6 18.3,6.1 20.2,2.1 C8.9,7.2 1.1,18.5 1.1,31.7 C1.1,49.6 15.6,64.1 33.5,64.1 C46.7,64.1 58,56.3 63.1,45 C58.9,46.8 54.4,47.8 49.7,47.8 L49.7,47.8 Z"
            }
          ]
        },
        xAxis: {
          type: "category",
          boundaryGap: false,

          interval: 2,
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
          name: "Mpa",
          nameLocation: "start",
          nameGap: 30,
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "最大压力",
            data: [[0, 3], [1, 10], [2, 8]],
            type: "line",
            areaStyle: {
              normal: {}
            },
            symbol: "none"
          },
          {
            name: "平均压力",
            data: [[0, 2.5], [1, 6], [2, 7]],
            type: "line",
            areaStyle: {
              normal: {}
            },
            symbol: "none"
          },
          {
            name: "最小压力",
            data: [[0, 2], [1, 3], [2, 2]],
            type: "line",
            areaStyle: {
              normal: {}
            },
            symbol: "none"
          }
        ]
      },
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
      let that = this;
      let tmp_chart_options = JSON.parse(
        JSON.stringify(this.chartOptionsTemplate)
      );
      api._qyylbh(1).then(res => {
        tmp_chart_options.xAxis.data = res.xAris_data;
        tmp_chart_options.series[0].data = res.max_line_data;
        tmp_chart_options.series[1].data = res.avg_line_data;
        tmp_chart_options.series[2].data = res.min_line_data;
        that.chartOptions = tmp_chart_options;
      });
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

<style scoped>
.full-width-height {
  height: 100%;
  width: 100%;
}
</style>
