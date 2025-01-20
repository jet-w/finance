<template>
  <div class="container">
    <div id="trading_view" class="left"></div>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts';
import { get_trading_his } from "@API/data_api"

export default {
  data() {
    return {
      inputContent: ``,
      resultContent: [],
      chart: undefined
    };
  },
  methods: {
    datetime2unixsecond(dataset) {
      return dataset.map(item => ({
        ...item,  // Spread the other properties
        time: Math.floor(new Date(item.time).getTime() / 1000), // Convert to Unix timestamp (seconds)
      }));
    },
    createTradingChart(){
      return createChart(document.getElementById('trading_view'), { 
        height: 500,
        localization: {
             timeFormatter: businessDayOrTimestamp => {
                 return new Date(businessDayOrTimestamp * 1000).toLocaleString();
             },
        },
      });
    },
    createStickSeries(chart){
      return chart.addCandlestickSeries(
        { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' }
      );
    }
  },
  mounted(){
    this.chart = this.createTradingChart();
    this.candlestickSeries = this.createStickSeries(this.chart);
    
    let candlestickSeries = this.candlestickSeries;
    let chart = this.chart;
    let datetime2unixsecond = this.datetime2unixsecond;

    get_trading_his().then((data) => {
      //let sortedData = stick_data.sort((a, b) => a.time - b.time);
      candlestickSeries.setData(
        datetime2unixsecond(JSON.parse(data.data))
      );
      chart.timeScale().fitContent();
    })
  } 
};
</script>

<style scoped>
.container {
  display: block;
  justify-content: space-between;
  width: 100%;
}

.left,
.right {
  width: 100%;
}

.tv-lightweight-charts > table {
  width: 100%;
}
</style>
