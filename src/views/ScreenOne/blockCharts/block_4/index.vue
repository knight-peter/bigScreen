<template>
    <div class="full-height flex-box inner-padding">
        <div class="half-width full-height">
            <fqtj-chart></fqtj-chart>
        </div>
        <div class="half-width full-height">
            <qygsl-chart></qygsl-chart>
        </div>
    </div>
</template>

<script>
    import QYGSL_Chart from "./QYGSL_Chart"
    import FQTJ_Chart from "./FQTJ_Chart"

    export default {
        name: "index",
        components:{
            "qygsl-chart":QYGSL_Chart,
            "fqtj-chart":FQTJ_Chart
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

    .inner-chart{
        display: inline-block;
    }
    .half-width{
        width:50%
    }

</style>