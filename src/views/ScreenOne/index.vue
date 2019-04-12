<template>
  <div
    class="font-white"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div
      v-bind:style="{
        width: '100%',
        height: $store.state.windowInfo.height + 'px',
        position: 'relative'
      }"
    >
      <!-- 背景地图 -->
      <div
        id="back-map"
        style="width:100%;height:100%;position: relative;z-index:0;"
      >
        <overview-gis></overview-gis>
      </div>

      <div
        style="background:linear-gradient(90deg, rgba(46, 46, 112,0.9), rgba(46, 46, 112,0.2));width:30%;height:100%;position:absolute;top:0%;left:0%"
      >
        <!-- 天气预报及时间 -->
        <div
          class="full-width"
          style="background: transparent;height:19%;display:flex;justify-content: center"
        >
          <block-1></block-1>
        </div>
        <!-- 水量信息统计 -->
        <div
          class="full-width"
          style="background:transparent;height:27%;display:flex;justify-content: center"
        >
          <block-2></block-2>
        </div>
        <!-- 最小流量变化曲线&区域压力变化曲线 -->
        <div
          class="full-width"
          style="background:transparent;height:27%;display:flex;justify-content: center"
        >
          <block-3></block-3>
        </div>
        <!-- 分区统计&区域供水占比图 -->
        <div
          class="full-width"
          style="background:transparent;height:27%;display:flex;justify-content: center"
        >
          <block-4></block-4>
        </div>
      </div>

      <div
        style="background:linear-gradient(270deg, rgba(46, 46, 112,0.9), rgba(46, 46, 112,0.2));width:30%;height:100%;position:absolute;top:0%;right:0%"
      >
        <!-- 漏控情况 -->
        <div
          class="full-width"
          style="background:transparent;height:30%;display:flex;justify-content: center"
        >
          <block-5></block-5>
        </div>
        <!-- 区域漏损时间报警列表 -->
        <div
          class="full-width"
          style="background:transparent;height:60%;display:flex;justify-content: center"
        >
          <block-6></block-6>
        </div>
        <!-- 漏损详情 -->
        <div
          class="full-width"
          style="background:transparent;height:10%;display:flex;justify-content: center"
        >
          <block-7></block-7>
        </div>
      </div>
      <!-- 分区计量数据 -->
      <div
        id="middle"
        style="background-color: transparent;width:40%;height:30%;position:absolute;top:0%;right:30%;left:30%"
      >
        <block-8></block-8>
      </div>
    </div>
  </div>
</template>

<script>
import gis from "../ScreenGis/overviewGis";
import block_1 from "./blockCharts/block_1";
import block_2 from "./blockCharts/block_2";
import block_3 from "./blockCharts/block_3";
import block_4 from "./blockCharts/block_4";
import block_5 from "./blockCharts/block_5";
import block_6 from "./blockCharts/block_6";
import block_7 from "./blockCharts/block_7";
import block_8 from "./blockCharts/block_8";
import { setTimeout } from "timers";

export default {
  name: "index",

  data() {
    return {
      loading: true
    };
  },

  mounted() {
    let that = this;
    window.onresize = () => {
      that.$store.state.windowInfo.height = window.innerHeight;
    };
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },

  components: {
    "block-1": block_1,
    "block-2": block_2,
    "block-3": block_3,
    "block-4": block_4,
    "block-5": block_5,
    "block-6": block_6,
    "block-7": block_7,
    "block-8": block_8,
    "overview-gis": gis
  }
};
</script>

<style lang="less">
@import "../../assets/css/g-global.less";
@import "../../assets/css/m-big-screen.less";
#back-map {
  background-image: url("../../assets/images/map-backgroup.png");
  background-color: #0a3975;
}
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
.half-width {
  width: 50%;
}
.half-height {
  height: 50%;
}
.quater-width {
  width: 25%;
}
.flex-box {
  display: flex;
}
.block-box {
  display: block;
}
.font-blue {
  color: #00a8ff;
}
.font-green {
  color: #3fc183;
}
.font-red {
  color: #f03939;
}
.font-white {
  color: white;
}
.chart-header-title {
  color: #00a8ff;
  font-size: 130%;
}
.chart-body {
  height: 90%;
  width: 100%;
}
.chart-header {
  overflow: hidden;
  height: 10%;
  width: 100%;
}
.inner-padding {
  width: 95%;
}
</style>
