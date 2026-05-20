/* =========================================================
   data.js — Persona B 沉浸派
   Loads bronze-treasures-v1.json + injects 国宝独白 + 一句诗
   Mock collection state: 8/25 awakened
   ========================================================= */

(function (global) {
  'use strict';

  // ----- Mock collection state (8 awakened of 25) -----
  // Designer note: feels like a soft start, leaves emotional space.
  const COLLECTED = new Set([
    'houmuwu_ding',
    'fuhao_xiaozun',
    'he_zun',
    'li_gui',
    'lianhe_fanghu',
    'sanxingdui_dali_ren',
    'changxin_gongdeng',
    'yuewang_goujian_jian',
  ]);

  // ----- Inject 国宝独白 (literary monologues) by id -----
  // Each one: ~200-300字, first person, evocative, weaves story_brief with poetic flourish
  const MONOLOGUES = {
    houmuwu_ding: {
      poem: "鼎之轻重,未可问也。 —— 《左传·宣公三年》",
      voice: `我是后母戊鼎。\n我的身体由二十八块陶范分铸再合,凝聚一千多个工匠的手温与火光。商王祖庚为他的母亲——王后妇妌——把我浇铸出来,让她在另一个世界仍能受享。\n\n我在地下沉睡了三千二百多年。一九三九年,豫北的春夜,有人用锄头碰到了我的耳。日军逼近,村人把我重新埋回土里,又过了八年。今天,你在国博看见我,看见我身上的虎噬人头纹与饕餮的眼睛——它们替我守着这位母亲的庙号:戊。\n\n我重八百三十二公斤。我从不轻易示人。但你愿意听,我就说给你听。`
    },
    siyang_fangzun: {
      poem: "羊有跪乳之恩,鸦有反哺之义。 —— 古谚",
      voice: `我是四羊方尊。\n我从湘江的红薯地里被农人挖出来,一九三八。那一年长沙城里有人怕我落入敌手,把我装箱南运,被日机的炸弹震成二十多片碎钢。\n\n你不知道吧——一九五二,文物专家张欣如蹲在库房,用整整两个月,把我一片一片重新焊回。从此我又站起来,四只硕大卷角的羊立在我的肩,凝望四方,像我还在向商王朝的远方眺望。\n\n我并非来自殷墟。我从湘江的青铜文明里来。三千年前那里也有人铸器祭神,他们的手艺让我至今记得。`
    },
    fuhao_xiaozun: {
      poem: "邂逅相遇,适我愿兮。 —— 《诗经·郑风·野有蔓草》",
      voice: `我是妇好鸮尊。\n我属于一位女将军——殷王武丁的妻子妇好。她带兵征过土方、巴方、夷方。甲骨上记她的名字,比许多男人都多。\n\n一九七六年,郑振香站在她墓口的清晨——那是商王朝唯一未被盗扰的墓——我和四百多件铜器仍守在她身边。我立着,小耳圆目,宽喙下垂,通身刻满蝉、饕餮、蟠蛇、夔龙——这是她的尊号,也是她的铠甲。\n\n人们说我是猫头鹰的样子。可在那个时代,鸮是神鸟。妇好不是温柔,她是夜里看得清楚的人。`
    },
    da_yu_ding: {
      poem: "酒池肉林,商失天下。 —— 周人之鉴",
      voice: `我是大盂鼎。\n康王把我赐给将军盂的那一日,他想让盂记住一件事:商朝亡于酒。所以铭文里,他反复说"酒戒商鉴"。\n\n二百九十一字,写在我的腹里。那是一个王对一个将军的训诫——也是周礼的最初模样。\n\n我也曾飘零。道光年间出土,辗转潘祖荫之家。抗战时埋在地下避日寇;一九五一,潘达于女士把我捐了国家。如今我和大克鼎、毛公鼎并称"海内三宝"——可是大克鼎在上海,毛公鼎在台北。我们三人,几十年未曾再见。`
    },
    da_ke_ding: {
      poem: "积善之家,必有余庆。 —— 《易·坤·文言》",
      voice: `我是大克鼎。\n光绪十六年,陕西法门寺旁的窖藏,我和小克鼎七件、编钟一组,一千二百多件铜器一齐出土。我那时已沉睡近三千年。\n\n膳夫克——一位为周王掌管祭祀饮食的贵族——为继承祖父官位铸了我。他在我腹内刻了二百九十字,记下王的册命。\n\n潘达于女士把我和大盂鼎一同捐给国家。如今我在上博,守着一种纹饰范式——波曲纹——西周晚期那一代人,把饕餮的神性,慢慢抽象成一道道流动的弧。`
    },
    maogong_ding: {
      poem: "周虽旧邦,其命维新。 —— 《诗经·大雅·文王》",
      voice: `我是毛公鼎。\n我腹中有四百九十九字——是世界上最长的一篇青铜器铭文。那是周宣王对叔父毛公的诏书。后人说,我"抵得一篇《尚书》"。\n\n一八四三年我从岐山出土。一百多年里,我在陈介祺、端方、叶恭绰之手流转。抗战时叶氏家族把我密藏沪上,日军翻箱倒柜也未找到。\n\n一九四八年我随文物迁台,如今我立在台北故宫。每天有许多人隔着玻璃看我——他们读我腹中的字,是宣王对叔父说的话,也是一个三千年前的王对未来的人说的话。`
    },
    sanshi_pan: {
      poem: "井井有条,各正其分。 —— 《周礼》",
      voice: `我是散氏盘。\n我腹里有三百五十七字,记着矢国侵略散国之后,被迫赔偿土地的协议——这是中国最早的"土地契约"。\n\n田界怎么划,谁来作证,盟誓在哪一天——都在我身上。三千年前两个小国为了一片土地的争与和,我替他们留了证据。\n\n我的字写得散逸自由,字字错落,像极了风吹过松林。后世金文书法家爱临我——他们说我自由。其实,我只是写下了一份和解。`
    },
    he_zun: {
      poem: "宅兹中国,自之乂民。 —— 何尊铭",
      voice: `我是何尊。\n一九六五年,我被当作废铜,以三十块钱卖到了宝鸡的废品收购站。文物干部佟太放从一堆废金属里把我抢救出来。\n\n十年后,马承源在我尊底除锈——他看见了那一百二十二字铭文。其中四个字让全场屏息:"宅兹中国"。\n\n那是"中国"这两个字,作为合成词,最早的一次出现。\n\n周成王在洛邑营建成周,武王克商,这些事都写在我腹里。我不大,只有三十八公分高,十四公斤重。可你看我,你看见的是这个国家最初的名字。`
    },
    li_gui: {
      poem: "时日曷丧?予及汝皆亡。 —— 商人之怨",
      voice: `我是利簋。\n一九七六年,陕西临潼。那一年,我属于一位叫"利"的将领——他参加过武王伐纣。\n\n我内底有三十二个字:"武王征商,惟甲子朝,岁鼎。"——意思是,武王伐纣的牧野之战,发生在甲子日的清晨,木星正当头顶。\n\n这是天文学家可以验证的话。后人据此把牧野之战定于公元前一〇四六年二月二十日。\n\n我替一个将军记住了那一天的天空——三千年前的清晨,木星照着一支正在改朝换代的军队。`
    },
    guoji_zibai_pan: {
      poem: "薄伐玁狁,至于太原。 —— 《诗经·小雅·六月》",
      voice: `我是虢季子白盘。\n我长一百三十七厘米,是现存最大的青铜盘——你看我,造型像一只巨大的浴缸。\n\n宣王十二年,前八一六年,虢季子白奉命征伐玁狁。他在洛水北岸大胜,斩首五百,俘获五十。周王赐他车马弓矢,他铸了我以记功。\n\n我也曾在地下埋了七十年——刘铭传家族为护我,屡次拒绝列强、军阀索取。一九四九年,他们把我献给了国家。\n\n这一百一十一字,是一支胜利之师的回响。我替他记到今天。`
    },
    lianhe_fanghu: {
      poem: "鹤鸣于九皋,声闻于天。 —— 《诗经·小雅·鹤鸣》",
      voice: `我是莲鹤方壶。\n我的盖顶,立着一只展翅欲飞的仙鹤——它正要振翅,凝在了三千年前的那一刻。\n\n一九二三年,我从郑公大墓里被挖出。墓主早已不知是谁,我和我的同伴(另一件莲鹤方壶,现在故宫)一对两件,分藏南北。\n\n郭沫若先生看见我,说我象征着"时代之精神"——商周的肃穆神秘,在我这里,慢慢转向春秋的生动与人间。\n\n那只仙鹤,是青铜从神性走向人性的第一次振翅。`
    },
    yuewang_goujian_jian: {
      poem: "卧薪尝胆,十年生聚,十年教训。 —— 越王故事",
      voice: `我是越王勾践剑。\n一九六五年,我在湖北江陵的楚墓出土。出土那一刻,我的剑光仍寒,试纸应手而断——埋藏地下两千四百年,我没生一丝锈。\n\n我属于越王勾践——那个卧薪尝胆的人。"越王鸠浅自作用剑"八个鸟篆,错金嵌在剑身。\n\n我为什么在楚国的墓里?学界主流推测:越楚联姻,越王女儿陪嫁,我跟着她到了江陵。\n\n我是兵器,也是一个王者的名字。两千多年里我藏在地下,等一个能听懂我的人。`
    },
    zenghouyi_bianzhong: {
      poem: "钟鼓既设,一朝飨之。 —— 《诗经·小雅·彤弓》",
      voice: `我是曾侯乙编钟。\n我共有六十五件,分三层八组挂在七米四八长的曲尺形钟架上,总重四千四百多公斤。\n\n一九七八年,我从湖北随州擂鼓墩里出来。出来的那一刻,音律俱在——这是公元前五世纪的乐律。\n\n我每一钟能发两个音,十二律俱全,可奏五声、六声、七声音阶。三千七百五十五字铭文,记着我每钟的音高与各国律名对照——这是世界上最早、最完整的乐律学文献。\n\n你看着我不出声。可只要钟杵一击,我就回到曾侯乙的宴会,回到那个有楚惠王熊章赠予的、铭文上还留着他名字的下午。`
    },
    zenghouyi_zunpan: {
      poem: "玲珑剔透,神工鬼斧。 —— 后世品鉴",
      voice: `我是曾侯乙尊盘。\n我的口沿,布满层层叠叠、互相缠绕的透空蟠螭——这是范铸法做不到的。学界论证了很久,最后确定:我是中国已知最早大规模使用失蜡法的青铜器。\n\n这意味着,公元前五世纪的曾国工匠,已经能用蜡塑出极复杂的镂空模型,然后烧蜡浇铜,造出别人造不出的形状。\n\n我的盘里可注热水或冰块,让尊中的酒得以温/冷——这是战国早期的生活美学。\n\n人们看见我,先是惊,然后是问:这真的能做出来吗?能。请相信古代工匠。`
    },
    cuojin_boshanlu: {
      poem: "蓬莱方丈,神山仙境。 —— 汉人想象",
      voice: `我是错金博山炉。\n我的炉盖,塑成层峦叠嶂的博山——汉人想象中的神仙居所。山间有猎人,有奔兽,有神兽,香烟自山缝缭绕而出,在房间里营造一座小小的蓬莱。\n\n炉身,以金丝错出云气纹——这是西汉错金工艺的巅峰。\n\n一九六八年,我从河北满城中山靖王刘胜墓里出土。刘胜爱酒爱美人,也爱想象自己上仙山。他死后,把我留在了墓里——希望在另一个世界,香烟仍能给他一座云山。`
    },
    changxin_gongdeng: {
      poem: "宫灯一点,夜未央。 —— 长安宫意",
      voice: `我是长信宫灯。\n我原本属于窦太后,住在长信宫——所以我叫这个名字。后来窦太后把我赐给了她的孙女窦绾。\n\n我外形是一个跪坐的宫女,双手执灯。我的右臂是中空的导烟管——灯烛燃烧时,烟尘经我的右臂导入腹中,腹内贮水溶解烟尘。\n\n这是世界上最早的"环保灯"。两千两百年前的工匠,已经懂得让室内空气保持洁净。\n\n人称我"中华第一灯"。北京冬奥的火炬,从我这里取了一缕设计。我没想到,一盏宫女执着的小灯,能在两千两百年后,照到奥运的火光里。`
    },
    matafeiyan: {
      poem: "天马来,从西极,涉流沙,九夷服。 —— 汉武帝《天马歌》",
      voice: `我是马踏飞燕。\n一九六九年,甘肃武威。有人在挖防空洞,挖到了我。\n\n我三足腾空,右后蹄踏一飞鸟,那只飞鸟扭头惊视,反衬我之奔速——我全身的重量,只压在一只飞鸟的一点之上。这是力学的杰作,也是想象的杰作。\n\n东汉的工匠,把一匹天马的奔腾凝固在了瞬间。一九八四年,我成了中国旅游标志。\n\n人们叫我"马踏飞燕",也叫我"铜奔马"。我不在意叫什么。我只要在你看我的那一刻,仍然在奔。`
    },
    sanxingdui_dali_ren: {
      poem: "蜀道之难,难于上青天。 —— 李白《蜀道难》",
      voice: `我是三星堆青铜大立人。\n我高二米六二,重一百八十公斤,是世界上最早、最高、最完整的青铜立人像。\n\n我双手环握,目光肃穆,身着层叠繁复的"龙袍"——满饰龙、兽面、鸟、虫——这是我的礼服。\n\n你看不见我手里握的东西——那东西早已不见。学者们说,可能是牙璋,可能是玉琮,可能是象牙。\n\n我来自古蜀。我们的文明,独立于中原的商。我们也有自己的神,自己的祭祀,自己的王。三千两百年前,我立在神坛上;三千两百年后,我立在博物馆里。我未曾动过。`
    },
    sanxingdui_zongmu_mianju: {
      poem: "其目纵,是为蚕丛。 —— 《华阳国志》",
      voice: `我是三星堆纵目面具。\n我的双眼瞳孔呈圆柱状外凸长达十六厘米,我的双耳尖长上挑七十厘米。\n\n《华阳国志》写古蜀始祖蚕丛"其目纵"。学者们看了我以后说:可能就是他。\n\n也有人说我象征"千里眼顺风耳"——超凡的视听。一个能看见远方的神。\n\n我太重了,挂不到任何人的脸上。我应该是挂在神殿木柱上,以神之眼,俯视下方的祭祀场域——看着那些人为我点起的香烟和鲜血。`
    },
    sanxingdui_shenshu: {
      poem: "扶桑既出,十日并照。 —— 《山海经》",
      voice: `我是三星堆青铜神树。\n我高三米九六,是迄今最大的单体青铜文物。\n\n我分三层,每层三枝,共九枝。每枝顶端有一果一鸟——共九鸟二十七果。一头铜龙沿我的主干向下蜿蜒。\n\n《山海经》写"扶桑",写"建木",写九日栖于树枝,神鸟轮流出巡——你看,那些都在我身上。\n\n我出土时碎成两千四百七十九片。文物修复师杨晓邬,用十年时间,把我重新立起来。\n\n三千两百年前,古蜀人相信:有一棵树能沟通天与地。他们造了我。他们把我藏起来。三千两百年后,有人把我从地里挖出来——他知道我们还需要一棵这样的树。`
    },
    zilong_ding: {
      poem: "礼,经国家,定社稷,序民人,利后嗣。 —— 《左传》",
      voice: `我是子龙鼎。\n我通高一百零三公分,口径八十公分,重二百三十公斤——是商代圆鼎之最。\n\n人说我和后母戊鼎并称——商代圆鼎之王、方鼎之王。\n\n我的口沿有"子龙"二字铭文。"龙"字,是迄今所见鼎类青铜器铭文中最早的"龙"。\n\n一九二〇年代,我从河南辉县出土,随后流落海外——先到日本,再到香港。二〇〇六年,国家把我抢救回归。八十年的漂泊,终于回家。`
    },
    siyangshou_bu: {
      poem: "羊角不羁,云水之态。 —— 湘江青铜",
      voice: `我是四羊首铜瓿。\n我的肩部装饰着四只立体羊首——与四羊方尊同属湘江流域的商代青铜文明。\n\n关于我的资料并不多。出土的时间、地点,都模糊不清。我从湖南的某一个地方走出来,被湖南博物院收藏,然后等着有人来发现我。\n\n如果你有一天来到湖南博,请站在我面前停一下。我也想被你看见。`
    },
    longxing_gong: {
      poem: "鼍鼓逄逄,蒙瞍奏公。 —— 《诗经·大雅·灵台》",
      voice: `我是龙形觥。\n我的造型,像一只停泊的龙舟。前端的龙头双目突出,长牙外露——这是商代山西方国的风格。\n\n一九七六年,山西灵石县旌介村,一座商代墓葬。\n\n我身上满饰鼍纹——扬子鳄。这种纹饰在中原青铜器中极罕见。它告诉我们,三千年前,山西的山里有沼泽,沼泽里有鳄鱼。\n\n气候变了,鳄鱼走了。可我身上的鼍纹还在,替那片消失的沼泽,守着记忆。`
    },
    qin_tongchema: {
      poem: "六合一统,车同轨,书同文。 —— 秦人之业",
      voice: `我是秦陵铜车马。\n我有两乘:一号立车,二号安车。我们合起来,重两千三百多公斤,是迄今出土最大、最完整、最精美的青铜车马。\n\n秦始皇要让我和他一起去另一个世界——他相信,在那个世界里,他仍是天下之主,仍需要车驾出行。\n\n一九八〇年我从他陵的封土西侧出来,出土时碎成三千多片。修复师花了八年,把我重新拼起来。\n\n我的比例是真车马的一半。秦人对帝王的尊敬,从一辆小一半的车里都能看出。`
    },
    shangyang_fangsheng: {
      poem: "治国有常,而利民为本。 —— 《淮南子》",
      voice: `我是商鞅方升。\n我很小——长十八点七公分,高二点三二公分,可以拿在手里。可我是秦国法定的一升。\n\n公元前三四四年,商鞅亲自督造我。他在我的器壁三面刻下"十六又五分一立方寸为一升"——这是秦国对全国说的话:从此,一升,就是这么大。\n\n后来秦始皇统一六国,前二二一年,他在我底部加刻了统一度量衡的诏书。\n\n我经历了两个伟大的时刻——商鞅变法的开端,和秦始皇统一的完成。一个小小的量器,记下了一个时代。`
    },
  };

  // ----- Site coordinates (古国地图) -----
  const SITE_COORDS = {
    "殷墟": { x: 590, y: 280, label: "殷·安阳", desc: "商王朝最后的都城" },
    "周原": { x: 410, y: 320, label: "周·岐山", desc: "西周王畿之地" },
    "丰镐": { x: 450, y: 360, label: "丰镐", desc: "西周都城" },
    "二里头": { x: 550, y: 310, label: "二里头", desc: "夏都·青铜文明的萌芽" },
    "二里岗": { x: 570, y: 300, label: "郑·二里岗", desc: "商早期都城" },
    "三星堆": { x: 360, y: 460, label: "古蜀·广汉", desc: "独立于中原的青铜文明" },
    "金沙": { x: 365, y: 475, label: "古蜀·成都", desc: "古蜀晚期" },
    "盘龙城": { x: 540, y: 460, label: "盘龙城", desc: "商早期南方方国" },
    "新干大洋洲": { x: 595, y: 510, label: "赣·新干", desc: "南方青铜重镇" },
    "侯马": { x: 510, y: 280, label: "晋·侯马", desc: "晋国都城" },
    "江陵": { x: 550, y: 490, label: "楚·江陵", desc: "楚国都城" },
    "随州": { x: 575, y: 470, label: "曾·随州", desc: "曾侯乙墓所在" },
    "临淄": { x: 660, y: 320, label: "齐·临淄", desc: "齐国都城" },
    "凤翔": { x: 430, y: 340, label: "秦·凤翔", desc: "秦国早期都城" },
    "绍兴": { x: 690, y: 500, label: "越·绍兴", desc: "越王勾践之国" },
    "宝鸡": { x: 420, y: 335, label: "周·宝鸡", desc: "西周文物重镇" },
    "雷台": { x: 270, y: 280, label: "凉·武威", desc: "马踏飞燕出土地" },
    "满城": { x: 605, y: 230, label: "中山·满城", desc: "西汉中山靖王" },
    "上海博物馆": { x: 695, y: 410, label: "现·上博", desc: "现代馆藏" },
    "新郑": { x: 565, y: 320, label: "郑·新郑", desc: "郑国故地" },
    "灵石": { x: 510, y: 270, label: "晋·灵石", desc: "商代方国" },
    "临潼": { x: 440, y: 350, label: "秦·临潼", desc: "秦陵所在" },
  };

  // Map artifact site (string) to one of the SITE_COORDS keys
  function siteKeyFor(artifact) {
    const site = artifact.excavation_site || "";
    if (site.includes("殷墟") || site.includes("武官村") || site.includes("安阳")) return "殷墟";
    if (site.includes("岐山") || site.includes("董家村") || site.includes("礼村") || site.includes("扶风")) return "周原";
    if (site.includes("宝鸡") && !site.includes("岐山")) return "宝鸡";
    if (site.includes("三星堆") || site.includes("广汉")) return "三星堆";
    if (site.includes("金沙")) return "金沙";
    if (site.includes("二里头")) return "二里头";
    if (site.includes("郑州") || site.includes("二里岗")) return "二里岗";
    if (site.includes("江陵")) return "江陵";
    if (site.includes("随州") || site.includes("擂鼓墩")) return "随州";
    if (site.includes("满城")) return "满城";
    if (site.includes("武威") || site.includes("雷台")) return "雷台";
    if (site.includes("临潼")) return "临潼";
    if (site.includes("临淄")) return "临淄";
    if (site.includes("凤翔")) return "凤翔";
    if (site.includes("绍兴")) return "绍兴";
    if (site.includes("新郑") || site.includes("郑公")) return "新郑";
    if (site.includes("灵石")) return "灵石";
    if (site.includes("辉县")) return "二里岗"; // proxy
    if (site.includes("宁乡")) return "盘龙城"; // proxy for 湘江
    return "周原";
  }

  // Pure derived helpers
  function isCollected(id) { return COLLECTED.has(id); }
  function getMonologue(id) { return MONOLOGUES[id] || { poem: "", voice: "" }; }
  function getCollectedCount() { return COLLECTED.size; }
  function getTotalCount() { return state.catalog ? state.catalog.length : 25; }

  function rarityTier(artifact) {
    const r = artifact.rarity_level || "";
    if (r.includes("禁止出境")) return 5;
    if (r.includes("国宝")) return 4;
    if (r.includes("一级")) return 3;
    if (r.includes("二级")) return 2;
    if (r.includes("三级")) return 1;
    return 0;
  }
  function isForbiddenExport(artifact) { return (artifact.rarity_level || "").includes("禁止出境"); }
  function isTreasure(artifact) { return rarityTier(artifact) >= 4; }

  // ---- Dynasty data for the time-pillar (heights ∝ years) ----
  const DYNASTIES = [
    { key: "夏", label: "夏", years: 250, range: "约 -1750 ~ -1600", color: "#3b3a2a", poem: "禹疏九河,初定中国。" },
    { key: "商", label: "商", years: 554, range: "约 -1600 ~ -1046", color: "#4a2a24", poem: "天命玄鸟,降而生商。" },
    { key: "西周", label: "西周", years: 275, range: "约 -1046 ~ -771", color: "#4a3a24", poem: "周虽旧邦,其命维新。" },
    { key: "春秋", label: "春秋", years: 295, range: "约 -771 ~ -476", color: "#3a3a24", poem: "鹤鸣于九皋,声闻于天。" },
    { key: "战国", label: "战国", years: 255, range: "约 -476 ~ -221", color: "#2a3a24", poem: "钟鼓既设,一朝飨之。" },
    { key: "秦", label: "秦", years: 15, range: "约 -221 ~ -206", color: "#2a2a3a", poem: "六合一统,车同轨。" },
    { key: "西汉", label: "西汉", years: 210, range: "约 -206 ~ 8", color: "#3a2a3a", poem: "蓬莱方丈,神山仙境。" },
    { key: "东汉", label: "东汉", years: 195, range: "约 25 ~ 220", color: "#4a2a3a", poem: "天马来,从西极。" },
  ];

  // Match an artifact's dynasty value to a key
  function dynastyKeyFor(artifact) {
    const d = (artifact.dynasty || "").trim();
    if (d === "夏") return "夏";
    if (d === "商") return "商";
    if (d === "西周") return "西周";
    if (d === "东周") return "春秋";
    if (d === "春秋") return "春秋";
    if (d === "战国") return "战国";
    if (d.includes("战国") && d.includes("秦")) return "秦";
    if (d === "秦") return "秦";
    if (d === "西汉") return "西汉";
    if (d === "东汉") return "东汉";
    return "商"; // fallback
  }

  // ---- Silhouette map: artifact id -> filename under /assets/silhouettes/ ----
  // Added 2026-05-20 H10 by builder-iterator-v2 per merged-spec §1.
  // Used when imageUrlFor returns null (e.g. sanxingdui_zongmu_mianju with bad image),
  // and as the visual fallback layer beneath wikimedia <img> (so a 404 still shows器型, not gradient).
  const SILHOUETTE_BY_ID = {
    houmuwu_ding:           'fangding',
    siyang_fangzun:         'fang_zun',
    fuhao_xiaozun:          'xiao_zun',
    da_yu_ding:             'yuanding',
    da_ke_ding:             'yuanding',
    maogong_ding:           'yuanding',
    sanshi_pan:             'pan',
    he_zun:                 'fang_zun',
    li_gui:                 'gui',
    guoji_zibai_pan:        'pan',
    lianhe_fanghu:          'fanghu',
    yuewang_goujian_jian:   'yuewang_jian',
    zenghouyi_bianzhong:    'bianzhong',
    zenghouyi_zunpan:       'fang_zun',
    cuojin_boshanlu:        'fanghu',
    changxin_gongdeng:      'changxin_gongdeng',
    matafeiyan:             'sanxingdui_dali_ren',
    sanxingdui_dali_ren:    'sanxingdui_dali_ren',
    sanxingdui_zongmu_mianju:'sanxingdui_zongmu',
    sanxingdui_shenshu:     'sanxingdui_dali_ren',
    zilong_ding:            'yuanding',
    siyangshou_bu:          'fang_zun',
    longxing_gong:          'fanghu',
    qin_tongchema:          'sanxingdui_dali_ren',
    shangyang_fangsheng:    'pan',
  };

  function silhouetteKeyFor(a) {
    if (!a) return 'yuanding';
    if (SILHOUETTE_BY_ID[a.id]) return SILHOUETTE_BY_ID[a.id];
    const f = (a.form_subtype || a.type || '');
    if (f.includes('方鼎')) return 'fangding';
    if (f.includes('鼎'))   return 'yuanding';
    if (f.includes('簋'))   return 'gui';
    if (f.includes('鸮'))   return 'xiao_zun';
    if (f.includes('方尊')) return 'fang_zun';
    if (f.includes('尊'))   return 'fang_zun';
    if (f.includes('壶'))   return 'fanghu';
    if (f.includes('盘'))   return 'pan';
    if (f.includes('钟'))   return 'bianzhong';
    if (f.includes('剑'))   return 'yuewang_jian';
    if (f.includes('灯'))   return 'changxin_gongdeng';
    if (f.includes('立人')) return 'sanxingdui_dali_ren';
    if (f.includes('面具')) return 'sanxingdui_zongmu';
    return 'yuanding';
  }

  function silhouetteUrl(a) {
    // Try multiple roots; the page that loads this is at demos/v1-B-immersive/<page>.html
    // Relative path "../../assets/silhouettes/..." works from there.
    const key = silhouetteKeyFor(a);
    return '../../assets/silhouettes/' + key + '.svg';
  }

  // ---- Image fallback for offline / failed-to-load demo ----
  // Use Wikimedia thumbnail patterns when known
  function imageUrlFor(artifact) {
    const map = {
      houmuwu_ding: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Houmuwu_ding.jpg/640px-Houmuwu_ding.jpg",
      siyang_fangzun: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Si_Yang_Fang_Zun%2C_Shang_Dynasty.jpg/640px-Si_Yang_Fang_Zun%2C_Shang_Dynasty.jpg",
      fuhao_xiaozun: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Owl-shaped_Zun_from_the_tomb_of_Fu_Hao.jpg/640px-Owl-shaped_Zun_from_the_tomb_of_Fu_Hao.jpg",
      da_yu_ding: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Dayu_ding.jpg/640px-Dayu_ding.jpg",
      da_ke_ding: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Da_Ke_ding.jpg/640px-Da_Ke_ding.jpg",
      maogong_ding: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mao_Gong_Ding_fully.JPG/640px-Mao_Gong_Ding_fully.JPG",
      sanshi_pan: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/San_Shi_Pan.jpg/640px-San_Shi_Pan.jpg",
      he_zun: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/He_zun_back.jpg/640px-He_zun_back.jpg",
      li_gui: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Li_Gui.jpg/640px-Li_Gui.jpg",
      guoji_zibai_pan: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Guoji_Zibai_pan.jpg/640px-Guoji_Zibai_pan.jpg",
      lianhe_fanghu: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lotus_and_Crane_Square_Pot.jpg/640px-Lotus_and_Crane_Square_Pot.jpg",
      yuewang_goujian_jian: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sword_of_Goujian.jpg/640px-Sword_of_Goujian.jpg",
      zenghouyi_bianzhong: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Bianzhong_of_Marquis_Yi_of_Zeng.jpg/640px-Bianzhong_of_Marquis_Yi_of_Zeng.jpg",
      zenghouyi_zunpan: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Zenghouyi_Zunpan.jpg/640px-Zenghouyi_Zunpan.jpg",
      cuojin_boshanlu: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Boshanlu.jpg/640px-Boshanlu.jpg",
      changxin_gongdeng: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Changxin_Palace_Lamp.jpg/640px-Changxin_Palace_Lamp.jpg",
      matafeiyan: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Galloping_Horse_Treading_on_a_Flying_Swallow.jpg/640px-Galloping_Horse_Treading_on_a_Flying_Swallow.jpg",
      sanxingdui_dali_ren: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Large_bronze_standing_figure_of_Sanxingdui.jpg/480px-Large_bronze_standing_figure_of_Sanxingdui.jpg",
      // sanxingdui_zongmu_mianju: 原 Bronze_head_from_Sanxingdui.JPG 实为青铜头像,非纵目面具,已移除。fallback 使用 silhouette。
      sanxingdui_zongmu_mianju: null,
      sanxingdui_shenshu: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Sanxingdui_Sacred_Tree.jpg/480px-Sanxingdui_Sacred_Tree.jpg",
      qin_tongchema: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Qin_bronze_chariots.jpg/640px-Qin_bronze_chariots.jpg",
    };
    return map[artifact.id] || null;
  }

  // ---- Public state holder ----
  const state = {
    catalog: null,
    ready: null,
  };

  async function loadCatalog() {
    const candidates = [
      "../../data/curated/bronze-treasures-v1.json",
      "../data/curated/bronze-treasures-v1.json",
      "/data/curated/bronze-treasures-v1.json",
      "./data/curated/bronze-treasures-v1.json",
    ];
    for (const p of candidates) {
      try {
        const r = await fetch(p);
        if (r.ok) {
          state.catalog = await r.json();
          return;
        }
      } catch (_) {}
    }
    console.warn("[data.js] failed to load catalog");
    state.catalog = [];
  }

  state.ready = loadCatalog();

  // ---- Persona-B identity ----
  const PERSONA = {
    name: "苏念",
    age: 32,
    city: "杭州",
    bio: "中文系。听一件器物,胜过千言万语。",
    passport_no: "甲编 · 〇〇八三七",
    title_main: "夔龙派 · 初识",
    titles: ["夔龙派初识", "饕餮慕者", "鼎之听者"],
    quote: "我等过三千年,你来看我。"
  };

  // -------- Export --------
  global.MCData = {
    ready: state.ready,
    get catalog() { return state.catalog || []; },
    COLLECTED,
    MONOLOGUES,
    SITE_COORDS,
    DYNASTIES,
    PERSONA,
    isCollected,
    getMonologue,
    getCollectedCount,
    getTotalCount,
    rarityTier,
    isForbiddenExport,
    isTreasure,
    siteKeyFor,
    dynastyKeyFor,
    imageUrlFor,
    silhouetteUrl,
    silhouetteKeyFor,
    SILHOUETTE_BY_ID,
  };
})(typeof window !== "undefined" ? window : globalThis);
