# Builder B · 沉浸派 Demo — 青·铜

> Built for **Persona B 苏念**(32 岁,杭州内容运营,《国家宝藏》圈粉).
> A demo where **the experience is the product** — not the information.

---

## Design Philosophy(100 字)

苏念不要信息,她要画面、声音、人情。所以这一版的论点是:**博物馆 App 不是图录,是一卷可以走进去的长卷**。一屏一件,一句诗。把每件国宝当成一个 200 字独白的有名有姓的"它"——不是数据库里的条目。视觉上深色烛火,衬线书法,大量留白;交互上 cinematic fade、慢速 ken-burns、火光摇曳。游戏化用"已唤醒 X 件"的诗意,不用"+1000 经验"。

---

## How to view

Pure static HTML. Open `index.html` directly in browser (file://) OR via local server:

```bash
cd /home/user/prac03_MuseumCollect
python3 -m http.server 8000
# → open http://localhost:8000/demos/v1-B-immersive/index.html
```

Images load from Wikimedia Commons URLs; if any fail, an SVG placeholder with the artifact's name renders in its place — still legible.

---

## Pages(8 / 8)

| Page | What it is | Why it matters for 苏念 |
|------|------------|------------------------|
| `index.html` | 沉浸式 landing,大图 + 一句诗 | 30 秒内说:这不是淘宝,这是博物馆的另一个夜晚 |
| `catalog.html` | 三种"穿越长卷":时代 / 古国 / 用途 | 不是表格,是被卷动着走的诗集 |
| `artifact.html` | 单件详情:大 hero + 国宝独白 + 场景 + 工艺长卷 + 5 段时光卷 | 这是苏念会截图发小红书的页 |
| `time-pillar.html` | 时空柱按朝代时长真实拉伸 | 商五百五十四年,西周二百七十五——身体能感觉到 |
| `ancient-map.html` ★ | **古国穿越图** — 顶部 6 朝代切换,版图与国名漂移 | 商 + 三星堆同时活着的视觉震撼 |
| `purpose-scene.html` ★ | **礼器归位场景** — 宗庙等距视图,九鼎八簋拖拽到位 | 等级判定:你的鼎够诸侯之礼 |
| `me.html` | 我的青铜之旅:个人印章 + 时光长卷 + 足迹 + 称号 | "苏念之卷"诗意呈现,适合朋友圈分享 |
| `scan.html` | 唤醒一件国宝:mock 识别四种场景 | high/medium/OCR/no_match 都用诗意语言包装 |

---

## Components implemented(7 / 10)

| Component spec | Where | Persona-B treatment |
|----------------|-------|--------------------|
| **古国地图 (穿越切换)** ★ | `ancient-map.html` | 顶部夏/商/西周/春秋/战国/秦汉切换;水墨晕染底图;每个遗址点 hover 出"召唤"文案;海外流散单做朝圣护照页 |
| **礼器归位场景** ★ | `purpose-scene.html` | Isometric 宗庙 SVG 场景,火光摇曳,九鼎/八簋/酒器/水器位置,等级判定(士/大夫/诸侯/天子)|
| **工艺长卷** | `artifact.html` (横向滚) | 范铸/失蜡/错金各自分镜,横向 scroll-snap,做旧米黄底 |
| **朝圣护照 (海外流散页)** | `ancient-map.html` 底部 | 仿日本朱印帳,做旧米黄,"流散篇"配"本应在家"克制叙事 |
| **时空柱 (诗意时间)** | `time-pillar.html` | 高度严格 ∝ 朝代时长;空白段缓慢呼吸闪烁;每段配诗 (《诗经》/《左传》) |
| **稀有度光晕** | 全局 layer | `.halo-treasure` CSS 类:金边 + 双层 box-shadow + 缓慢呼吸光晕;朱砂"国之重器"印章 |
| **国宝独白 (inscription-reader 的沉浸变形)** | `artifact.html` 主区 | 每件 200-300 字第一人称独白 + drop-cap + 音频播放器占位 + 朗诵波形 |

Components not implemented(B 沉浸派不需要的): pattern-tree(树状图对沉浸派太工程化), form-genealogy(分类对沉浸派太"图书馆"), caster-profile(整合进了独白与场景叙事中)

---

## Persona-B differentiation choices

### Visual
- **深色烛火 palette**: 墨黑 `#0d0c0a` 主底,朱砂 `#a02c2c` 印章,金 `#d4a857` 光晕,丝绸 `#f4ebd9` 文字
- **字体**: Source Han Serif / 思源宋体 + STKaiti 楷书做诗句
- **大量留白**: 一屏一件;每段独白前都有"— 标题 —"装饰线 + 笔触分隔符
- **慢速动效**: ken-burns 28s 循环,fade-in 1.6-2.6s,呼吸 4-8s,wisp 烟雾 8s

### Information density
- **极低** — 二级页常常仅一张图 + 一句诗 + 一段独白
- 三段独白拆成三个 `<p>`,行高 2.2,letter-spacing 0.08em — 像在读散文,不是查信息

### Game mechanics
- **隐式诗意**: "已唤醒 8/25" 不显示在 fanfare,只一行小字
- **空白叫"未唤醒"**: 灰度滤镜 + 缓慢辉光 + 底部"未 唤 醒"小字,而不是"未解锁"
- **等级判定有故事感**: 太牢场景里"你的鼎够诸侯之礼" + 周礼引用,而不是 XP 进度条

### Hard rules respected
- 一屏一件: 每个主页中央或者只有一件器物 + 一句诗,或一个清晰的主视觉(地图/柱/场景)
- 极致留白: 容器多用 `max-w-3xl`/`max-w-4xl` 居中,左右各留 80px+ padding

---

## Mock state

- **8 / 25 collected** (in `data.js: COLLECTED`):
  - 后母戊鼎、妇好鸮尊、何尊、利簋、莲鹤方壶、三星堆青铜大立人、长信宫灯、越王勾践剑
- Picked to span: 商 (3) / 西周 (2) / 春秋 (1) / 古蜀 (1) / 西汉 (1) — covers visual variety in maps and pillar
- 17 uncollected are rendered in "sleeping" state (灰度 + 缓慢辉光),emphasizing "still waiting for you"

---

## Trade-offs

1. **No real audio**: 国宝独白模块有"播放" UI 但 mock — 实际产品里会接 TTS。Cost vs polish trade.
2. **Drag-and-drop is click-to-place**: 礼器归位采用"点选 + 点位"代替原生 HTML5 拖拽(SVG 内拖拽体验不稳),功能等价。
3. **Some images may fail**: Wikimedia URLs sometimes 404 — SVG placeholder with artifact name kicks in. Acceptable for demo.
4. **Pattern-tree and form-genealogy 没做**: 这两个对苏念太 "教科书";她要场景与故事。如果时间允许后续可补,但优先级低。
5. **Map projection是 stylized**: 不是精确 GIS;用毛笔晕染 + 文字位置传达"古地图"质感而不是精度。

---

## Files

```
demos/v1-B-immersive/
├── README.md                        ← this file
├── index.html                       ← landing
├── catalog.html                     ← 穿越长卷 (三种维度)
├── artifact.html                    ← 单件详情 + 国宝独白
├── time-pillar.html                 ← 时空柱
├── ancient-map.html                 ← 古国漫游 + 朝圣护照
├── purpose-scene.html               ← 礼器归位 ★ 杀手
├── me.html                          ← 我的青铜之旅
├── scan.html                        ← 唤醒一件 (mock recognition)
├── css/
│   └── immersive.css                ← 主题样式
└── js/
    ├── data.js                      ← 数据 + 25 件独白
    ├── ui.js                        ← 共享 header/footer 渲染
    └── mock-recognition.js          ← copied from ai-service/
```

---

## Page I'm proudest of

`purpose-scene.html` —— 它是 spec 里直接点名的 "Builder B 沉浸派的杀手锏"。我把它做成:
- Isometric 宗庙 SVG 场景,屋顶 + 立柱 + 神主居中
- 火光在祭坛两侧摇曳(SVG `<animate>` 让火苗实际跳动)
- 九鼎 + 八簋 + 四酒器 + 二水器,共 23 位
- 收藏面板在右侧,点选 + 点位放置(click-to-place 代替不稳定的 SVG 拖拽)
- **等级判定**: 士/大夫/诸侯/天子,根据归位鼎数动态变换 + 周礼引用
- 下方"列鼎制度"卡片做教育,但每张卡只有 1-2 句诗,毫不啰嗦

它把 spec 里"礼制不是知识,是动作"那个论点真的落了下来。

---

**Builder**: B (沉浸派)
**Date**: 2026-05-20 · Phase 3 · Night Run D0
**For**: 苏念,32,杭州
