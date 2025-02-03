interface KLineItem {
  time: string | number,
  open: number,
  high: number,
  low: number,
  close: number,
  volumn: number,
  close_time: number,
  quote_asset_volume: number,
  number_of_trades: number,
  taker_buy_base_asset_volume: number,
  taker_buy_quote_asset_volume: number
}


type KLine = Array<KLineItem>;