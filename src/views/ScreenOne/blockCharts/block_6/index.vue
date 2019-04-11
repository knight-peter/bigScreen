<template>
    <div class="full-height flex-box flex-column inner-padding g-pt--10">
        <div class="p-ht--50">
            <fqls-ranker></fqls-ranker>
        </div>
        <div class="p-ht--50">
            <xqls-chart></xqls-chart>
        </div>
    </div>
</template>

<script>
    import FQLSRanker from "./FQLSRanker"
    import XQLSChart from "./XQLSChart"


    export default {
        name: "index",
        components:{
            "fqls-ranker":FQLSRanker,
            "xqls-chart":XQLSChart
        }
    }
</script>

<style scoped>
.p-ht--50{
  height:50%;
}

</style>
