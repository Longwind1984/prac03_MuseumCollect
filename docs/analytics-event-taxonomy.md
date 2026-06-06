# Analytics Event Taxonomy · MuseumCollect

**Doc owner**: 项目主理人
**Last updated**: 2026-06-05
**Status**: v0 spec — event schema for V1 launch (Sprint 6+). Will be re-validated after 100 用户真实使用 produce first usable cohort.
**Word count**: ~1700

---

## 0. 为什么写这份文档(answering auditor question #5)

cold-audit 拷问原话:

> "Show me your event schema. When a user opens artifact.html, what events fire and what properties do they carry? How do you tell activated vs churned in week 1?"

这份是产品 instrumentation spec —— V1 launch 前需要落到代码 (`event-bus.js` 已有 client-side UI event,但**那是 UI event 不是 product event**)。

Product event 跟 UI event 的差别:
- **UI event**: "用户点了 X 按钮"(供前端 component decoupling)
- **Product event**: "用户完成了一次 collection_added 行为"(供产品决策 / cohort / funnel)

后者需要 schema discipline、property 规范、跨 session join 能力 — 这份文档定义后者。

---

## 1. Event 分类总览

**11 个 V1 必埋事件**,分 5 类:

| 类 | 事件 | 频次 |
|---|---|---|
| **Lifecycle** | `app_opened`, `app_backgrounded` | 高频 |
| **Acquisition** | `signup_completed`, `referral_received` | 一次性 |
| **Activation (NSM input)** | `scan_initiated`, `scan_completed`, `collection_added`, `dimension_unlocked` | 中频 |
| **Engagement** | `artifact_viewed`, `dimension_browsed` | 中高频 |
| **Habit / Retention** | `notification_opened`, `share_initiated` | 低频 |

(`share_initiated` 跨在 Habit 和 Acquisition 之间,需要 join `referral_received` 才完整;这是 V2 优化点。)

---

## 2. Event Schema(详细 - 11 events)

每个事件含: **Event Name · Trigger · Properties · 用于哪个 metric**

### 2.1 Lifecycle

#### `app_opened`
- **Trigger**: App 启动 / 从后台切回前台(后台 > 5 分钟)
- **Properties**:
  ```json
  {
    "user_id": "uuid",
    "session_id": "uuid (new per open)",
    "platform": "ios | android | wechat_mini | web",
    "app_version": "1.0.0",
    "open_source": "icon | notification | wechat_share | referral_link | other",
    "is_first_open": false,
    "ts": "ISO8601"
  }
  ```
- **用于**: DAU/MAU 计算 · session 锚点 · acquisition 渠道归因 · funnel start

#### `app_backgrounded`
- **Trigger**: App 退到后台 / 关闭
- **Properties**: `user_id`, `session_id`, `session_duration_seconds`, `last_page`, `ts`
- **用于**: session length(**不是 NSM,反指标**,见 `north-star.md §3`)

---

### 2.2 Acquisition

#### `signup_completed`
- **Trigger**: 完成注册(手机号 / 微信 OAuth / 其他)
- **Properties**:
  ```json
  {
    "user_id": "uuid",
    "auth_method": "phone | wechat | apple_id",
    "acquisition_channel": "qr_code_offline | bilibili_up | xiaohongshu_seo | wechat_share | direct | other",
    "qr_code_id": "string | null  // 国博/上博 partnership 二维码识别",
    "referrer_user_id": "uuid | null  // 朋友圈分享归因",
    "age_band": "13-17 | 18-24 | 25-34 | 35-44 | 45+  // 13- 拒绝注册",
    "ts": "ISO8601"
  }
  ```
- **用于**: CAC 计算(配合 channel cost)· 渠道 conversion · age cohort

#### `referral_received`
- **Trigger**: 用户通过别人分享的链接进入并最终注册
- **Properties**: `user_id`, `referrer_user_id`, `referral_content_type` (`my_museum | artifact_card | dimension_progress`), `ts`
- **用于**: 朋友圈裂变 K 系数

---

### 2.3 Activation — NSM 直接 input

这 4 个事件**直接喂 north-star.md §2 的 WAC 指标**,埋点质量决定 NSM 可信度。

#### `scan_initiated`
- **Trigger**: 用户在 scan.html 触发拍照 / 上传
- **Properties**: `user_id`, `session_id`, `source` (`hero_cta | scan_tab | artifact_share_camera`), `ts`
- **用于**: 扫码量(**不是** NSM,前置 metric)

#### `scan_completed`
- **Trigger**: AI 识别返回结果(成功或失败)
- **Properties**:
  ```json
  {
    "user_id": "uuid",
    "session_id": "uuid",
    "scan_id": "uuid",
    "outcome": "high_confidence | medium_confidence | low_confidence | failed",
    "top1_confidence": 0.0,
    "top1_artifact_id": "string | null",
    "top5_artifact_ids": ["string", "..."],
    "latency_ms": 1340,
    "image_size_bytes": 2400000,
    "ts": "ISO8601"
  }
  ```
- **用于**: P@1 / P@5 in-the-wild · latency 监测 · `product-policy-and-risks.md §2.1` confidence policy 验证

#### `collection_added` ★ NSM 触发事件
- **Trigger**: 用户把 artifact 加入"我的博物馆"
- **Properties**:
  ```json
  {
    "user_id": "uuid",
    "artifact_id": "string",
    "add_method": "from_scan | from_search | from_recommendation | from_friend_collection | manual_create",
    "scan_id": "uuid | null  // 如果来自 scan,join 回去看 top1 confidence",
    "is_first_collection_ever": false,
    "collection_size_after": 7,
    "dimension_ids": ["era_shang_late", "tech_zun"],
    "ts": "ISO8601"
  }
  ```
- **用于**: **WAC 直接计算** · D7 activation rate · 维度覆盖 cohort

#### `dimension_unlocked`
- **Trigger**: 用户在某个维度上达到一定收藏数(如商代晚期 ≥ 3 件)
- **Properties**: `user_id`, `dimension_id`, `unlock_threshold` (e.g., 3), `total_dimensions_unlocked`, `ts`
- **用于**: gamification 进度 · habit input(每多解锁一个维度 → W2 retention 上升 X%)

---

### 2.4 Engagement

#### `artifact_viewed`
- **Trigger**: 用户打开 artifact.html 或 artifact card modal
- **Properties**:
  ```json
  {
    "user_id": "uuid",
    "session_id": "uuid",
    "artifact_id": "string",
    "view_source": "scan_result | collection | recommendation | search | friend_museum | external_share",
    "is_own_collection": true,
    "dwell_seconds_estimate": null,
    "ts": "ISO8601"
  }
  ```
- **用于**: 内容消费 · cohort engagement · "外部分享回流"归因

#### `dimension_browsed`
- **Trigger**: 用户浏览某个维度页(形制 / 时代 / 地理 / 纹饰 / 铭文 / 用途 / 铸主——canonical 7+1,见 dimensional-map-v3)
- **Properties**: `user_id`, `dimension_id`, `dimension_type`, `browse_mode` (`timeline | grid | map`), `ts`
- **用于**: 维度 popularity · cohort discovery 路径

---

### 2.5 Habit / Retention

#### `notification_opened`
- **Trigger**: 用户从推送通知打开 App
- **Properties**: `user_id`, `notification_type` (`weekly_exhibit | friend_collection_update | dimension_progress_reminder | other`), `notification_id`, `ts`
- **用于**: notification CTR · habit loop validation

#### `share_initiated`
- **Trigger**: 用户主动分享(我的博物馆 / artifact / dimension)
- **Properties**:
  ```json
  {
    "user_id": "uuid",
    "share_type": "my_museum | artifact | dimension_progress",
    "share_channel": "wechat_friend | wechat_moments | weibo | xiaohongshu | copy_link | other",
    "share_target_id": "string  // artifact_id or museum_id",
    "ts": "ISO8601"
  }
  ```
- **用于**: K 系数 · 跟 `referral_received` join 算回流率

---

## 3. 关键 metric 怎么从事件计算出来

### 3.1 NSM: Weekly Active Collectors (WAC)

```sql
SELECT COUNT(DISTINCT user_id) AS WAC
FROM events
WHERE event_name = 'collection_added'
  AND ts BETWEEN $week_start AND $week_end;
```

### 3.2 D7 Activation Rate

```sql
WITH cohort AS (
  SELECT user_id, ts AS signup_ts
  FROM events
  WHERE event_name = 'signup_completed'
    AND ts BETWEEN $cohort_start AND $cohort_end
),
activated AS (
  SELECT DISTINCT c.user_id
  FROM cohort c
  JOIN events e ON e.user_id = c.user_id
  WHERE e.event_name = 'collection_added'
    AND e.ts BETWEEN c.signup_ts AND c.signup_ts + INTERVAL '7 days'
)
SELECT 
  (SELECT COUNT(*) FROM activated) * 1.0 / 
  (SELECT COUNT(*) FROM cohort) AS d7_activation_rate;
```

target: ≥ 0.30(`north-star.md §2.2`)

### 3.3 W2 Returning Collector Rate

```sql
WITH activated_cohort AS (
  SELECT user_id, MIN(ts) AS first_collect_ts
  FROM events
  WHERE event_name = 'collection_added'
  GROUP BY user_id
  HAVING MIN(ts) BETWEEN $cohort_start AND $cohort_end
),
w2_returning AS (
  SELECT DISTINCT a.user_id
  FROM activated_cohort a
  JOIN events e ON e.user_id = a.user_id
  WHERE e.event_name = 'collection_added'
    AND e.ts BETWEEN a.first_collect_ts + INTERVAL '7 days' 
                 AND a.first_collect_ts + INTERVAL '14 days'
)
SELECT 
  (SELECT COUNT(*) FROM w2_returning) * 1.0 / 
  (SELECT COUNT(*) FROM activated_cohort) AS w2_retention;
```

target: ≥ 0.40(`north-star.md §2.3`)

### 3.4 In-the-wild AI metrics(P@1 / P@5)

```sql
-- 用户对 scan 结果"接受"的代理: 是否 1 小时内 collection_added(且 artifact_id 匹配 top5)
WITH scan_with_outcome AS (
  SELECT 
    s.scan_id, s.user_id, s.top1_confidence, s.top1_artifact_id, s.top5_artifact_ids, s.ts,
    CASE WHEN EXISTS (
      SELECT 1 FROM events c
      WHERE c.event_name = 'collection_added'
        AND c.user_id = s.user_id
        AND c.scan_id = s.scan_id  -- direct join via scan_id linkage
        AND c.ts BETWEEN s.ts AND s.ts + INTERVAL '1 hour'
    ) THEN 1 ELSE 0 END AS user_accepted_top1,
    -- (...similar for top5)
)
-- P@1 = COUNT(user_accepted_top1=1) / COUNT(*) over scans with confidence ≥ 0.55
```

target: P@5 ≥ 0.60 in-the-wild(对齐 `ai-roadmap §6.3` lab benchmark)

### 3.5 "活跃 vs 流失"判定 (auditor 具体问题)

V1 定义:
- **Activated W1**: signup 后 D7 内 ≥ 1 `collection_added`
- **Engaged W2**: W1 activated 且 D8-D14 至少 1 个 collection_added 或 dimension_browsed
- **Churned W4**: 注册 D14-D28 内 0 `app_opened` events
- **Reactivated**: churned W4 后 D28-D90 内出现 `app_opened`

---

## 4. 实施 stack(V1)

- **Client SDK**: 自实现轻量 wrapper(微信小程序 + Web + H5 → 统一 schema)。**不用** 友盟 / GA(理由: PIPL data flow 控制 + 自有数据资产积累)
- **Pipeline**: Client → HTTPS POST → Cloud function (golang) → Kafka → BigQuery-compatible warehouse (国内可选 ClickHouse + 国际可选 BigQuery,符合 `product-policy-and-risks.md §R5`)
- **Sampling rate**: V1 100% sampling(用户量小,完整性 > cost);M3+ 部分高频 event(如 `app_opened`)降为 10% sampling 保留全样本对核心 NSM events
- **Privacy**: 所有 PII fields(phone, email)只存 hash,**不进 analytics warehouse**

---

## 5. 这份 spec 不包含什么(诚实承认)

1. **A/B testing infrastructure** — V1 不做正式 A/B,产品决策靠 cohort 对比 + 定性 user research。V2 引入 feature flag + experiment framework
2. **Funnel UI tool** — Amplitude / Heap 一类工具 V1 不接,数据存在 warehouse 后用 Looker / Metabase 自建看板
3. **Recommendation event** — V1 不做个性化推荐(只用规则 + dimension proximity),所以 `recommendation_*` 系列 events 在 V2 才需要
4. **Error / crash events** — Sentry 接入但不写本文档,属于工程稳定性领域

---

## 6. 给面试官的一句话回应

> 面试官问: "Show me your event schema. activated vs churned 怎么算?"
> 我答:
> 1. **11 个 V1 必埋 events**,分 5 类(lifecycle / acquisition / activation / engagement / habit)
> 2. NSM "Weekly Active Collectors" = `COUNT(DISTINCT user_id) WHERE event='collection_added'` over 7d
> 3. D7 Activation = "signup 后 7d 内 ≥ 1 collection_added 的用户比例",目标 ≥ 30%
> 4. Churned W4 = "注册 D14-D28 内 0 app_opened"
> 5. 关键 join: `collection_added.scan_id` ↔ `scan_completed.scan_id` 让我能算 **in-the-wild P@5**(用户实际接受 AI 输出的比例),用于 ai-roadmap §6.3 lab benchmark 的现实对照
>
> 这份 schema 跟 `north-star.md` 的 NSM 树**逐行 mapping**;**没有 NSM 树就写不出可信 schema**。这是 PM 必须先想清楚 NSM 再设计埋点的实例。

---

**Doc version**: v0 (2026-06-05, pre-Sprint 6 launch)
**Related**: `docs/north-star.md`(NSM 树,本文事件 mapping 的源)· `docs/product-policy-and-risks.md §2.3`(隐私分层 — 埋点 layer 划分依据)· `ai-service/api-contract.md`(scan_completed 的 confidence_band 字段 source-of-truth)· `demos/v3-shared/event-bus.js`(client-side UI event,跟 product event 区别详见 §0)
