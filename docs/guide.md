# GTA - github-trending-api

Github trending data for developers and rss subscribers

Get information about popular repositories on the [GitHub Trending Page](https://github.com/trending) via a script written in JavaScript and executed using GitHub Actions Service.

## Use

|   | description | options |
| - | - | - |
| since | Date range | daily / weekly / monthly |
| language | Language | [languages list](https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/languages.json) or [languages list - cdn](https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/languages.json) Use lowercase for language names and the "-" hyphen for spaces. |

To view trend data for all languages, please pass in `all` for languages.

```bash
# json or rss
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/{since}/{language}.json
https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/{since}/{language}.xml

# cdn
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/{since}/{language}.json
https://cdn.jsdelivr.net/gh/isboyjc/github-trending-api/data/{since}/{language}.xml
```

## Example

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


## Related links

- [Rsstabs](https://rsstabs.com) Build Your Own AI News Assistant in RssTabs,Intelligent, personalized, and effortlessly efficient.


## License

Licensed under the MIT License, Copyright © 2024 [Isboyjc](https://github.com).