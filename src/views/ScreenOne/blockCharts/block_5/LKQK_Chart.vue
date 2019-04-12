<template>
    <div class="full-width-height g-pt--10">
        <div  class="chart-header">
            <h4 class="chart-header-title">漏控情况</h4>
        </div>
        <div class="chart-body flex-box">
            <div class="width-one2three full-height">
                <hd-chart auto-resize :options="chartOptions.ZJC_Statistic"></hd-chart>
            </div>
            <div class="width-one2three full-height">
                <hd-chart auto-resize :options="chartOptions.GDGZ_Statistic"></hd-chart>
            </div>
            <div class="width-one2three full-height">
                <hd-chart auto-resize :options="chartOptions.ZJTR_Statistic"></hd-chart>
            </div>

        </div>

    </div>

</template>

<script>
    import hdChart from "../../../../components/chart"

    export default {
        name: "LKQK_Chart",

        data(){
            return {
                chartOptionsTemplate:{
                    legend:{
                        textStyle:{
                            color:"white"
                        },
                        show:true,data:["周检查次数(次)"],
                        bottom:"0%"
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2015','2016','2017','2018'],
                        axisTick: {show: false},
                        axisLine: {
                            show: true,
                            lineStyle:{
                                color:"#4c68a1"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'white'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: {show: false},
                        axisLine: {show: false},
                        axisLabel: {
                            show:false,
                        },
                        splitLine:{show:false}
                    },
                    series: [{
                        name:"周检查次数(次)",
                        data: [100,200,250,400],
                        type: 'bar',
                        color:{
                            normal:{
                                color:"red"
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#4ae893' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#1a9b5d' // 100% 处的颜色
                                    }],
                                    globalCoord: true // 缺省为 false
                                }
                            }
                        },
                        barCategoryGap:"50%",
                        label:{
                            normal:{
                                show:true,
                                position:"top",
                                textStyle:{
                                    color:"white"
                                }

                            }

                        }
                    }]
                },

                chartOptions:{
                    ZJC_Statistic:{},
                    GDGZ_Statistic:{},
                    ZJTR_Statistic:{}
                }
            }
        },

        methods:{
            load_ZJC_Statistic:function () {
                let tmp_chart_options = JSON.parse(JSON.stringify(this.chartOptionsTemplate));
                this.chartOptions.ZJC_Statistic = tmp_chart_options;

            },
            load_GDGZ_Statistic:function () {
                let tmp_chart_options = JSON.parse(JSON.stringify(this.chartOptionsTemplate));
                tmp_chart_options.series[0].itemStyle.normal.color.colorStops[0].color="#f6ca54";
                tmp_chart_options.series[0].itemStyle.normal.color.colorStops[1].color="#d5840e";

                this.chartOptions.GDGZ_Statistic = tmp_chart_options;

            },
            load_ZJTR_Statistic:function () {

                let tmp_chart_options = JSON.parse(JSON.stringify(this.chartOptionsTemplate));
                tmp_chart_options.series[0].itemStyle.normal.color.colorStops[0].color="#d448ab";
                tmp_chart_options.series[0].itemStyle.normal.color.colorStops[1].color="#963078";

                this.chartOptions.ZJTR_Statistic = tmp_chart_options;
            }

        },

        mounted:function () {
            this.load_ZJC_Statistic();
            this.load_GDGZ_Statistic();
            this.load_ZJTR_Statistic();
        },

        components:{
            "hd-chart":hdChart
        },
    }
</script>

<style scoped>
    .full-width {
        width:100%
    }
    .full-height{
        height:100%
    }
    .full-width-height{
        height:100%;
        width:100%
    }
    .flex-box{
        display:flex
    }
    .quater-width {
        width:25%
    }
    .chart-header{
        overflow: hidden;
        height:10%;
        width:100%
    }

    .inner-chart{
        display: inline-block;
    }
    .width-one2three{
        width:33.33%
    }

</style>
