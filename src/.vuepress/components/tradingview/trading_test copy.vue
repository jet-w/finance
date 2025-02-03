<template>
  <div ref="ref_tv" class="container">
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
    init(){
      this.chart = this.createTradingChart();
      this.candlestickSeries = this.createStickSeries(this.chart);
      this.setup_kline_data();
    },
    datetime2unixsecond(dataset) {
      return dataset.map(item => ({
        ...item,  // Spread the other properties
        time: Math.floor(new Date(item.time).getTime() / 1000), // Convert to Unix timestamp (seconds)
      }));
    },
    createTradingChart(){
      let chart_option = { 
        height: 600,
        layout: {
          textColor: 'black',
          background: { type: 'solid', color: 'white' },
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 }
        },
        localization: {
          timeFormatter: businessDayOrTimestamp => {
              return new Date(businessDayOrTimestamp * 1000).toLocaleString();
          },
        }
      }
      return createChart(document.getElementById('trading_view'), chart_option);
    },
    createStickSeries(chart){
      return chart.addCandlestickSeries(
        { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' }
      );
    },
    setup_kline_data(){
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
    },
    test(){
      const chartOptions = { 
        layout: { 
          textColor: 'black', 
          background: { type: 'solid', color: 'white' } 
        } 
      };
      const chart = createChart(document.getElementById('trading_view'), chartOptions);
      const barSeries = chart.addBarSeries(
        { upColor: '#26a69a', downColor: '#ef5350' }
      );
      const data = [
        { open: 10,    high: 10.63, low: 9.49,  close: 9.55,  time: 1642427876 }, 
        { open: 9.55,  high: 10.30, low: 9.42,  close: 9.94,  time: 1642514276 }, 
        { open: 9.94,  high: 10.17, low: 9.92,  close: 9.78,  time: 1642600676 }, 
        { open: 9.78,  high: 10.59, low: 9.18,  close: 9.51,  time: 1642687076 }, 
        { open: 9.51,  high: 10.46, low: 9.10,  close: 10.17, time: 1642773476 }, 
        { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, 
        { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, 
        { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, 
        { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, 
        { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }
      ];
      
      barSeries.setData(data);
      chart.timeScale().fitContent();
      this.chart = chart;
    }
  },
  mounted(){
    //this.init();
    this.test();
  } 
};
</script>

<style scoped>
.container {
  display: block;
  justify-content: space-between;
  width: 100%;
  height: 600px;
}

.left,
.right {
  width: 100%;
}

.tv-lightweight-charts > table {
  height: 590px;
  width: 100%;
  margin: 0px;
}
</style>
