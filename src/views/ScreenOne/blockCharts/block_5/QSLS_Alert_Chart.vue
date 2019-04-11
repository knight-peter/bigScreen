<template>
    <div class="full-width-height flex-box font-white">
        <div class="width-per-40 full-height">
            <hd-chart auto-resize :options="chartOptions"></hd-chart>
        </div>

        <div class="width-per-60 full-height" style="overflow-y:scroll ">
            <div v-for="alert_detail in alert_details" class="flex-box" style="height:25%">
                <div style="width:20%;" class="full-height">
                    <object style="height:50%;width:50%" :data="alert_detail.icon"></object>
                </div>
                <div style="width:80%;justify-content:space-between" class="full-height flex-box">
                    <div>
                        <span style="display: block;">{{alert_detail.alert_name}}</span>
                        <span class="font-grey">{{alert_detail.time}}</span>
                    </div>
                    <div>
                        <span style="display: block;">{{alert_detail.detail.value}}</span>
                        <span class="font-grey">{{alert_detail.detail.unit}}</span>
                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import hdChart from "../../../../../../web/components/chart"
    import proxy from "../../../../../../web/modules/proxy";
    import svg_default from '../../../../static/images/svg/icon/default.svg'
    export default {
        name: "QSLS_Alert_Chart",

        data(){
            return {

                alert_type2icon:{
                    ZXLLYC:svg_default,
                    SLYC:svg_default
                },

                chartOptions:{},

                chartOptionsTemplate:{

                    title:{
                        show:true,
                        text:"50",
                        textStyle:{
                            fontSize:40,
                            color:"white"
                        },
                        right:"center",
                        top:"center",
                        subtext:"报警总数",
                        subtextStyle:{
                            color:"white",

                        }

                    },

                    legend: {
                        y: 'bottom',
                        textStyle:{
                            color:"#d7e7f0"
                        },
                        data:['未处理报警','已处理报警']
                    },

                    series: [
                        {
                            center:["50%","50%"],
                            type:'pie',
                            radius: ['60%', '70%'],
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
                                {
                                    value:335,
                                    name:"未处理报警",
                                    itemStyle:{
                                        normal:{
                                            color:{
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 1,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0, color: '#e95b95' // 0% 处的颜色
                                                }, {
                                                    offset: 1, color: '#d51462' // 100% 处的颜色
                                                }],
                                                globalCoord: true // 缺省为 false
                                            }

                                        },

                                    }
                                },
                                {
                                    value:310,
                                    name:'已处理报警',
                                    itemStyle:{
                                        normal:{
                                            color:{
                                                type: 'linear',
                                                x: 0,
                                                y: 0,
                                                x2: 1,
                                                y2: 1,
                                                colorStops: [{
                                                    offset: 0, color: '#01f7fa' // 0% 处的颜色
                                                }, {
                                                    offset: 1, color: '#09b2e7' // 100% 处的颜色
                                                }],
                                                globalCoord: true // 缺省为 false
                                            }
                                        },

                                    }


                                },

                            ],

                        }
                    ]
                },

                alert_details:[

                ]
            }
        },

        mounted:function () {
            this.refleshData();
        },

        methods:{
            refleshData(){
                let tmp_chart_options = JSON.parse(JSON.stringify(this.chartOptionsTemplate))

                let that = this;
                proxy.Post("/guigang/alert_chart/query.json",
                    {},
                    response=>{

                        that.alert_details = [];
                        for (let i=0;i<response.to_show_list.length;i++){
                            let tmp_item = {
                                alert_name:response.to_show_list[i].alarm_type,
                                time:response.to_show_list[i].time,
                                detail:{
                                    value:response.to_show_list[i].alarm_value,
                                    unit:""
                                },
                                icon:svg_default
                            };
                            that.alert_details.push(tmp_item)
                        };

                        tmp_chart_options.series[0].data[0].value =  response.chart_data.not_handled//未处理
                        tmp_chart_options.series[0].data[1].value =  response.chart_data.has_handled//已处理
                        tmp_chart_options.title.text = response.chart_data.alarm_count;


                        this.chartOptions = tmp_chart_options;
                    }
                )
            }
        },

        components:{
            "hd-chart":hdChart
        }
    }
</script>

<style scoped>


    .full-width-height{
        height:100%;
        width:100%
    }
    .flex-box{
        display:flex
    }
    .width-per-40{
        width:40%
    }
    .width-per-60{
        width:60%
    }
    .full-height{
        height:100%
    }
    .font-grey{
        color:#7692b4;
    }
</style>
