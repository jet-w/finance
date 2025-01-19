---
title: 01. Trading Indicator
index: true
icon: circle-dot
author: Haiyue
date: 2024-12-01
category:
  - theory
---

``` mermaid
---
title: 量化交易分析
---
graph LR
   d[指标] ---> e[趋势类]
   d[指标] ---> f[动量类]
   d[指标] ---> g[成交量类]
   d[指标] ---> h[波动率类]
   d[指标] ---> i[支撑与阻力类]
   d[指标] ---> j[自定义指标与算法]
   d[指标] ---> k[其他指标]

   e[趋势类] --> m[移动平均线 （MA）]
   e[趋势类] --> n[移动平均线指标（MACD）]
   e[趋势类] --> o[抛物线转向指标（Parabolic SAR）]
   e[趋势类] --> p[一目均衡表（Ichimoku Cloud）]
   e[趋势类] --> q[布林带（Bollinger Bands）]
   e[趋势类] --> r[凯尔特通道（Keltner Channels）]
   e[趋势类] --> s[唐奇安通道（Donchian Channels）]
   e[趋势类] --> t[平均方向性指数（ADX）]
   e[趋势类] --> u[包络线指标（Envelope Indicators）]
   e[趋势类] --> v[超级趋势指标（Supertrend Indicator）]

   f[动量类] --> w[相对强弱指数（RSI）]
   f[动量类] --> x[随机振荡指标（Stochastic Oscillator）]
   f[动量类] --> y[威廉姆斯指标（Williams %R）]
   f[动量类] --> z[变化率指标（ROC）]
   f[动量类] --> aa[商品通道指数（CCI）]
   f[动量类] --> ab[动量指标（Momentum Indicator）]
   f[动量类] --> ac[钱德动量振荡指标（CMO）]
   f[动量类] --> ad[精彩振荡指标（AO）]
   f[动量类] --> ae[终极振荡指标（Ultimate Oscillator）]
   f[动量类] --> af[三重指数移动平均线（TRIX）]
  
   h[波动率类] --> q[布林带（Bollinger Bands）]
   h[波动率类] --> ag[平均真实波幅（ATR）]
   h[波动率类] --> ah[唐奇安通道（Donchian Channel）]
   h[波动率类] --> ai[标准差（Standard Deviation）]
   h[波动率类] --> aj[波动率指数（VIX）]
   h[波动率类] --> ak[历史波动率（HV）]

   g[成交量类] --> al[平衡交易量指标（OBV）]
   g[成交量类] --> am[累积/派发线（A/D Line）]
   g[成交量类] --> an[蔡金资金流量指标（CMF）]
   g[成交量类] --> ao[成交量加权平均价（VWAP）]
   g[成交量类] --> ap[资金流量指数（MFI）]
   g[成交量类] --> aq[易变动性指标（EOM）]
   g[成交量类] --> ar[力度指数（Force Index）]
   g[成交量类] --> as[成交量价格趋势（VPT）]
   g[成交量类] --> at[蔡金震荡指标（Chaikin Oscillator）]

   i[支撑与阻力类] --> au[枢轴点（Pivot Points）]
   i[支撑与阻力类] --> av[斐波那契回调和扩展（Fibonacci Retracement and Extensions）]
   i[支撑与阻力类] --> aw[卡玛丽拉枢轴点（Camarilla Pivot Points）]
   i[支撑与阻力类] --> ax[甘氏线（Gann Lines）]
   i[支撑与阻力类] --> ay[支撑与阻力区域（Support and Resistance Zones）]
  
   j[自定义指标与算法] --> az[艾略特波浪理论（Elliott Wave Theory）]
   j[自定义指标与算法] --> ba[谐波形态（Harmonic Patterns）]
   j[自定义指标与算法] --> bb[平均柱线（Heikin Ashi Candles）]
   j[自定义指标与算法] --> bc[砖块图（Renko Charts）]
   j[自定义指标与算法] --> bd[点与图图表（Point and Figure Charts）]

   k[其他指标] --> be[ZigZag 指标]
   k[其他指标] --> bf[相对活力指数（RVI）]
   k[其他指标] --> bg[相关系数（Correlation Coefficient）]
   k[其他指标] --> bh[去趋势价格振荡指标（DPO）]
   k[其他指标] --> bi[阿姆斯指数（TRIN）]
   k[其他指标] --> bj[市场便利性指标（MFI）]
   k[其他指标] --> bk[漩涡指标（Vortex Indicator）]
   k[其他指标] --> bl[沙夫趋势周期（Schaff Trend Cycle）]
```