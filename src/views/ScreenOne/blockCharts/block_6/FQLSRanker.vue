<template>
  <div style="height: 100%;">
    <div class="chart-header">
      <h5 class="chart-header-title">分区漏损排名</h5>
    </div>

    <div id="p-table" style="height: 85%;">
      <!--表格-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="division_name" label="分区名称" align="center">
        </el-table-column>
        <el-table-column
          prop="water_supply_month"
          label="月供水量"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="water_sale_month"
          label="月售水量"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="leakage_percentage"
          label="漏损率"
          align="center"
        >
        </el-table-column>
        <el-table-column type="index" width="100" label="排名" align="center">
        </el-table-column>
      </el-table>
    </div>

    <!--<button @click="refleshData">测试按钮</button>-->
  </div>
</template>

<script>
import api from "../../../../api";
export default {
  name: "FQLSRanker",
  data: function() {
    return {
      tableData: []
    };
  },
  methods: {
    test: function() {},

    startChartTimer() {
      let that = this;
      window.setInterval(this.refleshData, 1000 * 60 * 0.1);
    },

    refleshData() {
      let _this = this;
      api._fqls().then(response => {
        _this.tableData = response;
      });
    }
  },
  mounted: function() {
    this.refleshData();
    // this.startChartTimer()
  }
};
</script>

<style lang="less">
#p-table {
  background-color: rgba(0, 0, 0, 0.1);
  .el-table {
    background: transparent;
    color: #dbe2ea;
    border: 0px;
  }
  .el-table th {
    background: transparent;
  }
  .el-table tr {
    background: transparent;
  }
  .el-table__header-wrapper thead div {
    background: transparent;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .el-table__footer-wrapper thead div,
  .el-table__header-wrapper thead div {
    color: #6aaded !important;
  }
  .el-table td,
  .el-table th.is-leaf {
    border: 0px;
  }
  .el-table::after,
  .el-table::before {
    background-color: transparent;
  }
  .el-table div.el-table__header-wrapper {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
#viewer
  > div
  > div
  > div:nth-child(3)
  > div:nth-child(2)
  > div:nth-child(2)
  > div
  > div:nth-child(1)
  > div
  > div {
  overflow: scroll;
}
</style>
