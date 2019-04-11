<template>
  <div class="full-height inner-padding"
       style="justify-content: center;">
    <div class="chart-header flex-box"
         style="justify-content:space-between;align-items:center">
      <h4 class="chart-header-title">水量信息统计</h4>
      <div class="m-chart-header__tag flex-grow-1">
        <div class="m-tag-icon"
             style="width:3%;height:60%"
             :style="{'background-color':colors.ZGSL}"></div>
        <div class="chart-tag">总供水量</div>
        <div class="m-tag-icon"
             style="width:3%;height:60%"
             :style="{'background-color':colors.ZSSL}"></div>
        <div class="chart-tag">总售水量</div>
        <div class="m-tag-icon"
             style="width:3%;height:60%"
             :style="{'background-color':colors.LSL}"></div>
        <div class="chart-tag">漏损率</div>
        <div class="m-tag-icon"
             style="width:3%;height:60%"
             :style="{'background-color':colors.CXCL}"></div>
        <div class="chart-tag">产销差率</div>
      </div>

    </div>
    <div class="chart-body flex-box">
      <div class="quater-width full-height">
        <hd-chart auto-resize
                  :options="allChartsOptions.ZGSL"></hd-chart>
      </div>
      <div class="quater-width full-height">
        <hd-chart auto-resize
                  :options="allChartsOptions.ZSSL"></hd-chart>
      </div>
      <div class="quater-width full-height">
        <hd-chart auto-resize
                  :options="allChartsOptions.LSL"></hd-chart>
      </div>
      <div class="quater-width full-height">
        <hd-chart auto-resize
                  :options="allChartsOptions.CXCL"></hd-chart>
      </div>
    </div>

  </div>
</template>

<script>
import hdChart from '../../../../../../web/components/chart'

export default {
    name: 'index',

    data: function() {
        return {
            allChartsOptions: {
                ZGSL: {}, //总供水量
                ZSSL: {}, //总售水量
                LSL: {}, //漏损率
                CXCL: {} //产销差率
            },

            colors: {
                ZGSL: '#643ebe',
                ZSSL: '#9d3b82',
                LSL: '#978a4a',
                CXCL: '#9b4f50'
            },

            chartOptionsTemplate: {
                title: {
                    top: 'bottom',
                    left: 'center',
                    text: '总供水量统计(万m³)',
                    textStyle: {
                        color: 'white',
                        fontSize: 10
                    }
                },
                backgroundColor: 'rgba(255,255,255,0)',
                xAxis: {
                    data: ['2015', '2016', '2017', '2018'],
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    }
                },
                yAxis: {
                    splitLine: { show: false },
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: { show: false }
                },
                color: ['#643ebe'],
                series: [
                    {
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color: '#75829c'
                            }
                        },
                        name: 'hill',
                        type: 'pictorialBar',
                        barCategoryGap: '-5%',
                        symbol:
                            'path://m187.49998,326.00001c56.16667,-71 102.00001,-159.33335 102.50001,-252.00001c-0.5,93 43.33334,180 102.5,252.00001l-205.00001,0z',
                        itemStyle: {
                            normal: {
                                opacity: 0.8
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data: [123, 60, 25, 18],
                        z: 10
                    }
                ]
            }
        }
    },

    methods: {
        load_ZGSL(response) {
            let tmp_chart_options = JSON.parse(
                JSON.stringify(this.chartOptionsTemplate)
            )
            tmp_chart_options.color[0] = this.colors.ZGSL

            tmp_chart_options.xAxis.data = []
            tmp_chart_options.series[0].data = []
            for (let year in response) {
                tmp_chart_options.xAxis.data.push(year)
                tmp_chart_options.series[0].data.push(
                    response[year].water_supply
                )
            }

            this.allChartsOptions.ZGSL = tmp_chart_options
        },
        load_ZSSL(response) {
            let tmp_chart_options = JSON.parse(
                JSON.stringify(this.chartOptionsTemplate)
            )
            tmp_chart_options.title.text = '总售水量统计(万m³)'
            tmp_chart_options.color[0] = this.colors.ZSSL

            tmp_chart_options.xAxis.data = []
            tmp_chart_options.series[0].data = []
            for (let year in response) {
                tmp_chart_options.xAxis.data.push(year)
                tmp_chart_options.series[0].data.push(response[year].water_use)
            }
            this.allChartsOptions.ZSSL = tmp_chart_options
        },
        load_LSL(response) {
            let tmp_chart_options = JSON.parse(
                JSON.stringify(this.chartOptionsTemplate)
            )
            tmp_chart_options.title.text = '漏损率'
            tmp_chart_options.color[0] = this.colors.LSL

            tmp_chart_options.xAxis.data = []
            tmp_chart_options.series[0].data = []
            tmp_chart_options.series[0].label.normal.formatter = '{c}%'

            for (let year in response) {
                tmp_chart_options.xAxis.data.push(year)
                tmp_chart_options.series[0].data.push(response[year].leak_rate)
            }

            this.allChartsOptions.LSL = tmp_chart_options
        },
        load_CXCL(response) {
            let tmp_chart_options = JSON.parse(
                JSON.stringify(this.chartOptionsTemplate)
            )
            tmp_chart_options.title.text = '产销差率'
            tmp_chart_options.color[0] = this.colors.CXCL

            tmp_chart_options.xAxis.data = []
            tmp_chart_options.series[0].data = []
            tmp_chart_options.series[0].label.normal.formatter = '{c}%'
            for (let year in response) {
                tmp_chart_options.xAxis.data.push(year)
                tmp_chart_options.series[0].data.push(response[year].cxc_rate)
            }
            // console.log(JSON.stringify(tmp_chart_options))
            this.allChartsOptions.CXCL = tmp_chart_options
        },
        reflesh_data() {
            let that = this
            let res = {
                    '2017': {
                        water_use: 10.0,
                        leak_rate: 10,
                        water_supply: 10.0,
                        cxc_rate: 10
                    },
                    '2016': {
                        water_use: 20.0,
                        leak_rate: 20,
                        water_supply: 20.0,
                        cxc_rate: 20
                    },
                    '2019': {
                        water_use: 30.0,
                        leak_rate: 30,
                        water_supply: 30.0,
                        cxc_rate: 30
                    },
                    '2018': {
                        water_use: 40.0,
                        leak_rate: 40,
                        water_supply: 40.0,
                        cxc_rate: 40
                    }
                }
            that.load_ZGSL(res)
            that.load_ZSSL(res)
            that.load_LSL(res)
            that.load_CXCL(res)
        }
    },

    components: {
        'hd-chart': hdChart
    },
    mounted: function() {
        // this.load_ZGSL();
        // this.load_ZSSL();
        // this.load_LSL();
        // this.load_CXCL();
        this.reflesh_data()
    }
}
</script>

<style lang="less" scoped>
.full-width {
    width: 100%;
}
.full-height {
    height: 100%;
}
.full-width-height {
    height: 100%;
    width: 100%;
}
.flex-box {
    display: flex;
}
.quater-width {
    width: 25%;
}
.chart-header {
    overflow: hidden;
    height: 10%;
    width: 100%;
}
.chart-body {
    height: 90%;
    width: 100%;
}
.inner-chart {
    display: inline-block;
}
.m-chart-header__tag {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    .chart-tag {
        width: 3.5vw;
        font-size: 80%;
        text-align: center;
        color: white;
    }
}
</style>
