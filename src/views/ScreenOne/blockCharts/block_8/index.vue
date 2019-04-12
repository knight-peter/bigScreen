<template>
  <div
    class="full-width-height flex-box"
    style="flex-flow: column;align-items: center"
  >
    <h3
      class="font-blue"
      style="font-size: 280%;letter-spacing:12px;margin-bottom: 16px"
    >
      贵港被控分区计量系统
    </h3>
    <div class="flex-box m-block-group" style="">
      <div class="outter-block">
        <span class="block-box inner-name">供水量(万m³)</span>
        <span class="block-box inner-number">{{ details.GSL.num }}</span>
        <span
          :class="{
            'font-red': details.GSL.compare.arrow == '▼',
            'font-green': details.GSL.compare.arrow == '▲'
          }"
          class="inner-arrow"
          ><span>{{ details.GSL.compare.arrow }}</span
          ><span>{{ details.GSL.compare.percentage }}</span></span
        >
      </div>
      <div class="outter-block">
        <span class="block-box inner-name">售水量(万m³)</span>
        <span class="block-box inner-number">{{ details.SSL.num }}</span>
        <span
          :class="{
            'font-red': details.SSL.compare.arrow == '▼',
            'font-green': details.SSL.compare.arrow == '▲'
          }"
          class="inner-arrow"
          ><span>{{ details.SSL.compare.arrow }}</span
          ><span>{{ details.SSL.compare.percentage }}</span></span
        >
      </div>
      <div class="outter-block">
        <span class="block-box inner-name">免费水量(万m³)</span>
        <span class="block-box inner-number">{{ details.MFSL.num }}</span>
        <span
          :class="{
            'font-red': details.MFSL.compare.arrow == '▼',
            'font-green': details.MFSL.compare.arrow == '▲'
          }"
          class="inner-arrow"
          ><span>{{ details.MFSL.compare.arrow }}</span
          ><span>{{ details.MFSL.compare.percentage }}</span></span
        >
      </div>
      <div class="outter-block">
        <span class="block-box inner-name">漏损水量(万m³)</span>
        <span class="block-box inner-number">{{ details.LSSL.num }}</span>
        <span
          :class="{
            'font-red': details.LSSL.compare.arrow == '▼',
            'font-green': details.LSSL.compare.arrow == '▲'
          }"
          class="inner-arrow"
          ><span>{{ details.LSSL.compare.arrow }}</span
          ><span>{{ details.LSSL.compare.percentage }}</span></span
        >
      </div>
      <div class="outter-block">
        <span class="block-box inner-name">产销差(万m³)</span>
        <span class="block-box inner-number">{{ details.CXC.num }}</span>
        <span
          :class="{
            'font-red': details.CXC.compare.arrow == '▼',
            'font-green': details.CXC.compare.arrow == '▲'
          }"
          class="inner-arrow"
          ><span>{{ details.CXC.compare.arrow }}</span
          ><span>{{ details.CXC.compare.percentage }}</span></span
        >
      </div>
      <div class="outter-block">
        <span class="block-box inner-name">漏损率(万m³)</span>
        <span class="block-box inner-number">{{ details.LSL.num }}</span>
        <span
          :class="{
            'font-red': details.LSL.compare.arrow == '▼',
            'font-green': details.LSL.compare.arrow == '▲'
          }"
          class="inner-arrow"
          ><span>{{ details.LSL.compare.arrow }}</span
          ><span>{{ details.LSL.compare.percentage }}</span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../../api";
export default {
  name: "index",

  data: function() {
    return {
      details: {
        GSL: {
          num: 1234567,
          compare: {
            arrow: "▲",
            percentage: "10%"
          }
        },
        SSL: {
          num: 1234567,
          compare: {
            arrow: "▼",
            percentage: "10%"
          }
        },
        MFSL: {
          num: 1234567,
          compare: {
            arrow: "▲",
            percentage: "10%"
          }
        },
        LSSL: {
          num: 1234567,
          compare: {
            arrow: "▼",
            percentage: "10%"
          }
        },
        CXC: {
          num: 1234567,
          compare: {
            arrow: "▼",
            percentage: "10%"
          }
        },
        LSL: {
          num: 1234567,
          compare: {
            arrow: "▼",
            percentage: "10%"
          }
        }
      }
    };
  },

  components: {},
  methods: {
    reflesh_data() {
      let that = this;
      api._center_data().then(response => {
        // console.log(response);
        that.details.GSL.num = response.water_supply;
        if (response.water_supply_change > 0) {
          that.details.GSL.compare.arrow = "▲";
        } else {
          that.details.GSL.compare.arrow = "▼";
        }
        that.details.GSL.compare.percentage =
          Math.abs(response.water_supply_change) + "%";

        that.details.CXC.num = response.cxc;
        if (response.cxc_change > 0) {
          that.details.CXC.compare.arrow = "▲";
        } else {
          that.details.CXC.compare.arrow = "▼";
        }
        that.details.CXC.compare.percentage =
          Math.abs(response.cxc_change) + "%";

        that.details.LSSL.num = response.leak;
        if (response.leak_change > 0) {
          that.details.LSSL.compare.arrow = "▲";
        } else {
          that.details.LSSL.compare.arrow = "▼";
        }
        that.details.LSSL.compare.percentage =
          Math.abs(response.leak_change) + "%";

        that.details.LSSL.num = response.leak;
        if (response.leak_change > 0) {
          that.details.LSSL.compare.arrow = "▲";
        } else {
          that.details.LSSL.compare.arrow = "▼";
        }
        that.details.LSSL.compare.percentage =
          Math.abs(response.leak_change) + "%";

        that.details.LSL.num = response.leak_percentage + "%";
        if (response.leak_percentage_change > 0) {
          that.details.LSL.compare.arrow = "▲";
        } else {
          that.details.LSL.compare.arrow = "▼";
        }
        that.details.LSL.compare.percentage =
          Math.abs(response.leak_percentage_change) + "%";

        that.details.SSL.num = response.water_use;
        if (response.water_use_change > 0) {
          that.details.SSL.compare.arrow = "▲";
        } else {
          that.details.SSL.compare.arrow = "▼";
        }
        that.details.SSL.compare.percentage =
          Math.abs(response.water_use_change) + "%";
      });
    },
    dataChange() {
      /* this.details.GSL.num += 1;
      this.details.SSL.num += 1;
      this.details.MFSL.num += 1;
      this.details.LSSL.num += 1;
      this.details.CXC.num += 1;
      this.details.LSL += 1; */
    }
  },
  mounted: function() {
    this.reflesh_data();
    let that = this;
    setInterval(() => {
      that.details.GSL.num += 1;
      that.details.SSL.num += 1;
    }, 3000);
    setInterval(() => {
      that.details.LSSL.num += 1;
    }, 10000);
  }
};
</script>

<style lang="less" scoped>
.inner-number {
  font-size: 180%;
}
.inner-arrow {
  font-size: 100%;
}

.inner-name {
  text-indent: 0.25vw;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.3),
    rgba(255, 222, 255, 0)
  );
}
.m-block-group {
  width: 95%;
  justify-content: center;
}
.outter-block {
  margin-top: 10px;
  margin-bottom: 10px;
  flex: 1 1 auto;
}
</style>
