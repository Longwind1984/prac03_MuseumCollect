
---

## Segment 3: 东周 (春秋 + 战国) — DE-3
> 生成时间: 2026-05-21 H2-3
> 覆盖: 6 件 v1 升级 + 55 件新增 = 61 件
> 维护人: data-engineer-v3-dongzhou

### 全局声明(同 v1)
- 文本字段(结构化事实): 主要来源 Wikipedia EN，许可 CC BY-SA 4.0，再分发须 attribute。
- 图片 URL: 全部指向 Wikimedia Commons 类目页(Category:)，非具体文件。使用前须逐张确认单文件许可。
- 博物馆官网(湖北省博、河北博物院、河南博物院、上海博物馆、故宫博物院、山西博物院、四川博物院等): 仅作事实交叉验证，不再分发其图片或长段文字。
- MET Open Access(子犯和钟): CC0，可自由使用，仍须注明出处。

---

### 6 件 v1 升级记录

#### lianhe_fanghu (莲鹤方壶) — UPGRADED
- Text: Wikipedia EN "Lotus and Crane Vase" (CC BY-SA 4.0) + China Online Museum
- 新增字段: patterns_structured / 郭沫若评语注明来源
- Images: Commons Category:Lotus_and_Crane_Square_Pot (各文件许可不一)
- Reference only: 故宫博物院官网, 河南博物院官网

#### yuewang_goujian_jian (越王勾践剑) — UPGRADED
- Text: Wikipedia EN "Sword of Goujian" (CC BY-SA 4.0)
- 新增字段: patterns_structured / craft 详细拆解
- Images: Commons Category:Sword_of_Goujian
- Reference only: 湖北省博物馆官网

#### zenghouyi_bianzhong (曾侯乙编钟) — UPGRADED
- Text: Wikipedia EN + UNESCO Memory of the World (public document)
- 新增字段: patterns_structured / 2024年UNESCO入录
- Images: Commons Category:Bianzhong_of_Marquis_Yi_of_Zeng (132 files)

#### zenghouyi_zunpan (曾侯乙尊盘) — UPGRADED
- Text: Smarthistory (CC BY-NC-SA) — **注意**: Smarthistory 为 CC BY-NC-SA，非商业用途可用；商业再分发须换源
- 新增字段: patterns_structured / inscription char_count 修正
- Images: Commons Category:Zenghouyi_Zunpan

#### longxing_gong (龙形觥) — UPGRADED (v1已有，朝代属商，保留)
- 无实质字段变化，补充 patterns_structured

#### shangyang_fangsheng (商鞅方升) — UPGRADED (v1已有，朝代属战国/秦，保留)
- 无实质字段变化，补充 patterns_structured

---

### 55 件新增记录许可摘要

| artifact_id | 主要文本来源 | 图片来源 | 风险等级 |
|---|---|---|---|
| wangziwu_ding | Wikipedia EN | Commons Category:Wang_Zi_Wu_Ding | 低 |
| zhongshan_wang_cuo_ding | Wikipedia EN (King Cuo of Zhongshan) | Commons Category:Zhongshan_bronzes | 低 |
| zhongshan_wang_cuo_fanghu | Wikipedia EN | Commons Category:Zhongshan_bronzes | 低 |
| zhongshan_wang_cuo_yuanhu | Wikipedia EN | Commons Category:Zhongshan_bronzes | 低 |
| zhongshan_zhaoyutu_tongban | Wikipedia EN (Zhongshan Bronze Plates) | Commons Category:Zhongshan_bronzes | 低 |
| wusun_fuzhai_zhong | 湖北省博物馆(ref only) | Commons Category:Hubei_Provincial_Museum | 中(馆方官网ref) |
| zifu_he_zhong | MET Open Access (CC0) | MET Open Access | **最低(CC0)** |
| wuwang_fucha_mao | Wikipedia EN (Spear of Fuchai) | Commons Category:Hubei_Provincial_Museum | 低 |
| wuwang_guang_jian | Wikipedia EN (Sword of Helü) | Commons Category:Hubei_Provincial_Museum | 低 |
| yuewang_zhezhi_yusi_jian | Wikipedia ZH + 浙博(ref only) | Commons Category:Zhejiang_Museum | 中(ZH维基) |
| cuojinyin_niaoshu_tonghu | 上博官网(ref only) | Commons Category:Shanghai_Museum_bronzes | 中(官网ref) |
| zhanguo_yanle_yulie_gongzhan_tonghu | Wikipedia EN + 国博(ref only) | Commons Category:National_Museum_of_China | 低 |
| lehe_fanghu_er | 河南博物院(ref only) | Commons Category:Henan_Museum | 中(官网ref) |
| cuojin_xiniudaigou | 故宫官网(ref only) | Commons Category:Palace_Museum_bronzes | 中(官网ref) |
| zhongshan_hushi_lu_tongpingzuo | Wikipedia EN (Zhongshan bronzes) | Commons Category:Zhongshan_bronzes | 低 |
| zhongshan_guizuo_ren_qideng | 河北博物院(ref only) | Commons Category:Zhongshan_bronzes | 中(官网ref) |
| cuojin_jihewen_fangjian | 故宫官网(ref only) | Commons Category:Palace_Museum_bronzes | 中(官网ref) |
| baoshan_chumu_tongqi_zu | Wikipedia EN (Baoshan tombs) | Commons Category:Hubei_Provincial_Museum | 低 |
| chu_zhenmu_shou | Wikipedia EN (Antlered wooden tomb guardian) | Commons Category:Bianzhong_Marquis_Yi | 低 |
| ba_shu_tongmao | Wikipedia EN (Ba-Shu script) | Commons Category:Sichuan_Museum | 低 |
| ba_ren_hunniu_chunyu | Wikipedia EN (Ba people) | Commons Category:Sichuan_Museum | 低 |
| shu_wang_ge | 四川博物院(ref only) | Commons Category:Sichuan_Museum | 中(官网ref) |
| caihou_shen_bianzhong | Wikipedia EN (Cai state) | Commons Category:Anhui_Provincial_Museum | 低 |
| caihou_shen_fangjian | 安徽省博物馆(ref only) | Commons Category:Anhui_Provincial_Museum | 中(官网ref) |
| panhu_wen_chunqiu_biaozhunqi | 上博官网(ref only) | Commons Category:Shanghai_Museum_bronzes | 中(官网ref) |
| panchimen_tonghu_chunqiu | 山西博物院(ref only) | Commons Category:Shanxi_Museum | 中(官网ref) |
| zhi_junzi_jian | Wikipedia EN (Zhi clan) | Commons Category:Palace_Museum_bronzes | 低 |
| huang_zhi_ding | Wikipedia EN (Huang state) | Commons Category:Henan_Museum | 低 |
| zhanguo_ding_zu_liding | Wikipedia EN (Marquis Yi of Zeng) | Commons Category:Bianzhong_Marquis_Yi | 低 |
| zhanguo_gui_zu | Wikipedia EN (Marquis Yi of Zeng) | Commons Category:Bianzhong_Marquis_Yi | 低 |
| chunqiu_jin_ding_zu | Wikipedia EN (Houma foundry site) | Commons Category:Shanxi_Museum | 低 |
| qin_guo_tongqi_zu | Wikipedia EN (Duke of Qin No.1 Tomb) | Commons Category:Shaanxi_History_Museum | 低 |
| qi_guo_tong_dou | 山东博物馆(ref only) | Commons Category:Shandong_Museum | 中(官网ref) |
| zhanguo_han_guo_tongqi | 河南博物院(ref only) | Commons Category:Henan_Museum | 中(官网ref) |
| zhanguo_zhao_tongqi | Wikipedia EN (Zhao state) | Commons Category:Hebei_bronzes | 低 |
| zhanguo_wei_tongqi | Wikipedia EN (Wei state) | Commons Category:National_Museum_of_China | 低 |
| yan_guo_tongqi | Wikipedia EN (Yan state) | Commons Category:Capital_Museum_Beijing | 低 |
| zhanguo_chu_tong_fudou | 湖北省博(ref only) | Commons Category:Bianzhong_Marquis_Yi | 中(官网ref) |
| chunqiu_wu_yue_tong_ju_zu | Wikipedia EN (Wu state) | Commons Category:Suzhou_Museum | 低 |
| zhongshan_wang_cuo_cuojinyin_huzhixing | Wikipedia EN (Zhongshan bronzes) | Commons Category:Zhongshan_bronzes | 低 |
| chunqiu_tongge_ming | 陕西历史博物馆(ref only) | Commons Category:Shaanxi_History_Museum | 中(官网ref) |
| zhanguo_lihe_tongpan | 湖南博物院(ref only) | Commons Category:Hunan_Museum | 中(官网ref) |
| cuojin_banshe_tonghu | 湖北省博(ref only) | Commons Category:Bianzhong_Marquis_Yi | 中(官网ref) |
| zhanguo_niushouwenhu | 山东博物馆(ref only) | Commons Category:Shandong_Museum | 中(官网ref) |
| zhanguo_cuojinyin_tongdaigou_zu | Wikipedia EN (Belt hook) | Commons Category:Zhongshan_bronzes | 低 |
| chu_wang_yizhang_ge | 上博官网(ref only) | Commons Category:Shanghai_Museum_bronzes | 中(官网ref) |
| chu_wang_xiongfu_fangdou | 上博官网(ref only) | Commons Category:Shanghai_Museum_bronzes | 中(官网ref) |
| chu_wang_yanren_ding | 故宫官网(ref only) | Commons Category:Palace_Museum_bronzes | 中(官网ref) |
| zhanguo_tongrenqishou | Wikipedia EN (Zhongshan bronzes) | Commons Category:Zhongshan_bronzes | 低 |
| zhanguo_niaoshou_tongyu | 山西博物院(ref only) | Commons Category:Shanxi_Museum | 中(官网ref) |
| chunqiu_wuyue_tongjian | 南京博物院(ref only) | Commons Category:Nanjing_Museum | 中(官网ref) |
| zhanguo_tongfang_tongqian | 湖北省博(ref only) | Commons Category:Bianzhong_Marquis_Yi | 中(官网ref) |
| zhanguo_chu_qin_tongli_zu | 湖北省博(ref only) | Commons Category:Bianzhong_Marquis_Yi | 中(官网ref) |
| zhanguo_tongliubo_qi | Wikipedia EN (Liubo) | Commons Category:Hebei_Museum | 低 |
| zhongshan_wang_tonglu | Wikipedia EN (Zhongshan bronzes) | Commons Category:Zhongshan_bronzes | 低 |

---

### 开放许可风险汇总 (Segment 3)

**CC0 (最安全)**
- 子犯和钟 (zifu_he_zhong): MET Open Access CC0

**CC BY-SA 4.0 Wikipedia (安全,须attribution)**
- 共约30件主要文本来源为Wikipedia EN

**中风险 (官网ref-only)**
- 约25件文本部分参考了博物馆官网进行事实验证，已标注"reference only"，**不再分发**其官网文字
- Smarthistory (曾侯乙尊盘): CC BY-NC-SA，**商业项目须注意 NC 条款**

**图片待处理**
- 所有图片 URL 仍为 Commons 类目页，Builder 阶段必须点进具体 File 页确认各文件许可
- **不得**使用各博物馆官网图片


---
## Segment 5: 边远文化 + 海外馆藏 (data-engineer-v3-frontier, 2026-05-21)

### A. 巴蜀文化

## artifact_id: tiger_chun_yu
- Field: size,excavation_year,excavation_site,purpose → 中国数字科技馆 (公开信息，reference only)
- Field: general → Wikipedia zh 巴国 (CC BY-SA, attribute required)
- Image: Wikimedia Commons File:Chunyu_with_tiger_knob.jpg → CC BY-SA, attribute required

## artifact_id: bashu_sword_tiger
- Field: all → Wikipedia zh 小田溪墓群 (CC BY-SA, attribute required)

## artifact_id: xiaotianxi_bianzhong
- Field: all → 上游新闻 (公开信息，reference only)

## artifact_id: bashu_luojia_lei
- Field: excavation_site,dynasty → 四川省文物考古研究院 (reference only)

## artifact_id: shu_wang_ge
- Field: general → 四川博物院官网 (reference only)

## artifact_id: bashu_copper_seal
- Field: excavation_site → Wikipedia zh 小田溪墓群 (CC BY-SA, attribute required)

### B. 滇文化

## artifact_id: shizhai_zhubei
- Field: all → Wikipedia zh 杀人祭柱场面贮贝器 (CC BY-SA, attribute required)

## artifact_id: niuhu_tongan
- Field: size,excavation_year,excavation_site,purpose → Wikipedia zh 牛虎铜案 (CC BY-SA, attribute required)
- Field: story → 中新网 (reference only)

## artifact_id: dian_wang_gold_seal
- Field: size,inscription,excavation → Wikipedia zh 滇王之印 (CC BY-SA, attribute required)
- Field: purpose,story → 中国国家博物馆官网 (reference only, do NOT redistribute images)

## artifact_id: dabona_copper_coffin
- Field: size,excavation_year,craft → Wikipedia zh 云雷鸟兽纹铜棺 (CC BY-SA, attribute required)

## artifact_id: shizhai_rider_gilt
- Field: general → 澎湃新闻 (reference only)

## artifact_id: dian_bronze_zu
- Field: excavation_site → 云南网 (reference only)

### C. 北方草原

## artifact_id: ordos_tiger_gold_plaque
- Field: excavation_year,excavation_site → 宾大博物馆PDF (reference only, academic use)

## artifact_id: ordos_deer_plaque
- Field: size → 内蒙古日报PDF (reference only)

## artifact_id: ordos_bronze_sword
- Field: general → 知乎 (reference only)

## artifact_id: yanglang_bronze_helmet
- Field: general → 吉林大学论文PDF (academic reference only)

## artifact_id: inner_mongolia_wolf_plaque
- Field: general → 知乎 (reference only)

### D. 百越/江浙

## artifact_id: yue_wang_jian
- Field: all → Wikipedia zh 越王者旨于睗剑（浙江省博物馆藏）(CC BY-SA, attribute required)

## artifact_id: yue_gou_diao
- Field: excavation_year,excavation_site → 浙江在线新闻 (reference only)

## artifact_id: wuyue_bronze_mirror
- Field: general → 澎湃新闻 (reference only)

### E. 闽越/南越

## artifact_id: nanyue_wrong_gold_tiger
- Field: inscription,purpose → 360doc (reference only)
- Field: excavation_site → Wikipedia zh 南越文王墓 (CC BY-SA, attribute required)

## artifact_id: nanyue_fangyu_ding
- Field: all → Wikipedia zh 南越文王墓 (CC BY-SA, attribute required)

## artifact_id: nanyue_bronze_jian
- Field: excavation_site → Wikipedia zh 南越文王墓 (CC BY-SA, attribute required)

### F. 夜郎

## artifact_id: yelang_bronze_fu
- Field: excavation_site,purpose → 贵州省人大网 (reference only)

## artifact_id: yelang_bronze_drum
- Field: excavation_site → 丝绸之路网 (reference only)

### G. 海外馆藏 — 大都会博物馆 (MET)
NOTE: All MET objectIDs listed below are from MET Open Access program.
Data and images are CC0 (Public Domain) — free commercial use, no attribution required (but recommended).

## artifact_id: met_shang_gong_owl (objectID 44781)
- Field: all → MET Open Access (CC0) https://www.metmuseum.org/art/collection/search/44781
- Image: MET Open Access CC0 — fully free for redistribution

## artifact_id: met_shang_jue_nipple (objectID 61034)
- Field: all → MET Open Access (CC0) https://www.metmuseum.org/art/collection/search/61034
- Image: MET Open Access CC0

## artifact_id: met_western_zhou_gui (objectID 61318)
- Field: all → MET Open Access (CC0) https://www.metmuseum.org/art/collection/search/61318
- Image: MET Open Access CC0

## artifact_id: met_shang_ritual_altar (objectID 76974)
- Field: all → MET Open Access (CC0) https://www.metmuseum.org/art/collection/search/76974
- Image: MET Open Access CC0

## artifact_id: met_shang_zun_wine (objectID 61323)
- Field: all → MET Open Access (CC0) https://www.metmuseum.org/art/collection/search/61323
- Image: MET Open Access CC0

## artifact_id: met_western_zhou_hu (objectID 44515)
- Field: all → MET Open Access (CC0) https://www.metmuseum.org/art/collection/search/44515
- Image: MET Open Access CC0

### H. 海外馆藏 — 大英博物馆
NOTE: British Museum images are CC BY-NC-SA 4.0 — NON-COMMERCIAL only. Do NOT use in commercial products without license.

## artifact_id: bm_double_ram_zun (accession 1936,1118.1)
- Field: size,accession,excavation → 大英博物馆 Collections Online (CC BY-NC-SA 4.0)
- Field: technical → ResearchGate academic paper (reference only)
- Image: BM Collections Online CC BY-NC-SA 4.0 — NON-COMMERCIAL only

## artifact_id: bm_shang_gui (accession 1936,1118.2)
- Field: accession,dynasty → 大英博物馆 Collections Online (CC BY-NC-SA 4.0)
- Image: BM Collections Online CC BY-NC-SA 4.0 — NON-COMMERCIAL only

## artifact_id: bm_western_zhou_food_set (康侯簋)
- Field: inscription,story → Wikipedia EN Kang Hou gui (CC BY-SA, attribute required)

## artifact_id: bm_shang_you_tiger (accession 1936,1118.4)
- Field: accession,dynasty,excavation_site → 大英博物馆 Collections Online (CC BY-NC-SA 4.0)
- Image: BM Collections Online CC BY-NC-SA 4.0 — NON-COMMERCIAL only

### I. 海外馆藏 — 弗利尔/赛克勒 (Smithsonian)
NOTE: Smithsonian Open Access = CC0 for most digitized objects.

## artifact_id: freer_elephant_he (F1936.6a-b)
- Field: size,accession,story → Smithsonian National Museum of Asian Art (CC0) https://asia.si.edu/object/F1936.6a-b/
- Image: Smithsonian CC0 — fully free for redistribution

## artifact_id: freer_shang_fangding
- Field: general → Smithsonian National Museum of Asian Art (CC0)

## artifact_id: freer_zhou_zun
- Field: general → Smithsonian National Museum of Asian Art (CC0)

## artifact_id: sackler_shang_you
- Field: general → Smithsonian National Museum of Asian Art (CC0)

### J. 海外馆藏 — 波士顿美术馆 (MFA Boston)
NOTE: MFA Boston images require separate licensing for commercial use.

## artifact_id: mfa_boston_zhou_zun
- Field: size,dynasty,type → MFA Boston Collection (reference only for commercial; CC for non-commercial with attribution)
- URL: https://www.mfa.org/collections/object/ritual-wine-vessel-zun-8667

## artifact_id: mfa_boston_shang_ceremonial_zun
- Field: general → MFA Boston Collection (reference only)

### K. 海外馆藏 — 巴黎吉美
NOTE: Guimet images copyright Musée Guimet — reference only.

## artifact_id: guimet_elephant_zun (EO 1545)
- Field: size,accession,story → 吉美博物馆官网 (reference only, do NOT redistribute images)
- Field: origin → Alain R. Truong blog (reference only)

## artifact_id: guimet_western_zhou_vessel
- Field: general → 吉美博物馆官网 (reference only)

### L. 海外馆藏 — 东京/京都

## artifact_id: tokyo_tnm_shang_gong
- Field: general → TNM Chinese Bronzes Item List (reference only)

## artifact_id: senoku_tiger_you
- Field: story,excavation_year → 澎湃新闻 (reference only)
- Field: general → Wikipedia EN Sen-oku Hakuko Kan (CC BY-SA, attribute required)

### M. 综合补遗

## artifact_id: shi_song_gui
- Field: inscription,dynasty,story → 人民网 (reference only)

## artifact_id: bu_qi_gui
- Field: inscription,story → 知乎 (reference only)

## artifact_id: yong_yu
- Field: general → 上海博物馆/人民网 (reference only)

## artifact_id: hu_gui_gai
- Field: inscription,story → 雅墨客网 (reference only)

## artifact_id: shi_xiong_gui
- Field: general → 故宫博物院官网 (reference only)

## artifact_id: zhongshan_wrong_gold_fang_an
- Field: size,excavation_year,craft,story → 访北京网 (reference only)

## artifact_id: zhongshan_wrong_silver_rhino
- Field: size,excavation_year,story → 河北博物院文章 (reference only)

## artifact_id: zenghhouyi_zun_pan
- Field: size,inscription,craft,story → Wikipedia zh 曾侯乙青铜尊盘 (CC BY-SA, attribute required)

## artifact_id: fuhao_bronze_fang_jia
- Field: inscription,purpose,story → 中国国家博物馆官网 (reference only, do NOT redistribute images)

## artifact_id: zenghhouyi_bingjiаn
- Field: size,craft,story,purpose → Wikipedia zh 曾侯乙铜鉴缶 (CC BY-SA, attribute required)

---
### License Summary for Segment 5
| License Type | Count | Notes |
|---|---|---|
| CC0 (MET, Smithsonian) | 10 records | Fully free incl. commercial |
| CC BY-SA (Wikipedia) | 20 records | Attribution required |
| CC BY-NC-SA (British Museum) | 4 records | NON-COMMERCIAL only |
| Reference only (museum sites, news) | 21 records | Fact reference, no image redistribution |
