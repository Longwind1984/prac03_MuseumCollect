# Product Policy & Risk Register · MuseumCollect

**Doc owner**: 项目主理人
**Last updated**: 2026-06-05
**Status**: v1 — initial 8-row risk register + 4 product policy frameworks. Audited at Sprint 6 launch and quarterly thereafter.
**Word count**: ~2200

---

## 0. 为什么写这份文档(answering auditor question #4)

cold-audit 拷问原话:

> "Your AI says '85% sure this is 后母戊鼎' and it's wrong. What's the product behavior? What's the legal exposure if a student cites it in homework? No moderation, no misidentification policy, no PIPL/GDPR posture."

`ai-roadmap.md §7` 已经覆盖了 **AI 工程层面的 risk**(模型 drift / cost overrun / 评估失效 等 8 条)。但**产品-用户-法务三角**的 risk 是另一层:
- 用户错信 AI 输出 → 学术引用 / 教育误导
- 用户上传 UGC → 内容审核
- 未成年人使用 → 隐私 + 监护
- 跨境数据 → PIPL / GDPR
- 博物馆 / 文物 IP → 商标 + 版权
- 数据外流 → 用户 collection 是个人资产

这份文档是这一层的 **product policy + risk register**。

---

## 1. 风险注册表 (Risk Register · v1)

每行: **Risk · Severity · Probability · Trigger · Mitigation · Monitoring · Owner**
- Severity: 1(用户体验微伤)→ 5(产品下架 / 法律责任)
- Probability: 1(罕见)→ 5(必然发生)

| # | Risk | Sev | Prob | Trigger | Mitigation | Monitoring | Owner |
|---|---|---|---|---|---|---|---|
| **R1** | **AI 误识别 + 用户错信** — 用户拿 AI 输出做学术引用 / 鉴宝 / 估值 | 4 | 5 | 必然(P@5 ≤ 1.0) | (a) UI 永远显示 confidence band(已在 `ai-service/api-contract.md`);(b) confidence < 0.4 时**不显示具体藏品名**,只显示"特征接近 X 类,建议人工鉴定";(c) 所有 AI 输出附 **"非鉴定性"声明** + "数据来源 / 仅供参考"标记 | weekly: AI-output-CTR-on-claim-with-band; monthly: 用户客诉关键词 "估值 / 鉴定 / 鉴宝" | 主理人 + AI engineer |
| **R2** | **未成年人使用** — 教育场景下学生家长抗议 | 3 | 4 | 朋友圈传播后必然出现 | (a) 注册 minimum age 13(对齐 COPPA);(b) ≤ 18 用户禁止社交分享 / 评论 / UGC 创作功能;(c) 教育模式 toggle(老师/家长可开启 read-only) | quarterly: 未成年用户占比 + 家长投诉率 | 主理人 |
| **R3** | **UGC 内容审核** — 用户上传文物照片 / 评论 / 自己创作的 collection 描述 | 4 | 4 | 上线后 24 小时内出现敏感图 | (a) 图片上传过 OSS 自动 moderation(腾讯/阿里云 content security API);(b) 文本评论用 LLM moderation(自研 prompt + 三方备份);(c) 24h 内人工 review 队列; (d) 民俗/宗教/敏感历史相关藏品**禁止 UGC 创作**只允许收藏 | hourly: moderation API 拒绝率; daily: 人工 review 滞留量 | 内容运营 + 主理人 |
| **R4** | **博物馆 / 文物 IP** — 展品高清图、馆藏元数据、博物馆 logo / 名称使用 | 3 | 3 | 大馆律师函在 D90-D180 区间 | (a) 所有图源走 Wikimedia Commons / 博物馆 open access(`data/licensing-log-v3.md` 全表);(b) 博物馆名称仅作 "藏于 X 博物馆" 客观陈述,**不使用其 logo / 商标 / 形象**;(c) 一级博物馆优先 BD partnership 取得书面授权;(d) DMCA-style takedown 流程预案 | quarterly: 图源 license 全量重审; ad-hoc: 律师函 / 投诉 | 主理人 + legal counsel(外部) |
| **R5** | **PIPL / GDPR / 跨境数据** — 国内用户上传图片到国际 CDN / 国际用户访问中国数据库 | 4 | 2 | 国际版上线触发 | (a) V1 不做国际版,所有数据 + AI 推理在国内 region;(b) V2 国际版前做完整 PIPL data flow audit + 跨境数据评估;(c) 用户隐私同意分层(基础功能 / 个性化 / 第三方分享)| 国际版上线前一次性 audit | 主理人 + legal counsel |
| **R6** | **用户 collection 数据外流 / 锁定** — 用户耗费心血建的"我的博物馆"被 vendor lock | 3 | 3 | 用户增长后竞品挖角必然出现 | (a) D1 起提供 **"我的博物馆"完整导出**(JSON + Markdown + PDF)— 这本身就是产品 selling point;(b) collection 数据用户 own 不是平台 own,T&C 明确;(c) 删号后 30d 内可恢复,30d 后硬删 | quarterly: 导出功能 CTR + 删号率 | 主理人 |
| **R7** | **AI 识别被滥用于商业鉴宝 / 文物贩卖** — 灰产用 API 做"古玩鉴定" | 5 | 3 | 黑灰产产业链 D90+ 介入 | (a) AI 输出明确 "**非鉴定性 · 不可用于商业交易**" 声明;(b) API 不开放给第三方;(c) 检测异常使用 pattern(高频识别、特定品类)自动限速 + alert;(d) 必要时下线 high-value 类目(青铜器一级国宝)的具体名识别,改为"特征类描述" | weekly: API 调用 pattern 异常检测; ad-hoc: 法律风险 escalation | 主理人 + legal counsel + AI engineer |
| **R8** | **平台关停 / 政策变化** — 文物相关 to-C app 备案 / 整改 | 4 | 2 | 政策周期(2-3 年 risk window) | (a) 备案 + ICP + 内容安全等级保护;(b) 不做"鉴定" / "估值" 描述,产品定位为"个人收藏笔记 + 文化学习";(c) 跟一线博物馆 partnership 提升监管 friendliness;(d) 数据持续在国内,无境外存储 | quarterly: 政策动态扫描; ad-hoc: 部委通知 | 主理人 |

---

## 2. 产品策略框架 (Product Policy Frameworks)

### 2.1 AI 输出可信度 policy (针对 R1)

| confidence | UI 行为 | 文案模板 | 用户操作 |
|---|---|---|---|
| **≥ 0.85** | 显示具体藏品名 + ★ "高可信度" 标记 | "这是 **后母戊鼎**(置信度 88%)" | ✓ 直接收藏 |
| **0.55-0.85** | 显示具体藏品名 + ⚠️ "中等可信度" + Top-3 候选 | "可能是 **后母戊鼎**(58%)、簋(22%)、方鼎(15%)" | ✓ 收藏 / 🔍 看候选 |
| **0.4-0.55** | 不显示具体名,只显示**类别+特征** | "看起来是商代晚期方鼎类青铜器" | 📚 阅读相关类别 / ↻ 重拍 |
| **< 0.4** | **拒绝** identify,显示"识别失败" | "未能识别,请检查光线 / 角度,或浏览图鉴库" | ↻ 重拍 / 🔍 手动浏览 |

**关键决策**: confidence < 0.4 **不给猜测**。"AI 不知道" 是合法答案,这跟 ai-roadmap §6.3 P@5 ≥ 0.60 目标互补 — target 是用户**会得到合理回答**的概率,policy 是用户**不会被错误回答误导**的保证。

### 2.2 UGC moderation flow (针对 R3)

```
用户上传(图片 / 文本) 
  ↓
Layer 1: 客户端 size / format / EXIF 检查(< 100ms,前端)
  ↓
Layer 2: 云 OSS moderation API(< 2s, 自动) 
  ├── 高置信度拒绝(色情/暴力/政治)→ 拦截 + 用户提示
  ├── 中置信度可疑 → 人工 review 队列(目标 4h SLA)
  └── 通过 → 入库 + 用户可见
  ↓
Layer 3: 平台运营巡检(daily, 抽样 1%)
  └── 任何漏网 → reverse + 用户警告 + ban policy
```

**违规分级处理**: warning → 7d 禁言 → 30d 封号 → 永久封号 → 实名报送(严重情况)。policy 明文公开在 T&C 第 5 节,非黑箱。

### 2.3 隐私同意分层 (针对 R5)

```
Layer 1 (必需,基础功能可用): 
  - 设备 ID / 操作系统
  - 用户主动输入的 collection 数据
  - 拍照识别时的临时图片(<24h 自动删除原图,只保留 embedding)

Layer 2 (个性化,默认开启可关闭):
  - 浏览行为 / 收藏 pattern → 个性化推荐
  - 位置(粗粒度,城市级)→ 附近博物馆推送

Layer 3 (社交,默认关闭可开启):
  - 朋友圈 / 微信分享我的博物馆
  - 关注其他用户的 collection
  - 评论 / 点赞别人作品

Layer 4 (第三方,必须明确同意):
  - 数据用于学术研究(匿名)
  - 与博物馆 partnership 数据共享
  - 教育机构企业版
```

每一层有**单独的 toggle**,不能"全选打包",**符合 PIPL 第 14 条单独同意要求**。

### 2.4 删号 / 数据导出 / 遗产 policy (针对 R6)

- **导出**: T+1d 提供完整 JSON + Markdown + PDF 包(包括所有 collection / 图片 / 笔记)
- **删号**: 30d 软删除窗口期可恢复;30d 后硬删除(GDPR 30d / PIPL 立即,我们取严)
- **数字遗产**: V2 提供"指定继承人"功能(用户去世后可由指定人 read-only 访问)— 这是博物馆爱好者社群的真实诉求

---

## 3. 还没有明确 policy 的场景(诚实承认)

1. **海外用户访问中国博物馆数据** — V1 不开海外版,但 VPN 用户会出现。V2 需明确 region detection + 数据流向 audit
2. **AI 输出被截图分享到社交媒体后误传** — 我们控制不了用户怎么二次传播,但可以做"分享时自动附上免责声明"
3. **博物馆 partnership 后的数据权属** — 当我们跟故宫签 partnership,产生的双向数据(用户行为 + 博物馆策展)归属如何?V2 BD 阶段 case-by-case 谈
4. **学术引用场景** — 教师 / 学生 / 研究者拿我们的数据做论文。V2 考虑"学术模式"toggle,输出带 citation metadata

---

## 4. policy 触发的 next-iteration action

写完这份文档后立即应该做的:

- [ ] **Sprint 6 launch checklist 加入 R1-R3 的 mitigation 验证**(所有 AI 输出有 confidence band UI、UGC moderation API 已接入、minor 用户禁分享逻辑已上线)
- [ ] **T&C 文档 draft**(目前 0)— 引用本文档作为 risk 基础
- [ ] **R4 博物馆 IP audit** — 当 partnership 进 BD 阶段,本文档作为对方法务的协议起草基础
- [ ] **R7 黑灰产监测 dashboard** — V1 上线 D7 内做

---

## 5. 给面试官的一句话回应

> 面试官问: "AI 说 '85% 后母戊鼎',然后错了,法律风险?"
> 我答:
> 1. **UI 层永远显示 confidence band** — 用户看到的是"88% 后母戊鼎",不是断言;
> 2. **product policy §2.1**: confidence < 0.4 **拒绝**给具体名,这是设计选择不是 bug;
> 3. **所有 AI 输出附"非鉴定性"声明** — 明确不可用于学术引用 / 商业交易;
> 4. **R7 mitigation**: 检测到异常使用 pattern(被灰产滥用),触发 API 限速 + 必要时下线 high-value 类目的具体名;
> 5. **法律 exposure 控制**: 备案 + 等保 + 不做估值 / 鉴定描述 + 跟博物馆 partnership 提升监管 friendliness。
>
> 这五层一起,把"模型必然犯错"的工程现实,降级到"产品 + 法律 + 运营三层共同消化"的可管理 risk。我不能保证 100% 不出事,但能保证**出事时知道是哪一层失守**。

---

**Doc version**: v1 (2026-06-05)
**Related**: `docs/ai-roadmap.md §7`(AI-engineering risks · 互补)· `data/licensing-log-v3.md`(image rights detail)· `ai-service/api-contract.md`(confidence_band 字段定义)· `docs/case-study.md §6.4`(标记本文档为 V2 to-do 的修正)
