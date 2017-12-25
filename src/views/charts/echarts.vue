<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <!-- <el-col :span="12">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col> -->
        </el-row>
    </section>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chartColumn: null
      //   chartBar: null,
      //   chartLine: null,
      //   chartPie: null
    };
  },
  methods: {
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        title: { text: "Column Chart" },
        tooltip: {},
        xAxis: {
          data: ["来访", "新增", "修改", "删除", "到访", "认筹"]
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    drawCharts() {
      this.drawColumnChart();
    }
  },
  mounted: function() {
    this.drawCharts();
  },
  updated: function() {
    this.drawCharts();
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  float: left;
}
.el-col {
  padding: 30px 20px;
}
</style>