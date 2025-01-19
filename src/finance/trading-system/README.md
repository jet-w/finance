---
title: Trading System
index: false
icon: list-check
author: Haiyue
---

你既怕又何必想，你既想又何必怕



``` mermaid
---
title: 交易系统
---
graph LR
   d[交易系统] ---> e[数据获取]
   d[交易系统] ---> f[资金管理]
   d[交易系统] ---> g[交易策略]
   d[交易系统] ---> h[数据可视化]
   d[交易系统] ---> i[<a href="/finance/finance/theory/indicators">指标计算</a>]
  subgraph A[交易策略]
     g[交易策略] ---> k[买入点]
     g[交易策略] ---> l[卖出点]
     g[交易策略] ---> m[持有]
  end
```