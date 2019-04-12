<template>
    <div class="full-width-height">


        <div class="chart-header">
                <h4 style="display:inline-block;max-width:50%;margin:0px" class="chart-header-title">区域供水占比图</h4>
                <div style="float:right;display:inline;max-width:50%">

                </div>
        </div>
        <div class="chart-body">
            <hd-chart auto-resize :options="chartOptions"></hd-chart>
        </div>
    </div>
</template>

<script>
    import hdChart from "../../../../components/chart"
    import api from '../../../../api'

    export default {
        name: "QYGSL_Chart",
        data(){
            return {
                chartOptions:{},
                chartOptionsTemplate:{
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data:['江南区','江北区','江东区','江西区','江中区'],
                        textStyle:{
                            color:"#d7e7f0"
                        },
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },

                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'江南区'},
                                {value:310, name:'江北区'},
                                {value:234, name:'江东区'},
                                {value:135, name:'江西区'},
                                {value:1548, name:'江中区'}
                            ]
                        }
                    ]
                }
            }
        },
        components:{
            "hd-chart":hdChart
        },
        mounted:function () {
            this.refleshData();
        },
        methods:{
            refleshData(){
                let that = this;
                let tmp_chart_options = JSON.parse(JSON.stringify(this.chartOptionsTemplate))
                api._qygs().then(response=>{
                  console.log(response)
                  let series_data = [];
                        let legend_data = [];

                        for (let i in response){
                            let tmp_value = response[i];
                            legend_data.push(i);
                            series_data.push({value:tmp_value,name:i})

                        }

                        tmp_chart_options.legend.data = legend_data;
                        tmp_chart_options.series[0].data = series_data;

                        that.chartOptions = tmp_chart_options;
                })

            }
        },
    }
</script>

<style scoped>


</style>
