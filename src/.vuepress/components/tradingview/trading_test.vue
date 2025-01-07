<template>
  <div class="container">
    <div id="drawarea" class="left"></div>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts';

export default {
  data() {
    return {
      inputContent: ``,
      resultContent: []
    };
  },
  methods: {
    convert(content) {
      // empty;
    }
  },
  mounted(){
    const chart = createChart(document.getElementById('drawarea'), { width: 400, height: 300 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData([
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
    ]);
  } 
};
</script>

<style scoped>
.container {
  display: block;
  justify-content: space-between;
  width: 800px;
  height: 400px;
}

.left,
.right {
  width: 100%;
}

</style>
