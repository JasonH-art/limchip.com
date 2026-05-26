# LimChip 型号 SEO 数据库维护说明

## 你以后在哪里加新型号

唯一入口是：

`part/parts-data.json`

不要手写单个型号 HTML。新增、修改或删除型号后，统一运行生成脚本，脚本会自动更新：

- `part/index.html`
- `part/*.html` 型号详情页
- `part/search-index.json`
- `part/search-index.js`
- `sitemap.xml`

这样新增型号后，老型号页面的 Related Parts、数据库搜索、站点地图都会一起刷新。

## 新增型号的基本流程

1. 打开 `part/parts-data.json`
2. 在 `parts` 数组最后复制一段已有型号对象
3. 修改 `partNumber`、`slug`、品牌、分类、规格、库存和 SEO 文案字段
4. 把 `site.lastmod` 改成当天日期，例如 `2026-05-20`
5. 在项目根目录运行：

```bash
node part/generate-parts.js --write
```

6. 上传这些文件到服务器：

- 整个 `part/` 文件夹
- 根目录 `sitemap.xml`
- 根目录 `robots.txt`

## 每个型号最重要的字段

必填字段：

- `partNumber`: 精准型号，保留后缀和空格
- `slug`: URL 文件名，只用小写字母、数字、短横线
- `brand`, `manufacturer`, `brandGroup`
- `category`, `productType`, `series`, `package`
- `specs`: 至少 3 条真实规格
- `applications`: 典型应用

强烈建议填写的 SEO 差异化字段：

- `marketStatus`: 当前市场/供应状态，例如 spot stock、shortage、EOL、long lead time
- `supplyRisk`: 为什么客户会找这个料，例如停产、长交期、suffix 严格匹配、军工/工业长生命周期
- `valueAngle`: 这个型号的商业价值和采购动机
- `procurementNote`: LimChip 能帮客户确认什么，例如价格、数量、date code、批次、COC、物流
- `customIntro`: 页面首段，写给人看，不要堆关键词
- `relatedPartNumbers`: 明确相关型号，脚本也会自动补充同品牌/同类别型号

## 差异化 SEO 怎么写

不要让每个页面都像同一个模板。每个型号至少回答一个不同的搜索意图：

- 紧缺料：强调 urgent production、shortage sourcing、date code、lead time
- 停产/EOL：强调 legacy board support、last-time-buy、replacement supply
- 高可靠/工业/军工相关：强调 traceability、batch control、temperature grade、long-lifecycle equipment
- 存储器：强调 exact suffix、density、package、firmware qualification、date-code matching
- FPGA/CPLD：强调 speed grade、package、I/O、logic capacity、redesign cost

注意：不要直接复制原厂 datasheet 或别的网站长段文字。规格可以参考公开资料核对，但页面文案要用自己的采购和供应链语言重写。

## 当前方案和自动联网抓取的关系

当前方案不会自动联网抓取型号内容。原因是 SEO 页面需要准确、可追溯，自动抓取很容易带来错误规格、版权文本或不适合你库存情况的描述。

更稳的做法是：

1. 用公开 datasheet / 原厂页面核对规格
2. 用 LimChip 自己的库存、渠道和客户需求填写供应链字段
3. 由生成器自动把这些数据变成结构化 SEO 页面

后续如果要做“半自动采集”，建议先做内部草稿工具，只生成待审核 JSON，不要直接发布到官网。
