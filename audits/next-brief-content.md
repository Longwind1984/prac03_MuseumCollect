# Next Iteration Brief: content — 2026-05-20

> From: 陈翊安(北大考古文博 PhD candidate, content auditor persona)
> To: v2 Builder/Designer 团队
> Subject: 如何让 v2 在内容深度上跨过"硬核博物馆爱好者"这条线

---

## 1. 一句话总判

**v1 的三个 demo 已经做到了"维基百科级科普"的优等;v2 的任务是让至少一条路径(很可能是 A 派的延展)达到"《集成》+ 学位论文级"的工具感**。

## 2. What to keep

### 2.1 必须保留 (do not touch)
- **A: 出处与引用表格 (artifact.html § Citations)** — 所有 25 条都挂了 data_sources 字段并渲染到详情页底部。**这是 v1 最严肃的设计语言。**
- **A: 后母戊 vs 司母戊 释读争议 (index.html 第 122 行)** — 这是真考据生会兴奋的细节,保留并扩展到其他争议(散氏盘"矢"字、何尊"宅兹"动名词性)。
- **A: 铭文释读器 (artifact.html §Inscription Reader) + JINWEN_DICT 字典** — 这是 v1 离学术工具最近的组件。20 字字典够 demo,**v2 应扩到 200+ 字**。
- **B: 国宝独白文学水准** — "我是后母戊鼎。我的身体由二十八块陶范分铸再合"这种叙事既保留事实又有温度。**这是其他博物馆 App 学不来的护城河。**
- **A: BibTeX 导出按钮** — 极度懂研究用户。**v2 应该真的实现 BibTeX 生成 (现在是 stub)**。
- **数据字段结构 (bronze-treasures-v1.json) 总体合格** — id/period/excavation/inscription/craft/rarity 六大块。**v2 不要重新设计 schema,在现有基础上加字段**。

### 2.2 谨慎保留(原则正确,执行需修)
- **dimensional-map.md 的 10 维度框架** — 时空层 / 器物层 / 价值层 三分法是经得起推敲的。但内部"形制 vs 用途"重复、"工艺 vs 纹路"耦合应重新组织(见 §3.3)。
- **时空柱朝代时长正比的设计** — 是 v1 最漂亮的洞察。**保留,但加历史事件刻度密度** (v1 只有 5 个事件,应至少 15+)。
- **稀有度光晕 + 印章视觉系统 (A & B)** — 视觉语言克制不游戏化,符合传统文物美学。C 把它扁平化了,**C 的 rarityTier 函数应学 A 那样分 5 级**。

## 3. What to change

### 3.1 [P0] 立刻修复的文案错误

| 位置 | 当前 | 应改为 |
|------|------|--------|
| v1-B/js/data.js li_gui voice | "我被一位叫'利'的将领的器物" | "我属于一位叫'利'的将领" 或 "我是一位叫'利'的将领的器物" |
| v1-C/js/state.js GENEALOGY | "尊盘"作为顶级器型 | 把"尊盘组合"归入"尊"子型 |
| bronze-treasures-v1.json:22 后母戊鼎 patterns | `["饕餮纹", "夔龙纹", "云雷纹", "虎噬人头纹", "蝉纹"]` | `{main: ["饕餮纹"], secondary: ["夔龙纹", "云雷纹"], local: ["虎噬人头纹(耳)", "蝉纹"]}` 区分主纹/辅纹/局部纹 |
| bronze-treasures-v1.json:805 三星堆纵目面具 image_urls | 自承"严格说该具体文件是青铜头像而非纵目面具" | 找到真正的纵目面具图,或者删除该条 URL,改用 placeholder |
| bronze-treasures-v1.json:914 四羊首铜瓿 | 全字段 TODO | 填全(湖南博物院 1959 入藏,商代晚期,出土于宁乡)或从 v1 删除 |

### 3.2 [P0] 形制 taxonomy 全局重构

- 把所有 6 件鼎的 `type` 字段从 "食器" 改为 "炊器 / 礼器" (与 dimensional-map.md §4.1 一致)。
- 给所有器物增加一个 `taxonomic_function` 字段,明确**用途分类 (function)** 和 **形态分类 (form)** 是分离的两个轴。
- C 的 GENEALOGY 应该参考马承源《商周青铜器分期标准器》或朱凤瀚《古代中国青铜器》的器型表重做,**不能让 demo 里有的子型反推 taxonomy 系统**。

### 3.3 [P1] 维度组织优化

- **取消"形制"和"用途"作为独立维度的设定**,改为"用途 > 形制(器型) > 子型 (form_subtype)" 的层次结构,**一棵树而非两棵**。
- **"工艺"维度应该和"纹饰"做成双轴矩阵**(纵轴工艺,横轴纹饰演化期),让用户看到"范铸时代主流是饕餮主纹;失蜡到来才有透空蟠螭"的耦合。

### 3.4 [P1] 学术严谨度补救

| 字段 | 现状 | 应该怎样 |
|------|------|---------|
| `period` | 大多写"商代晚期 (武丁时期)" | 应注明依据: "(武丁时期,断代依据: 妇好墓 M5 同出器物群)" |
| `data_sources[].source` | "马承源 1988" | "马承源《商周青铜器分期标准器》(文物出版社, 1988), p.234" |
| 缺失 `jicheng_id` 字段 | 不存在 | 新增 `jicheng_id` 字段对应《殷周金文集成》编号(如毛公鼎 = 集成 2841) |
| 缺失 `dating_evidence` 字段 | 不存在 | 新增 `dating_evidence: {layer: "...", co_excavated: ["..."], style: "...", inscription_persona: "..."}` 四列证据 |

### 3.5 [P2] 文案细节订正

- 何尊独白"国家最初的名字" → "中央之地最初的写法"
- 妇好鸮尊"夜里看得清楚的人" → 改为有学术依据的诠释,如"商人以鸮为神鸟,与战争相关 (见 张光直《商代神话》)"
- 散氏盘"中国最早的土地契约" → "现存最早记录土地契约的青铜铭文"
- C 越王勾践剑 meme "stainless steel" → "含锡梯度 + 硫化处理,真·古代复合钢" 之类
- 商鞅方升 inscription summary 应明示"两个时代两次刻铭" 的双重性

## 4. What to add

### 4.1 [P0] 新增维度 / 字段:断代依据 (Dating Evidence)

每件器物应有一个新的 `dating_evidence` 块:
```json
{
  "dating_evidence": {
    "stratigraphy": "殷墟二期,小屯西地",     // 地层依据
    "co_excavated_with": ["妇好觥", "妇好方斝"],  // 同墓器物
    "style_phase": "商晚期 II 期 (郑振香 1980 分期)",  // 风格分期
    "inscription_persona": "妇好 = 武丁王后",   // 铭文人名
    "14c": null,
    "confidence": "high"
  }
}
```

**这是把 v1 从科普 App 升级到考古工具的关键。**

### 4.2 [P0] 同墓/同坑器物群 (Assemblage)

`co_excavated_group_id` 字段,把妇好墓 5 件、曾侯乙墓 3 件、三星堆 3 件挂在同一个 group 上。**列鼎制度只有在 set 里才能讲清楚。**

### 4.3 [P1] 拓本/铭文图像

为有铭文的器物提供 inscription_rubbing 字段(URL 或 SVG)。**真拓本 != SVG mock 拓本风格**。即便 stub 也要明确"这是拓本 placeholder"。

### 4.4 [P1] 集成号 / 出版引用

`jicheng_id`(《殷周金文集成》)、`tushijicheng_id`(《商周青铜器铭文暨图像集成》)。这是行业引用的硬通货。

### 4.5 [P2] 学术争议明确字段

`controversies: [{topic, schools, references}]` — 把"司母戊 vs 后母戊"这类争议作为 first-class data,**用户可以筛"有争议器物"作为研究入口**。

### 4.6 [P2] 字体阶段对照(陈翊安 killer feature)

- 已识铭文字按"商晚 / 西周早 / 西周中 / 西周晚 / 春秋 / 战国"6 期字体阶段标注。
- 用户可在某个字上点"看演化",**自动跳出该字在 6 期不同器物上的字形对照**。
- 这是 dimensional-map.md §8 已有 vision 但未实现的部分。

## 5. Specific actionable instructions for next Builder/Designer

### 5.1 立刻做 (v2 sprint 1)
1. **修 4 个 P0 错误**(li_gui 病句、形制 taxonomy、虎噬人头纹、image_urls 错位)。
2. **bronze-treasures-v1.json 增加 `dating_evidence`、`jicheng_id`、`co_excavated_group_id` 三个字段**(可暂填 placeholder,但 schema 要先定)。
3. **A 版 artifact.html 在"出处与引用"下方增加"断代依据"块**,即便只能展示 1-2 件器物的实例。
4. **A 版 BibTeX 按钮实现真生成**(目前是 alert stub),应能复制可粘贴到 Zotero 的 BibTeX 字符串。
5. **B 版 li_gui 独白病句立刻修**。
6. **C 版 rarityTier 函数加回禁出境 5 级 (treasure-forbidden)**(从 A 的 rarityTier 函数复制即可)。

### 5.2 v2 sprint 2 - 3
1. **铭文 JINWEN_DICT 从 20 字扩到 200 字** — 至少覆盖毛公鼎、大盂鼎、大克鼎、何尊、利簋、散氏盘、虢季子白盘 7 件长铭器物的高频字。每字附《说文》/《集成》/《字汇》三层引用。
2. **A 版增加"字体阶段对照"组件**(killer feature)— 选定一个字(如"王"),展示 6 期字形演化,**附引用集成号**。
3. **同墓器物群视图**(可挂在 ancient-map.html 或独立页) — 妇好墓 / 曾侯乙墓 / 三星堆 K2 三个示例。
4. **形制 taxonomy 重构** — 参考马承源系或朱凤瀚系,**不要自造**。
5. **拓本占位** — 至少 5 件长铭器物有真拓本图(Wikimedia Commons 上有公共领域的)。

### 5.3 学术争议 first-class
在 catalog.html 新增一个 view: **"按争议筛选"** — 用户能选"有断代争议的"、"有释读争议的"、"有真伪争议的"、"有传世/科学发掘双方说法的"分类。这是博士生才会想到的入口,也是 v1 完全缺失的。

## 6. What success looks like next round

### 6.1 6 个硬指标(陈翊安会用的检验)
- [ ] 我能在 A 的某一件器物上看到"集成号 + 拓本图 + 断代依据 + 同墓器物 + 字体阶段"五合一信息。
- [ ] 我点开 BibTeX 按钮,粘贴到 Zotero,有 author/year/title/publisher/page 五字段。
- [ ] 我能搜"有断代争议"或"有释读异说"筛出至少 5 件器物。
- [ ] 我在 25 件里至少能找到 3 个"我以前不知道的事实细节"(比如"原来散氏盘'矢'有三种读法")。
- [ ] B 没有诗化文案语法错误(li_gui 那种病句不再出现)。
- [ ] C 的稀有度有 5 级而非 2 级。

### 6.2 软指标
- 把 v2 的 A 版 artifact.html 截屏发给金文小组,**有 1+ 人点赞** ("终于有人做这个了")。
- 一个非考古背景的人(C persona)看完一件器物后,**能复述至少 1 个事实细节**(不是"很美"或"很久"这种)。

## 7. Open questions for the user

1. **是否允许 v2 增加内容字段(jicheng_id 等)? schema 调整后 v1 的 JSON 不再兼容,需要 migration 决策**。
2. **拓本图像版权处理**:Wikimedia Commons 上的拓本图大多是 PD,但《集成》/《图像集成》本身是商务印书馆出版物。**v2 是采用 PD only,还是允许 fair-use 引用 (学术 demo 性质)?**
3. **断代依据的可信度**:断代依据本身就是争议焦点(夏商周断代工程 vs 国际学界质疑)。**字段是"采用断代工程结论"还是"列出多说"?** 如选后者,数据量会显著上升。
4. **是否做"用户上传私人笔记 + 私有 tag"?** 真考据生想要这个,但跨设备同步会引入用户系统。先做 localStorage 还是要等到云端版?
5. **B 的国宝独白下一批怎么写?** 现在 25 件中我 spot 检查了 ~10 件,文学水准很高但有 ~3 处事实细节偏差。**下一批是请文案 + 内容审核双签,还是直接 prompt LLM?**
6. **C 是否应该被并入 A/B,而非平行 v2 版?** 我作为内容审计员看 C 觉得它和"硬核博物馆爱好者"的定位偏离最远,**meme + 抽卡的方向会持续稀释内容深度**。但 motivation auditor 可能有不同看法。

---

> Next iteration brief completed at H7 by 内容审计员 (陈翊安 persona)
> 配合产出: `audits/d1-content.md`(详细审计报告)
