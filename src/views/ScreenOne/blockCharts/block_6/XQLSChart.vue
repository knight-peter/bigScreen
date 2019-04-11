<template>
    <div style="height: 100%;">
        <div class="chart-header">
            <h5 class="chart-header-title">小区漏损排名</h5>


            <!--<el-select v-model="value" placeholder="请选择">-->
                <!--<el-option-->
                        <!--v-for="item in options"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
        </div>

        <div style="display: flex;height:85%">
            <div style="width: 50%;height:100%;background-color: transparent;">
                <hd-chart auto-resize
                          :options="chartOptions">

                </hd-chart>

            </div>
            <div style="width: 50%;height:100%;background-color: transparent;overflow-y:auto">
                <div v-for="item in ranker_list" style="color:white">
                    <div>{{item.division_name}}</div>
                    <el-progress :percentage="item.leakage_percentage"></el-progress>
                </div>

            </div>

        </div>
        <!--<button @click="refleshData">测试按钮</button>-->

    </div>
</template>

<script>
    import hdChart from "../../../../../../web/components/chart"
    import api from '../../../../api'
    export default {
        name: "XQLSChart",
        data:function () {
            return {
                options: [
                    {
                      value: '选项1',
                      label: '黄金糕'
                    }, {
                      value: '选项2',
                      label: '双皮奶'
                    }, {
                      value: '选项3',
                      label: '蚵仔煎'
                    }, {
                      value: '选项4',
                      label: '龙须面'
                    }, {
                      value: '选项5',
                      label: '北京烤鸭'
                    }
                    ],

                value:"",

                chartOptions:{},

                chartOptionsTemplate:{
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: 'transparent',
                                borderRadius: 5,
                                padding: [5, 5]
                           }
                        },
                        indicator: [
                        ],
                        radius:"60%"

                    },
                    series: [{
                        name: '小区漏损率',
                        type: 'radar',
                        areaStyle: {normal: {}},
                        data : [
                            {
                                value : [],
                                name : '小区漏损率'
                            }
                        ]
                    }]
                },

                ranker_list:[]
            }
        },
        components:{
            "hd-chart":hdChart,

        },
        methods:{
            startChartTimer(){
                window.setInterval(this.refleshData,1000*60*0.1)
            },

            refleshData(){
                let _this = this;
                let baseOptions = JSON.parse(JSON.stringify(this.chartOptionsTemplate));
                api._xqls().then(response=>{
                  // 修改雷达图数据
                        let tmp_indicator = []


                        let tmp_series_0 = JSON.parse(JSON.stringify(baseOptions.series[0]));
                        tmp_series_0.data[0].value = [];
                        for (let i=0;i<response.length;i++){
                            let item = response[i];
                            tmp_indicator.push({name:item.division_name,max:100});
                            let tmp_percentage = item.leakage_percentage;

                            if (tmp_percentage==null){
                                tmp_series_0.data[0].value.push("")
                            }else{
                                tmp_series_0.data[0].value.push(parseInt(item.leakage_percentage.replace("%","")))
                            }

                        }

                        baseOptions.radar.indicator = tmp_indicator;

                        baseOptions.series[0] = tmp_series_0;

                        _this.chartOptions = baseOptions;




                        // 修改百分比部分

                        let tmp_response = JSON.parse(JSON.stringify(response));
                        tmp_response.forEach(function (item) {
                            if (item.leakage_percentage==null){
                                 item.leakage_percentage = "0"
                            }else{
                                 item.leakage_percentage = parseInt(item.leakage_percentage.replace("%",""));
                            }

                        });
                        _this.ranker_list = tmp_response
                })


            },
        },

        mounted:function () {
            this.refleshData();
            // this.startChartTimer();

        }
    }
</script>

<style>
    .el-progress__text{
        color:#dfe6ef;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color:rgba(255,255,255,0.2)
    }
    .el-progress-bar__outer{
        background-color:rgba(255,255,255,0.2)
    }

</style>
