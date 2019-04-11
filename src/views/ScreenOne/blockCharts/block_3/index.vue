<template>
    <div class="full-height flex-box inner-padding">
        <div class="full-height half-width">
            <zxllbh-chart></zxllbh-chart>
        </div>
        <div class="full-height half-width">
            <qyylbh-chart></qyylbh-chart>
        </div>

    </div>
</template>

<script>

    import ZXLLBH_Chart from "./ZXLLBH_Chart"
    import QYYLBH_Chart from "./QYYLBH_Chart"

    export default {
        name: "index",
        components:{
            "zxllbh-chart":ZXLLBH_Chart,
            "qyylbh-chart":QYYLBH_Chart,
        }
    }
</script>

<style scoped>
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
    .chart-body{
        height:90%;
        width:100%
    }
    .inner-chart{
        display: inline-block;
    }
    .half-width{
        width:50%
    }
</style>