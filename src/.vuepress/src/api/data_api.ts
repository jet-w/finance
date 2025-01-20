import {simpleGet} from '@API/baseAPI';

export async function get_trading_his(){
  return await simpleGet("/data/kline", {
    params: {
      start_time: "2020-01-01",
      end_time: "2020-01-03",
      pair: "ETHUSDT",
      time_interval: "1h"
    }
  })
}
