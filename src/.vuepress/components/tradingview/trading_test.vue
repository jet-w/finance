<template>
  <div id="app">
    <KlineChart :data="klineData" />
  </div>
</template>

<script>
import { ref } from 'vue';
import KlineChart from '@trading/tradingview/KlineChart.vue';

export default {
  name: 'App',
  components: {
    KlineChart,
  },
  setup() {
    const klineData = ref([
      { time: 1674297600000, open: 50, high: 55, low: 49, close: 54 },
      { time: 1674384000000, open: 54, high: 57, low: 52, close: 55 },
      { time: 1674470400000, open: 55, high: 58, low: 53, close: 56 },
      { time: 1674556800000, open: 56, high: 59, low: 54, close: 57 },
      { time: 1674643200000, open: 57, high: 60, low: 55, close: 58 },
      { time: 1674729600000, open: 58, high: 61, low: 56, close: 60 },
      { time: 1674816000000, open: 60, high: 63, low: 58, close: 61 },
      { time: 1674902400000, open: 61, high: 64, low: 59, close: 62 },
      { time: 1674988800000, open: 62, high: 65, low: 60, close: 64 },
      { time: 1675075200000, open: 64, high: 66, low: 62, close: 65 },
      { time: 1675161600000, open: 65, high: 67, low: 63, close: 66 },
      { time: 1675248000000, open: 66, high: 68, low: 64, close: 67 },
      { time: 1675334400000, open: 67, high: 70, low: 65, close: 69 },
      { time: 1675420800000, open: 69, high: 72, low: 66, close: 71 },
      { time: 1675507200000, open: 71, high: 74, low: 68, close: 73 },
      { time: 1675593600000, open: 73, high: 76, low: 70, close: 75 },
      { time: 1675680000000, open: 75, high: 78, low: 72, close: 76 },
      { time: 1675766400000, open: 76, high: 79, low: 73, close: 77 },
      { time: 1675852800000, open: 77, high: 80, low: 74, close: 79 },
      { time: 1675939200000, open: 79, high: 82, low: 76, close: 80 },
      { time: 1676025600000, open: 80, high: 83, low: 77, close: 82 },
      { time: 1676112000000, open: 82, high: 85, low: 79, close: 84 },
      { time: 1676198400000, open: 84, high: 87, low: 81, close: 85 },
      { time: 1676284800000, open: 85, high: 88, low: 82, close: 87 },
      { time: 1676371200000, open: 87, high: 90, low: 84, close: 89 },
      { time: 1676457600000, open: 89, high: 92, low: 86, close: 91 },
      { time: 1676544000000, open: 91, high: 94, low: 88, close: 93 },
      { time: 1676630400000, open: 93, high: 96, low: 90, close: 95 },
      { time: 1676716800000, open: 95, high: 98, low: 92, close: 96 },
      { time: 1676803200000, open: 96, high: 99, low: 93, close: 98 },
    ]);

    return {
      klineData,
    };
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f9;
}
</style>
