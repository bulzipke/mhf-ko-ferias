/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
var SkillForm = (function (document){
//ヴァージョンチェック
if (document.getElementById("version").firstChild.nodeValue !== "20190429") alert("정상적으로 작동하지 않을 가능성이 있습니다. 새로고침하거나 캐시를 삭제해 주세요.");
//固定
var CK_IE6 = typeof document.documentElement.style.maxHeight === "undefined";
var CK_IE9 = false;
/*@if (@_jscript_version == 10) //IE10
	CK_IE9 = true;
@elif (@_jscript_version == 9) //IE9
	CK_IE9 = true;
@elif (@_jscript_version == 5.8) //IE8
	CK_IE9 = false;
@else
	CK_IE9 = false;
@end
@*/

var CK_MAC = navigator.userAgent.toUpperCase().indexOf("MAC") !== -1,
	I_bNAME = 0,I_bSEX = 1,I_bTYPE = 2,I_bRARE = 3,I_bGR = 4,I_bF = 5,I_bW = 6,I_bT = 7,I_bD = 8,I_bI = 9,I_bSN1 = 10,I_bSP1 = 11,I_bSN2 = 12,I_bSP2 = 13,I_bSN3 = 14,I_bSP3 = 15,I_bSN4 = 16,I_bSP4 = 17,I_bSN5 = 18,I_bSP5 = 19,I_bUPGBACK = 20,I_bRECIPE1 = 21,I_bHR1 = 22,I_bLVUPPTN = 23,I_bLVMAX = 24,I_bZENY = 25,I_bDEF = 26,I_bSLOT1 = 27,I_bSLOT7 = 28,I_bZENYPTN = 29,I_bDEFPTN = 30,I_bSLOTPTN = 31,I_bUPGCNT = 32,I_bCRE = 33,I_bDEC = 34,I_bCLASS = 35,I_bTrSLOT = 36,I_bTeni = 37,I_bDOC = 38,I_bIMG = 39,
	I_sID = 0,I_sLV = 1,I_sS1 = 2,I_sS2 = 3,I_sS3 = 4,I_sT1 = 5,I_sT2 = 6,I_sT3 = 7,
	I_iSozai1 = 0,I_iSozai2 = 1,I_iSozai3 = 2,I_iSozai4 = 3,I_iSozai5 = 4,I_iSozai6 = 5,I_iSozai7 = 6,I_iHR1 = 7,I_iHR2 = 8,I_iHR3 = 9,I_iHR4 = 10,I_iHR5 = 11,I_iHR6 = 12,I_iHR7 = 13,
	BUINAME = ["head","body","arm","wst","leg","deco"],
	MY_SET_PARTS = ["buki","head","body","arm","wst","leg","cuff"],
	MAKENAME = {"":"",1:"",2:"수렵단",3:"카페",4:"과금",5:"특전","-":"",e:"이벤트",es:"이벤트/수위전",s:"수위전",t:"수련도",u:"요격전",m:"헌터축제",c:"파로네",g:"가챠",k:"키트",i:"위타천",p:"패키지"},
	CLASSTYPE = {"":" ",A:"ＳＰ",B:"강종",C:"천람",D:"패종",E:"ＨＣ",F:"수호",G:"G패종",H:"열종",I:"Ｇ급",J:"G수호",K:"비전",L:"G비전",M:"시종",N:"천랑",O:"천유",P:"천이",Q:"천이수호",
					SP:"A",HC:"E",Shugo:"FJQ",GClass:"IJPQ",Gosyu:"B",Tenran:"C",Hasyu:"DG",Resyu:"H",Sisyu:"M",Tenro:"N"},
	TYPENAME = ["공용","검사","거너"],
	SEXNAME = ["남녀","남자한정","여자한정"],
	TENFUNAME = ["없음","속성추가","상태추가","회심추가","탄추가","","","","","","","","","","","","","[한손]진공 회전참","[쌍검]칼등치기","[대검]수평 베기","[대검]가드 베기Ⅰ","[대검]가드 베기Ⅱ","[태도]관통 찌르기","[총창]전진올려베기","[추]차지 이동술Ⅰ","[추]차지 이동술Ⅱ","[추]차지 이동술Ⅲ","스턴치","소리폭탄 범위 확대"],
	TENKOKUNAME = ["없음","예리도UP","스킬UP","공격력UP","속성·상태UP","거리 보정","강격병UP","방어력UP","대미지 경감","체력 자동 회복","Ｇ급방어구","돌진 강화"],
	TENINAME = ["없음","스킬 슬롯 확장+1","스킬 슬롯 확장+2","스킬 슬롯 확장+3","스킬 슬롯 확장+4","스킬 슬롯 확장+5","스킬 슬롯 확장+6","스킬 슬롯 확장+7","회심전환 강화+1","회심전환 강화+2","교격 강화+1","교격 강화+2","속성특효 강화","전광석화 강화+1","전광석화 강화+2","절대영도 강화","절대영도 강화","귀마개 강화+1","귀마개 강화+2","귀마개 강화+3","풍압 강화+1","풍압 강화+2","풍압 강화+3","풍압 강화+4","흔들림방지 강화+1","흔들림방지 강화+2","내독 강화+1","내독 강화+2","내마비 강화+1","내마비 강화+2","내수면 강화+1","내수면 강화+2","흡혈 강화+1","흡혈 강화+2","극물취급달인 강화","지원 강화","탄환절약술 강화+1","탄환절약술 강화+2","가드성능 강화+1","가드성능 강화+2","적응격 강화+1","적응격 강화+2","격려 강화+1","격려 강화+2","반사 강화+1","반사 강화+2","반사 강화+3","칼날회피 강화","혈기활성 강화","인내 강화","갈! 강화","난타 강화","돌진 강화"],
	MST_Equip = {},MST_Item = {},MST_Series_List = [],MST_Deco_List = [],MST_Item = setItem();
setItem = null;
var MST_Skill_List = [
["공격 계열",[161/*剛撃*/,21/*攻撃*/,155/*一匹狼*/,169/*一閃*/,18/*達人*/,205/*閃転*/,173/*痛撃*/,207/*巧撃*/,197/*属撃*/,202/*変撃*/,190/*劇物の心得*/,47/*特殊攻撃*/,220/*怪奇*/,111/*火属性攻撃*/,112/*水属性攻撃*/,113/*雷属性攻撃*/,114/*氷属性攻撃*/,115/*龍属性攻撃*/,142/*属性攻撃*/,50/*爆弾強化*/,81/*砲術師*/,162/*鼓舞*/,85/*笛吹き名人*/,91/*体術*/,170/*逆境*/,165/*怒*/,65/*底力*/,217/*腕利き*/,222/*手練*/,116/*断食*/,128/*溜め短縮*/,179/*溜め威力*/,141/*武器捌き*/,154/*尻上がり*/,184/*適応撃*/,198/*闘覇*/,199/*血気活性*/,201/*纏雷*/,210/*贅撃*/,214/*雌伏*/,216/*猛進*/,218/*幕無*/,219/*一点突破*/,223/*獅子奮迅*/,206/*不退*/]],
["방어 계열",[164/*生命力*/,157/*反射*/,56/*防御*/,212/*要塞*/,5/*ガード性能*/,4/*自動防御*/,90/*とんずら*/]],
["체력·스태미나 계열",[31/*体力*/,7/*回復速度*/,6/*回復*/,183/*吸血*/,186/*薬草学*/,143/*気力回復*/,51/*はらへり*/,67/*スタミナ*/,71/*食事*/,16/*食いしん坊*/]],
["검사 계열",[45/*研ぎ師*/,15/*斬れ味*/,194/*巧流*/,159/*刀匠*/,32/*匠*/,118/*爆撃剣*/,120/*猛毒剣*/,121/*麻痺剣*/,122/*睡眠剣*/,123/*火炎剣*/,124/*水激剣*/,125/*雷神剣*/,126/*氷結剣*/,127/*龍王剣*/,129/*片手剣技*/,130/*双剣技*/,131/*大剣技*/,132/*太刀技*/,133/*鎚技*/,134/*狩猟笛技*/,135/*槍技*/,136/*銃槍技*/,211/*剣斧技*/,187/*穿龍棍技*/,224/*磁斬鎚技*/,147/*剣術*/,200/*剣神*/]],
["거너 계열",[171/*射手*/,38/*通常弾強化*/,11/*貫通弾強化*/,23/*散弾強化*/,39/*通常弾追加*/,12/*貫通弾追加*/,24/*散弾追加*/,60/*榴弾追加*/,8/*拡散弾追加*/,108/*毒瓶追加*/,109/*麻痺瓶追加*/,110/*睡眠瓶追加*/,172/*装着*/,196/*穏射*/,68/*装填数*/,160/*速射*/,62/*連射*/,28/*装填*/,52/*反動*/,176/*扇射*/,69/*精密射撃*/,34/*弾調合*/,180/*弾丸節約術*/,213/*狙撃*/,221/*空隙*/,137/*重銃技*/,138/*軽銃技*/,139/*弓技*/]],
["상태이상계",[46/*毒*/,57/*麻痺*/,25/*睡眠*/,148/*耐状態異常*/,13/*気絶*/,74/*脱臭*/,75/*耐雪*/,79/*声帯*/,146/*対防御DOWN*/,149/*耐酔*/,204/*爆破耐性*/,151/*磁力耐性*/,150/*結晶耐性*/,208/*凍結耐性*/]],
["내성 계열",[26/*全耐性ＵＰ*/,53/*火耐性*/,58/*水耐性*/,76/*氷耐性*/,10/*雷耐性*/,59/*龍耐性*/]],
["보호계",[156/*三界の護り*/,36/*聴覚保護*/,77/*耐震*/,54/*風圧*/,49/*盗み無効*/,30/*耐暑*/,29/*耐寒*/,152/*警戒*/,73/*地形*/,215/*超回避*/,64/*回避性能*/,178/*回避距離*/,95/*受け身*/,9/*審判*/,102/*根性*/,191/*絶対防御*/]],
["아이템·조합 계열",[174/*調合師*/,66/*効果持続*/,78/*広域*/,14/*気まぐれ*/,44/*投擲*/,92/*強肩*/,175/*狩人*/,80/*肉焼き*/,40/*釣り*/,37/*調合成功率*/,61/*錬金術*/,140/*高速設置*/,166/*鉄腕*/,144/*ナイフ使い*/]],
["MAP탐지계",[35/*地図*/,27/*千里眼*/,17/*気配*/,188/*煽動*/]],
["채집운반계",[3/*運搬*/,63/*高速収集*/,22/*採取*/,72/*剥ぎ取り*/,192/*平常心*/]],
["보수 계열",[2/*運気*/,70/*モンスター*/,104/*圧力*/]],
["기타 계열",[167/*ブリーダー*/,100/*絆*/,94/*ひらめき*/,105/*捕獲上手*/,153/*救援*/,145/*いたわり*/,181/*移動速度*/,182/*喝*/,195/*支援*/,163/*恩寵*/,158/*代償*/,185/*黒ノ命脈*/,189/*炎寵*/,203/*抜納術*/,209/*氷界創生*/]]];
var MST_Skill = [
["없음",	,,									],
["낙법",	,,									],
["운기",	146,1,		,-20,161	,-10,160	,10,158	,20,159				],
["운반",	132,,				,10,97					],
["자동방어",	108,,				,10,44					],
["가드성능",	107,1,		,-15,43	,-10,42	,10,40	,20,41				],
["회복",	149,,			,-10,166	,10,165					],
["회복속도",	97,1,		,-20,30	,-10,29	,10,27	,20,28				],
["확산탄추가",	121,,				,10,68	,15,69	,20,70			],
["심판",	128,1,		,-20,91	,-10,90	,10,88	,20,89				],
["뇌내성",	137,1,	,-20,127	,-15,126	,-10,125	,10,122	,15,123	,20,124			],
["관통탄강화",	115,,				,10,55					],
["관통탄추가",	118,,				,10,59	,15,60	,20,61			],
["기절",	91,1,			,-10,9	,10,7	,20,8				],
["변덕",	145,1,		,-15,157	,-10,156	,10,154	,15,155				],
["예리도",	99,1,			,-10,32	,10,31	,20,293				],
["먹보",	125,,				,10,77	,15,78				],
["기척",	95,,			,-10,20	,10,19					],
["달인",	101,1,				,10,35	,15,36	,20,37	,35,284	,50,285	],
["광역회복",	,,									],
["광역해독",	,,									],
["공격",	126,1,				,10,79	,15,80	,25,81	,50,286	,80,287	],
["채집",	143,1,		,-15,152	,-10,151	,10,149	,15,150				],
["산탄강화",	116,,				,10,56					],
["산탄추가",	119,,				,10,62	,15,63	,20,64			],
["수면",	90,1,			,-10,6	,10,4	,20,5				],
["모든내성UP",	133,,	,-20,103	,-15,102	,-10,101	,10,98	,15,99	,20,100			],
["천리안",	148,1,				,10,163	,15,164				],
["장전",	110,1,			,-10,49	,10,46	,15,47	,20,48			],
["추위방지",	140,1,		,-20,143	,-10,142	,10,139	,15,141	,25,297			],
["더위방지",	139,1,		,-20,138	,-10,137	,10,134	,15,136	,25,296			],
["체력",	96,1,	,-20,26	,-15,25	,-10,24	,10,21	,15,22	,20,23	,30,291	,40,292	],
["장인",	100,,				,10,33					],
["씨앗광역화",	,,									],
["탄조합",	151,,				,10,172					],
["지도",	142,,				,10,147					],
["청각보호",	129,1,				,10,92	,15,93	,25,288			],
["조합성공률",	150,1,			,-10,170	,10,167	,15,168	,20,169			],
["일반탄강화",	114,,				,10,54					],
["일반탄추가",	117,,					,15,58				],
["낚시",	147,,				,10,162					],
["------",	,,									],
["------",	,,									],
["------",	,,									],
["투척",	109,,				,10,45					],
["연마도사",	104,1,			,-10,39	,10,38	,20,398				],
["독",	92,1,			,-10,12	,10,10	,20,11				],
["특수공격",	122,,				,10,71					],
["고기",	,,									],
["훔치기무효",	130,,				,10,94					],
["폭탄강화",	123,,				,10,72					],
["배고픔",	124,1,		,-15,76	,-10,75	,10,73	,15,74				],
["반동",	113,1,				,10,52	,15,53	,20,482			],
["화내성",	134,1,	,-20,109	,-15,108	,-10,107	,10,104	,15,105	,20,106			],
["풍압",	141,1,				,10,144	,15,145	,20,146	,30,349		],
["피리",	,,									],
["방어",	127,1,	,-20,87	,-15,86	,-10,85	,10,82	,15,83	,25,84	,35,294	,45,295	],
["마비",	89,1,			,-10,3	,10,1	,20,2				],
["수내성",	135,1,	,-20,115	,-15,114	,-10,113	,10,110	,15,111	,20,112			],
["용내성",	138,1,	,-20,133	,-15,132	,-10,131	,10,128	,15,129	,20,130			],
["유탄추가",	120,,				,10,65	,15,66	,20,67			],
["연금술",	152,,				,10,173					],
["연사",	112,,				,10,51					],
["고속채집",	144,,				,10,153					],
["회피성능",	154,1,				,10,177	,20,178				],
["저력",	155,,			,-15,181	,10,179	,15,180	,21,179	,30,181		],
["효과지속",	156,,			,-10,183	,10,182					],
["스태미나",	157,1,			,-10,185	,10,184	,20,289				],
["장전수",	158,,				,10,186					],
["정밀사격",	159,1,			,-10,188	,10,187	,20,290				],
["몬스터",	160,,				,10,189					],
["식사",	161,,			,-10,191	,10,190					],
["갈무리",	162,,				,15,192					],
["지형",	163,1,		,-15,196	,-10,195	,10,193	,15,194				],
["탈취",	93,,				,10,14					],
["눈사람방지",	94,,				,10,17					],
["빙내성",	136,1,	,-20,121	,-15,120	,-10,119	,10,116	,15,117	,20,118			],
["흔들림방지",	164,1,				,15,197	,25,350				],
["광역",	131,1,			,-10,385	,10,95	,20,96	,30,384			],
["성대",	165,1,				,10,198	,15,199				],
["고기굽기",	166,1,			,-10,202	,10,200	,15,201				],
["포술사",	167,1,				,10,203	,20,298	,35,299			],
["------",	168,,				,10,206	,15,205	,25,204			],
["------",	169,,			,-10,210	,10,209	,15,208	,25,207			],
["------",	170,,				,10,211					],
["피리명인",	171,,				,10,212					],
["------",	172,,				,10,213					],
["------",	173,,				,10,215	,15,214				],
["------",	174,,				,10,216					],
["------",	175,,				,10,217					],
["줄행랑",	176,,				,10,218					],
["체술",	177,1,				,10,219	,20,359				],
["강철어깨",	178,1,				,10,220	,20,360				],
["------",	179,,				,10,221					],
["번뜩임",	180,,				,10,222					],
["낙법",	181,,				,10,223					],
["------",	182,,				,10,224					],
["------",	183,,				,10,225					],
["------",	184,,				,10,226					],
["------",	185,,				,10,227					],
["인연",	186,,				,10,228					],
["------",	187,,				,10,229					],
["근성",	82,1,				,10,230	,20,231	,30,232			],
["------",	188,,				,10,233					],
["압력",	189,1,				,10,234	,20,300				],
["포획고수",	190,1,				,10,235	,20,301				],
["------",	191,,				,10,236					],
["------",	192,,				,10,237					],
["독병추가",	193,,				,10,238					],
["마비병추가",	194,,				,10,239					],
["수면병추가",	195,,				,10,240					],
["화속성공격",	196,1,				,10,241	,20,242				],
["수속성공격",	197,1,				,10,243	,20,244				],
["뇌속성공격",	198,1,				,10,245	,20,246				],
["빙속성공격",	199,1,				,10,247	,20,248				],
["용속성공격",	200,1,				,10,249	,20,250				],
["단식",	201,,				,10,251		,20,252			],
["----",	202,,				,10,253					],
["폭격검",	203,1,				,10,254	,15,255	,20,256			],
["강격검",	204,,				,10,257	,15,258	,20,259			],
["맹독검",	205,1,				,10,260	,15,261	,20,262			],
["마비검",	206,1,				,10,263	,15,264	,20,265			],
["수면검",	207,1,				,10,266	,15,267	,20,268			],
["화염검",	208,1,				,10,269	,15,270	,20,271			],
["수격검",	209,1,				,10,272	,15,273	,20,274			],
["뇌신검",	210,1,				,10,278	,15,279	,20,280			],
["빙결검",	211,1,				,10,275	,15,276	,20,277			],
["용왕검",	212,1,				,10,281	,15,282	,20,283			],
["차지단축",	213,1,			,-10,304	,10,303	,20,302				],
["한손검기",	1,,2			,-10,308	,10,307	,20,306	,30,305			],
["쌍검기",	2,,2			,-10,312	,10,311	,20,310	,30,309			],
["대검기",	3,,2			,-10,316	,10,315	,20,314	,30,313			],
["태도기",	4,,2			,-10,320	,10,319	,20,318	,30,317			],
["추기",	5,,2			,-10,324	,10,323	,20,322	,30,321			],
["수렵적기",	6,,2			,-10,328	,10,327	,20,326	,30,325			],
["창기",	7,,2			,-10,332	,10,331	,20,330	,30,329			],
["총창기",	8,,2			,-10,336	,10,335	,20,334	,30,333			],
["중총기",	12,,2			,-10,340	,10,339	,20,338	,30,337			],
["경총기",	13,,2			,-10,344	,10,343	,20,342	,30,341			],
["궁기",	14,,2			,-10,348	,10,347	,20,346	,30,345			],
["고속설치",	83,1,				,10,351	,20,352				],
["무기다루기",	79,,				,10,353					],
["속성 공격력",	80,,			,-10,355	,10,354					],
["기력회복",	81,1,			,-10,358	,10,357	,20,356				],
["나이프술",	86,1,				,10,361	,20,362				],
["보살핌",	87,,				,10,363	,15,364	,25,365			],
["대방어DOWN",	88,,				,10,366					],
["검술",	85,1,				,10,367	,20,368				],
["내상태이상",	84,1,			,-10,371	,10,369	,20,370	,30,491			],
["멀미내성",	51,,1			,-10,387	,10,386					],
["결정내성",	53,,1			,-10,389	,10,388					],
["자력내성",	54,,1			,-10,391	,10,390					],
["경계",	41,,1				,10,392					],
["구원",	49,,1				,10,393					],
["뒷심",	39,,1				,15,394					],
["일필랑",	40,,1				,10,395					],
["삼계의 수호",	30,,1				,10,399	,15,400	,20,401			],
["반사",	31,,1				,10,402	,15,403	,20,404	,16384,518		],
["대가",	28,,1				,10,396					],
["도검장인",	25,,1				,10,405	,15,406	,20,407			],
["속사",	29,,1				,15,397					],
["강격",	16,,1			,10,408	,15,409	,20,410	,30,411	,40,412	,50,524	],
["고무",	33,,1				,10,413	,20,414	,16384,517			],
["은총",	23,,1				,10,415	,20,416	,30,417			],
["생명력",	42,,1			,-10,421	,10,418	,15,419	,30,420			],
["분노",	45,,1				,15,422	,20,423				],
["철완",	46,,1				,10,424	,20,425				],
["브리더",	47,,1				,10,426					],
["맞대응",	78,,				,10,427	,20,428				],
["일섬",	17,,1				,10,429	,20,430	,30,431			],
["역경",	48,,1				,10,432	,20,433				],
["사수",	34,,1				,15,434	,20,526				],
["장착",	35,,1				,10,435	,15,436	,20,437			],
["통격",	19,,1			,-10,440	,15,439					],
["조합사",	38,,1			,-10,444	,10,441	,15,442	,20,443			],
["헌터",	50,,				,10,445	,20,446				],
["백발백중",	26,,1				,10,447	,15,448	,20,449			],
["연격(삭제)",	,,									],
["회피거리",	56,,1				,10,457					],
["차지위력",	57,,1				,10,455	,20,456				],
["탄환절약술",	58,,1				,10,453	,20,454				],
["이동속도",	59,,1				,10,451	,20,452				],
["갈!",	60,,1			,-10,459	,10,458					],
["흡혈",	61,,1				,10,460	,20,461				],
["적응격",	62,,				,10,462	,20,463				],
["흑의 명맥",	65,,1				,20,464					],
["약초학",	66,,1				,10,465					],
["천룡곤기",	10,,2			,-10,469	,10,468	,20,467	,30,466			],
["선동",	67,,				,10,471					],
["염총",	68,,1				,10,472	,15,473				],
["극물의 소양",	70,,1				,10,474					],
["절대방어",	74,,						,20,475			],
["평상심",	77,1,			,-10,478	,10,477	,15,476				],
["채집의 극치",	,,									],
["교류",	73,,1				,15,480					],
["지원",	75,,				,10,481					],
["숨고르기",	36,,1				,10,483	,15,484	,20,485			],
["속격",	20,,1			,-10,487	,10,486					],
["투혼",	76,,				,10,488					],
["혈기활성",	64,,				,10,489					],
["검신",	24,,1				,10,492	,20,493	,25,525			],
["전뢰",	21,,1				,10,494					],
["변칙",	71,,				,10,495					],
["발납술",	32,,1				,10,496	,15,497				],
["폭파내성",	52,,				,10,498					],
["섬전",	102,,1				,10,499					],
["불퇴",	15,,1				,10,501					],
["교격",	72,,1				,15,502					],
["동결내성",	55,,				,10,503					],
["절대영도",	63,,				,10,504					],
["혹사",	98,,1				,10,505					],
["검부기",	9,,2			,-10,509	,10,508	,20,507	,30,506			],
["요새",	106,,1				,10,511	,15,512				],
["저격",	111,,1				,10,513					],
["인내",	105,,1				,10,514					],
["초회피",	153,,					,15,515				],
["돌진",	22,,1				,10,516					],
["솜씨꾼",	43,,1				,15,519					],
["난타",	103,,1				,10,520					],
["일점돌파",	27,,1				,10,521					],
["기괴",	69,,1				,15,522					],
["틈새사격",	37,,1				,10,523					],
["노련함",	44,,				,10,527	,15,528				],
["사자분신",	18,,				,10,529					],
["자참추기",	11,,2			,-10,533	,10,532	,20,531	,30,530			]
];
MST_Skill[""] = [""];
MST_Skill["-"] = [""];
var MST_Skill_Exe = [
"스킬 없음","마비반감","마비무효","마비배가","수면반감","수면무효","수면배가","기절확률반감","기절무효","기절배가","독반감","독무효","독배가","탈취","탈취","------","눈사람방지","눈사람방지","------","은밀","도발","체력+10","체력+20","체력+30","체력-10","체력-20","체력-30","대미지 회복속도+1","대미지 회복속도+2","대미지 회복속도-1","대미지 회복속도-2","명검+1","무딘 날","예리도 레벨+1","------","간파+1","간파+2","간파+3","숫돌사용 고속화","숫돌성능반감","가드성능+1","가드성능+2","가드성능-1","가드성능-2","자동가드","투척기술UP","장전속도+1","장전속도+2","장전속도+3","장전속도-1","------","연사","반동경감+1","반동경감+2","일반탄·연사활 위력UP","관통탄·관통활 위력UP","산탄·확산활 위력UP","일반탄LV1 추가","일반탄 전레벨 추가","관통탄LV1 추가","관통탄LV1&2 추가","관통탄 전레벨 추가","산탄LV1 추가","산탄LV1&2 추가","산탄 전레벨 추가","철갑유탄LV1 추가","철갑유탄LV1&2 추가","철갑유탄 전레벨 추가","확산탄LV1 추가","확산탄LV1&2 추가","확산탄 전레벨 추가","상태이상공격 강화","보머","배고픔반감","배고픔무효","배고픔배가[소]","배고픔배가[대]","배부름","주워 먹기","공격력상승[소]","공격력상승[중]","공격력상승[대]","방어+20","방어+30","방어+60","방어-20","방어-30","방어-40","여신의 용서","여신의 포옹","사신의 천벌","사신의 포옹","귀마개","고급 귀마개","훔치기무효","광역화+1","광역화+2","운반의 달인","각 내성+5","각 내성+10","각 내성+20","각 내성-5","각 내성-10","각 내성-20","화내성+10","화내성+20","화내성+30","화내성-10","화내성-20","화내성-30","수내성+10","수내성+20","수내성+30","수내성-10","수내성-20","수내성-30","빙내성+10","빙내성+20","빙내성+30","빙내성-10","빙내성-20","빙내성-30","뇌내성+10","뇌내성+20","뇌내성+30","뇌내성-10","뇌내성-20","뇌내성-30","용내성+10","용내성+20","용내성+30","용내성-10","용내성-20","용내성-30","더위반감","더위무효","더위무효","더위배가[소]","더위배가[대]","추위반감","추위무효","추위무효","추위배가[소]","추위배가[대]","풍압[소]무효","풍압[대]무효","용풍압무효","지도상비","------","채집+1","채집+2","채집-1","채집-2","고속 갈무리&채집","정령의 변덕","신의 변덕","악령의 변덕","악마의 변덕","행운","격운","불운","재난","낚시명인","탐지","자동마킹","체력회복 아이템 강화","체력회복 아이템 약화","조합성공률+10%","조합성공률+15%","조합성공률+30%","조합성공률-5%","조합성공률-15%","최대탄수 생산","연금술","------","------","------","회피성능+1","회피성능+2","재난대처능력+1","재난대처능력+2","소심함","아이템 사용 강화","아이템 사용 약화","런너","거북이발","장전수UP","손떨림DOWN","손떨림UP","큰 놈 와라!","빨리 먹기","슬로우 라이프","갈무리명인","지형대미지 반감[소]","지형대미지 반감[대]","지형 대미지 증가[소]","지형 대미지 증가[대]","흔들림방지+1","성대 마비독 반감","성대 마비독 무효","굽기명인","굽기사범","자칭 굽기명인","포술사","------","------","------","------","------","------","------","------","피리명인","------","------","------","------","------","줄행랑","체술","강철어깨+1","------","번뜩임","낙법","------","------","------","------","인연","------","근성","초근성","진근성","------","압력[소]","포획고수","------","------","독병추가","마비병추가","수면병추가","화속성 공격 강화[소]","화속성 공격 강화[대]","수속성 공격 강화[소]","수속성 공격 강화[대]","뇌속성 공격 강화[소]","뇌속성 공격 강화[대]","빙속성 공격 강화[소]","빙속성 공격 강화[대]","용속성 공격 강화[소]","용속성 공격 강화[대]","아랑+1","아랑+2","--------","폭격검+1","폭격검+2","폭격검+3","강격검+1","강격검+2","강격검+3","맹독검+1","맹독검+2","맹독검+3","마비검+1","마비검+2","마비검+3","수면검+1","수면검+2","수면검+3","화염검+1","화염검+2","화염검+3","수격검+1","수격검+2","수격검+3","빙결검+1","빙결검+2","빙결검+3","뇌신검+1","뇌신검+2","뇌신검+3","용왕검+1","용왕검+2","용왕검+3","간파+4","간파+5","공격력상승[특대]","공격력상승[절대]","최고급 귀마개","절륜","노려쏘기","체력+40","체력+50","명검+2","방어+90","방어+120","열혈남녀","동장군","포술왕","포술신","압력[대]","포획명인","집중+2","집중+1","잡념","한손검기[검성]","한손검기[전수]","한손검기[달인]","한손검기[미숙]","쌍검기[쌍룡]","쌍검기[전수]","쌍검기[달인]","쌍검기[미숙]","대검기[검왕]","대검기[전수]","대검기[달인]","대검기[미숙]","태도기[도신]","태도기[전수]","태도기[달인]","태도기[미숙]","추기[둔기수]","추기[전수]","추기[달인]","추기[미숙]","수렵적기[주제]","수렵적기[전수]","수렵적기[달인]","수렵적기[미숙]","창기[천창]","창기[전수]","창기[달인]","창기[미숙]","총창기[포황]","총창기[전수]","총창기[달인]","총창기[미숙]","중총기[총선]","중총기[전수]","중총기[달인]","중총기[미숙]","경총기[총걸]","경총기[전수]","경총기[달인]","경총기[미숙]","궁기[궁귀]","궁기[전수]","궁기[달인]","궁기[미숙]","폭풍압무효","흔들림방지+2","함정술사","함정장인","무기다루기","속성 공격력 강화","속성 공격력 약화","스태미나 급속 회복[대]","스태미나 급속 회복[소]","스태미나 회복 지연","격투왕","강철어깨+2","스로잉 나이프+1","스로잉 나이프+2","보살핌+1","보살핌+2","보살핌+3","철면피","검술+1","검술+2","상태이상반감","상태이상무효","상태이상배가","한손검기[대검성]","쌍검기[대쌍룡]","대검기[대검왕]","태도기[대도신]","추기[대둔기수]","수렵적기[대주제]","창기[대천창]","총창기[대포황]","중총기[대총선]","경총기[대총걸]","궁기[대궁귀]","낙법+1","광역화+3","광역화-1","술꾼","취객","결정내성","결정약점","자력내성","자력약점","경계","구원","뒷심","고독한 늑대","대가","속사","숫돌장인","호방+1","호방+2","호방+3","반사+1","반사+2","반사+3","진면목+1","진면목+2","진면목+3","강격+1","강격+2","강격+3","강격+4","강격+5","격려+1","격려+2","은총+1","은총+2","은총+3","생명력+1","생명력+2","생명력+3","생명력-1","역린","격노","철완+1","철완+2","브리더","반격+1","반격+2","일섬+1","일섬+2","일섬+3","불굴","불요불굴","강탄+1","장착+1","장착+2","장착+3","통격","약점특효","약점미숙","조합사+1","조합사+2","조합사+3","조합사-1","헌터 생활","헌터 만끽","백발백중+1","백발백중+2","백발백중+3","회피성능+3","이동속도UP+1","이동속도UP+2","절약명인","절약달인","차지위력UP+1","차지위력UP+2","회피거리UP","붉은 혼","푸른 혼","흡혈+1","흡혈+2","적응격+1","적응격+2","최후의 흑섬","약선인","천룡곤기[천황]","천룡곤기[전수]","천룡곤기[달인]","천룡곤기[미숙]","천룡곤기[대천황]","선동","홍염의 위광+1","홍염의 위광+2","극물취급달인","절대방어태세","반석의 자세","만전의 대비","방심왕","채집의 극치","칼날회피","지원","반동경감+3","안정 사격+1","안정 사격+2","안정 사격+3","속성특효","속성미숙","투혼","혈기활성","혈기활성+2","상태이상무효[다종]","검신+1","검신+2","전광석화","상태이상추격","발납술+1","발납술+2","폭파내성","회심전환","회심전환","불퇴의 자세","교격","동결내성","절대영도","소비특효","검부기[참장]","검부기[전수]","검부기[달인]","검부기[미숙]","검부기[대참장]","요새+1","요새+2","저격","인내","초회피","돌진","격려+2","반사+3","생존 전문가","난타","일점돌파","기괴","틈새사격","강격+6","검신+3","강탄+2","노련함+1","노련함+2","사자분신","자참추기[자성]","자참추기[전수]","자참추기[달인]","자참추기[미숙]","자참추기[대자성]"
];
//関数
//検索用作成タイプ指定
var setRep = function (w){
	var d = w.c_color.checked ? "#" : "",
		t = "";
	if (!w.c_rep1.style.backgroundColor) t += "1-" + d;	//イベント
	if (!w.c_repe.style.backgroundColor) t += "1e" + d;	//イベント
	if (!w.c_repc.style.backgroundColor) t += "1c" + d;	//パネーロ
	if (!w.c_reps.style.backgroundColor) t += "1s" + d;	//狩衛
	if (!w.c_reps.style.backgroundColor && !w.c_repe.style.backgroundColor) t += "1es" + d;	//イベント+狩衛
	if (!w.c_repi.style.backgroundColor) t += "1i" + d;	//韋駄天
	if (!w.c_rept.style.backgroundColor) t += "1t" + d;	//狩煉道
	if (!w.c_rep2.style.backgroundColor) t += "2-" + d;	//猟団
	if (!w.c_rep3.style.backgroundColor) {
		t += "3-" + d;
		if (!w.c_repe.style.backgroundColor) t += "3e" + d;
		if (!w.c_repg.style.backgroundColor) t += "3g" + d;
		if (!w.c_repi.style.backgroundColor) t += "3i" + d;
	}
	if (!w.c_repm.style.backgroundColor) t += "2m" + d;	//狩人祭
	if (!w.c_repu.style.backgroundColor) t += "2u" + d;	//猟団迎撃戦
	if (!w.c_repg.style.backgroundColor) t += "4g" + d;	//ガチャ
	if (!w.c_repk.style.backgroundColor) t += "4k" + d;	//キット
	if (!w.c_rep5.style.backgroundColor) t += "5-" + d;	//特典
	if (!w.c_repp.style.backgroundColor) t += "5p" + d;	//パッケ
	return t;
};
//生産強化素材
var getSozai = function (eq){
	if (eq[I_bLVUPPTN]) {
		var list = MST_Equip.sozai[parseInt(eq[I_bLVUPPTN],16)].split(",");
		//生産の場合の素材を変更
		if (eq[I_bRECIPE1]) list[0] = eq[I_bRECIPE1];
		//HR調整
		list[7+0] = eq[I_bHR1];
		for (var i = 0;i < 6 && +list[7+i+1] < +list[7+i]; list[7+i+1] = list[7+i],i++); //1つ先が小さい場合入れ替え
		return list;
	} else { //장식품
		return [eq[I_bRECIPE1],"","","","","","",eq[I_bHR1],"","","","","",""];
	}
};
//生産強化ゼニー
var getZeny = function (eq){
	if (eq[I_bLVUPPTN]) {
		var zeny = +eq[I_bZENY],ptncd = eq[I_bZENYPTN],ptn = MST_Equip.zeny[parseInt(ptncd,16)].split(",");
		var list = [zeny];
		for (var i = 1;i < 7; i++) {
			//'いつからかなくなった
			//if (zeny === 0 ||
			//	ptn[i] % 25 === 0 || 
			//	ptn[i] === "280" || ptn[i] === "180" || ptn[i] === "8" || ptn[i] === "115" || ptn[i] === "220" ||
			//	(ptncd === "04" && ptn[i] === "10" && (zeny === 10875 || zeny === 1125)) ||
			//	(ptncd === "05" && ptn[i] === "420" && (zeny === 1000 || zeny === 1100 || zeny === 1200 || zeny === 4100 || zeny === 8000 || zeny === 8800)) ||
			//	(ptncd === "08" && (ptn[i] === "5" || ptn[i] === "15") && (zeny === 17250 || zeny === 21250))) {
				list[i] = zeny * ptn[i] / 100|0;
			//} else {
			//	list[i] = (zeny * ptn[i] / 100|0) - 1;
			//}
		}
		//生産の場合の半額に
		if (eq[I_bRECIPE1] && eq[I_bRECIPE1].indexOf("상점 판매") === -1) list[0] = zeny / 2|0;
		return list;
	} else { //장식품
		return [eq[I_bZENY],"","","","","",""];
	}
};
//防御計算
var getDef = function (eq){
	if (eq[I_bLVUPPTN]) {
		var def = +eq[I_bDEF],ptncd = eq[I_bDEFPTN],ptn = MST_Equip.def[parseInt(ptncd,16)].split(",");
		var list = [def];
		for (var i = 1;i < 7; i++) {
			if (ptn[i] === "100" ||
				ptncd === "05" && ptn[i] === "102" && def === 51 ||
				(ptn[i] * def) % 100 === 0 &&
				!(ptn[i] === "120" && (def === 25 || def === 45 || def === 50 || def === 90 || def === 100)) &&
				!(ptn[i] === "108" && (def === 25))) {
				def = def * ptn[i] / 100|0;
			} else {
				def = (def * ptn[i] / 100|0) + 1;
			}
			list[i] = def;
		}
		return list;
	} else { //장식품
		return ["","","","","","",""];
	}
};
//スロット計算
var getSlot = function (eq){
	if (eq[I_bLVUPPTN]) {
		var slot = +eq[I_bSLOT1],slotmax = +eq[I_bSLOT7],ptn = MST_Equip.slot[parseInt(eq[I_bSLOTPTN],16)].split(",");
		var list = [slot + +ptn[0],slot + +ptn[1],slot + +ptn[2],slot + +ptn[3],slot + +ptn[4],slot + +ptn[5],slot + +ptn[6]];
		for (var i = 0;i < 7; i++) {
			if (list[i] >= slotmax) list[i] = slotmax;
		}
		return list;
	} else { //장식품
		return [+eq[I_bSLOT7],"","","","","",""];
	}
};

//장식품名前調整
var cngDecName = function (name,type){
	switch (type) {
	case "":  //장식품
		name = name.replace("주","");
		break;
	case "1": //カフ
		name = name.replace("커프","");
		break;
	case "2": //天刻印
	case "3": //天封印
		name = name.replace("の인","");
		break;
	}
	return name.replace(/[Ａ-Ｚ０-９]/g, function(s) {
	    return String.fromCharCode(s.charCodeAt(0) - 65248);
	});
}

var global = {
//------------------------------------初期化----------
Init : function(){
//条件
this.c_sex = document.getElementById("c_sex");
this.c_type = document.getElementById("c_type");
this.c_rui = document.getElementById("c_rui");
this.c_series = document.getElementById("c_series");
this.c_skill1 = document.getElementById("c_skill1");
this.c_skill2 = document.getElementById("c_skill2");
this.c_skill3 = document.getElementById("c_skill3");
this.c_teni = document.getElementById("c_teni");
this.c_andor = document.getElementById("c_andor");
this.c_rare = document.getElementById("c_rare");
this.c_rep1 = document.getElementById("c_rep1");
this.c_rep2 = document.getElementById("c_rep2");
this.c_rep3 = document.getElementById("c_rep3");
this.c_rep5 = document.getElementById("c_rep5");
this.c_repi = document.getElementById("c_repi");
this.c_repe = document.getElementById("c_repe");
this.c_repg = document.getElementById("c_repg");
this.c_repk = document.getElementById("c_repk");
this.c_repp = document.getElementById("c_repp");
this.c_repm = document.getElementById("c_repm");
this.c_repc = document.getElementById("c_repc");
this.c_reps = document.getElementById("c_reps");
this.c_rept = document.getElementById("c_rept");
this.c_repu = document.getElementById("c_repu");

this.c_slot = document.getElementById("c_slot");
this.c_minus = document.getElementById("c_minus");
this.c_color = document.getElementById("c_color");
this.c_upg = document.getElementById("c_upg");
this.c_hr = document.getElementById("c_hr");
this.c_cuff_lm = document.getElementById("c_cuff_lm");

this.c_series_data = this.c_skill1_data = this.c_skill2_data = this.c_skill3_data = "";

//防具
this.b_cuff = document.getElementById("b_cuff");
this.b_buki = document.getElementById("b_buki");
this.b_head = document.getElementById("b_head");
this.b_body = document.getElementById("b_body");
this.b_arm = document.getElementById("b_arm");
this.b_wst = document.getElementById("b_wst");
this.b_leg = document.getElementById("b_leg");
this.b_cuffDel = document.getElementById("b_cuffDel");
this.b_bukiDel = document.getElementById("b_bukiDel");
this.b_headDel = document.getElementById("b_headDel");
this.b_bodyDel = document.getElementById("b_bodyDel");
this.b_armDel = document.getElementById("b_armDel");
this.b_wstDel = document.getElementById("b_wstDel");
this.b_legDel = document.getElementById("b_legDel");
this.b_bukiLv = document.getElementById("b_bukiLv");
this.b_cuffLv = document.getElementById("b_cuffLv");
this.b_headLv = document.getElementById("b_headLv");
this.b_bodyLv = document.getElementById("b_bodyLv");
this.b_armLv = document.getElementById("b_armLv");
this.b_wstLv = document.getElementById("b_wstLv");
this.b_legLv = document.getElementById("b_legLv");
for (var i = 1; i < 4; i++){
	this["b_cuffS"+i] = document.getElementById("b_cuffS"+i);
	this["b_bukiS"+i] = document.getElementById("b_bukiS"+i);
	this["b_headS"+i] = document.getElementById("b_headS"+i);
	this["b_bodyS"+i] = document.getElementById("b_bodyS"+i);
	this["b_armS"+i] = document.getElementById("b_armS"+i);
	this["b_wstS"+i] = document.getElementById("b_wstS"+i);
	this["b_legS"+i] = document.getElementById("b_legS"+i);
	this["b_headT"+i] = document.getElementById("b_headT"+i);
	this["b_bodyT"+i] = document.getElementById("b_bodyT"+i);
	this["b_armT"+i] = document.getElementById("b_armT"+i);
	this["b_wstT"+i] = document.getElementById("b_wstT"+i);
	this["b_legT"+i] = document.getElementById("b_legT"+i);
	this["b_cuffS"+i+"_data"] = this["b_bukiS"+i+"_data"] = this["b_headS"+i+"_data"] = this["b_bodyS"+i+"_data"] = this["b_armS"+i+"_data"] = this["b_wstS"+i+"_data"] = this["b_legS"+i+"_data"] = 
															this["b_headT"+i+"_data"] = this["b_bodyT"+i+"_data"] = this["b_armT"+i+"_data"] = this["b_wstT"+i+"_data"] = this["b_legT"+i+"_data"] = "O";
}
this.b_cuffS3_data = ""; //カフの３番目はない
this.b_head.selectedIndex = this.b_body.selectedIndex = this.b_arm.selectedIndex = this.b_wst.selectedIndex = this.b_leg.selectedIndex = this.b_headLv.selectedIndex = this.b_bodyLv.selectedIndex = this.b_armLv.selectedIndex = this.b_wstLv.selectedIndex = this.b_legLv.selectedIndex = 0;
for (var i = 1; i < 6; i++){
	this["b_headSn"+i] = document.getElementById("b_headSn"+i);
	this["b_bodySn"+i] = document.getElementById("b_bodySn"+i);
	this["b_armSn"+i] = document.getElementById("b_armSn"+i);
	this["b_wstSn"+i] = document.getElementById("b_wstSn"+i);
	this["b_legSn"+i] = document.getElementById("b_legSn"+i);
	this["b_headSp"+i] = document.getElementById("b_headSp"+i);
	this["b_bodySp"+i] = document.getElementById("b_bodySp"+i);
	this["b_armSp"+i] = document.getElementById("b_armSp"+i);
	this["b_wstSp"+i] = document.getElementById("b_wstSp"+i);
	this["b_legSp"+i] = document.getElementById("b_legSp"+i);
}
this.b_headDef = document.getElementById("b_headDef");
this.b_bodyDef = document.getElementById("b_bodyDef");
this.b_armDef  = document.getElementById("b_armDef");
this.b_wstDef  = document.getElementById("b_wstDef");
this.b_legDef  = document.getElementById("b_legDef");
this.b_headGR = 1;
this.b_bodyGR = 1;
this.b_armGR  = 1;
this.b_wstGR  = 1;
this.b_legGR  = 1;
this.b_Def_Sum   = document.getElementById("b_Def_Sum");
this.b_headFp = document.getElementById("b_headFp");
this.b_bodyFp = document.getElementById("b_bodyFp");
this.b_armFp  = document.getElementById("b_armFp");
this.b_wstFp  = document.getElementById("b_wstFp");
this.b_legFp  = document.getElementById("b_legFp");
this.b_Fp_Sum   = document.getElementById("b_Fp_Sum");
this.b_headWp = document.getElementById("b_headWp");
this.b_bodyWp = document.getElementById("b_bodyWp");
this.b_armWp  = document.getElementById("b_armWp");
this.b_wstWp  = document.getElementById("b_wstWp");
this.b_legWp  = document.getElementById("b_legWp");
this.b_Wp_Sum   = document.getElementById("b_Wp_Sum");
this.b_headTp = document.getElementById("b_headTp");
this.b_bodyTp = document.getElementById("b_bodyTp");
this.b_armTp  = document.getElementById("b_armTp");
this.b_wstTp  = document.getElementById("b_wstTp");
this.b_legTp  = document.getElementById("b_legTp");
this.b_Tp_Sum   = document.getElementById("b_Tp_Sum");
this.b_headIp = document.getElementById("b_headIp");
this.b_bodyIp = document.getElementById("b_bodyIp");
this.b_armIp  = document.getElementById("b_armIp");
this.b_wstIp  = document.getElementById("b_wstIp");
this.b_legIp  = document.getElementById("b_legIp");
this.b_Ip_Sum   = document.getElementById("b_Ip_Sum");
this.b_headDp = document.getElementById("b_headDp");
this.b_bodyDp = document.getElementById("b_bodyDp");
this.b_armDp  = document.getElementById("b_armDp");
this.b_wstDp  = document.getElementById("b_wstDp");
this.b_legDp  = document.getElementById("b_legDp");
this.b_Dp_Sum   = document.getElementById("b_Dp_Sum");
this.b_skillP = document.getElementById("b_skillP");
this.b_skillT = document.getElementById("b_skillT");
this.b_effectT = document.getElementById("b_effectT");

this.d_mei = document.getElementById("d_mei");
this.d_doc = document.getElementById("d_doc");
this.d_Fp = document.getElementById("d_Fp");
this.d_Wp = document.getElementById("d_Wp");
this.d_Tp = document.getElementById("d_Tp");
this.d_Ip = document.getElementById("d_Ip");
this.d_Dp = document.getElementById("d_Dp");
this.d_type = document.getElementById("d_type");
this.d_sex = document.getElementById("d_sex");
this.d_rep1 = document.getElementById("d_rep1");
this.d_rep2 = document.getElementById("d_rep2");
this.d_rui = document.getElementById("d_rui");
for (var i = 1; i < 6; i++){
	this["d_sn"+i] = document.getElementById("d_sn"+i);
	this["d_sp"+i] = document.getElementById("d_sp"+i);
}
this.d_MF = document.getElementById("d_MF");
this.d_MB = document.getElementById("d_MB");
this.d_FF = document.getElementById("d_FF");
this.d_FB = document.getElementById("d_FB");
this.d_lv = [];
this.d_def = [];
this.d_zeny = [];
this.d_sozai = [];
for (var i = 1; i < 8; i++) {
	this.d_lv[i] = document.getElementById("d_lv"+i);
	this.d_def[i] = document.getElementById("d_def"+i);
	this.d_zeny[i] = document.getElementById("d_zeny"+i);
	this.d_sozai[i] = document.getElementById("d_sozai"+i);
}
this.d_zenyAll = document.getElementById("d_zenyA");
this.d_sozaiAll = document.getElementById("d_sozaiA");
//検索結果
this.s_headCK = document.getElementById("s_headCK");
this.s_headZK = document.getElementById("s_headZK");
this.s_headYA = document.getElementById("s_headYA");
this.s_head = document.getElementById("s_head");
this.s_bodyCK = document.getElementById("s_bodyCK");
this.s_bodyZK = document.getElementById("s_bodyZK");
this.s_bodyYA = document.getElementById("s_bodyYA");
this.s_body = document.getElementById("s_body");
this.s_armCK = document.getElementById("s_armCK");
this.s_armZK = document.getElementById("s_armZK");
this.s_armYA = document.getElementById("s_armYA");
this.s_arm = document.getElementById("s_arm");
this.s_wstCK = document.getElementById("s_wstCK");
this.s_wstZK = document.getElementById("s_wstZK");
this.s_wstYA = document.getElementById("s_wstYA");
this.s_wst = document.getElementById("s_wst");
this.s_legCK = document.getElementById("s_legCK");
this.s_legZK = document.getElementById("s_legZK");
this.s_legYA = document.getElementById("s_legYA");
this.s_leg = document.getElementById("s_leg");
this.s_decoCK = document.getElementById("s_decoCK");
this.s_decoZK = document.getElementById("s_decoZK");
this.s_decoYA = document.getElementById("s_decoYA");
this.s_deco = document.getElementById("s_deco");
//this.s_cuffCK = document.getElementById("s_cuffCK");
//this.s_cuffZK = document.getElementById("s_cuffZK");
this.s_cuffYA = document.getElementById("s_cuffYA");
this.s_cuff = document.getElementById("s_cuff");
//子画面
this.sub_Win_Style = document.getElementById("sub_Win").style;
this.sub_Win_id = "";
this.sub_Win_scroll = ["",0];
this.sub_WinBody = document.getElementById("sub_WinBody");

//ボタン
this.sub_WinRemove_B_Style = document.getElementById("sub_WinRemove_B").style;
this.sub_WinClear_B_Style = document.getElementById("sub_WinClear_B").style;

//防御シミュ
this.b_gousyuB = document.getElementById("b_gousyuB");
this.def_Box = document.getElementById("def_Box");
this.c_gohu = document.getElementById("c_gohu");
this.c_tume = document.getElementById("c_tume");
this.c_soko = document.getElementById("c_soko");
this.c_mesi = document.getElementById("c_mesi");
this.c_sr = document.getElementById("c_sr");
this.c_tane = document.getElementById("c_tane");
this.c_drink = document.getElementById("c_drink");
this.c_fueDEF = document.getElementById("c_fueDEF");
this.c_fueDEF_G = document.getElementById("c_fueDEF_G");
this.c_fueTAI = document.getElementById("c_fueTAI");
this.c_buki = document.getElementById("c_buki");
this.c_shien = document.getElementById("c_shien");
this.c_G_Que = document.getElementById("c_G_Que");
this.c_G_Fit = document.getElementById("c_G_Fit");
this.c_kizuna = document.getElementById("c_kizuna");
this.c_katsu = document.getElementById("c_katsu");
this.c_soko.value = 60; //底力初期値
this.b_headDef.value = 0;
this.b_bodyDef.value = 0;
this.b_armDef.value = 0;
this.b_wstDef.value = 0;
this.b_legDef.value = 0;
this.b_Def_Sum.value = 1;
this.b_Fp_Sum.value = 0;
this.b_Wp_Sum.value = 0;
this.b_Tp_Sum.value = 0;
this.b_Ip_Sum.value = 0;
this.b_Dp_Sum.value = 0;
}
//------------------------------------データセット----------
,setSeriesList : function (data){
MST_Series_List = data;
}
,setDecoList : function (data){
MST_Deco_List = data;
}
,setEquip : function (name,data){
MST_Equip[name] = data;
}
,setEquipSplit : function (){
//--装備の配列化
for (var i = 0; i < 6; i++) for (var eqid in MST_Equip[BUINAME[i]]) MST_Equip[BUINAME[i]][eqid] = MST_Equip[BUINAME[i]][eqid].split(",");
//--珠リストの変更
var declist = [],w = "";
declist[declist.length] = ["기록",[]];
for (var i = 0,m = MST_Skill_List.length; i < m; i++) {
	var decwk = [MST_Skill_List[i][0]];
	for (var j = 0,list = MST_Skill_List[i][1],n = list.length; j < n; j++) {
		var dec = [];
		for (var eqid in MST_Equip.deco) {
			var eq = MST_Equip.deco[eqid];
			if ((eq[I_bDEC] === "" || eq[I_bDEC] === "1") &&
				(eq[I_bSN1] == list[j] || eq[I_bSN2] == list[j] || eq[I_bSN3] == list[j] || eq[I_bSN4] == list[j] || eq[I_bSN5] == list[j])) {
				w = eq[I_bSN1] == list[j] ? eq[I_bSP1] : 
					eq[I_bSN2] == list[j] ? eq[I_bSP2] : 
					eq[I_bSN3] == list[j] ? eq[I_bSP3] : 
					eq[I_bSN4] == list[j] ? eq[I_bSP4] : 
					eq[I_bSN5] == list[j] ? eq[I_bSP5] : "0";
				dec[dec.length] = [w,eqid];
			}
		}
		dec.sort(function (a, b) {
					return +a[0] < +b[0] ? 1 : -1;
				});
		for(var v=0; v<dec.length; v++){
			dec[v].splice(0, 1);
		}
		decwk[decwk.length] = [MST_Skill[list[j]][0],dec];
	}
	declist[declist.length] = decwk;
}
MST_Deco_List = declist.concat(MST_Deco_List);
//辿異スキル
declist = [],decwk = ["천이스킬"];
for (var i = 1,m = TENINAME.length; i < m; i++) {
	var dec = [];
	for (var eqid in MST_Equip.deco) {
		var eq = MST_Equip.deco[eqid];
		if (eq[I_bDEC] === "1" && eq[I_bTeni] == i) dec[dec.length] = eqid;
	}
	if (dec.length) decwk[decwk.length] = [TENINAME[i],dec];
}
declist[declist.length] = decwk;
MST_Deco_List = MST_Deco_List.concat(declist);
}
//------------------------------------スキルリスト表示----------
,dispSkillList : function (buttonid){
this.c_series.value = "-",this.sub_WinBody./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = this.c_series_data = "",this.c_andor.disabled = this.c_slot.disabled = this.c_minus.disabled = this.c_upg.disabled = false;

var df = document.createDocumentFragment(),dt = document.createElement("dt"),dd = document.createElement("dd"),input = document.createElement("input");
input.type = "button",input.style.marginRight = "1px", input.style.padding = "0 1px 0 1px";
if (CK_IE9) input.style.margin = "1px", input.style.padding = "2px";

for (var i = 0,m = MST_Skill_List.length; i < m; i++) {
	df.appendChild(dt.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(MST_Skill_List[i][0]));
	df.appendChild(dd.cloneNode(false));
	for (var j = 0,dfL = df.lastChild,list = MST_Skill_List[i][1],n = list.length; j < n; j++) {
		input.value = MST_Skill[list[j]][0];
		input.name = "miniW" + list[j];
		input.style.color = MST_Skill[list[j]][3] === 1 ? "#0040FF" : MST_Skill[list[j]][3] === 2 ? "orangered" : "";
		dfL.appendChild(input.cloneNode(false));
	}
}
this.sub_WinBody.appendChild(df);
this.sub_WinRemove_B_Style.visibility = "visible";
this.sub_Win_id = buttonid;
if (CK_IE6) this.c_rare.style.visibility = this.c_slot.style.visibility = this.c_hr.style.visibility = this.s_head.style.visibility = this.s_body.style.visibility = this.s_arm.style.visibility = this.s_wst.style.visibility = this.s_leg.style.visibility = this.c_cuff_lm.style.visibility = this.c_mesi.style.visibility = this.c_sr.style.visibility = this.c_tane.style.visibility = this.c_drink.style.visibility = this.c_fueDEF.style.visibility = this.c_fueTAI.style.visibility = "hidden";

this.sub_Win_Style.top = "30px",this.sub_Win_Style.left = (20 + +buttonid.charAt(7)) + "em",this.sub_Win_Style.display = "block";
//this.sub_Win_Style.right = (18-buttonid.charAt(7)) + "%";
//スクロール位置再現
this.sub_WinBody.scrollTop = this.sub_Win_scroll[0] === this.sub_Win_id ? this.sub_Win_scroll[1] : 0;
}
//------------------------------------シリーズリスト表示----------
,dispSeriesList : function (buttonid){
this.c_skill1.value = this.c_skill2.value = this.c_skill3.value = "-",this.c_teni.value = "",this.sub_WinBody./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = this.c_skill1_data = this.c_skill2_data = this.c_skill3_data = "",this.c_andor.disabled = this.c_slot.disabled = this.c_minus.disabled = this.c_upg.disabled = true;

var df = document.createDocumentFragment(),dt = document.createElement("dt"),dd = document.createElement("dd"),dtG = dt.cloneNode(false),ddG = dd.cloneNode(false),input = document.createElement("input");
dt.style.fontWeight = "bold",dtG.style.marginLeft = "1em",ddG.style.marginLeft = "2em";
input.type = "button",input.style.marginRight = "1px", input.style.padding = "0 1px 0 1px";
if (CK_IE9) input.style.margin = "1px", input.style.padding = "2px";

for (var i = 0,m = MST_Series_List.length; i < m; i++) {
	df.appendChild(dt.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(MST_Series_List[i][0]));
	df.appendChild(dd.cloneNode(false));
	for (var j = 1,n = MST_Series_List[i].length; j < n; j++) {
		input.name = "miniW" + i + j;
		if (typeof MST_Series_List[i][j][1] === "object") { //ヘッダー有り
			df.appendChild(dtG.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(MST_Series_List[i][j][0]));
			df.appendChild(ddG.cloneNode(false));
			var list = MST_Series_List[i][j][1];
		} else {
			var list = MST_Series_List[i][j];
		}
		for (var k = 0,dfL = df.lastChild,l = list.length; k < l; k++) {
			input.value = list[k];
			dfL.appendChild(input.cloneNode(false));
		}
	}
}
this.sub_WinBody.appendChild(df);
this.sub_WinRemove_B_Style.visibility = this.sub_WinClear_B_Style.visibility = "hidden";
this.sub_Win_id = buttonid;
if (CK_IE6) this.c_rare.style.visibility = this.c_slot.style.visibility = this.c_hr.style.visibility = this.s_head.style.visibility = this.s_body.style.visibility = this.s_arm.style.visibility = this.s_wst.style.visibility = this.s_leg.style.visibility = this.c_cuff_lm.style.visibility = this.c_mesi.style.visibility = this.c_sr.style.visibility = this.c_tane.style.visibility = this.c_drink.style.visibility = this.c_fueDEF.style.visibility = this.c_fueTAI.style.visibility = "hidden";

this.sub_Win_Style.top = "30px",this.sub_Win_Style.left = "13em",this.sub_Win_Style.display = "block";
//this.sub_Win_Style.left = "auto";
//スクロール位置再現
this.sub_WinBody.scrollTop = this.sub_Win_scroll[0] === this.sub_Win_id ? this.sub_Win_scroll[1] : 0;

}
//------------------------------------インプット----------
,dispInput : function (){
this.sub_Win_Style.display = "none";
this.c_skill1.value = this.c_skill2.value = this.c_skill3.value = "-";
this.c_teni.value ="";
var i = prompt("방어구 이름을 입력해 주세요. 앞부분 일치로 검색합니다.","");
if (i) {
	this.c_series.value = i;
	this.c_series_data = "9";
	this.search();
}
}
//------------------------------------장식품リスト表示----------
,dispDecoList : function (buttonid){
if (this[buttonid].value === "●" || this[buttonid].value === "-") return false;
if (this.sub_Win_Style.display === "block" && this.sub_Win_id === buttonid) return false;
this.sub_WinBody./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = "";

var slot_no = buttonid.charAt(buttonid.length-1),slot_name = buttonid.substring(0,buttonid.length-2);
//ck_type=0:共用 1:剣士 2:ガンナ,lm_slot=最大スロット数,ck_sp=SP防具,ck_cuff=カフ,ck_trWP=天廊武器,ck_hiden=秘伝スキルカフ表示
var ck_type = "",ck_dec1 = "",ck_dec2 = "",lm_slot = 0,lm_cuff = +this.c_cuff_lm.value,ck_sp = false,ck_trWP = false,ck_hiden = false,ck_cuff = false,ck_minus = this.c_minus.checked,high_hr = +this.c_hr.value,ck_rep = setRep(this);
switch (slot_name) {
case "b_buki":
	ck_type = "0";
	lm_slot = 4 - slot_no;
	switch (this.b_bukiLv.value) {
	case "1": //通常
		ck_dec1 = ck_dec2 = "";
		break;
	case "2": //SP
		ck_dec1 =  ck_dec2 = "";
		lm_slot = 2 - slot_no;
		ck_sp = true;
		break;
	case "3": //天廊
		ck_dec1 = "3",ck_dec2 = "";
		ck_trWP = true;
		break;
	}
	break;
case "b_cuff":
	ck_type = "0";
	ck_dec1 =  ck_dec2 = "1";
	if (slot_no === "2" && this.b_cuffS1.value !== "○") {
		var eq = MST_Equip.deco[this[slot_name].value.split(",")[2]];
		if (eq[I_bCLASS] === "L") {
			//秘伝スキルカフ
			lm_slot = 3 - slot_no + 1,ck_hiden = true;
		} else {
			//ノーマル
			lm_slot = 3 - slot_no;
		}
	} else {
		lm_slot = 3 - slot_no;
	}
	ck_cuff = true
	break;
default:
	var eq = MST_Equip[slot_name.substring(2)][this[slot_name].value.split(",")[0]];
	ck_type = eq[I_bTYPE];
	if (buttonid.lastIndexOf("T") === -1) {
		//通常
		var slot_data = getSlot(eq);
		lm_slot = slot_data[this[slot_name+"Lv"].value-1] - slot_no + 1;
		ck_dec1 =  ck_dec2 = "";
		ck_sp = eq[I_bCLASS] === "A";
	} else {
		//天廊
		lm_slot = eq[I_bTrSLOT] - slot_no + 1;
		ck_dec1 =  ck_dec2 = "2";
	}
}

var lmck=0,lmck=0,lmskl=0,bkTitle="",df = document.createDocumentFragment(),dt = document.createElement("dt"),dd = document.createElement("dd"),dtG = dt.cloneNode(false),ddG = dd.cloneNode(false),input = document.createElement("input");
dt.style.fontWeight = "bold",dtG.style.marginLeft = "1em",ddG.style.marginLeft = "2em";
input.type = "button",input.style.marginRight = "1px", input.style.padding = "0 1px 0 1px";
if (CK_IE9) input.style.margin = "1px", input.style.padding = "2px";
//
for (var i = 0,m = MST_Deco_List.length; i < m; i++) {
	if (MST_Deco_List[i][0] === "기록" || MST_Deco_List[i][0] === "천이스킬" || MST_Deco_List[i][0] === "천각인" || MST_Deco_List[i][0] === "천봉인") {
		lmck = false;
	} else {
		lmck = true;
	}
	for (var j = 1,n = MST_Deco_List[i].length; j < n; j++) {
		var dfL = document.createDocumentFragment();
		if (typeof MST_Deco_List[i][j][1] === "object") { //ヘッダー有り
			dfL.appendChild(dtG.cloneNode(false)),dfL.lastChild.appendChild(document.createTextNode(MST_Deco_List[i][j][0]));
			dfL.appendChild(ddG.cloneNode(false));
			var list = MST_Deco_List[i][j][1];
		} else {
			var list = MST_Deco_List[i][j];
		}
		for (var k = 0,l = list.length,ck = false; k < l; k++) {
			var eq = MST_Equip.deco[list[k]];

			if ((ck_type === "0" || eq[I_bTYPE] === "0" || eq[I_bTYPE] === ck_type) &&
				(ck_dec1 === eq[I_bDEC] || ck_dec2 === eq[I_bDEC])&&
				eq[I_bSLOT7] <= lm_slot && +eq[I_bHR1] <= high_hr &&
				ck_rep.indexOf(eq[I_bCRE]) !== -1) {

				switch (eq[I_bDEC]) {
				case "":
					if (ck_trWP) {	//天廊武器
						if (eq[I_bCLASS] !== "N") continue; //天廊武器は天廊系のみ
					} else {
						if (lmck) {
							lmskl = MST_Skill_List[i-1][1][j-1];
							if (ck_minus) {
								if (!(eq[I_bSN1] == lmskl && eq[I_bSP1] >= lm_cuff || eq[I_bSN1] == lmskl && eq[I_bSP1] <= lm_cuff * -1 ||
									eq[I_bSN2] == lmskl && eq[I_bSP2] >= lm_cuff || eq[I_bSN2] == lmskl && eq[I_bSP2] <= lm_cuff * -1 ||
									eq[I_bSN3] == lmskl && eq[I_bSP3] >= lm_cuff || eq[I_bSN3] == lmskl && eq[I_bSP3] <= lm_cuff * -1 ||
									eq[I_bSN4] == lmskl && eq[I_bSP4] >= lm_cuff || eq[I_bSN4] == lmskl && eq[I_bSP4] <= lm_cuff * -1 ||
									eq[I_bSN5] == lmskl && eq[I_bSP5] >= lm_cuff || eq[I_bSN5] == lmskl && eq[I_bSP5] <= lm_cuff * -1)) continue;
							} else {
								if (!(eq[I_bSN1] == lmskl && eq[I_bSP1] >= lm_cuff ||
									eq[I_bSN2] == lmskl && eq[I_bSP2] >= lm_cuff ||
									eq[I_bSN3] == lmskl && eq[I_bSP3] >= lm_cuff ||
									eq[I_bSN4] == lmskl && eq[I_bSP4] >= lm_cuff ||
									eq[I_bSN5] == lmskl && eq[I_bSP5] >= lm_cuff)) continue;
							}
						}
						switch (eq[I_bCLASS]) {
						case "N": //天廊系
							continue;				//通常は天廊系は除外
							break;
						case "A": //SP珠系
							if (!ck_sp) continue;	//SP防具じゃなかったら除外
							input.style.color = "tomato";
							break;
						default:
							if (eq[I_bCLASS] === "L") {
								input.style.color = "orangered";
							} else if (eq[I_bNAME].substring(0,2).match(/^[ア-ン]*$/)){
								input.style.color = "blue";
							} else {
								input.style.color = "";
							}
						}
					}
					break;
				case "1": //カフ
					if (eq[I_bCLASS] === "L" && ck_hiden) continue; //秘伝スキルカフがセットされているなら秘伝スキルカフ非表示
					if (eq[I_bCLASS] === "P") {
						//辿異カフは無条件でだす
						input.style.color = "blue";
					} else {
						if (ck_minus) {
							if (!(eq[I_bSP1] >= lm_cuff || eq[I_bSP1] <= lm_cuff * -1 ||
								eq[I_bSP2] >= lm_cuff || eq[I_bSP2] <= lm_cuff * -1 ||
								eq[I_bSP3] >= lm_cuff || eq[I_bSP3] <= lm_cuff * -1 ||
								eq[I_bSP4] >= lm_cuff || eq[I_bSP4] <= lm_cuff * -1 ||
								eq[I_bSP5] >= lm_cuff || eq[I_bSP5] <= lm_cuff * -1)) continue;
						} else {
							if (!(eq[I_bSP1] >= lm_cuff ||
								eq[I_bSP2] >= lm_cuff ||
								eq[I_bSP3] >= lm_cuff ||
								eq[I_bSP4] >= lm_cuff ||
								eq[I_bSP5] >= lm_cuff)) continue;
						}
						if (eq[I_bCLASS] === "L") {
							input.style.color = "orangered";
						} else {
							input.style.color = ""
						}
					}
					break;
				case "2": //天刻印
				case "3": //天封印
					input.style.color = "DarkGreen";
					break;
				}

				input.value = cngDecName(eq[I_bNAME],eq[I_bDEC]);
				input.name = "miniW" + list[k];
				dfL.appendChild(input.cloneNode(false));
				ck = true;
			}
		}
		if (ck) {
			if (bkTitle != MST_Deco_List[i][0]){
				if (MST_Deco_List[i][0] === "천이스킬" || MST_Deco_List[i][0] === "천봉인") {
					df.appendChild(document.createElement("hr"));
				}
				df.appendChild(dt.cloneNode(false));
				df.lastChild.appendChild(document.createTextNode(MST_Deco_List[i][0])),
				df.appendChild(dd.cloneNode(false)),
				bkTitle = MST_Deco_List[i][0];
			}
			df.lastChild.appendChild(dfL);
		}
	}
}

this.sub_WinBody.appendChild(df);
this.sub_WinRemove_B_Style.visibility = this.sub_WinClear_B_Style.visibility = "visible";
this.sub_Win_id = buttonid;
switch (slot_name) {
case "b_cuff":
case "b_buki":
	this.sub_Win_Style.top = "115px";
	break;
case "b_head":
	this.sub_Win_Style.top = "135px";
	break;
case "b_body":
	this.sub_Win_Style.top = "155px";
	break;
case "b_arm":
	this.sub_Win_Style.top = "175px";
	break;
case "b_wst":
	this.sub_Win_Style.top = "195px";
	break;
case "b_leg":
	this.sub_Win_Style.top = "215px";
	break;
}
this.sub_Win_Style.right = "auto",this.sub_Win_Style.left = (13 + (slot_no-1)*3 + (slot_name !== "b_cuff" ? 0 : 5)) + "em",this.sub_Win_Style.display = "block";
//スクロール位置再現
this.sub_WinBody.scrollTop = this.sub_Win_scroll[0] === this.sub_Win_id ? this.sub_Win_scroll[1] : 0;
}
//------------------------------------メインにセット----------
,setInput : function (eqid,eqname){
this[this.sub_Win_id].value = eqname;
this[this.sub_Win_id+"_data"] = eqid;

if (this.sub_Win_id === "c_series") {
	this.c_series_data = eqid;
	this.search();
} else if (this.sub_Win_id.lastIndexOf("S1") !== -1 || this.sub_Win_id.lastIndexOf("S2") !== -1 || this.sub_Win_id.lastIndexOf("S3") !== -1 ||
			this.sub_Win_id.lastIndexOf("T1") !== -1 || this.sub_Win_id.lastIndexOf("T2") !== -1 || this.sub_Win_id.lastIndexOf("T3") !== -1) {
	//履歴追加
	if (MST_Deco_List[0][1].join(",").indexOf(eqid) === -1) MST_Deco_List[0][1][MST_Deco_List[0][1].length] = eqid;
	this.dispData(eqid,"deco",7);
	this.cngSlot(eqid,this.sub_Win_id);
	this.calc();
}

}
//------------------------------------장식품取り外し----------
,removeDec : function (){
if (this.sub_Win_id.lastIndexOf("S1") !== -1 || this.sub_Win_id.lastIndexOf("S2") !== -1 || this.sub_Win_id.lastIndexOf("S3") !== -1 ||
	this.sub_Win_id.lastIndexOf("T1") !== -1 || this.sub_Win_id.lastIndexOf("T2") !== -1 || this.sub_Win_id.lastIndexOf("T3") !== -1) {
	this.cngSlot("O",this.sub_Win_id);
	this.calc();
} else {
	this[this.sub_Win_id].value = "-";
	this[this.sub_Win_id+"_data"] = "";
}
}
//------------------------------------장식품全取り外し----------
,removeAllDec : function (){
var s1 = this.sub_Win_id.substring(0,this.sub_Win_id.length-1) + "1",
	s2 = this.sub_Win_id.substring(0,this.sub_Win_id.length-1) + "2",
	s3 = this.sub_Win_id.substring(0,this.sub_Win_id.length-1) + "3";

if (this[s1].value !== "-" ) this.cngSlot("O",s1);
if (this[s2].value !== "-" ) this.cngSlot("O",s2);
if (this[s3].value !== "-" ) this.cngSlot("O",s3);
this.calc();
}
//------------------------------------子画面クローズ----------
,closeSubWin : function (){
if (this.sub_Win_Style.display === "none") return;
//スクロール位置保存
this.sub_Win_scroll = [this.sub_Win_id,this.sub_WinBody.scrollTop];
this.sub_Win_Style.display = "none";
if (CK_IE6) this.c_rare.style.visibility = this.c_slot.style.visibility = this.c_hr.style.visibility = this.s_head.style.visibility = this.s_body.style.visibility = this.s_arm.style.visibility = this.s_wst.style.visibility = this.s_leg.style.visibility = this.c_cuff_lm.style.visibility = this.c_mesi.style.visibility = this.c_sr.style.visibility = this.c_tane.style.visibility = this.c_drink.style.visibility = this.c_fueDEF.style.visibility = this.c_fueTAI.style.visibility = "visible";
}
//------------------------------------防具検索----------
,search : function (){
// 設定
var ck_disp = [,,,,,];
if (this.s_headCK.checked) this.s_head.length = 0,ck_disp[0] = true;
if (this.s_bodyCK.checked) this.s_body.length = 0,ck_disp[1] = true;
if (this.s_armCK.checked)  this.s_arm.length = 0,ck_disp[2] = true;
if (this.s_wstCK.checked)  this.s_wst.length = 0,ck_disp[3] = true;
if (this.s_legCK.checked)  this.s_leg.length = 0,ck_disp[4] = true;
if (this.s_decoCK.checked) this.s_deco.length = 0,this.s_cuff.length = 0,ck_disp[5] = true;

// 条件取得
var ck_s1 = this.c_skill1_data+"",ck_s2 = this.c_skill2_data+"",ck_s3 = this.c_skill3_data+"",ck_teni = this.c_teni.value,ck_sex = this.c_sex.value,ck_type = this.c_type.value,
	ck_rui = this.c_rui.value,lm_slot = this.c_slot.value,ck_rep = setRep(this),lm_rare = +this.c_rare.value,low_hr = 0,high_hr = +this.c_hr.value,ck_gr = lm_rare === 99 ? "9" : "",
	ck_series = this.setSeries(this.c_series_data,this.c_series.value),
	s_list = [ck_s1,ck_s2,ck_s3],ck_minus = this.c_minus.checked ? -100 : 0,
	ck_andor = this.c_andor.value === "or" || (ck_s1 === "" && ck_s2 === "" && ck_s3 === "") ? 1 : 3 - (ck_s1 === "") - (ck_s2 === "") - (ck_s3 === ""),
	t_ck = MST_Skill[ck_s1][0]+"."+MST_Skill[ck_s2][0]+"."+MST_Skill[ck_s3][0];
if (ck_rui === "-") {
	var f_rui = function(){return true};
} else if (ck_rui === "") {
	var f_rui = function(t){return t === ""};
} else if (ck_rui !== "-") {
	var f_rui = function(t){return ck_rui.indexOf(t) !== -1 && t};
}
var list = [],upgList = [],df = document.createDocumentFragment(),dfC = document.createDocumentFragment(),o = document.createElement("option");
if (ck_series) { //シリーズ別
	if (ck_series.low_hr) low_hr = ck_series.low_hr; //下限
	if (ck_series.high_hr && high_hr > 2001) high_hr = ck_series.high_hr; //上限

	var f_series = function(){return true},t = "";
	for (var i = 0,m = ck_series.F1.length,_f1 = []; i < m; i++) { //前方一致
		_f1[i] = "t.indexOf(\"" + ck_series.F1[i] + "\") === 0"
	}
	for (var i = 0,m = ck_series.F2.length,_f2 = []; i < m; i++) { //前方一致 AND 一部一致
		_f2[i] = "t.indexOf(\"" + ck_series.F2[i] + "\") !== -1"
	}
	for (var i = 0,m = ck_series.R.length,_r = []; i < m; i++) { //不一致
		_r[i] = "t.indexOf(\"" + ck_series.R[i] + "\") === -1"
	}
	if (ck_series.F1.length > 0) {
		if (ck_series.F2.length > 0) {
			t = "((" + _f1.join(" || ") + ") && (" + _f2.join(" || ") + "))";
		} else {
			t = "(" + _f1.join(" || ") + ")";
		}
	}
	if (ck_series.S) t += (t ? " || (" : "(") + "t.indexOf(\"" + ck_series.S + "\") !== -1)";
	if (ck_series.R.length > 0) {
		if (t) {
			 t = "(" + t + " && ("  + _r.join(" && ") + "))";
		} else {
			 t = "(" + t + _r.join(" && ") + ")";
		}
	}
	if (t) eval("f_series = function(t){return " + t + ";}");
}
for (var i = 0; i < 6; i++) {
	if (!ck_disp[i]) continue;
	
	list.length = 0,upgList.length = 0;
	var eqlist = MST_Equip[BUINAME[i]];
	if (ck_series) { //シリーズ別
		for (var eqid in eqlist) {
			var eq = eqlist[eqid];
			//if (typeof eq === "string") eq = MST_Equip[BUINAME[i]][eqid] = MST_Equip[BUINAME[i]][eqid].split(",");
			if ((ck_series.equipmentIds ? ck_series.equipmentIds[BUINAME[i]][eqid] === true : f_series(eq[I_bNAME])) &&
			    (ck_series.C === "9" || ck_series.C.indexOf(eq[I_bCRE]) !== -1) && 
			    (ck_sex === "0" || eq[I_bSEX] === "0" || ck_sex === eq[I_bSEX]) &&
			    (ck_type === "3" || eq[I_bTYPE] === "0" || ck_type === eq[I_bTYPE]) && 
			    (ck_rep.indexOf(eq[I_bCRE]) !== -1) && 
			    (f_rui(eq[I_bCLASS])) && 
			    (+eq[I_bRARE] <= lm_rare) && 
			    (eq[I_bGR] <= ck_gr) && 
			    (+eq[I_bHR1]  <= high_hr && +eq[I_bHR1] >= low_hr)) {
				//list[list.length] = [eq[I_bNAME],[eq[I_bSLOT1],eq[I_bSLOT2],eq[I_bSLOT3],eq[I_bSLOT4],eq[I_bSLOT5],eq[I_bSLOT6],eq[I_bSLOT7]].sort()[6],[+eq[I_bDEF1],_+eq[I_bDEF2],+eq[I_bDEF3],+eq[I_bDEF4],+eq[I_bDEF5],+eq[I_bDEF6],+eq[I_bDEF7]].sort()[6],eqid];
				list[list.length] = [eq[I_bUPGCNT],eq[I_bNAME],eq[I_bSLOT7],eqid];
			}
		}
		if (i !== 5) {
			list.sort(function (a, b) {
							return +a[0] < +b[0] ? 1 : -1;
						});
			for (var j = 0,n = list.length; j < n; j++) o.setAttribute("value", list[j][3]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(list[j][1]+" ["+list[j][2]+"]"));
			this["s_"+BUINAME[i]].appendChild(df);
			this["s_"+BUINAME[i]+"ZK"].value = "";
		} else {
			list.sort(function (a, b) {
							return a[1] > b[1] ? 1 : -1;
						});
			for (var j = 0,n = list.length; j < n; j++) {
				var w = list[j][1].lastIndexOf("커프") !== -1 ? dfC : df;
				o.setAttribute("value",list[j][3]),w.appendChild(o.cloneNode(false)),w.lastChild.appendChild(document.createTextNode(list[j][0]+" "+list[j][1]+" ["+list[j][2]+"]"));
			}
			this.s_deco.appendChild(df);
			this.s_cuff.appendChild(dfC);
		}
		if (i === 5) break;
	} else { //スキル別
		for (var eqid in eqlist) {
			var eq = eqlist[eqid];
			//if (typeof eq === "string") eq = MST_Equip[BUINAME[i]][eqid] = MST_Equip[BUINAME[i]][eqid].split(",");
			if (
				(+(ck_s1 + ck_s2 + ck_s3 + eq[I_bSN1] === "" && eq[I_bCLASS] !== "A") + /* スキルなしを検索するのに回避*/
				  (eq[I_bSN1] && (eq[I_bSN1] === ck_s1 || eq[I_bSN1] === ck_s2 || eq[I_bSN1] === ck_s3) && eq[I_bSP1] > ck_minus) + 
				  (eq[I_bSN2] && (eq[I_bSN2] === ck_s1 || eq[I_bSN2] === ck_s2 || eq[I_bSN2] === ck_s3) && eq[I_bSP2] > ck_minus) + 
				  (eq[I_bSN3] && (eq[I_bSN3] === ck_s1 || eq[I_bSN3] === ck_s2 || eq[I_bSN3] === ck_s3) && eq[I_bSP3] > ck_minus) + 
				  (eq[I_bSN4] && (eq[I_bSN4] === ck_s1 || eq[I_bSN4] === ck_s2 || eq[I_bSN4] === ck_s3) && eq[I_bSP4] > ck_minus) + 
				  (eq[I_bSN5] && (eq[I_bSN5] === ck_s1 || eq[I_bSN5] === ck_s2 || eq[I_bSN5] === ck_s3) && eq[I_bSP5] > ck_minus) >= ck_andor
				  || ck_teni !== "" && ck_s1 + ck_s2 + ck_s3 === ""
				  ) && 
			    (ck_sex === "0" || eq[I_bSEX] === "0" || ck_sex === eq[I_bSEX]) &&
			    (ck_type === "3" || eq[I_bTYPE] === "0" || ck_type === eq[I_bTYPE]) &&
			    (eq[I_bDEC] === "" || eq[I_bDEC] === "1") &&
			    (ck_rep.indexOf(eq[I_bCRE]) !== -1) && 
			    (f_rui(eq[I_bCLASS])) && 
			    (+eq[I_bRARE] <= lm_rare && eq[I_bGR] <= ck_gr) && 
			    (eq[I_bCLASS] !== ck_gr) && 
			    (+eq[I_bHR1]  <= high_hr) &&
			    (eq[I_bSLOT7]  >= lm_slot) &&
			    (ck_teni === "" || eq[I_bTeni] === ck_teni)
			   ) {
				for (var j = 0,w = []; j < 3; j++) {
					if (s_list[j] !== "") {
						w[w.length] = eq[I_bSN1] === s_list[j] ? eq[I_bSP1] : 
										eq[I_bSN2] === s_list[j] ? eq[I_bSP2] : 
										eq[I_bSN3] === s_list[j] ? eq[I_bSP3] : 
										eq[I_bSN4] === s_list[j] ? eq[I_bSP4] : 
										eq[I_bSN5] === s_list[j] ? eq[I_bSP5] : "0";
					}
				}
				list[list.length] = [w.join("."),eq[I_bNAME],eq[I_bSLOT7],eqid];
				upgList[upgList.length] = eq[I_bUPGBACK];
			}
		}
		list.sort(function (a, b) {
					if (a[0] === b[0]) {
						return a[2] < b[2] ? 1 : -1;
					} else {
						return +a[0] < +b[0] ? 1 : -1;
					}});
		if (i === 5) { //장식품
			for (var j = 0,n = list.length; j < n; j++) {
				var w = list[j][1].lastIndexOf("커프") !== -1 ? dfC : df;
				o.setAttribute("value",list[j][3]),w.appendChild(o.cloneNode(false)),w.lastChild.appendChild(document.createTextNode(list[j][0]+" "+list[j][1]+" ["+list[j][2]+"]"));
			}
			this.s_deco.appendChild(df);
			this.s_cuff.appendChild(dfC);
			//this["s_decoZK"].value = t_ck;
			//this["s_cuffZK"].value = t_ck;
		} else {
			var upg = this.c_upg.checked ? upgList.join(",") : "";
			for (var j = 0,n = list.length; j < n; j++) {
				if (upg.indexOf(list[j][3]) === -1) o.setAttribute("value",list[j][3]),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(list[j][0]+" "+list[j][1]+" ["+list[j][2]+"]"));
			}
			this["s_"+BUINAME[i]].appendChild(df);
		}
		this["s_"+BUINAME[i]+"ZK"].value = t_ck;
	}
}
}
//------------------------------------情報表示----------
,dispData : function (eqid,bui,lv,dec){
if (eqid.length !== 4) return;
if (bui === "cuff") bui = "deco";
var eq = MST_Equip[bui][eqid];
//以下オミット　LV変えた時に素材が変更されない。。
//if (this.d_mei.innerHTML === eq[I_bNAME]) return;

//if (typeof eq === "string") eq = MST_Equip[bui][eqid] = MST_Equip[bui][eqid].split(",");
//詳細
this.d_mei.firstChild.nodeValue = eq[I_bNAME];
this.d_doc.firstChild.nodeValue = eq[I_bDOC] || "";
if (eq[I_bTeni]) this.d_doc.firstChild.nodeValue += "[" + TENINAME[eq[I_bTeni]] + "]";
this.d_Fp.firstChild.nodeValue = eq[I_bF];
this.d_Wp.firstChild.nodeValue = eq[I_bW];
this.d_Tp.firstChild.nodeValue = eq[I_bT];
this.d_Ip.firstChild.nodeValue = eq[I_bI];
this.d_Dp.firstChild.nodeValue = eq[I_bD];
switch (eq[I_bDEC]) {
//case "1": //カフ
//	this.d_sn1.firstChild.nodeValue = eq[I_bCLASS] === "P" ? TENINAME[eq[I_bSN1]] : MST_Skill[eq[I_bSN1]][0];
//	break;
case "2": //天刻印
	this.d_sn1.firstChild.nodeValue = TENKOKUNAME[eq[I_bSN1]];
	break;
case "3": //天封印
	this.d_sn1.firstChild.nodeValue = TENFUNAME[eq[I_bSN1]] || "";
	break;
default:
	this.d_sn1.firstChild.nodeValue = MST_Skill[eq[I_bSN1]][0];
	break;
}
this.d_sp1.firstChild.nodeValue = eq[I_bSP1];
this.d_sn2.firstChild.nodeValue = MST_Skill[eq[I_bSN2]][0];
this.d_sp2.firstChild.nodeValue = eq[I_bSP2];
this.d_sn3.firstChild.nodeValue = MST_Skill[eq[I_bSN3]][0];
this.d_sp3.firstChild.nodeValue = eq[I_bSP3];
this.d_sn4.firstChild.nodeValue = MST_Skill[eq[I_bSN4]][0];
this.d_sp4.firstChild.nodeValue = eq[I_bSP4];
this.d_sn5.firstChild.nodeValue = MST_Skill[eq[I_bSN5]][0];
this.d_sp5.firstChild.nodeValue = eq[I_bSP5];
this.d_type.firstChild.nodeValue = TYPENAME[eq[I_bTYPE]];
this.d_sex.firstChild.nodeValue = SEXNAME[eq[I_bSEX]];
this.d_rep1.firstChild.nodeValue = MAKENAME[eq[I_bCRE].charAt(0)];
this.d_rep2.firstChild.nodeValue = MAKENAME[eq[I_bCRE].replace("#","").substring(1)];
this.d_rui.firstChild.nodeValue = CLASSTYPE[eq[I_bCLASS]] + (eq[I_bGR] ? "[GR"+eq[I_bGR]+"]":"");

//素材
var sozaiHtml = function (recipe) {
	if (!recipe) return "";
	var t = [],list = recipe.split(" ");
	for (var i = 0,cnt = 0,m = list.length; i < m; i++) {
		var w = list[i];
		if (!isNaN(w.charAt(w.length-1)) || !isNaN(w.charAt(w.length-2))) {
			if (w.lastIndexOf("R") !== -1) {
				t[cnt++] = "<a href='../sozai/sozai.htm?" + w.substring(0,4) + "W' target=_blank class=r>" + MST_Item[w.substring(0,4)][0] + "</a>x" + parseInt(w.substring(4));
			} else {
				t[cnt++] = "<a href='../sozai/sozai.htm?" + w.substring(0,4) + "W' target=_blank>" + MST_Item[w.substring(0,4)][0] + "</a>x" + w.substring(4);
			}
		} else {
			t[cnt++] = w;
		}
	}
	return t.join("<br>");
};
var zeny_sum = 0, gzeny_sum = 0, sozai_pool = [], upg_txt = "", flg_dec = 0,reci_data = getSozai(eq), zeny_data = getZeny(eq), def_data = getDef(eq), slot_data = getSlot(eq);
for (var i = 1,j = 0,m = eq[I_bLVMAX]; j < m; i++,j++) {
	if (+reci_data[I_iHR1+j] >= 10000) {
		this.d_lv[i].firstChild.nodeValue = "미";
	} else if (+reci_data[I_iHR1+j] >= 3000) {
		this.d_lv[i].firstChild.nodeValue = "Lv"+i+"：GSR" + (reci_data[I_iHR1+j]-3000);
	} else if (+reci_data[I_iHR1+j] >= 2000) {
		this.d_lv[i].firstChild.nodeValue = "Lv"+i+"：GR" + (reci_data[I_iHR1+j]-2000);
	} else if (+reci_data[I_iHR1+j] >= 1000) {
		this.d_lv[i].firstChild.nodeValue = "Lv"+i+"：SR" + (reci_data[I_iHR1+j]-1000);
	} else {
		this.d_lv[i].firstChild.nodeValue = "Lv"+i+"：HR" + reci_data[I_iHR1+j];
	}
	this.d_lv[i].style.backgroundColor = +reci_data[I_iHR1+j] <= +this.c_hr.value ? "white" : "gray";
	this.d_def[i].firstChild.nodeValue = def_data[j] + "：" + slot_data[j];
	this.d_zeny[i].firstChild.nodeValue = zeny_data[j] + (+reci_data[I_iHR1+j] >= 2000 ? "Gz" : "z");
	//精錬	
	if (reci_data[I_iSozai1+j].indexOf("@") !== -1) {
		var wkmain = reci_data[I_iSozai1+j].split("@");
		var wklist = wkmain[1].split(" ");
		for (var k = 0,n = wklist.length,wk = []; k < n; k++) {
			wk[k] = "<span class=ldec onclick=\"SkillForm.dispData('" + eqid + "','" + bui + "'," + lv + "," + k + ")\">"+ MST_Equip[BUINAME[wklist[k].charAt(0)]][wklist[k].substring(1)][I_bNAME] + "</span>Lv7에서 정련";
		}
		this.d_sozai[i].innerHTML = (wkmain[0] ? sozaiHtml(wkmain[0])+"<br>or<br>" : "") + wk.join("<br>");
		dec = dec || 0; //G,GFで複数あるときに指定される
		upg_txt = "→" + MST_Equip[BUINAME[wklist[dec].charAt(0)]][wklist[dec].substring(1)][I_bNAME] + "Lv7에서 정련";
		flg_dec = true;
	} else {
		this.d_sozai[i].innerHTML = sozaiHtml(reci_data[I_iSozai1+j]);
	}
}
//あまりをクリア
for (; i <= 7; i++) {
	this.d_lv[i].style.backgroundColor = "gray";
	this.d_lv[i].firstChild.nodeValue = 
	this.d_def[i].firstChild.nodeValue = 
	this.d_zeny[i].firstChild.nodeValue = 
	this.d_sozai[i].innerHTML = "";
}
//画像
if (eq[I_bIMG] && this.d_MF.style.display !== "none") {
	var ss = MST_Equip.jpg[parseInt(eq[I_bIMG],16)].split(" ");
	if (ss[1] > "0") {
		this.d_MF.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss[0]+"MF"+ss[1]+"_s.jpg";
		this.d_MB.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss[0]+"MB"+ss[1]+"_s.jpg";
		this.d_FF.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss[0]+"FF"+ss[1]+"_s.jpg";
		this.d_FB.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss[0]+"FB"+ss[1]+"_s.jpg";
	} else {
		this.d_MF.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss+"MF"+"_s.jpg";
		this.d_MB.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss+"MB"+"_s.jpg";
		this.d_FF.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss+"FF"+"_s.jpg";
		this.d_FB.src = "http://images.mh-frontier.jp/gamedata/armor/photo/"+ss+"FB"+"_s.jpg";
	}
	this.d_MF.style.visibility = this.d_MB.style.visibility = this.d_FF.style.visibility = this.d_FB.style.visibility = "visible"
} else {
//	this.d_MF.src = this.d_MB.src = this.d_FF.src = this.d_FB.src = "../img/w.jpg"
	this.d_MF.style.visibility = this.d_MB.style.visibility = this.d_FF.style.visibility = this.d_FB.style.visibility = "hidden"
}
//珠化した装備の素材をセット
if (flg_dec) {
	bui = BUINAME[wklist[dec].charAt(0)];
	eq = MST_Equip[bui][wklist[dec].substring(1)];
	reci_data = getSozai(eq), zeny_data = getZeny(eq);
}

//強化元があるのに生産素材もある
if (eq[I_bUPGBACK] && eq[I_bRECIPE1]){
	//精錬以外なら表示
	if (!flg_dec) this.d_sozai[1].innerHTML = sozaiHtml(MST_Equip.sozai[parseInt(eq[I_bLVUPPTN],16)].split(",")[0]) + "<br>---생산---<br>" + this.d_sozai[1].innerHTML;
	reci_data[I_iSozai1] = eq[I_bRECIPE1];
}

//素材合計
for (var i = 1,j = 0,m = eq[I_bLVMAX]; j < m; i++,j++) {
	if (i <= lv && reci_data[I_iSozai1+j]) {
		if (+reci_data[I_iHR1+j] >= 2000) {
			gzeny_sum += +zeny_data[j];
		} else {
			zeny_sum += +zeny_data[j];
		}
		sozai_pool[sozai_pool.length] = reci_data[I_iSozai1+j];
	}
}

//強化元走査
if (eq[I_bUPGBACK] && !eq[I_bRECIPE1]) {
	var hasei_lv = eq[I_bUPGBACK].charAt(4), hasei_eq = MST_Equip[bui][eq[I_bUPGBACK].substring(0,4)], reci_data = getSozai(hasei_eq), zeny_data = getZeny(hasei_eq);
	upg_txt = hasei_eq[I_bNAME] + " LV" + hasei_lv + upg_txt;
	if (!flg_dec) this.d_sozai[1].innerHTML = upg_txt + "<br>" + this.d_sozai[1].innerHTML;
	do {
		for (var i = 1,j = 0; i <= hasei_lv; i++,j++){
			if (+reci_data[I_iHR1+j] >= 2000) {
				gzeny_sum += +zeny_data[j];
			} else {
				zeny_sum += +zeny_data[j];
			}
			sozai_pool[sozai_pool.length] = reci_data[I_iSozai1+j];
		}
		if (hasei_eq[I_bUPGBACK] && !hasei_eq[I_bRECIPE1]) {
			hasei_lv = hasei_eq[I_bUPGBACK].charAt(4), hasei_eq = MST_Equip[bui][hasei_eq[I_bUPGBACK].substring(0,4)], reci_data = getSozai(hasei_eq), zeny_data = getZeny(hasei_eq);
			upg_txt = hasei_eq[I_bNAME] + "LV" + hasei_lv + "→" + upg_txt
		} else {
			hasei_lv = 0;
		}
	} while (hasei_lv);
	upg_txt += "→<br>";
}
//珠化した装備のアップグレードテキストの調整
if (flg_dec) {
	if (upg_txt.charAt(0) === "→") upg_txt = upg_txt.substring(1) + "<br>";
	upg_txt = upg_txt.replace("→<br>","<br>");
}
this.d_zenyAll.innerHTML = (zeny_sum || !gzeny_sum ? zeny_sum + "z<br>" : "") + (gzeny_sum ? gzeny_sum + "Gz" : "");

//素材合計
sozai_pool = sozai_pool.join(" ").replace(/R/g,"").split(" ").sort();
var sozai_sum = [], toku = "";
for (var i = 0,m = sozai_pool.length; i < m; i++) {
	var w = sozai_pool[i];
	for (var j = 0,n = sozai_sum.length; j < n; j++) {
		if (sozai_sum[j][0] === w.substring(0,4)){
			sozai_sum[j][1] += +w.substring(4);
			break;
		}
	}
	if (j >= n) {
		if (!isNaN(w.charAt(w.length-1)) || !isNaN(w.charAt(w.length-2))) {
			sozai_sum[sozai_sum.length] = [w.substring(0,4), +w.substring(4)];
		} else {
			if (w && w !== "없음" && w !== "or") toku = w.replace("<br>","") + "<br>";
		}
	}
}
for (var i = 0,m = sozai_sum.length; i < m; sozai_sum[i] = sozai_sum[i++].join(""));
sozai_sum = sozai_sum.sort(function (a, b){return MST_Item[b.substring(0,4)][5]+b.substring(0,4) < MST_Item[a.substring(0,4)][5]+a.substring(0,4) ? 1 : -1});
this.d_sozaiAll.innerHTML = upg_txt + toku + "<span>" + sozaiHtml(sozai_sum.join(" ")).replace(/<br>/g,"</span>,<span>") + "</span>";
//アクラ限定処理
if (!eq[I_bNAME].indexOf("아크라") && CLASSTYPE.GClass.indexOf(eq[I_bCLASS]) === -1 && eq[I_bNAME].indexOf("바레트") === -1) this.d_sozaiAll.innerHTML = "※색상에 따라 소재가 다릅니다※<br>" + this.d_sozaiAll.innerHTML
}
//------------------------------------防具セット----------
,setData : function (eqid,bui) {
if (!eqid) return;
switch (bui) {
case "cuff": //カフ
	//履歴追加
	if (MST_Deco_List[0][1].join(",").indexOf(eqid) === -1) MST_Deco_List[0][1][MST_Deco_List[0][1].length] = eqid;
	var eq = MST_Equip.deco[eqid];
	for (var j = 1; j < 4 ; j++) {
		if ( this["b_cuffS"+j+"_data"] === "O" &&
			(eq[I_bSLOT7] === "2" && j === 1 && this["b_cuffS2_data"].length !== 4 || eq[I_bSLOT7] === "1")) {
			this.cngSlot(eqid,"b_cuffS"+j);
			this.calc();
			return;
		}
	}
	//強制上書き
	this.cngSlot(eqid,"b_cuffS1");
	this.calc();
	break;
case "deco": //장식품
	//履歴追加
	if (MST_Deco_List[0][1].join(",").indexOf(eqid) === -1) MST_Deco_List[0][1][MST_Deco_List[0][1].length] = eqid;
	var eq = MST_Equip.deco[eqid];
	for (var i = 0; i < 5; i++) { //부위別
		for (var j = 1; j < 4 ; j++) {
			if ( this["b_"+BUINAME[i]+"S"+j+"_data"] === "O" &&
				(eq[I_bCLASS] !== "A" || eq[I_bCLASS] === "A" && MST_Equip[BUINAME[i]][this["b_"+BUINAME[i]].value.split(",")[0]][I_bCLASS] === "A") &&
				(eq[I_bSLOT7] === "3" && j === 1 && this["b_"+BUINAME[i]+"S2_data"].length !== 4 && this["b_"+BUINAME[i]+"S3_data"].length !== 4 ||
				 eq[I_bSLOT7] === "2" && j <= 2 && this["b_"+BUINAME[i]+"S"+(j+1)+"_data"].length !== 4 ||
				 eq[I_bSLOT7] === "1")) {
				this.cngSlot(eqid,"b_"+BUINAME[i]+"S"+j);
				this.calc();
				return;
			}
		}
	}
	break;
default: //防具
	//複数セット対応でオミット
	////既にあるかチェック
	//for (var i = 0,m = this["b_"+bui].length; i < m; i++) {
	//	if (this["b_"+bui][i].value.split(",")[0] === eqid) {
	//		this["b_"+bui].selectedIndex = i;
	//		this.cngData(bui);
	//		this.calc();
	//		return;
	//	}
	//}
	var eq = MST_Equip[bui][eqid],reci_data = getSozai(eq), slot_data = getSlot(eq);
	//データ追加(名前:eqid,LV,スロ1,スロ2,スロ3,天刻印1,天刻印2,天刻印3)
	//LVを制限
	for (var i = 0; i < eq[I_bLVMAX] && +reci_data[I_iHR1+i] <= +this.c_hr.value; i++);
	var lv = i--,o = document.createElement("option");
	o.setAttribute("value", eqid+"," +lv+"," + (slot_data[i] > 0 ? "O,":",") + (slot_data[i] > 1 ? "O,":",") + (slot_data[i] > 2 ? "O":"")
							+ (eq[I_bCLASS] === "N" ? ","+(eq[I_bTrSLOT] > 0 ? "O,":",") + (eq[I_bTrSLOT] > 1 ? "O,":",") + (eq[I_bTrSLOT] > 2 ? "O":"") :"")
							);
	o.setAttribute("selected","selected");
	o.appendChild(document.createTextNode(eq[I_bNAME]));
	this["b_"+bui].appendChild(o);
	this.cngData(bui);
	this.calc();
}
}
//------------------------------------防具削除----------
,delData : function (bui) {
//一件だけか仮装備なら処理しない
if (this["b_"+bui].length === 1 ||
	this["b_"+bui].options[this["b_"+bui].selectedIndex].text === "가장비" ||
	this["b_"+bui].options[this["b_"+bui].selectedIndex].text === "세트") return;

//行削除
var i = this["b_"+bui].selectedIndex;
this["b_"+bui].options[i] = null;
this["b_"+bui].selectedIndex = i === 0 ? 0 : --i;
this.cngData(bui);

//一件だけか仮装備なら削除を無効化
if (this["b_"+bui].length === 1 || this["b_"+bui].options[this["b_"+bui].selectedIndex].text === "가장비") this["b_"+bui+"Del"].disabled = true;
}
//------------------------------------データ入れ替え----------
,cngData : function (bui) {
var w = this["b_"+bui].value.split(","),slot_suu = 0;
switch (bui) {
case "buki":
	this.b_bukiLv.value = w[I_sLV];
	slot_suu = 3;
	break;
case "cuff":
	slot_suu = 2;
	break;
default:
	var eq = MST_Equip[bui][w[I_sID]], reci_data = getSozai(eq), def_data = getDef(eq), slot_suu = getSlot(eq)[w[I_sLV]-1];
	//if (typeof eq === "string") eq = MST_Equip[bui][w[0]] = MST_Equip[bui][w[0]].split(",");
	//LVを制限
	for (var i = 0; i < eq[I_bLVMAX] && +reci_data[I_iHR1+i] <= +this.c_hr.value; i++);
	var lv = i--;
	if (this["b_"+bui+"Lv"].length !== lv) {
		this["b_"+bui+"Lv"].length = 0;
		var df = document.createDocumentFragment(),o = document.createElement("option");
		for (var i = 1; i <= lv; i++) o.setAttribute("value",i),df.appendChild(o.cloneNode(false)),df.lastChild.appendChild(document.createTextNode(i));
		this["b_"+bui+"Lv"].appendChild(df);
		if (lv < w[I_sLV]) w[I_sLV] = lv;
		if (CK_IE6) this["b_"+bui+"Lv"][w[I_sLV]-1].setAttribute("selected","selected");
	}
	this["b_"+bui+"Lv"].selectedIndex = w[I_sLV]-1;

	//詳細
	this["b_"+bui+"GR"] = eq[I_bGR] ? eq[I_bGR] : 1;
	this["b_"+bui+"Def"].firstChild.nodeValue = def_data[w[1]-1];
	this["b_"+bui+"Def"].value = def_data[w[1]-1];
	this["b_"+bui+"Fp"].firstChild.nodeValue = eq[I_bF];
	this["b_"+bui+"Wp"].firstChild.nodeValue = eq[I_bW];
	this["b_"+bui+"Tp"].firstChild.nodeValue = eq[I_bT];
	this["b_"+bui+"Ip"].firstChild.nodeValue = eq[I_bI];
	this["b_"+bui+"Dp"].firstChild.nodeValue = eq[I_bD];
	this["b_"+bui+"Sn1"].firstChild.nodeValue = MST_Skill[eq[I_bSN1]][0];
	this["b_"+bui+"Sp1"].firstChild.nodeValue = eq[I_bSP1];
	this["b_"+bui+"Sn2"].firstChild.nodeValue = MST_Skill[eq[I_bSN2]][0];
	this["b_"+bui+"Sp2"].firstChild.nodeValue = eq[I_bSP2];
	this["b_"+bui+"Sn3"].firstChild.nodeValue = MST_Skill[eq[I_bSN3]][0];
	this["b_"+bui+"Sp3"].firstChild.nodeValue = eq[I_bSP3];
	this["b_"+bui+"Sn4"].firstChild.nodeValue = MST_Skill[eq[I_bSN4]][0];
	this["b_"+bui+"Sp4"].firstChild.nodeValue = eq[I_bSP4];
	this["b_"+bui+"Sn5"].firstChild.nodeValue = MST_Skill[eq[I_bSN5]][0];
	this["b_"+bui+"Sp5"].firstChild.nodeValue = eq[I_bSP5];

	//天刻印スロット
	this["b_"+bui+"T1"].style.display = this["b_"+bui+"T2"].style.display = this["b_"+bui+"T3"].style.display = eq[I_bCLASS] === "N" ? "inline" : "none";
	switch (eq[I_bTrSLOT]-0) {
	case 0:
		this["b_"+bui+"T1"].disabled = this["b_"+bui+"T2"].disabled = this["b_"+bui+"T3"].disabled = 1;
	 	this["b_"+bui+"T1"].value = this["b_"+bui+"T2"].value = this["b_"+bui+"T3"].value = "-";
	 	this["b_"+bui+"T1_data"]  = this["b_"+bui+"T2_data"]  = this["b_"+bui+"T3_data"]  = "";
		break;
	case 1:
		this["b_"+bui+"T1"].disabled = 0;
		this["b_"+bui+"T2"].disabled = this["b_"+bui+"T3"].disabled = 1;
	 	this["b_"+bui+"T1"].value = "○";
	 	this["b_"+bui+"T1_data"]  = "O";
		this["b_"+bui+"T2"].value = this["b_"+bui+"T3"].value = "-";
		this["b_"+bui+"T2_data"]  = this["b_"+bui+"T3_data"]  = "";
		break;
	case 2:
		this["b_"+bui+"T1"].disabled = this["b_"+bui+"T2"].disabled = 0;
		this["b_"+bui+"T3"].disabled = 1;
	 	this["b_"+bui+"T1"].value = this["b_"+bui+"T2"].value = "○";
	 	this["b_"+bui+"T1_data"]  = this["b_"+bui+"T2_data"]  = "O";
		this["b_"+bui+"T3"].value = "-";
		this["b_"+bui+"T3_data"]  = "";
		break;
	case 3:
		this["b_"+bui+"T1"].disabled = this["b_"+bui+"T2"].disabled = this["b_"+bui+"T3"].disabled = 0;
	 	this["b_"+bui+"T1"].value = this["b_"+bui+"T2"].value = this["b_"+bui+"T3"].value = "○";
	 	this["b_"+bui+"T1_data"]  = this["b_"+bui+"T2_data"]  = this["b_"+bui+"T3_data"]  = "O";
		break;
	}
	//天刻印
	if (eq[I_bCLASS] === "N") for (var i = 1; i <= eq[I_bTrSLOT]; this.cngSlot(w[I_sT1+i-1],"b_"+bui+"T"+i,i++));
}
//スロット
switch (slot_suu) {
case 0:
	this["b_"+bui+"S1"].disabled = this["b_"+bui+"S2"].disabled = this["b_"+bui+"S3"].disabled = 1;
 	this["b_"+bui+"S1"].value = this["b_"+bui+"S2"].value = this["b_"+bui+"S3"].value = "-";
 	this["b_"+bui+"S1_data"]  = this["b_"+bui+"S2_data"]  = this["b_"+bui+"S3_data"]  = "";
	break;
case 1:
	this["b_"+bui+"S1"].disabled = 0;
	this["b_"+bui+"S2"].disabled = this["b_"+bui+"S3"].disabled = 1;
 	this["b_"+bui+"S1"].value = "○";
 	this["b_"+bui+"S1_data"]  = "O";
	this["b_"+bui+"S2"].value = this["b_"+bui+"S3"].value = "-";
	this["b_"+bui+"S2_data"]  = this["b_"+bui+"S3_data"]  = "";
	break;
case 2:
	this["b_"+bui+"S1"].disabled = this["b_"+bui+"S2"].disabled = 0;
	this["b_"+bui+"S3"].disabled = 1;
 	this["b_"+bui+"S1"].value = this["b_"+bui+"S2"].value = "○";
 	this["b_"+bui+"S1_data"]  = this["b_"+bui+"S2_data"]  = "O";
	this["b_"+bui+"S3"].value = "-";
	this["b_"+bui+"S3_data"]  = "";
	break;
case 3:
	this["b_"+bui+"S1"].disabled = this["b_"+bui+"S2"].disabled = this["b_"+bui+"S3"].disabled = 0;
 	this["b_"+bui+"S1"].value = this["b_"+bui+"S2"].value = this["b_"+bui+"S3"].value = "○";
 	this["b_"+bui+"S1_data"]  = this["b_"+bui+"S2_data"]  = this["b_"+bui+"S3_data"]  = "O";
	break;
}
//장식품
for (var i = 1; i <= slot_suu; this.cngSlot(w[I_sS1+i-1],"b_"+bui+"S"+i,i++));

this["b_"+bui+"Del"].disabled = this["b_"+bui].options[this["b_"+bui].selectedIndex].text === "가장비" ||
								this["b_"+bui].options[this["b_"+bui].selectedIndex].text === "세트";
//防具の場合
if (bui.lastIndexOf("buki") === -1 && bui.lastIndexOf("cuff") === -1) this.dispData(w[0],bui,w[1]);
}
//------------------------------------防具レベル変更----------
,cngLv : function (bui) {
var tag=this["b_"+bui], w = tag.value.split(",");
w[I_sLV] = this["b_"+bui+"Lv"].value;
tag.options[tag.selectedIndex].value = w.join(",");
}
//------------------------------------スロット状態変更----------
,cngSlot : function (eqid,buttonid) {
if (eqid === "X") return; //●だったら何もしない
//alert(eqid+":"+no+":"+buttonid);
//スロットを変更
var no = buttonid.charAt(buttonid.length-1),tag = this[buttonid.substring(0,buttonid.length-2)],w = tag.value.split(","),
	eq = MST_Equip.deco[eqid],
	H = (buttonid.charAt(buttonid.length-2) === "S" ? 0 : I_sT1-I_sS1),
	slot1 = buttonid.substring(0,buttonid.length-1)+"1",slot2 = buttonid.substring(0,buttonid.length-1)+"2",slot3 = buttonid.substring(0,buttonid.length-1)+"3";
if (no === "1") {
	switch (eq[I_bSLOT7]) {
	case "":
	case "0":
	case "1":
		if (this[slot2].value === "●") {
			this[slot2].disabled = 0;
			this[slot2].value = "○";
			w[I_sS2+H] = this[slot2+"_data"] = "O";
			if (this[slot3].value === "●") {
				this[slot3].disabled = 0;
				this[slot3].value = "○";
				w[I_sS3+H] = this[slot3+"_data"] = "O";
			}
		}
		break;
	case "2":
		if (this[slot2].value === "-") return;
		this[slot2].disabled = 1;
		this[slot2].value = "●";
		w[I_sS2+H] = this[slot2+"_data"] = "X";
		if (this[slot3].value === "●") {
			this[slot3].disabled = 0;
			this[slot3].value = "○";
			w[I_sS3+H] = this[slot3+"_data"] = "O";
		}
		break;
	case "3":
		if (this[slot2].value === "-" || this[slot3].value === "-") return;
		this[slot3].disabled = this[slot2].disabled = 1;
		this[slot3].value = this[slot2].value = "●";
		w[I_sS3+H] = w[I_sS2+H] = this[slot3+"_data"] = this[slot2+"_data"] = "X";
		break;
	}
} else if (no === "2" && this[slot2].value !== "●") {
	switch (eq[I_bSLOT7]) {
	case "":
	case "0":
	case "1":
		if (this[slot3].value === "●") {
			this[slot3].disabled = 0;
			this[slot3].value = "○";
			w[I_sS3+H] = this[slot3+"_data"] = "O";
		}
		break;
	case "2":
		if (this[slot3].value === "-") return;
		this[slot3].disabled = 1;
		this[slot3].value = "●";
		w[I_sS3+H] = this[slot3+"_data"] = "X";
		break;
	}
}
//セット
w[I_sS1 + +no -1 + H] = this[buttonid+"_data"] = eqid;
switch (eq[I_bDEC]) {
case "":
	var tohankaku = function (t){
		//配列を用意する
		var hankaku = new Array("ｶﾞ", "ｷﾞ", "ｸﾞ", "ｹﾞ", "ｺﾞ", "ｻﾞ", "ｼﾞ", "ｽﾞ", "ｾﾞ", "ｿﾞ", "ﾀﾞ", "ﾁﾞ", "ﾂﾞ", "ﾃﾞ", "ﾄﾞ", "ﾊﾞ", "ﾊﾟ", "ﾋﾞ", "ﾋﾟ", "ﾌﾞ", "ﾌﾟ", "ﾍﾞ", "ﾍﾟ", "ﾎﾞ", "ﾎﾟ", "ｳﾞ", "ｧ", "ｱ", "ｨ", "ｲ", "ｩ", "ｳ", "ｪ", "ｴ", "ｫ", "ｵ", "ｶ", "ｷ", "ｸ", "ｹ", "ｺ", "ｻ", "ｼ", "ｽ", "ｾ", "ｿ", "ﾀ", "ﾁ", "ｯ", "ﾂ", "ﾃ", "ﾄ", "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ", "ﾊ", "ﾋ", "ﾌ", "ﾍ", "ﾎ", "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ", "ｬ", "ﾔ", "ｭ", "ﾕ", "ｮ", "ﾖ", "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ", "ﾜ", "ｦ", "ﾝ", "1", "2", "3", "4", "5", "･", "ｰ", "ﾟ");
		var zenkaku  = new Array("ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "ヂ", "ヅ", "デ", "ド", "バ", "パ", "ビ", "ピ", "ブ", "プ", "ベ", "ペ", "ボ", "ポ", "ヴ", "ァ", "ア", "ィ", "イ", "ゥ", "ウ", "ェ", "エ", "ォ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ッ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ャ", "ヤ", "ュ", "ユ", "ョ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン", "１", "２", "３", "４", "５", "・", "ー", "゜");
		//変換開始
		for (i=0; i<=88; i++) { //89文字あるのでその分だけ繰り返す
			while (t.indexOf(zenkaku[i]) >= 0){ //該当する半角カナがなくなるまで繰り返す
				t = t.replace(zenkaku[i], hankaku[i]); //半角カナに対応する全角カナに置換する
			}
		}
		return t; //変換が終わったら表示
	}
	this[buttonid].value = tohankaku(cngDecName(eq[I_bNAME],eq[I_bDEC]));
	break;
case "1": //カフ
	this[buttonid].value = cngDecName(eq[I_bNAME],eq[I_bDEC]).replace("P","").replace("S","");
	break;
case "2": //天刻印
case "3": //天封印
	this[buttonid].value = cngDecName(eq[I_bNAME],eq[I_bDEC]);
	break;
}
tag.options[tag.selectedIndex].value = w.join(",");
//武器カフの場合セット名を変更、次セットの作成
if (buttonid.lastIndexOf("buki") !== -1 || buttonid.lastIndexOf("cuff") !== -1) {
	if (w[I_sS1].length <= 1 && w[I_sS2].length <= 1 &&w[I_sS3].length <= 1) {
		//データなし
		tag.options[tag.selectedIndex].text = "세트";
		if (tag.selectedIndex !== tag.length-1) { //最終行か
			//行削除
			tag.options[tag.selectedIndex].text = "-"; //消すためにセット以外の名称に変更
			this.delData(buttonid.substring(2,buttonid.length-2));
		}
	} else {
		//データあり
		this[buttonid.substring(0,buttonid.length-2)+"Del"].disabled = false;
		tag.options[tag.selectedIndex].text = (w[I_sS1].length <= 1 ? "" : this[slot1].value.substring(0,2))
											+ (w[I_sS2].length <= 1 ? "" : this[slot2].value.substring(0,2))
											+ (w[I_sS3].length <= 1 ? "" : this[slot3].value.substring(0,2));
		if (tag.selectedIndex === tag.length-1) { //最終行か
			//新規行追加
			var o = document.createElement("option");
			o.setAttribute("value", buttonid.lastIndexOf("buki") !== -1 ? "0000,1,O,O,O" : "0000,1,O,O,")
			//o.setAttribute("selected","selected");
			o.appendChild(document.createTextNode("세트"));
			tag.appendChild(o);
		}
	}
}
}
//------------------------------------発動スキル計算----------
,calc : function () {
//GRの変動
for (var i = 0; i < 5 ;i++) {
	if (this["b_"+BUINAME[i]+"GR"] < this.c_G_Fit.value && this["b_"+BUINAME[i]+"Def"].value > 0) {
		this["b_"+BUINAME[i]+"Def"].firstChild.nodeValue = +this["b_"+BUINAME[i]+"Def"].value + (this.c_G_Fit.value - this["b_"+BUINAME[i]+"GR"]) * 20;
	} else {
		this["b_"+BUINAME[i]+"Def"].firstChild.nodeValue = this["b_"+BUINAME[i]+"Def"].value;
	}
}

this.b_Def_Sum.value = +this.b_headDef.firstChild.nodeValue + +this.b_bodyDef.firstChild.nodeValue + +this.b_armDef.firstChild.nodeValue + +this.b_wstDef.firstChild.nodeValue + +this.b_legDef.firstChild.nodeValue + 1;
this.b_Fp_Sum.value = +this.b_headFp.firstChild.nodeValue + +this.b_bodyFp.firstChild.nodeValue + +this.b_armFp.firstChild.nodeValue + +this.b_wstFp.firstChild.nodeValue + +this.b_legFp.firstChild.nodeValue;
this.b_Wp_Sum.value = +this.b_headWp.firstChild.nodeValue + +this.b_bodyWp.firstChild.nodeValue + +this.b_armWp.firstChild.nodeValue + +this.b_wstWp.firstChild.nodeValue + +this.b_legWp.firstChild.nodeValue;
this.b_Tp_Sum.value = +this.b_headTp.firstChild.nodeValue + +this.b_bodyTp.firstChild.nodeValue + +this.b_armTp.firstChild.nodeValue + +this.b_wstTp.firstChild.nodeValue + +this.b_legTp.firstChild.nodeValue;
this.b_Ip_Sum.value = +this.b_headIp.firstChild.nodeValue + +this.b_bodyIp.firstChild.nodeValue + +this.b_armIp.firstChild.nodeValue + +this.b_wstIp.firstChild.nodeValue + +this.b_legIp.firstChild.nodeValue;
this.b_Dp_Sum.value = +this.b_headDp.firstChild.nodeValue + +this.b_bodyDp.firstChild.nodeValue + +this.b_armDp.firstChild.nodeValue + +this.b_wstDp.firstChild.nodeValue + +this.b_legDp.firstChild.nodeValue;
//スキルポイント計算
var point = [], senyu_point = [], cuff_hiden = false, cuff_hiden_exe = "", gou = 0, sp = 0, hc = 0, tr = 0, hs = 0, sg = 0, g = 0, rs = 0, ss = 0,
				Tup = 0, Tsup = 0, tkup = 0, tzup = 0, tbup = 0, tdcut = 0, teni_point = [];
for (var i = 0,m=MST_Skill.length; i < m; point[i++] = 0);
for (var i = 0,m=TENINAME.length; i < m; teni_point[i++] = 0);
for (var i = 0; i < 5; i++) { //부위別
	for (var k = 0,eq = MST_Equip[BUINAME[i]][this["b_" + BUINAME[i]].value.substring(0,4)]; k < 5; point[eq[I_bSN1+2*k]] += +eq[I_bSP1+2*k] ,k++);
	//防具チェック
	if (eq[I_bCLASS]) {
		if (CLASSTYPE.GClass.indexOf(eq[I_bCLASS]) >= 0) g++;
		if (CLASSTYPE.Shugo.indexOf(eq[I_bCLASS]) >= 0) sg++;
		if (CLASSTYPE.SP.indexOf(eq[I_bCLASS]) >= 0) sp++;
		if (CLASSTYPE.HC.indexOf(eq[I_bCLASS]) >= 0) hc++;
		if (CLASSTYPE.Gosyu.indexOf(eq[I_bCLASS]) >= 0) gou++;
		if (CLASSTYPE.Tenran.indexOf(eq[I_bCLASS]) >= 0) tr++;
		if (CLASSTYPE.Hasyu.indexOf(eq[I_bCLASS]) >= 0) hs++;
		if (CLASSTYPE.Resyu.indexOf(eq[I_bCLASS]) >= 0) rs++;
		if (CLASSTYPE.Sisyu.indexOf(eq[I_bCLASS]) >= 0) ss++;
		if (eq[I_bCLASS] === "O") { //遷悠
			if (eq[I_bNAME].indexOf("G") >= 0) g++;
			var sen_skill_name = (eq[I_bDOC].split(/≪천유 ?방어구\s*[：:]\s*/)[1] || "").split("≫")[0].replace("속성 공격력【","속성 공격력 강화【");
			S : for (var k = 0, m=MST_Skill.length; k < m; k++) {
				for (var j = 5,n = MST_Skill[k].length; j < n; j+=2) {
					if (MST_Skill_Exe[MST_Skill[k][j]] == sen_skill_name) {
						senyu_point[k] = j-1;
						break S;
					}
				}
			}
		} else if (eq[I_bTeni]) { //辿異
			teni_point[eq[I_bTeni]] += 1;
		}
	}
	for (var j = 1; j < 4; j++) { //スロット
		//장식품
		if (this["b_" + BUINAME[i] + "S" + j+"_data"].length === 4) {
			var eq = MST_Equip.deco[this["b_" + BUINAME[i] + "S" + j+"_data"]];
			for (var k = 0; k < 4; point[eq[I_bSN1+2*k]] += +eq[I_bSP1+2*k] ,k++);
		}
		//天刻印
		if (this["b_" + BUINAME[i] + "T" + j+"_data"].length === 4) {
			var eq = MST_Equip.deco[this["b_" + BUINAME[i] + "T" + j+"_data"]];
			switch (eq[I_bSN1]) {
			case "0" : //斬れ味UP
				Tup = 1;
				break;
			case "1" : //スキルUP
				Tsup = 1;
				break;
			case "2" : //攻撃力UP
				tkup++;
				break;
			case "3" : //属性・状態UP
				tzup++;
				break;
			case "4" : //距離補正
				Tup = 1;
				break;
			case "5" : //強撃ビンUP
				Tup = 1;
				break;
			case "6" : //防御力UP
				tbup++;
				break;
			case "7" : //ダメージ軽減
				tdcut++;
				break;
			case "8" : //体力自動回復
				hc++;
				break;
			case "9" : //Ｇ級防具
				g++;
				break;
			}
		}
	}
}
for (var j = 1; j < 4; j++) {
	if (this["b_bukiS" + j+"_data"].length === 4) { //武器スロット
		var eq = MST_Equip.deco[this["b_bukiS" + j+"_data"]];
		if (eq[I_bDEC] !== "3") {
			for (var k = 0; k < 4; point[eq[I_bSN1+2*k]] += +eq[I_bSP1+2*k] ,k++);
		}
		if (eq[I_bTeni]) teni_point[eq[I_bTeni]] += 1 //辿異
	}
	if (this["b_cuffS" + j+"_data"].length === 4) { //カフスロット
		var eq = MST_Equip.deco[this["b_cuffS" + j+"_data"]];
		for (var k = 0; k < 4; point[eq[I_bSN1+2*k]] += +eq[I_bSP1+2*k], k++);
		if (MST_Skill[eq[I_bSN1]][3] === 2) cuff_hiden = eq[I_bSN1]; //秘伝スキルカフ
		if (eq[I_bTeni]) teni_point[eq[I_bTeni]] += 1 //辿異
	}
}
var txt = "<div>" + (g>2 ? "G급 퀘스트에서 무기 배율+30" : "") + "</div>";
if (hs*33+tr*6 >= 100 || rs || ss || Tsup) {
	txt += "<div>상시 스킬랭크UP</div>";
} else if (gou || tr || hs) {
	txt += "<div>체력" + (tr || hs ? 100-hs*33-tr*6 : [0,100,90,83,76,70][gou]) + "%이상에서 스킬랭크 UP</div>";
}
if (tr || hs || rs || ss || tkup) {
	txt += "<div>강종/패종/G급 퀘스트에서 무기 배율+" + ((tr + hs + rs) === 5 ? 80 : ss+tkup >= 5 ? 110 : 15 * (tr + hs + rs) + 20 * (ss + tkup)) + "UP[강무기↑]</div>"
}
if (hs || rs || ss || tzup) {
	txt += "<div>강종/패종/G급 퀘스트에서 속성" + ((hs + rs) * 2 + (ss + tzup) * 3) + "%UP[강무기↑]</div>"
}
if (tr>=2 || hs || rs || ss || Tup) txt += "<div>강종/패종/G급 퀘스트에서 무기 성능 UP[천람↑]</div>";
this.b_effectT.innerHTML =  txt +
							"<div>" + ["","HC 퀘스트에서 스태미나 150일 때 8초마다 회복","HC 퀘스트에서 스태미나 125일 때 4초마다 회복","HC 퀘스트에서 스태미나 100일 때 2초마다 회복","HC 퀘스트에서 스태미나 75일 때 1.5초마다 회복","HC 퀘스트에서 스태미나 50일 때 1초마다 회복"][hc+sg] + "</div>" +
							"<div>" + ["","SR100 이후 퀘스트에서 대미지 10% 감소","SR100 이후 퀘스트에서 대미지 17% 감소","SR100 이후 퀘스트에서 대미지 24% 감소","SR100 이후 퀘스트에서 대미지 27% 감소","SR100 이후 퀘스트에서 대미지 30% 감소"][sg+tdcut] + "</div>" +
							"<div>" + ["","HC/패종/G급 퀘스트에서 방어+20","HC/패종/G급 퀘스트에서 방어+40","HC/패종/G급 퀘스트에서 방어+60","HC/패종/G급 퀘스트에서 방어+80","HC/패종/G급 퀘스트에서 방어+100"][sg+tbup] + "</div>" +
							"<div>" + (sp ? "HR100 이후 퀘스트에서 방어+100" : "") + "</div>";
this.b_gousyuB.style.display = gou || tr || hs || rs || ss || Tsup ? "inline" : "none";
var sup = this.b_gousyuB.value === "랭크UP있음";
//最大スキル発動数
var exemax = g === 5 ? 12 : g >= 3 ? 11 : 10;
//スキル
for (var i = 0, list = [], exe = [], m=MST_Skill.length; i < m; i++) {
	if (point[i] === 0) continue;
	//スキルポイントリスト
	list[list.length] = [MST_Skill[i][0],point[i]]; //スキル名,ポイント
	//発動スキル
	for (var j = 4,ck = 0,n = MST_Skill[i].length; j < n; j+=2) {
		if (MST_Skill[i][j] < 0) {
			//マイナス発動(発動したら出る)
			if (MST_Skill[i][j] >= point[i]) {
				ck = j;
				if (sup && MST_Skill[i][2] && 3 <= j - 2) ck -= 2;
				break;
			}
		} else {
			//プラス発動(足りない場合出る)
			if (MST_Skill[i][j] <= point[i]) {
				ck = j;
				if (sup && MST_Skill[i][2] && MST_Skill[i].length > j + 2) ck += 2;
				if (senyu_point[i] && senyu_point[i] >= ck) ck = 0; //遷悠対象なら除外
			} else {
				break;
			}
		}
	}
	if (ck && i == cuff_hiden) cuff_hiden_exe = MST_Skill_Exe[MST_Skill[i][ck+1]],ck=0; //秘伝スキルカフは上限除外
	if (ck) exe[exe.length] = [MST_Skill[i][1],MST_Skill_Exe[MST_Skill[i][ck+1]],i,point[i]]; //発動順,発動スキル,スキルID,ポイント
}
//スキルリスト
list.sort(function(a, b) {return b[1] - a[1]});
this.b_skillP.innerHTML = list.join("<br>").replace(/,/g," ");
var t = "";
//辿異防具
for (var i = 0, m=teni_point.length; i < m; i++) {
	if (teni_point[i]) {
		if (TENINAME[i].slice(-2,-1) === "+") {
			for (var j = teni_point[i]-1; j >= 0 ; j--) {
				if (i + j < m) {
					if (TENINAME[i].slice(0,4) === TENINAME[i+j].slice(0,4)) {
						t +=  TENINAME[i+j] + "<br>";
						break;
					}
				}
			}
		} else {
			t +=  TENINAME[i] + "<br>";
		}
	}
}
//遷悠防具
for (var i = 0, m=senyu_point.length; i < m; i++) {
	if (senyu_point[i]) t +=  MST_Skill_Exe[MST_Skill[i][senyu_point[i]+1]] + "<br>";
}
if (t) t = "<i>" + t + "</i>";
//秘伝カフスキル
if (cuff_hiden_exe) t += "<div style='color:darkorange'>" + cuff_hiden_exe + "</div>";
//発動スキル
exe.sort(function(a, b) {return a[0]-b[0]});
//辿異スキル(スキル枠拡張+1)
if (teni_point[1]) exemax += teni_point[1];
var exelm = exe.slice(0,exemax);
exelm.sort(function(a, b) {
		if (a[3] === b[3]) {
			return a[2] - b[2];
		} else {
			return b[3] - a[3];
		}});
this.c_soko.value = 60; //底力初期値
for (var i = 0; i < exelm.length; i++) {
	t += exelm[i][1] + "<br>";
	switch (exelm[i][1].substring(0,3)) {
	case "방어+":
	case "방어-":
		this.b_Def_Sum.value += +exelm[i][1].substring(2);
		break;
	case "화내성":
		this.b_Fp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "수내성":
		this.b_Wp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "뇌내성":
		this.b_Tp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "빙내성":
		this.b_Ip_Sum.value += +exelm[i][1].substring(3);
		break;
	case "용내성":
		this.b_Dp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "각 내성":
		this.b_Fp_Sum.value += +exelm[i][1].substring(3);
		this.b_Wp_Sum.value += +exelm[i][1].substring(3);
		this.b_Tp_Sum.value += +exelm[i][1].substring(3);
		this.b_Ip_Sum.value += +exelm[i][1].substring(3);
		this.b_Dp_Sum.value += +exelm[i][1].substring(3);
		break;
	case "소심함":
		this.c_soko.value = 42;
		break;
	case "화재현장":
	case "역린":
	case "ブチギ":
		this.c_soko.value = 90;
		break;
	case "생명력":
		switch (exelm[i][1].charAt(4)) {
		case "1":
			this.b_Def_Sum.value += 15;
			break;
		case "2":
			this.b_Def_Sum.value += 45;
			break;
		case "3":
			this.b_Def_Sum.value += 90;
			break;
		}
		break;
	}
}

//上限突破
if (exe.length > exemax) {
	t +=  "<small>(";
	for (var i = exemax; i < exe.length; t += exe[i++][1]) + "<br>";
	t +=  ")</small>";
}
this.calcDef();
this.b_skillT.innerHTML = t;
}
//------------------------------------笛の旋律変更----------
,cngFueExe : function (){
if (this.c_G_Que.selectedIndex) {
	var i = this.c_fueDEF.selectedIndex;
	this.c_fueDEF.selectedIndex = 0;
	this.c_fueDEF.style.display = "none";
	this.c_fueDEF_G.style.display = "inline";
	this.c_fueDEF_G.selectedIndex = i;
} else {
	var i = this.c_fueDEF_G.selectedIndex;
	if (i > 0 || this.c_fueDEF_G.style.display != "none") {
		this.c_fueDEF_G.selectedIndex = 0;
		this.c_fueDEF_G.style.display = "none";
		this.c_fueDEF.style.display = "inline";
		this.c_fueDEF.selectedIndex = i;
	}
}
}
//------------------------------------防御耐性----------
,calcDef : function (){
var b_Def_Sum = +this.b_Def_Sum.value,sr_defCut = 100,sr_defAdd = 0;
var tai = {	"b_Fp_Sum" : +this.b_Fp_Sum.value,
			"b_Wp_Sum" : +this.b_Wp_Sum.value,
			"b_Tp_Sum" : +this.b_Tp_Sum.value,
			"b_Ip_Sum" : +this.b_Ip_Sum.value,
			"b_Dp_Sum" : +this.b_Dp_Sum.value};
//防御
b_Def_Sum += (this.c_gohu.checked ? 16 : 0) + (this.c_tume.checked ? 24 : 0) + (this.c_soko.checked ? +this.c_soko.value : 0) + +this.c_mesi.value + +this.c_tane.value + +this.c_buki.value + +this.c_shien.value;

if (this.c_drink.value !== "0") { //ドリンク
	tai["b_" + this.c_drink.value.charAt(0) + "p_Sum"] += +this.c_drink.value.substring(1);
}
if (this.c_fueTAI.value !== "0") { //笛
	tai["b_" + this.c_fueTAI.value.charAt(0) + "p_Sum"] += +this.c_fueTAI.value.substring(1);
}
if (this.c_sr.value !== "0") { //SR
	switch (this.c_sr.value.charAt(0)) {
	case "S":
		sr_defCut = 100-this.c_sr.value.substring(1,3);
		tai["b_Fp_Sum"] -= this.c_sr.value.substring(3);
		tai["b_Wp_Sum"] -= this.c_sr.value.substring(3);
		tai["b_Tp_Sum"] -= this.c_sr.value.substring(3);
		tai["b_Ip_Sum"] -= this.c_sr.value.substring(3);
		tai["b_Dp_Sum"] -= this.c_sr.value.substring(3);
		break;
	case "B":
		sr_defAdd = +this.c_sr.value.substring(1);
		break;
	case "A":
		tai["b_Fp_Sum"] += +this.c_sr.value.substring(1);
		tai["b_Wp_Sum"] += +this.c_sr.value.substring(1);
		tai["b_Tp_Sum"] += +this.c_sr.value.substring(1);
		tai["b_Ip_Sum"] += +this.c_sr.value.substring(1);
		tai["b_Dp_Sum"] += +this.c_sr.value.substring(1);
		break;
	default:
		tai["b_" + this.c_sr.value.charAt(0) + "p_Sum"] += +this.c_sr.value.substring(1);
	}
}
b_Def_Sum = Math.floor(b_Def_Sum * this.c_fueDEF.value * sr_defCut / 10000) + sr_defAdd+ (this.c_kizuna.checked ? 40 : 0) + +this.c_katsu.value + +this.c_fueDEF_G.value - 150 * this.c_G_Que.value;
if (b_Def_Sum < 1) b_Def_Sum = 1;

this.b_Def_Sum.firstChild.nodeValue = b_Def_Sum
this.b_Fp_Sum.firstChild.nodeValue = tai["b_Fp_Sum"];
this.b_Wp_Sum.firstChild.nodeValue = tai["b_Wp_Sum"];
this.b_Tp_Sum.firstChild.nodeValue = tai["b_Tp_Sum"];
this.b_Ip_Sum.firstChild.nodeValue = tai["b_Ip_Sum"];
this.b_Dp_Sum.firstChild.nodeValue = tai["b_Dp_Sum"];
}
//------------------------------------テキスト出力----------
,creText : function (){
// 글자 폭(반각 0.5·전각 1)으로 n칸에 맞춘다. 넘치면 자르고 모자라면 전각/반각 공백으로 채운다.
var pw = function (s, n) {
	var w = 0, o = "";
	for (var i = 0; i < s.length; i++) {
		var c = s.charCodeAt(i), cw = (c < 0x100 || (c >= 0xff61 && c <= 0xff9f)) ? 0.5 : 1;
		if (w + cw > n) break;
		o += s.charAt(i); w += cw;
	}
	while (w + 1 <= n) { o += "　"; w += 1; }
	if (w < n) o += " ";
	return o;
};
var sp = "　　　　　　　　　　";
var w = this.b_cuff.value.split(",");
var t = "커프："+pw("",18.5)+MST_Equip.deco[w[2]][I_bNAME]+" "+MST_Equip.deco[w[3]][I_bNAME]+"\n";
var w = this.b_buki.value.split(",");
t += "무기："+pw("",18.5)+MST_Equip.deco[w[2]][I_bNAME]+" "+MST_Equip.deco[w[3]][I_bNAME]+" "+MST_Equip.deco[w[4]][I_bNAME]+"\n";
if (this.b_head.value === "0000,1,O,O,O") {
	t += "머리：없음\n";
} else {
	var w = this.b_head.value.split(",");
	t += "머리："+pw(MST_Equip.head[w[0]][I_bNAME],13)+pw("Lv"+w[1],2)+"　"+("  "+this.b_headDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_headS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_headS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_headS3_data][I_bNAME];
	if (MST_Equip.head[w[0]][I_bCLASS] === "N") t += "["+MST_Equip.deco[this.b_headT1_data][I_bNAME]+" "+MST_Equip.deco[this.b_headT2_data][I_bNAME]+" "+MST_Equip.deco[this.b_headT3_data][I_bNAME]+"]";
	t += "\n"
}
if (this.b_body.value === "0000,1,O,O,O") {
	t += "몸통：없음\n"
} else {
	var w = this.b_body.value.split(",");
	t += "몸통："+pw(MST_Equip.body[w[0]][I_bNAME],13)+pw("Lv"+w[1],2)+"　"+("  "+this.b_bodyDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_bodyS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_bodyS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_bodyS3_data][I_bNAME];
	if (MST_Equip.body[w[0]][I_bCLASS] === "N") t += "["+MST_Equip.deco[this.b_bodyT1_data][I_bNAME]+" "+MST_Equip.deco[this.b_bodyT2_data][I_bNAME]+" "+MST_Equip.deco[this.b_bodyT3_data][I_bNAME]+"]";
	t += "\n"
}
if (this.b_arm.value === "0000,1,O,O,O") {
	t += "양팔：없음\n"
} else {
	var w = this.b_arm.value.split(",");
	t += "양팔："+pw(MST_Equip.arm[w[0]][I_bNAME],13)+pw("Lv"+w[1],2)+"　"+("  "+this.b_armDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_armS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_armS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_armS3_data][I_bNAME];
	if (MST_Equip.arm[w[0]][I_bCLASS] === "N") t += "["+MST_Equip.deco[this.b_armT1_data][I_bNAME]+" "+MST_Equip.deco[this.b_armT2_data][I_bNAME]+" "+MST_Equip.deco[this.b_armT3_data][I_bNAME]+"]";
	t += "\n"
}
if (this.b_wst.value === "0000,1,O,O,O") {
	t += "허리：없음\n"
} else {
	var w = this.b_wst.value.split(",");
	t += "허리："+pw(MST_Equip.wst[w[0]][I_bNAME],13)+pw("Lv"+w[1],2)+"　"+("  "+this.b_wstDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_wstS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_wstS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_wstS3_data][I_bNAME];
	if (MST_Equip.wst[w[0]][I_bCLASS] === "N") t += "["+MST_Equip.deco[this.b_wstT1_data][I_bNAME]+" "+MST_Equip.deco[this.b_wstT2_data][I_bNAME]+" "+MST_Equip.deco[this.b_wstT3_data][I_bNAME]+"]";
	t += "\n"
}
if (this.b_leg.value === "0000,1,O,O,O") {
	t += "다리：없음\n"
} else {
	var w = this.b_leg.value.split(",");
	t += "다리："+pw(MST_Equip.leg[w[0]][I_bNAME],13)+pw("Lv"+w[1],2)+"　"+("  "+this.b_legDef.firstChild.nodeValue).slice(-3)+"　"+MST_Equip.deco[this.b_legS1_data][I_bNAME]+" "+MST_Equip.deco[this.b_legS2_data][I_bNAME]+" "+MST_Equip.deco[this.b_legS3_data][I_bNAME];
	if (MST_Equip.leg[w[0]][I_bCLASS] === "N") t += "["+MST_Equip.deco[this.b_legT1_data][I_bNAME]+" "+MST_Equip.deco[this.b_legT2_data][I_bNAME]+" "+MST_Equip.deco[this.b_legT3_data][I_bNAME]+"]";
	t += "\n"
}
t += "\n";
t += "방어력："+this.b_Def_Sum.firstChild.nodeValue;
t += " 화내성："+this.b_Fp_Sum.firstChild.nodeValue;
t += " 수내성："+this.b_Wp_Sum.firstChild.nodeValue;
t += " 뇌내성："+this.b_Tp_Sum.firstChild.nodeValue;
t += " 빙내성："+this.b_Ip_Sum.firstChild.nodeValue;
t += " 용내성："+this.b_Dp_Sum.firstChild.nodeValue+"\n";
t += "\n";
t += "발동 스킬\n";
t += this.b_skillT.innerHTML.replace(/<br>/ig,",");
if (CK_MAC) {
	t = t.replace("Ⅰ","I");
	t = t.replace("Ⅱ","II");
	t = t.replace("Ⅲ","III");
	t = t.replace("Ⅳ","IV");
	t = t.replace("Ⅴ","V");
	t = t.replace("Ⅵ","VI");
	t = t.replace("Ⅶ","VII");
	t = t.replace("Ⅷ","VIII");
	t = t.replace("Ⅸ","IX");
	t = t.replace("Ⅹ","X");
}
return t;
}
//------------------------------------マイセット----------
,saveFile : function (all){
var data = MY_SET_PARTS.map(function (part) {
	var select = this["b_" + part];
	if (!all) return select.value;
	var options = Array.prototype.slice.call(select.options);
	if ((part === "buki" || part === "cuff") && options.length > 1) options.pop();
	return options.map(function (option) { return option.value; }).join("/");
}, this);
var text = "###data 変更しないで###" + data.join("|") + "###\r\n###テキスト###\r\n" + this.creText().replace(/<br>/gi,"\n");
var url = URL.createObjectURL(new Blob([text], {type: "text/plain;charset=utf-8"}));
var link = document.createElement("a");
link.href = url;
link.download = "ferias-set.txt";
document.body.appendChild(link);
link.click();
link.remove();
setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
}
,getFile : function (data){
if (data.length !== 6 && data.length !== 7) return false;
var groups = data.map(function (list) { return list.split("/"); });
if (groups.length === 6) groups.push(["0000,1,O,O,"]);
var resetRank = false;
for (var i = 0; i < groups.length; i++) {
	var part = MY_SET_PARTS[i], armor = MST_Equip[part];
	for (var j = 0; j < groups[i].length; j++) {
		var fields = groups[i][j].split(",");
		if (fields.length < 5 || fields.length > 8 || !/^[1-7]$/.test(fields[I_sLV])) return false;
		var eq = armor && armor[fields[I_sID]];
		if (armor ? !Array.isArray(eq) || +fields[I_sLV] > +eq[I_bLVMAX] :
			fields[I_sID] !== "0000" || +fields[I_sLV] > (part === "buki" ? 3 : 1)) return false;
		if (fields.slice(I_sS1).some(function (slot) { return !Array.isArray(MST_Equip.deco[slot]); })) return false;
		if (eq && +getSozai(eq)[I_iHR1 + +fields[I_sLV] - 1] > +this.c_hr.value) resetRank = true;
		if (eq && eq[I_bCLASS] === "N") {
			while (fields.length < I_sT1 + +eq[I_bTrSLOT]) fields.push("O");
			groups[i][j] = fields.join(",");
		}
	}
}
if (resetRank) this.c_hr.selectedIndex = 0;
for (var i = 0; i < groups.length; i++) {
	var part = MY_SET_PARTS[i], armor = MST_Equip[part], select = this["b_" + part];
	select.length = 0;
	groups[i].forEach(function (value) {
		if (!armor && select.length > 1) select.remove(select.length - 1);
		var name = armor ? armor[value.split(",",1)[0]][I_bNAME] : "세트";
		select.add(new Option(name, value));
		select.selectedIndex = select.length - 1;
		this.cngData(part);
	}, this);
}
this.calc();
return true;
}

}//グローバル
global.Init();
global.Init=null;
return global;
})(document);

//------------------------------------イベント貼り付け----------
(function(){
//イベントセット
var addEvent = function (elm, type, func) {
	//追加
	elm./*@cc_on @if (true) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
	//アンロードで削除
	window./*@cc_on @if (true) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ "unload",
		function(){
			elm./*@cc_on @if (true) detachEvent ('on' + @else@*/ removeEventListener (/*@end@*/ type,func,false);
		}
		,false);
};
addEvent(window,"resize",
function () {
	document.getElementById("f_search").style.height = document.getElementById("f_bougu").style.height = (Number(window.innerHeight) || document.documentElement.clientHeight || document.body.clientHeight) - 85 + "px";
});
addEvent(window,"load",
function () {
//		this.onresize();
	document.getElementById("f_search").style.height = document.getElementById("f_bougu").style.height = (Number(window.innerHeight) || document.documentElement.clientHeight || document.body.clientHeight) - 85 + "px";

});
addEvent(document,"dblclick",
function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	if (t.id.substring(0,5) === "c_rep") {t.style.backgroundColor = t.style.backgroundColor ? "" : "gray";}
	else if (t.id === "s_head" || t.id === "s_body" || t.id === "s_arm" || t.id === "s_wst" || t.id === "s_leg" || t.id === "s_deco" || t.id === "s_cuff") SkillForm.setData(t.value,t.id.substring(2));
	/*@if (true)
	@else@*/
	if (t.tagName.toUpperCase() === "OPTION") {
		var p = t.parentNode;
		if (p.id === "s_head" || p.id === "s_body" || p.id === "s_arm" || p.id === "s_wst" || p.id === "s_leg" || p.id === "s_deco" || p.id === "s_cuff") SkillForm.setData(p.value,p.id.substring(2));
	}
	/*@end@*/
});
addEvent(document,"click",
function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	switch (t.id) {
	case "c_input":
		SkillForm.dispInput();
		break;
	case "c_series":
		SkillForm.dispSeriesList(t.id);
		break;
	case "c_skill1":
	case "c_skill2":
	case "c_skill3":
		SkillForm.dispSkillList(t.id);
		break;
	case "c_minus":
		for (var i=0;i<7;SkillForm.c_cuff_lm.options[i++].text = (t.checked ? "±" : "+") + i);
		break;
	case "search_B":
		SkillForm.search();
		break;
	case "s_head":
	case "s_body":
	case "s_arm":
	case "s_wst":
	case "s_leg":
	case "s_deco":
	case "s_cuff":
		SkillForm.dispData(t.value,t.id.substring(2),7);
		break;
	case "s_headYA":
	case "s_bodyYA":
	case "s_armYA":
	case "s_wstYA":
	case "s_legYA":
	case "s_decoYA":
	case "s_cuffYA":
		var w = t.id.substring(0,t.id.length-2);
		SkillForm.setData(SkillForm[w].value,t.id.substring(2,t.id.length-2));
		break;
	case "sub_WinRemove_B":
		SkillForm.removeDec();
		SkillForm.closeSubWin();
		break;
	case "sub_WinClear_B":
		SkillForm.removeAllDec();
		SkillForm.closeSubWin();
		break;
	case "sub_WinClose_B":
		SkillForm.closeSubWin();
		break;
	case "b_defimg":
		if (t.value === "방어내성"){
			t.value = "이미지";
			SkillForm.d_MF.style.display = SkillForm.d_MB.style.display = SkillForm.d_FF.style.display = SkillForm.d_FB.style.display = "none";
			SkillForm.def_Box.style.display = "";
		} else {
			t.value = "방어내성";
			SkillForm.def_Box.style.display = "none";
			SkillForm.d_MF.style.display = SkillForm.d_MB.style.display = SkillForm.d_FF.style.display = SkillForm.d_FB.style.display = "inline";
		}
		break;
	case "b_gousyuB":
		t.value = t.value === "랭크UP있음" ? "랭크UP없음" : "랭크UP있음";
		SkillForm.calc();
		break;
	case "b_head":
	case "b_body":
	case "b_arm":
	case "b_wst":
	case "b_leg":
		SkillForm.dispData(t.value.substring(0,4),t.id.substring(2),t.value.substring(5,6));
		break;
	case "b_cuffDel":
	case "b_bukiDel":
	case "b_headDel":
	case "b_bodyDel":
	case "b_armDel":
	case "b_wstDel":
	case "b_legDel":
		SkillForm.delData(t.id.substring(2,t.id.length-3));
		SkillForm.calc();
		break;
	case "b_headLv":
	case "b_bodyLv":
	case "b_armLv":
	case "b_wstLv":
	case "b_legLv":
		SkillForm.dispData(SkillForm[t.id.substring(0,t.id.length-2)].value.substring(0,4),SkillForm[t.id.substring(0,t.id.length-2)].id.substring(2),SkillForm[t.id.substring(0,t.id.length-2)].value.substring(5,6));
		break;
	case "b_save":
		SkillForm.saveFile(window.confirm("모두 저장하시겠습니까?\nOK: 전체 취소: 표시된 부분만"));
		break;
	case "b_text":
		var f4=window.open("","");
		f4.document.open("text/html; charset=Shift_JIS");
		f4.document.write("<pre style=\"font-family:GulimChe,'굴림체',DotumChe,'돋움체',monospace\">");
		f4.document.write(SkillForm.creText());
		f4.document.write("</pre>");
		f4.document.close();
		f4=null;
		break;
	case "c_gohu":
	case "c_tume":
	case "c_soko":
	case "c_kizuna":
		SkillForm.calcDef();
		break;
	case "c_buki":
		t.select();
		break;
	default:
		if (t.id.substring(0,5) === "c_rep") {
			t.style.backgroundColor = t.style.backgroundColor ? "" : "gray";
		} else if (t.id.lastIndexOf("S1") !== -1 || t.id.lastIndexOf("S2") !== -1 || t.id.lastIndexOf("S3") !== -1 ||
					t.id.lastIndexOf("T1") !== -1 || t.id.lastIndexOf("T2") !== -1 || t.id.lastIndexOf("T3") !== -1) {
			if (t.disabled) return;
			SkillForm.dispData(SkillForm[t.id+"_data"],"deco",7);
			SkillForm.dispDecoList(t.id);
		} else if (t.tagName.toUpperCase() === "INPUT" && t.type.toUpperCase() === "BUTTON") {
//				ボタンなのになにも処理がないなら小画面
			SkillForm.setInput(t.name.substring(5),t.value);
			SkillForm.closeSubWin();
		} else {
			SkillForm.closeSubWin();
		}
		/*@if (true)
		@else@*/
		if (t.tagName.toUpperCase() === "OPTION") {
			var p = t.parentNode;
			if (p.id === "s_head" || p.id === "s_body" || p.id === "s_arm" || p.id === "s_wst" || p.id === "s_leg" || p.id === "s_deco" || p.id === "s_cuff") SkillForm.dispData(p.value,p.id.substring(2),7);
		}
		/*@end@*/
	}
});
var change_event = function (evt) {
	/*@if (true)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
//			SkillForm.change_event(t.id);
	switch (t.id) {
	case "c_teni":
		SkillForm.c_series.value = "-",SkillForm.sub_WinBody./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = SkillForm.c_series_data = "",SkillForm.c_andor.disabled = SkillForm.c_slot.disabled = SkillForm.c_minus.disabled = SkillForm.c_upg.disabled = false;
		break;
	case "c_hr":
		if (SkillForm.b_head.length > 1) SkillForm.cngData("head");
		if (SkillForm.b_body.length > 1) SkillForm.cngData("body");
		if (SkillForm.b_arm.length > 1) SkillForm.cngData("arm");
		if (SkillForm.b_wst.length > 1) SkillForm.cngData("wst");
		if (SkillForm.b_leg.length > 1) SkillForm.cngData("leg");
		if (+SkillForm.c_hr.value <=50){
			SkillForm.cngSlot("O","b_cuffS1");
			SkillForm.cngSlot("O","b_cuffS2");
			SkillForm.calc();
			SkillForm.b_cuffS1.disabled = SkillForm.b_cuffS2.disabled = 1;
		} else {
			SkillForm.b_cuffS1.disabled = SkillForm.b_cuffS2.disabled = 0;
		}
		break;
	case "b_buki":
	case "b_cuff":
	case "b_head":
	case "b_body":
	case "b_arm":
	case "b_wst":
	case "b_leg":
		SkillForm.cngData(t.id.substring(2));
		SkillForm.calc();
		break;
	case "b_bukiLv":
		SkillForm.cngLv(t.id.substring(2,t.id.length-2));
		break;
	case "b_headLv":
	case "b_bodyLv":
	case "b_armLv":
	case "b_wstLv":
	case "b_legLv":
		SkillForm.cngLv(t.id.substring(2,t.id.length-2));
		SkillForm.cngData(t.id.substring(2,t.id.length-2));
		SkillForm.calc();
		break;
	case "b_read":
		var file = t.files[0];
		if (!file) break;
		t.disabled = true;
		file.text().then(function (text) {
			var match = /^###data[^#\r\n]*###([^#\r\n]+)###(?:\r?\n|$)/.exec(text);
			if (!match || !SkillForm.getFile(match[1].split("|"))) throw new Error("invalid set file");
		}).catch(function () {
			alert("이 파일은 불러올 수 없습니다");
		}).finally(function () {
			t.value = "";
			t.disabled = false;
		});
		break;
	case "c_G_Que":
		SkillForm.cngFueExe();
	case "c_G_Fit":
		SkillForm.calc();
	case "c_mesi":
	case "c_sr":
	case "c_tane":
	case "c_drink":
	case "c_fueDEF":
	case "c_fueDEF_G":
	case "c_fueTAI":
	case "c_buki":
	case "c_shien":
	case "c_katsu":
		SkillForm.calcDef();
		break;
	}
}
addEvent(document.getElementById("c_hr"),"change",change_event);
addEvent(document.getElementById("b_buki"),"change",change_event);
addEvent(document.getElementById("b_cuff"),"change",change_event);
addEvent(document.getElementById("b_head"),"change",change_event);
addEvent(document.getElementById("b_body"),"change",change_event);
addEvent(document.getElementById("b_arm"),"change",change_event);
addEvent(document.getElementById("b_wst"),"change",change_event);
addEvent(document.getElementById("b_leg"),"change",change_event);
addEvent(document.getElementById("b_bukiLv"),"change",change_event);
addEvent(document.getElementById("b_headLv"),"change",change_event);
addEvent(document.getElementById("b_bodyLv"),"change",change_event);
addEvent(document.getElementById("b_armLv"),"change",change_event);
addEvent(document.getElementById("b_wstLv"),"change",change_event);
addEvent(document.getElementById("b_legLv"),"change",change_event);
addEvent(document.getElementById("b_read"),"change",change_event);

addEvent(document.getElementById("c_mesi"),"change",change_event);
addEvent(document.getElementById("c_sr"),"change",change_event);
addEvent(document.getElementById("c_tane"),"change",change_event);
addEvent(document.getElementById("c_drink"),"change",change_event);
addEvent(document.getElementById("c_fueDEF"),"change",change_event);
addEvent(document.getElementById("c_fueDEF_G"),"change",change_event);
addEvent(document.getElementById("c_G_Que"),"change",change_event);
addEvent(document.getElementById("c_G_Fit"),"change",change_event);
addEvent(document.getElementById("c_G_Fit"),"change",change_event);
addEvent(document.getElementById("c_katsu"),"change",change_event);
addEvent(document.getElementById("c_buki"),"change",change_event);
addEvent(document.getElementById("c_shien"),"change",change_event);
addEvent(document.getElementById("c_teni"),"change",change_event);

//珠の詳細表示
addEvent(document.getElementById("sub_WinBody"),"mouseover",
function (evt) {
	if (SkillForm.sub_Win_id.lastIndexOf("S1") !== -1 || SkillForm.sub_Win_id.lastIndexOf("S2") !== -1 || SkillForm.sub_Win_id.lastIndexOf("S3") !== -1 ||
		SkillForm.sub_Win_id.lastIndexOf("T1") !== -1 || SkillForm.sub_Win_id.lastIndexOf("T2") !== -1 || SkillForm.sub_Win_id.lastIndexOf("T3") !== -1) {
		/*@if (true)
		var t = evt.srcElement;
		@else@*/
		var t = evt.target;
		/*@end@*/
		if (t.tagName.toUpperCase() === "INPUT") SkillForm.dispData(t.name.substring(5),"deco",7);
	}
});
})();
