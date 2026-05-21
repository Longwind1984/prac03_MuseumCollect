
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

