<template>
    <div class="full-width-height">
        <div class="chart-header">
            <h4 style="display:inline-block;max-width:50%;margin:0px" class="chart-header-title">分区统计</h4>
            <div style="float:right;display:inline;max-width:50%">


            </div>
        </div>
        <div class="chart-body flex-box">
            <div class="full-height flex-box" style="width:30%;flex-flow: column;justify-content: space-around">
                <div class="g-d--flex"><span class="g-mr--5">一级分区</span><el-tag size="mini">{{level_data.level_1}}</el-tag></div>
                <div class="g-d--flex"><span class="g-mr--5">二级分区</span><el-tag size="mini">{{level_data.level_2}}</el-tag></div>
                <div class="g-d--flex"><span class="g-mr--5">三级分区</span><el-tag size="mini">{{level_data.level_3}}</el-tag></div>


            </div>
            <div class="full-height" style="width:70%">
                <hd-chart auto-resize :options="chartOptions"></hd-chart>
            </div>



        </div>
    </div>
</template>

<script>
    import hdChart from "../../../../components/chart"
    import api from '../../../../api'
    export default {
        name: "FQTJ_Chart",

        data:function () {
            return {
                chartOptions:{},
                degree_2_color_seq:["#9466cd","#2669c4","#e36fc4","#dd6332","#3f9a59","#169f4d","#16779f"],
                level_data:{
                    level_1:0,
                    level_2:0,
                    level_3:0
                }
            }
        },

        methods:{
            get_template_chartOptions:function () {
                let template = {
                    series: [
                        {
                            label: {
                                normal: {
                                    show: true
                                }
                            },


                            symbolSize:30,
                            draggable:true,
                            type: 'graph',
                            layout: 'force',
                            data:[
                                {"id":0, name:"0号分区\n4"},
                                {"id":1, name:"1号分区\n4",itemStyle:{normal:{color:"#9466cd"}}},
                                {"id":2, name:"2号分区\n4",itemStyle:{normal:{color:"#2669c4"}}},
                                {"id":3, name:"3号分区\n4",itemStyle:{normal:{color:"#e36fc4"}}},
                                {"id":4, name:"4号分区\n4",itemStyle:{normal:{color:"#dd6332"}}},
                                {"id":5, name:"5号分区\n4",itemStyle:{normal:{color:"#3f9a59"}}},
                                {"id":6, name:"6号分区\n4",itemStyle:{normal:{color:"#169f4d"}}},
                                {"id":7, name:"7号分区\n4",itemStyle:{normal:{color:"#16779f"}}},
                            ] ,
                            width: '25%',
                            height: '25%',
                            force: {
                                // initLayout: 'circular',
                                gravity: 0.1,
                                repulsion: 350,
                                edgeLength: [5,20]
                            },
                            edges: [
                                {
                                    source:0,
                                    target:1
                                },
                                {
                                    source:1,
                                    target:2
                                },
                                {
                                    source:2,
                                    target:3
                                },
                                {
                                    source:2,
                                    target:3
                                },
                                {
                                    source:3,
                                    target:4

                                },
                                {
                                    source:4,
                                    target:5
                                },
                                {
                                    source:5,
                                    target:6
                                },
                                {
                                    source:6,
                                    target:7,
                                },
                                {
                                    source:7,
                                    target:0
                                },


                            ]
                        },
                        {
                            label:{
                                normal:{
                                    show:true
                                }
                            },
                            symbolSize:50,
                            draggable:true,
                            type: 'graph',
                            layout: 'force',
                            animation: false,
                            data:[
                                {"id":0,name:"一级分区\n8",itemStyle:{normal:{color:"#1bb5cc"}}},
                            ] ,
                            width: '25%',
                            height: '100',
                            force: {
                                // initLayout: 'circular',
                                // gravity: 0,
                                repulsion: 50,
                                edgeLength: [5,20]
                            },

                        }

                    ]
                };

                return template
            },
            reflesh_data(){
                let that = this;
                api._fqtj().then(response=>{
                  // 修改图
                        let template = this.get_template_chartOptions()
                        template.series[1].data[0].name = response.circle_data.center_name+"\n"+response.circle_data.num
                        that.chartOptions = template;

                        let round_data = response.circle_data.round_data;
                        let edges = []
                        let data = [];

                        for (let i=0;i<round_data.length;i++){
                            let item = round_data[i];
                            let data_item = {"id":i, name:item.name+"\n"+item.num,itemStyle:{normal:{color:this.degree_2_color_seq[i%this.degree_2_color_seq.length]}}};
                            data.push(data_item);

                            let edge_item
                            if (i==(round_data.length-1)){
                                edge_item = {source:i,target:0};

                            }else{
                                edge_item = {source:i,target:i+1};
                            }
                            edges.push(edge_item);
                        }

                        template.series[0].data = data;
                        template.series[0].edges = edges;

                        console.log(template)

                        that.chartOptions = template;



                        // 修改统计
                        that.level_data = response.level_data
                })

            }
        },

        mounted:function () {
            this.reflesh_data();
        },
        components:{
            "hd-chart":hdChart
        },
    }
</script>

<style scoped>

</style>
