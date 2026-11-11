/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
(function (document){
//固定
var item_id = location.search.substring(1,5).toUpperCase(),
	MST_Item = setItem(),
	MST_Quest = setQuest(),
	MST_Saisyu = setSaisyu(),
	MST_Mos = setMonster(),
	MST_Other = setOther(),
	Quest_Season = ["","：온난기","：번식기","：한랭기"],
	Quest_Time = ["","/낮","/밤"],
	Saisyu_Name = ["범용","밀림","사막","늪지","설산","화산","숲과 언덕","탑", "수해","요격 거점","요새","성","결전장","투기 훈련","협곡","절도","고지","조도","극해","꽃밭","흰 호수","채색폭포"],
	Saisyu_Id	= ["",	"mitu","saba","numa","yuki","kaza","mori","tou","zyu", "def",		"toride","siro","kessen","tougi",	"kyou","sima","kou", "shio","kyoku","hana","bya","sai"];
setItem = setQuest = setSaisyu = setMonster = setOther = null;
var addEvent = function (elm, type, func) {
	//追加
	elm./*@if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
};
//------------------------------------説明----------
var item = MST_Item[item_id];
if (typeof item === 'undefined') {
	document.getElementById("loading").style.display="none";
	//ボタン
	if (location.search.charAt(5) === "W") {
		document.getElementById("b_back").value = "닫기";
		addEvent(document.getElementById("b_back"),"click",function () {window.close();});
	} else {
		addEvent(document.getElementById("b_back"),"click",function () {history.back();});
	}
	return;
}
document.getElementById("d_mei").firstChild.nodeValue = item[0];
document.getElementById("d_rea").firstChild.nodeValue = isNaN(item[1]) ? item[1].replace("X","[택배X]") : item[1];
document.getElementById("d_buy").firstChild.nodeValue = item[2] + "z";
document.getElementById("d_stock").firstChild.nodeValue = item[3];
if (+item[4] >= 5000) {
	document.getElementById("d_hrmei").firstChild.nodeValue = "-";
	document.getElementById("d_hr").firstChild.nodeValue = "-";
} else if (+item[4] >= 3000) {
	document.getElementById("d_hrmei").firstChild.nodeValue = "GSR";
	document.getElementById("d_hr").firstChild.nodeValue = item[4] - 3000;
} else if (+item[4] >= 2000) {
	document.getElementById("d_hrmei").firstChild.nodeValue = "GR";
	document.getElementById("d_hr").firstChild.nodeValue = item[4] - 2000;
} else if (+item[4] >= 1000) {
	document.getElementById("d_hrmei").firstChild.nodeValue = "SR";
	document.getElementById("d_hr").firstChild.nodeValue = item[4] - 1000;
} else {
	document.getElementById("d_hr").firstChild.nodeValue = item[4];
}
document.getElementById("d_setu").firstChild.nodeValue = item[6];
// 메모 A/B 퍼즐은 줄과 전각 공백을 유지한다.
if (item_id === "3859" || item_id === "385A") document.getElementById("d_setu").style.whiteSpace = "pre";

//------------------------------------採取----------
var creSaiLink = function (data,obj,rank,season) {
	if (!data) return;
	for (var i = 0,list = data.split(","),m = list.length,txt = ""; i < m; i++) {
		var w = list[i].split("|"),
			map_id = Saisyu_Id[w[0]] + "-";
		txt += Saisyu_Name[w[0]] + " 지역：" +
				(w[3].indexOf("h") !== -1	? w[3].replace("h"," <span id=\"" + map_id + w[1] + "." + map_id + rank + "." + w[2] + "." + season + i + "\"><span class=h>낮</span> ")
											: w[3].replace("y"," <span id=\"" + map_id + w[1] + "." + map_id + rank + "." + w[2] + "." + season + i + "\"><span class=y>밤</span> ")
				) + "%</span>" +
				(w.length > 4	? " <span id=\"" + map_id + w[4] + "." + map_id + rank + "." + w[5] + "." + season + i + "\"><span class=y>밤</span> " + w[6] + "%</span><br>"
								: "<br>");
	}
	obj.innerHTML = txt.replace(/s /g,"채굴 ").replace(/m /g,"잠자리채 ").replace(/t /g,"낚시 ");
	if (m > 4) {
		obj.style.height = "5em";
		obj.style.overflow = "auto";
	}
}
//下位
if (MST_Saisyu.Kai[item_id]) {
	var sai = MST_Saisyu.Kai[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_kaion"),"kai","on");
	creSaiLink(sai[1],document.getElementById("sai_kaikan"),"kai","kan");
	creSaiLink(sai[2],document.getElementById("sai_kaihan"),"kai","han");
}
//上位
if (MST_Saisyu.Zyoui[item_id]) {
	var sai = MST_Saisyu.Zyoui[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_zyouion"),"zyoui","on");
	creSaiLink(sai[1],document.getElementById("sai_zyouikan"),"zyoui","kan");
	creSaiLink(sai[2],document.getElementById("sai_zyouihan"),"zyoui","han");
}
//凄腕
if (MST_Saisyu.Sugo[item_id]) {
	var sai = MST_Saisyu.Sugo[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_sugoon"),"sugo","on");
	creSaiLink(sai[1],document.getElementById("sai_sugokan"),"sugo","kan");
	creSaiLink(sai[2],document.getElementById("sai_sugohan"),"sugo","han");
}
//G級
if (MST_Saisyu.G[item_id]) {
	var sai = MST_Saisyu.G[item_id].split("^");
	creSaiLink(sai[0],document.getElementById("sai_gon"),"g","on");
	creSaiLink(sai[1],document.getElementById("sai_gkan"),"g","kan");
	creSaiLink(sai[2],document.getElementById("sai_ghan"),"g","han");
}
//------------------------------------モンスター----------
var creMosLink = function (data,obj) {
	if (!data) return;
	for (var i = 0,list = data.split(","),m = list.length,txt = ""; i < m; i++) {
		var w = list[i].split("|");
		txt += "<a href=\"../mons/" + w[0] + "_h.htm\">" + MST_Mos.Name[w[0]] + "</a> " + w[1] + "<br>";
	}
	obj.innerHTML = txt;
}
creMosLink(MST_Mos.Kai[item_id],document.getElementById("mos_kai"));
creMosLink(MST_Mos.Zyoui[item_id],document.getElementById("mos_zyoui"));
creMosLink(MST_Mos.Sugo[item_id],document.getElementById("mos_sugo"));
creMosLink(MST_Mos.G[item_id],document.getElementById("mos_g"));
//------------------------------------クエスト----------
var creQueLink = function (data,obj) {
	if (!data) return;
	for (var i = 0,list = data.split(","),m = list.length,txt = ""; i < m; i++) {
		var w = (function(a){a[4]=a.slice(4).join(",");return a;})(MST_Quest.Name[list[i].substring(0,4)].split(",")),hosyu = list[i].substring(6).split("%");
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(4) ? " class="+w[1].charAt(4) : "") + ">" + MST_Quest.Btype[parseInt(w[1].substring(0,2),16)] + Quest_Season[w[1].charAt(2)] + Quest_Time[w[1].charAt(3)] + "：" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> " + MST_Quest.Htype[parseInt(list[i].substring(4,6),16)] + " 로 " + (hosyu.length === 1 ? hosyu[0] + "개" : hosyu[0] + "개 (" + hosyu[1] + "%)") + "<br>";
	}
	obj.innerHTML = txt;
}
creQueLink(MST_Quest.Kai[item_id],document.getElementById("que_kai"));
creQueLink(MST_Quest.Zyoui[item_id],document.getElementById("que_zyoui"));
creQueLink(MST_Quest.Sugo[item_id],document.getElementById("que_sugo"));
creQueLink(MST_Quest.G[item_id],document.getElementById("que_g"));
//------------------------------------店売り----------
if (MST_Other.Shop[item_id]) {
	var ShopName = ["종합（기본）","종합（서적）","종합（탄병）","종합（도구）","종합（대투기장）","종합（잡화）","종합（길드 공헌P교환）","식료품점","조합상점","사격게임","수렵단 상점","마이 파크잡화점","PC방아이템 상점","헌터축제","기구내","특수 아이템 상점","수렵단 접수처","대토벌기구내","천랑내","가희(교환）","가희(한정교환）","종합(금빛)","수련도내","수련도(교환)","부채 고양이","수렵단 요격전","메제페스"];
	for (var i = 0,list = MST_Other.Shop[item_id].split(","),m = list.length,txt = ""; i < m; txt += ShopName[+list[i].substring(0,2)] + list[i++].substring(2) + "로 판매<br>");
	document.getElementById("shop").innerHTML = txt;
}
//------------------------------------調合----------
var CyougoType = ["","","마카 절임 단지・","먀옹절임단지：","마이 가든","","마이 파크모험상：",""],
	CyougoName = ["조합：","마이 파크조합：LV","CP조합：","공헌P 조합：","특별 조합：","비전주 교환：","혼수훈교환：","비전 커프 소재 교환："],
	JijiMei = ["밀림/수해 할아버지：","숲과 언덕 할아버지：","늪지 할아버지：","사막 할아버지：","설산 할아버지：","협곡 할아버지：","고지 할아버지：","조도 할아버지：","극해 할아버지：","죽림 안쪽 할아버지：","할아버지："];
if (MST_Other.Cyougo[item_id]) {
	var JijiMeiKoukan = [" 와 교환「비장의 물건」로 고확률"," 와 교환「보물」로 고확률"," 와 교환 어느 쪽이든 고확률"," 와 교환 어느 쪽이든 저확률"," 와 교환"],
		GalleryName = ["갤러리 대회：","갤러리 대회Ｇ："],
		GalleryPont =["1999포인트이하의 상품 ","2000포인트이상의 상품 ","10000포인트이상의 상품 ","20000포인트이상의 상품 ","40000포인트이상의 상품 ","60000포인트이상의 상품 ","60000포인트이상의 상품 ","80000포인트이상의 상품 ","90000포인트이상의 상품 ","100000포인트이상의 상품 "],
		GardenName = ["물뿌리기","청소","고기굽기","채굴","벌레 돌보기","진귀한 물건","덜렁꾼 고양이"],
		BoukenName = ["Lv1 쌀쌀한 호수","Lv1 발바닥이 뜨거운 사막의 평지","Lv1 안개가 드리운 습지","Lv1 초록이 우거진 평지","Lv2 아름다운 호숫가","Lv2 유적이 보이는 장소","Lv2 위험한 독의 늪지","Lv2 거목이 있는 심록 평지","Lv2 용암이 흐르는 동굴","Lv3 유적이 된 장소","Lv3 습격 위험 장소","Lv3 눈보라 치는 산꼭대기","Lv3 전설 예감 장소","Lv3 너무 뜨거운 화구 부근","(희귀)눅눅하고 비린 장소","(희귀)랑고스타의 둥지","(희귀)괴생명체의 둥지","(희귀)대투기장 부근","(희귀)비밀스런 통로","LV3 낙뢰·낙석 주의 평지","Lv3 바람이 강한 붉은흙 계곡","Lv3 바다 내음이 나는 물가","(SR희귀) 길고 험한 길","GR 몸이 타들어가는 작열지","GR 녹음이 우거진 물가","GR 반짝이는 벽면의 동굴","GR 땅이 어는 장소","GR(희귀) 달콤한 향이 나는 초원","GR600 꽃잎이 흩날리는 평지","GR600 소나기가 내리는 언덕","GR600 눈보라 휘몰아치는 정상","GR600 빛이 비치는 장소","GR600(희귀) 위험 식물의 동굴","GR600(희귀) 초목이 자라지 않는 황무지"],
		BoukenRank = [" 로 최대 ","★1 로 최대 ","★2 로 최대 ","★3(HR31) 로 최대 ","HR1～10 로 최대 ","HR11～20 로 최대 ","HR21～30 로 최대 ","HR31～ 로 최대 ","HR100～ 로 최대 ","HR1～ 로 ","HR1～16 로 ","HR1～30 로 ","HR1～99 로 ","HR17～ 로 ","HR17～30 로 ","HR17～99 로 ","HR31～ 로 ","HR31～99 로 ","HR51～ 로 ","HR100～ 로 ","GR600～ 로 "],
		BoukenDan = ["(상단) ","(하단) "],
		MakaTubo = [" 를 5분미만 담그기(흰색)"," 를 5분이상 담그기(보라)"," 를 10분이상 담그기(파랑)"," 를 15분이상 담그기(초록)"," 를 20분이상 담그기(황색)"," 를 30분이상 담그기(빨강)"],
		NyakaTubo = ["를 넣고 0: 흰색 까지 담그면 ","를 넣고 1: 보라 까지 담그면 ","를 넣고 2: 파랑 까지 담그면 ","를 넣고 3: 초록 까지 담그면 ","를 넣고 4: 노랑 까지 담그면 ","를 넣고 5~: 빨강 까지 담그면 ","를 넣고 6~: 무지개 까지 담그면 "];
	for (var i = 0,list = MST_Other.Cyougo[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		txt += CyougoType[list[i].charAt(0)];
		switch (list[i].charAt(0)) {
		case "0": //調合
			txt += CyougoName[list[i].charAt(1)] + list[i].substring(2) + "<br>";
			break;
		case "1": //交換
			txt += JijiMei[list[i].charAt(1)] + list[i].substring(2,list[i].length-1) + JijiMeiKoukan[list[i].charAt(list[i].length-1)] + "<br>";
			break;
		case "2": //壷
			txt += list[i].substring(1,9) + MakaTubo[list[i].charAt(9)] + "<br>";
			break;
		case "3": //ニャカ
			txt += list[i].substring(1,6) + NyakaTubo[list[i].charAt(6)] + list[i].substring(7) + "<br>";
			break;
		case "4": //マイガーデン
			txt += GardenName[list[i].charAt(1)] + BoukenRank[list[i].substring(2,4)-0] + list[i].substring(4) + "<br>";
			break;
		case "5": //ギャラリー
			txt += GalleryName[list[i].charAt(1)] + GalleryPont[list[i].charAt(2)] + list[i].substring(3) + "<br>";
			break;
		case "6": //冒険
			txt += BoukenName[list[i].substring(1,3)-0] + BoukenDan[list[i].charAt(3)] + list[i].substring(4) + "<br>";
			break;
		default:
			txt += list[i].substring(1) + "<br>";
			break;
		}
	}
	document.getElementById("cyougou").innerHTML = txt.replace(/\|[0-9A-F]{4}/g, function(s1){return " <a href=\"../sozai/sozai.htm?" + s1.substring(1) + "\">" + MST_Item[s1.substring(1)][0] + "</a> "}).replace(/K\d+\%/g, function(s1){return "개 (" + s1.substring(1) + ")"}).replace(/K/g,"개 ");
}
if (MST_Quest.Lot[item_id]) { //くじ
	for (var i = 0,list = MST_Quest.Lot[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		var w = (function(a){a[4]=a.slice(4).join(",");return a;})(MST_Quest.Name[list[i].substring(0,4)].split(",")),hosyu = list[i].substring(6).split("%");
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(4) ? " class="+w[1].charAt(4) : "") + ">" + MST_Quest.Btype[parseInt(w[1].substring(0,2),16)] + Quest_Season[w[1].charAt(2)] + Quest_Time[w[1].charAt(3)] + "：" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> " + MST_Quest.Htype[parseInt(list[i].substring(4,6),16)] + " 로 " + (hosyu.length === 1 ? hosyu[0] + "개" : hosyu[0] + "개 (" + hosyu[1] + "%)") + "<br>";
	}
	document.getElementById("cyougou").innerHTML = (MST_Other.Cyougo[item_id] ? document.getElementById("cyougou").innerHTML : "") + txt.replace(/HR\D/g,"SR");
}
//------------------------------------その他の利用----------
if (MST_Other.Riyou[item_id]) {
	for (var i = 0,list = MST_Other.Riyou[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		txt += CyougoType[list[i].charAt(0)].replace("・","：");
		switch (list[i].charAt(0)) {
		case "0": //調合
			txt += CyougoName[list[i].charAt(1)] + list[i].substring(2) + "작성<br>";
			break;
		case "1": //交換
			txt += JijiMei[list[i].charAt(1)] + list[i].substring(2) + "와 교환 가능<br>";
			break;
		case "7": //他
			txt += list[i].substring(1) + "<br>";
			break;
		default:
			txt += list[i].substring(1) + "가입수가능능<br>";
			break;
		}
	}
	document.getElementById("riyou").innerHTML = txt.replace(/\|[0-9A-F]{4}/g, function(s1){return " <a href=\"../sozai/sozai.htm?" + s1.substring(1) + "\">" + MST_Item[s1.substring(1)][0] + "</a> "}).replace(/K\d+\%/g, function(s1){return "개 (" + s1.substring(1) + ")"}).replace(/K/g,"개 ").replace(/M/g,"조합하여 ");
}
if (MST_Quest.Riyou[item_id]) { //クエスト
	for (var i = 0,list = MST_Quest.Riyou[item_id].split(","),m = list.length,txt = ""; i < m; i++) {
		var w = (function(a){a[4]=a.slice(4).join(",");return a;})(MST_Quest.Name[list[i].substring(0,4)].split(","));
		txt += "<a href=\"../quest/" + w[0] + ".htm#l" + list[i].substring(0,4) + "\"" + (w[1].charAt(4) ? " class="+w[1].charAt(4) : "") + ">" + MST_Quest.Btype[parseInt(w[1].substring(0,2),16)] + Quest_Season[w[1].charAt(2)] + Quest_Time[w[1].charAt(3)] + "：" + w[3] + MST_Quest.Qtype[parseInt(w[2],16)] + w[4] + "</a> 로 " + list[i].substring(5) + "개 " +(list[i].charAt(4) === "N" ? "납품<br>" : "수주로 소비<br>");
	}
	document.getElementById("riyou").innerHTML = (MST_Other.Riyou[item_id] ? document.getElementById("riyou").innerHTML : "") + txt.replace(/HR\D/g,"SR");
}

//------------------------------------採取MAP表示----------
var showMap = function (evt){
	/*@if (@_jscript_version < 9)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	if (t.tagName === "SPAN") {
		var txt = (t.id || t.parentNode.id).split(".");
		document.getElementById("sai_map").src = "../img/saisyu/" + txt[0] + ".png";
		document.getElementById("sai_link").href = "../saisyu/"+ txt[1]+".htm#l"+ txt[2];
		document.getElementById("sai_link").style.display = "";
	}
}
//イベントセット
addEvent(document.getElementById("sai_kaion"),"click",showMap);
addEvent(document.getElementById("sai_kaikan"),"click",showMap);
addEvent(document.getElementById("sai_kaihan"),"click",showMap);
addEvent(document.getElementById("sai_zyouion"),"click",showMap);
addEvent(document.getElementById("sai_zyouikan"),"click",showMap);
addEvent(document.getElementById("sai_zyouihan"),"click",showMap);
addEvent(document.getElementById("sai_sugoon"),"click",showMap);
addEvent(document.getElementById("sai_sugokan"),"click",showMap);
addEvent(document.getElementById("sai_sugohan"),"click",showMap);
addEvent(document.getElementById("sai_gon"),"click",showMap);
addEvent(document.getElementById("sai_gkan"),"click",showMap);
addEvent(document.getElementById("sai_ghan"),"click",showMap);

//ボタン
if (location.search.charAt(5) === "W") {
	document.getElementById("b_back").value = "닫기";
	addEvent(document.getElementById("b_back"),"click",function () {window.close();});
} else {
	addEvent(document.getElementById("b_back"),"click",function () {history.back();});
}
MST_Item = MST_Quest = MST_Saisyu = MST_Mos = MST_Other =null;

//武器防具
addEvent(document.getElementById("b_yt"),"click",function () {
var BouguName = {"h":"머리 방어구","b":"몸통 방어구","a":"팔 방어구","w":"허리 방어구","l":"다리 방어구","d":"장식품","p":"장식품","c":"커프","t":"천랑석","f":"장식품","k":"천각인","z":"커프Ｚ","s":"시질","n":"네코","H":"Ｐ머리","B":"Ｐ몸통"},
	BouguId = {"h":"head","b":"body","a":"arm","w":"wst","l":"leg","d":"deco","c":"decocf","p":"decosp","n":"deconk","t":"decotr","f":"decotf","k":"decotk","z":"decocz","s":"sigil","H":"head_pertnya","B":"body_pertnya"},
	BukiName = {0:"대검",1:"헤비보우건..",2:"해머",3:"랜스",4:"한손검",5:"라이트보우건",6:"쌍검",7:"태도",8:"수렵피리",9:"건랜스","A":"활","B":"천룡곤","C":"슬래시액스","D":"마그넷스파이크","a":"Ｐ대검","c":"Ｐ해머"},
	BukiId = {0:"taiken",1:"heavy",2:"hammer",3:"lance",4:"katate",5:"right",6:"souken",7:"tachi",8:"horn",9:"gunlance","A":"yumi","B":"tonfa","C":"slaxe","D":"magspike","a":"taiken_partnya","c":"hammer_partnya"},
	Craft = {0:"생산",1:"강화",2:"G생산",3:"G강화",4:"G확정"},
	MST_Equip = setBuki();
if (MST_Equip.Sozai[item_id]) {
	var txt = "<table><tr><th style=\"width:7em;\">무기 종류</th><th style=\"width:10em;\">무기명</th><th style=\"width:2.5em;\">제작</th><th style=\"width:2em;\">수</th></tr>";
	for (var i = 0,su_sum = 0,list = MST_Equip.Sozai[item_id].split(","),m = list.length; i < m; i++) {
		var eq_rui = list[i].charAt(0),
			eq_id = list[i].substring(1,5),
			eq_cra = list[i].charAt(5),
			su = list[i].substring(6),
			eq_name = MST_Equip.Name[eq_rui+eq_id],
			sp = "",
			lv = "";
		if (eq_cra === "2" || eq_cra === "3" || eq_cra === "4") { //G武器
			sp = "_g";
			if (eq_cra === "4") {
				lv = +list[i].substring(6,8);
				su = list[i].substring(8);
			}
		} else if (MST_Equip.SP.indexOf(eq_rui+eq_id) !== -1) { //SP武器
			sp = "_sp";
		} else if (MST_Equip.Neko.indexOf(eq_rui+eq_id) !== -1) { //剛ねこ武器
			sp = "_n";
		} else if (MST_Equip.Sinka.indexOf(eq_rui+eq_id) !== -1) { //進化武器
			sp = "_s";
		}
		txt += "<tr><td>" + BukiName[eq_rui] + "</td><td><a href='../buki/" + BukiId[eq_rui] + sp + ".htm#l" + eq_id + lv + "'>" + eq_name + "</a></td><td>" + Craft[eq_cra] + lv + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
		su_sum += +su;
	}
	document.getElementById("tblBuki").innerHTML = txt + "<tr><td colspan=4 style=\"text-align:right;\">" + su_sum + "</td></tr></table>";
}
MST_Equip = setBougu();
if (MST_Equip.Sozai[item_id]) {
	var txt = "<table><tr><th style=\"width:4em;\">부위</th><th style=\"width:10em;\">방어구명</th><th style=\"width:1.5em;\">LV</th><th style=\"width:2em;\">수</th></tr>";
	var txts = "<table><tr><th style=\"width:4em;\">장식품</th><th style=\"width:10em;\">장식명</th><th style=\"width:2em;\">수</th></tr>";
	for (var i = 0,su_sum = 0,list = MST_Equip.Sozai[item_id].split(","),m = list.length; i < m; i++) {
		var eq_rui = list[i].charAt(0),
			eq_id = list[i].substring(1,5),
			lv = list[i].charAt(5),
			su = list[i].substring(6),
			eq_name = MST_Equip.Name[eq_rui+eq_id],
			sp = "";
		if (eq_rui === "d" || eq_rui === "n" || eq_rui === "c" || eq_rui === "p" || eq_rui === "s" || eq_rui === "t" || eq_rui === "f" || eq_rui === "k" || eq_rui === "z") {
			//장식품カフ
			txts += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/" + BouguId[eq_rui] + ".htm#l" + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:right;\">" + su + "</td></tr>";
		} else {
			//防具
			if (eq_name.lastIndexOf("SP") !== -1) {
				txt += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/" + BouguId[eq_rui] + "sp.htm#l" + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:center;\">" + lv.replace("0","생") + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
			} else {
				txt += "<tr><td>" + BouguName[eq_rui] + "</td><td><a href='../bougu/_tree.htm#" + BouguId[eq_rui].charAt(0) + eq_id + "'>" + eq_name + "</a></td><td style=\"text-align:center;\">" + lv.replace("0","생") + "</td><td style=\"text-align:right;\">" + su + "</td></tr>";
			}
		su_sum += +su;
		}
	}
	if (su_sum) document.getElementById("tblBougu").innerHTML = txt + "<tr><td colspan=4 style=\"text-align:right;\">" + su_sum + "</td></tr></table>";
	document.getElementById("tblDec").innerHTML = txts + "<tr><td colspan=4 style=\"text-align:right;\"></td></tr></table>";
}
MST_Equip = setBuki = setBougu = null;
document.getElementById("b_yt").disabled = true;
});

document.getElementsByTagName("table")[0].style.width = "auto";
document.getElementById("loading").style.display="none";
document.getElementById("b_yt").disabled = false;

//ページ離脱時に保存
addEvent(window,"pagehide",function () {
document.cookie = "item=" + [item_id,Number(document.getElementById("b_yt").disabled),document.documentElement.scrollTop].join(":");
});
//オンロード
var w = document.cookie;
if (w.indexOf("item=" + item_id) !== -1) {
	w = w.split("item=")[1].split(":");
	if (w[1] === "1") {
		/*@if (@_jscript_version < 9) 
		document.getElementById("b_yt").fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", false, true);
		document.getElementById("b_yt").dispatchEvent(evt);
		/*@end@*/
	}
	window.scrollTo(0,parseInt(w[2]));
};

})(document);
