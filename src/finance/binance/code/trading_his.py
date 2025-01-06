from binance.client import Client
import pandas as pd
from datetime import datetime, timedelta
import time
import argparse
import os

def get_historical_klines(symbol, interval, start_date, end_date=None):
    """
    Retrieve historical kline/candlestick data from Binance
    
    Parameters:
    symbol (str): Trading pair symbol (e.g., 'BTCUSDT')
    interval (str): Kline interval (e.g., '1m', '1h', '1d')
    start_date (str): Start date in 'YYYY-MM-DD' format
    end_date (str): End date in 'YYYY-MM-DD' format (optional)
    """
    # Initialize the Binance client
    # Replace with your API keys if you need higher rate limits
    client = Client()
    
    # Convert dates to millisecond timestamps
    start_ts = int(datetime.strptime(start_date, '%Y-%m-%d').timestamp() * 1000)
    if end_date:
        end_ts = int(datetime.strptime(end_date, '%Y-%m-%d').timestamp() * 1000)
    else:
        end_ts = int(datetime.now().timestamp() * 1000)
    
    # Initialize list to store all klines
    all_klines = []
    
    # Binance has a limit of 1000 klines per request
    # We need to make multiple requests and handle rate limits
    current_ts = start_ts
    
    while current_ts < end_ts:
        try:
            # Get klines for current timeframe
            klines = client.get_klines(
                symbol=symbol,
                interval=interval,
                startTime=current_ts,
                limit=1000
            )
            
            # Break if no more klines
            if not klines:
                break
                
            # Add klines to our list
            all_klines.extend(klines)
            
            # Update current timestamp
            current_ts = klines[-1][0] + 1
            
            # Respect rate limits
            time.sleep(0.1)
            
        except Exception as e:
            print(f"Error occurred: {e}")
            time.sleep(1)  # Wait longer on error
    
    # Convert to DataFrame
    df = pd.DataFrame(all_klines, columns=[
        'timestamp', 'open', 'high', 'low', 'close',
        'volume', 'close_time', 'quote_asset_volume',
        'number_of_trades', 'taker_buy_base_asset_volume',
        'taker_buy_quote_asset_volume', 'ignore'
    ])
    
    # Clean up the data
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    for col in ['open', 'high', 'low', 'close', 'volume']:
        df[col] = df[col].astype(float)
    
    # Remove unnecessary columns
    df = df[['timestamp', 'open', 'high', 'low', 'close', 'volume', 'number_of_trades']]
    
    return df
    
def parse_args():
    parser = argparse.ArgumentParser()

    parser.add_argument('--symbol', type=str, default="BTCUSDT", help='The trading symbal')
    parser.add_argument('--interval', type=str, default="1M", help='The interval for trading history')
    parser.add_argument('--start-date', type=str, default="2020-01-01", help='The start date for retriving trading date')
    parser.add_argument('--end-date', type=str, default="2024-11-26", help='The end date for retriving trading date')
    
    return parser.parse_args()

# Example usage
if __name__ == "__main__":
    args = parse_args()
    # Define parameters
    symbol = args.symbol#'BTCUSDT'
    #interval = '1m'  # 1-minute intervals
    interval = args.interval #'1M'  # 1-minute intervals
    start_date = args.start_date#'2020-01-01'
    end_date = args.end_date #'2024-11-01'
    filename = f'{interval}/{symbol}/{symbol}_{interval}_{start_date}_{end_date}.csv'
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    if not os.path.exists(filename):
        print(filename)
        # Get the data
        df = get_historical_klines(symbol, interval, start_date, end_date)
        
        # Display the first few rows
        # print(df.head())
        if not os.path.exists(interval):
            os.mkdir(interval)
        # Save to CSV
        df.to_csv(filename, index=False)
    else:
        print("Exist:", filename)