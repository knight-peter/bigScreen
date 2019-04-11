<template>
    <div class="full-height flex-box inner-padding">
        <lkqk-chart></lkqk-chart>
    </div>
</template>

<script>
    import hdChart from "../../../../../../web/components/chart"
    import LKQK_Chart from "./LKQK_Chart"
    export default {
        name: "index",

        components:{
            "lkqk-chart":LKQK_Chart
        }
    }
</script>

<style scoped>
    .full-width-height{
        height:100%;
        width:100%
    }
</style>