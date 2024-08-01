# github-trending-api

[English](README.md) | [简体中文](README_zh-CN.md)

面向开发人员和 RSS 订阅者的 Github 趋势数据

通过 JavaScript 编写并使用 GitHub Actions Service 定时执行脚本，获取 [GitHub Trending Page](https://github.com/trending) 上热门仓库信息。

## 使用

|   | 说明 | 选项 |
| - | - | - |
| since | 时间范围 | daily / weekly / monthly |
| language | 语言 | [语言列表](https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/languages.json) or [语言列表 - cdn](https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/languages.json) 语言名请使用小写，空格使用 "-" 连接符 |

查看全部语言的趋势数据，语言请传入 `all`。


```bash
# json or rss
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/{since}/{language}.json
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/{since}/{language}.xml

# cdn
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/{since}/{language}.json
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/{since}/{language}.xml
```

## 示例

```bash
# since: daily language: all
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/daily/all.json
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/daily/all.xml
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/daily/all.xml
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/daily/all.xml

# since: weekly language: javascript
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/weekly/javascript.json
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/weekly/javascript.xml
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/weekly/javascript.xml
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/weekly/javascript.xml

# since: monthly language: java
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/monthly/java.json
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/monthly/java.xml
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/monthly/java.xml
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/monthly/java.xml

# ...
```


## 相关链接

- [Rsstabs](rsstabs.com) 在 RssTabs 中打造您自己的 AI 新闻助手，智能、个性化、轻松高效。


## 许可证

采用 MIT 许可协议进行许可， © 2024 [Isboyjc](https://github.com) 版权所有