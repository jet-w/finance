<template>
  <div id="trading_view" ref="chartContainer" class="chart-container"></div>
</template>

<script lang="ts" setup name="KlineChart">
import { onMounted, ref, defineProps } from 'vue';
import { createChart } from 'lightweight-charts';
import {type KLine} from "@/type/kline.ts"
import { get_trading_his } from "@API/data_api"

//let data = defineProps(KlineData?:Kline)

const chartContainer = ref(null);
let chart;
let candlestickSeries;


let datetime2unixsecond = (dataset) => {
  return dataset.map(item => ({
    ...item,  // Spread the other properties
    time: Math.floor(new Date(item.time).getTime() / 1000), // Convert to Unix timestamp (seconds)
  }));
}


let createTradingChart = () =>{
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
    },
  }
  //return createChart(document.getElementById('trading_view'), chart_option);
  return createChart(
    document.getElementById('trading_view'), 
    {
      height: chartContainer.value.height-50,
      width: chartContainer.value.width,
      timeScale: {
        tickMarkFormatter: (time, tickMarkType, locale) => {
          //return new Date(time * 1000).toLocaleString();
          console.log("***********************************************")
          console.log(time)
          console.log(tickMarkType)
          console.log(locale)
          return "xxxx"
        }
      }
    }
  );
}


let createStickSeries = (chart) =>{
  return chart.addCandlestickSeries(
    { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' }
  );
}

let setup_kline_data = () =>{
  get_trading_his().then((data) => {
    //let sortedData = stick_data.sort((a, b) => a.time - b.time);
    candlestickSeries.setData(
      datetime2unixsecond(JSON.parse(data.data))
    );
    chart.timeScale().fitContent();
  })
}

let init = () =>{
  chart = createTradingChart();
  candlestickSeries = createStickSeries(chart);
  setup_kline_data();
}

onMounted(() => {
  init();
})

//onMounted(() => {
//  // Create the chart instance when the component is mounted
//  const chart = createChart(chartContainer.value, {
//    width: chartContainer.value.clientWidth,
//    height: chartContainer.value.clientHeight,
//    layout: {
//      background: {color: '#fff'},
//      textColor: 'black',
//    },
//    grid: {
//      vertLines: { color: '#eee' },
//      horzLines: { color: '#eee' },
//    },
//    crosshair: {
//      vertLine: { color: '#7A7A7A', width: 1 },
//      horzLine: { color: '#7A7A7A', width: 1 },
//    },
//  });
//
//  // Format data for candlestick chart
//  const candlestickData = datetime2unixsecond(data);
//
//  // Add candlestick series
//  const candlestickSeries = chart.addCandlestickSeries();
//  candlestickSeries.setData(candlestickData);
//});

</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>
