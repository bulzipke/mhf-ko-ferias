(function(document){
/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
//イベントセット
var addEvent = function (elm, type, func) {
	//追加
	elm./*@cc_on @if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
};
//線可変
	var IsMouseDown = false;
	addEvent(document.getElementById("line"),"mousedown",
	function (evt) {
		/*@if (@_jscript_version < 9)
		var e = window.event;
		@else@*/
		var e = evt;
		/*@end@*/
		if (e.button <= 1) {
			IsMouseDown = true;
			document.getElementById("line").style.position = "absolute";
			document.getElementById("line").style.left = (e.clientX -4)  + "px";
		}
	});
	addEvent(document,"mouseup",
	function (evt) {
		if (IsMouseDown) {
			/*@if (@_jscript_version < 9)
			var e = window.event;
			@else@*/
			var e = evt;
			/*@end@*/
			document.getElementById("data").style.width = (document.documentElement.scrollWidth - e.clientX - 20) + "px";
			document.getElementById("tree").style.width = (e.clientX -5) + "px";
			document.getElementById("bar").style.left = e.clientX + "px";
			document.getElementById("line").style.left = (e.clientX -1)  + "px";
			IsMouseDown = false;
		}
	});
	addEvent(document,"mousemove",
	function (evt) {
		if (IsMouseDown) {
			/*@if (@_jscript_version < 9)
			var e = window.event;
			e.returnValue = false;
			@else@*/
			var e = evt;
			window.getSelection().removeAllRanges();
			/*@end@*/
			document.getElementById("line").style.left = (e.clientX -4)  + "px";
		}
	});

//ツリー
var LIST_ID = "",LIST_TYPE = true,  //true=シリーズ,false=부위
	CK_NEKO = location.pathname.indexOf("_partnya") !== -1,
	MST_Item = setItem(),MST_Equip = SkillForm.MST_Equip;
setItem = SkillForm = null;
addEvent(document.getElementById("tree"),"click",
function (evt) {
	/*@if (@_jscript_version < 9)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	
	if (t.tagName === "SPAN" && t.id !== ""){
		var cre = document.getElementById("tree").getElementsByTagName("span"),creB = document.getElementById("tree").getElementsByTagName("div");
		for (var i = 0,m = cre.length; i < m; cre[i].style.color = "",creB[i++].style.display = "none");
		document.getElementById(t.id).style.color = "red";
		document.getElementById(t.id+"L").style.display = "block";
	} else if (!CK_NEKO && t.tagName === "A"){

		var id_list = t.parentNode.getElementsByTagName("a");
		//いま表示されているものと同じか
		if (LIST_ID === id_list[0].href.substring(1)) {
			return;
		} else {
			LIST_ID = id_list[0].href.substring(1);
		}
//スキルシミュからcpy
var I_bNAME = 0,I_bSEX = 1,I_bTYPE = 2,I_bRARE = 3,I_bGR = 4,I_bF = 5,I_bW = 6,I_bT = 7,I_bD = 8,I_bI = 9,I_bSN1 = 10,I_bSP1 = 11,I_bSN2 = 12,I_bSP2 = 13,I_bSN3 = 14,I_bSP3 = 15,I_bSN4 = 16,I_bSP4 = 17,I_bSN5 = 18,I_bSP5 = 19,I_bUPGBACK = 20,I_bRECIPE1 = 21,I_bHR1 = 22,I_bLVUPPTN = 23,I_bLVMAX = 24,I_bZENY = 25,I_bDEF = 26,I_bSLOT1 = 27,I_bSLOT7 = 28,I_bZENYPTN = 29,I_bDEFPTN = 30,I_bSLOTPTN = 31,I_bUPGCNT = 32,I_bCRE = 33,I_bDEC = 34,I_bCLASS = 35,I_bTrSLOT = 36,I_bTeni = 37,I_bDOC = 38,I_bIMG = 39;
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
var getZeny = function (eq){
	if (eq[I_bLVUPPTN]) {
		var zeny = +eq[I_bZENY],ptncd = eq[I_bZENYPTN],ptn = MST_Equip.zeny[parseInt(ptncd,16)].split(",");
		var list = [zeny];
		for (var i = 1;i < 7; i++) {
			if (zeny === 0 ||
				ptn[i] % 25 === 0 || 
				ptn[i] === "280" || ptn[i] === "180" || ptn[i] === "8" || ptn[i] === "115" || ptn[i] === "220" ||
				(ptncd === "04" && ptn[i] === "10" && (zeny === 10875 || zeny === 1125)) ||
				(ptncd === "05" && ptn[i] === "420" && (zeny === 1000 || zeny === 1100 || zeny === 1200 || zeny === 4100 || zeny === 8000 || zeny === 8800)) ||
				(ptncd === "08" && (ptn[i] === "5" || ptn[i] === "15") && (zeny === 17250 || zeny === 21250))) {
				list[i] = zeny * ptn[i] / 100|0;
			} else {
				list[i] = (zeny * ptn[i] / 100|0) - 1;
			}
		}
		//生産の場合の半額に
		if (eq[I_bRECIPE1] && eq[I_bRECIPE1].indexOf("상점 판매") === -1) list[0] = zeny / 2|0;
		return list;
	} else { //장식품
		return [eq[I_bZENY],"","","","","",""];
	}
};
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
var getSlot = function (eq){
	if (eq[I_bLVUPPTN]) {
		var slot = +eq[I_bSLOT1],slotmax = +eq[I_bSLOT7],ptn = MST_Equip.slot[parseInt(eq[I_bSLOTPTN],16)].split(",");
		var list = [slot + +ptn[0],slot + +ptn[1],slot + +ptn[2],slot + +ptn[3],slot + +ptn[4],slot + +ptn[5],slot + +ptn[6]];
		for (var i = 0;i < 7; i++) {
			if (list[i] >= slotmax) list[i] = slotmax;
		}
		return list;
	} else { //장식품
		return [eq[I_bSLOT7],"","","","","",""];
	}
};
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
	return t.join(","); //ココだけ違う
};
//copyここまで
		var BUINAME = ["머리","몸통","팔","허리","다리"],
			SEXNAME = ["","남성","여성"],
			TYPENAME = ["","검사","건"],
			CLASSTYPE = {"":" ",A:"ＳＰ",B:"<p>강종방어구</p>",C:"<p>천람방어구</p>",D:"<p>패종방어구</p>",E:"<p>HC방어구</p>",F:"<p>수호방어구</p>",G:"<p>Ｇ급패종방어구</p>",H:"<p>열종방어구</p>",I:"<p>G급방어구</p>",J:"<p>G급수호방어구</p>",K:"<p>비전방어구</p>",L:"<p>G급비전방어구</p>",M:"<p>시종방어구</p>",N:"<p>천랑방어구</p>",O:"<p>천유방어구</p>",P:"<p>천이방어구</p>",Q:"<p>천이수호방어구</p>"},
			SKILLNAME = [,"낙법","운기","운반","자동방어","가드성능","회복","회복속도","확산탄추가","심판","뇌내성","관통탄강화","관통탄추가","기절","변덕","예리도","먹보","기척","달인","광역회복","광역해독","공격","채집","산탄강화","산탄추가","수면","모든내성UP","천리안","장전","추위방지","더위방지","체력","장인","씨앗광역화","탄조합","지도","청각보호","조합성공률","일반탄강화","일반탄추가","낚시","------","------","------","투척","연마도사","독","특수공격","고기","훔치기무효","폭탄강화","배고픔","반동","화내성","풍압","피리","방어","마비","수내성","용내성","유탄추가","연금술","연사","고속채집","회피성능","저력","효과지속","스태미나","장전수","정밀사격","몬스터","식사","갈무리","지형","탈취","눈사람방지","빙내성","흔들림방지","광역","성대","고기굽기","포술사","------","------","------","피리명인","------","------","------","------","줄행랑","체술","강철어깨","------","번뜩임","낙법","------","------","------","------","인연","------","근성","------","압력","포획고수","------","------","독병추가","마비병추가","수면병추가","화속성공격","수속성공격","뇌속성공격","빙속성공격","용속성공격","단식","----","폭격검","강격검","맹독검","마비검","수면검","화염검","수격검","뇌신검","빙결검","용왕검","차지단축","한손검기","쌍검기","대검기","태도기","추기","수렵적기","창기","총창기","중총기","경총기","궁기","고속설치","무기다루기","속성 공격력","기력회복","나이프술","보살핌","대방어DOWN","검술","내상태이상","멀미내성","결정내성","자력내성","경계","구원","뒷심","일필랑","삼계의 수호","반사","대가","도검장인","속사","강격","고무","은총","생명력","분노","철완","브리더","맞대응","일섬","역경","사수","장착","통격","조합사","헌터","백발백중","연격(삭제)","회피거리","차지위력","탄환절약술","이동속도","갈!","흡혈","적응격","흑의 명맥","약초학","천룡곤기","선동","염총","극물의 소양","절대방어","평상심","채집의 극치","교류","지원","숨고르기","속격","투혼","혈기활성","검신","전뢰","변칙","발납술","폭파내성","섬전","불퇴","교격","동결내성","절대영도","혹사","검부기","요새","저격","인내","초회피","돌진","솜씨꾼","난타","일점돌파","기괴","틈새사격","노련함","사자분신","자참추기"],
			TENINAME = ["없음","스킬 슬롯 확장+1","스킬 슬롯 확장+2","스킬 슬롯 확장+3","스킬 슬롯 확장+4","스킬 슬롯 확장+5","스킬 슬롯 확장+6","스킬 슬롯 확장+7","회심전환 강화+1","회심전환 강화+2","교격 강화+1","교격 강화+2","속성특효 강화","전광석화 강화+1","전광석화 강화+2","절대영도 강화","절대영도 강화","귀마개 강화+1","귀마개 강화+2","귀마개 강화+3","풍압 강화+1","풍압 강화+2","풍압 강화+3","풍압 강화+4","흔들림방지 강화+1","흔들림방지 강화+2","내독 강화+1","내독 강화+2","내마비 강화+1","내마비 강화+2","내수면 강화+1","내수면 강화+2","흡혈 강화+1","흡혈 강화+2","극물취급달인 강화","지원 강화","탄환절약술 강화+1","탄환절약술 강화+2","가드성능 강화+1","가드성능 강화+2","적응격 강화+1","적응격 강화+2","격려 강화+1","격려 강화+2","반사 강화+1","반사 강화+2","반사 강화+3","칼날회피 강화","혈기활성 강화","인내 강화","갈! 강화","난타 강화","돌진 강화"],
			MAKENAME = {"":"",1:"",2:"수렵단",3:"카페",4:"과금",5:"특전","-":"",e:"이벤트",es:"이벤트/수위전",s:"수위전",t:"수련도",u:"요격전",m:"헌터축제",c:"파로네",g:"가챠",k:"키트",i:"위타천",p:"패키지"},
			len = id_list[0].href.length,upglist = [[],[],[],[],[]],
			tB=document.getElementsByTagName("tbody")[0],tBCre = document.createElement("tbody"),insHeader = document.createElement("th");
		insHeader.style.height = "1em";
		insHeader.appendChild(document.createElement("br"));
		if (!LIST_TYPE) {	//부위別
			var tBCreB = [document.createDocumentFragment(),document.createDocumentFragment(),document.createDocumentFragment(),document.createDocumentFragment(),document.createDocumentFragment()];
		}
		for (var i = 0,m = id_list.length,name = "",eq = "",l = 0;i < m;i++) {
			var buiid = id_list[i].href.charAt(len-5),eqid = id_list[i].href.substring(len-4);
			switch (buiid) {
			case "h":	name = "head", l = 0;break;
			case "b":	name = "body", l = 1;break;
			case "a":	name = "arm", l = 2;break;
			case "w":	name = "wst", l = 3;break;
			case "l":	name = "leg", l = 4;break;
			}
			eq = MST_Equip[name][eqid];
			if (typeof eq === "string") eq = MST_Equip[name][eqid] = MST_Equip[name][eqid].split(",");
			if (eq[I_bUPGBACK]) upglist[l][upglist[l].length] = eq[I_bUPGBACK].substring(0,4) + eqid + eq[I_bUPGBACK].charAt(4);
		}
		for (var i = 0,m = id_list.length,name = "",eq = "",l = 0,t = "";i < m;i++) {
			if (LIST_TYPE && id_list[i].previousSibling.nodeValue.lastIndexOf("(") >= 0) {	//부위別の場合はなし
				tBCre.appendChild(document.createElement("tr").appendChild(insHeader.cloneNode(true)));
			}
			var buiid = id_list[i].href.charAt(len-5),eqid = id_list[i].href.substring(len-4),insTR = document.createElement("tr"),insTD = document.createElement("td");

			switch (buiid) {
			case "h":	name = "head", l = 0;break;
			case "b":	name = "body", l = 1;break;
			case "a":	name = "arm", l = 2;break;
			case "w":	name = "wst", l = 3;break;
			case "l":	name = "leg", l = 4;break;
			}
			eq = MST_Equip[name][eqid];
//			if (typeof(eq) === "string") eq = MST_Equip[name][eqid] = MST_Equip[name][eqid].split(",");
			//詳細
			insTR.id = buiid + eqid;
			//名前
			t = "<div>" + BUINAME[l] + "</div>" + eq[I_bNAME] + "<div>";
			//強化元走査
			if (eq[I_bUPGBACK]) {
				var IDu = eq[I_bUPGBACK].substring(0,4),Txtu = MST_Equip[name][IDu];
//				if (typeof(Txtu) === "string") Txtu = MST_Equip[name][IDu] = MST_Equip[name][IDu].split(",");
				
				t += "<a href=\"#" + buiid + IDu + "\">　" + 
					 Txtu[I_bNAME] + "Lv" + eq[I_bUPGBACK].charAt(4) + "←</a>";

//				upglist[l][upglist[l].length] = IDu + eqid + eq[I_bUPGBACK].charAt(4);
			}
			//強化先走査
			for (var k = upglist[l].length-1,ck = false;k >= 0; k--){
				if (upglist[l][k].substring(0,4) === eqid) {
					t += "<a href=\"#" + buiid + upglist[l][k].substring(4,8) + "\">→" + MST_Equip[name][upglist[l][k].substring(4,8)][I_bNAME] + "</a>";
					ck = upglist[l][k].charAt(8);
				}
			}
			if (ck) t += "（Lv" + ck + "이상）";
			//精錬先名称
			if (eq[I_bDEC]) t += "<a href=\"deco.htm#l" + eq[I_bDEC] + "\">→" + MST_Equip["deco"][eq[I_bDEC]].split(",")[0] + "</a>Lv7에서 정련";
			t += "</div>";
			t += CLASSTYPE[eq[I_bCLASS]];
			
			insTD.innerHTML = t;
			insTR.appendChild(insTD.cloneNode(true));
			//種類
			t = SEXNAME[eq[I_bSEX]];
			t += (t && eq[I_bTYPE] !== "0" ? "<br>" : "") + TYPENAME[eq[I_bTYPE]];
			t += (t && eq[I_bCRE].charAt(0) !== "1" ? "<br>" : "") + MAKENAME[eq[I_bCRE].charAt(0)];
			t += (t && eq[I_bCRE].charAt(1) !== "-" ? "<br>" : "") + MAKENAME[eq[I_bCRE].substring(1)];
			if (eq[I_bGR]) t += (!t ? "" : "<br>") + "<b>GR" + eq[I_bGR] + "</b>";
			insTD.innerHTML = !t ? "<br>" : t;
			insTR.appendChild(insTD.cloneNode(true));
			//レア
			insTD./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = eq[I_bRARE];
			insTR.appendChild(insTD.cloneNode(true));
			//耐性
			insTD.innerHTML = "화:" + eq[I_bF] + "<br>"
							+ "수:" + eq[I_bW] + "<br>"
							+ "뇌:" + eq[I_bT] + "<br>"
							+ "빙:" + eq[I_bI] + "<br>"
							+ "용:" + eq[I_bD];
			insTR.appendChild(insTD.cloneNode(true));
			//スキル
			if (eq[I_bSP1]) {
				t = "<ul><li><em>" + SKILLNAME[eq[I_bSN1]] + "</em>" + eq[I_bSP1];
				if (eq[I_bSP2]) {
					t += "<ul><li><em>" + SKILLNAME[eq[I_bSN2]] + "</em>" + eq[I_bSP2];
					if (eq[I_bSP3]) {
						t += "<ul><li><em>" + SKILLNAME[eq[I_bSN3]] + "</em>" + eq[I_bSP3];
						if (eq[I_bSP4]) {
							t += "<ul><li><em>" + SKILLNAME[eq[I_bSN4]] + "</em>" + eq[I_bSP4];
							if (eq[I_bSP5]) {
								t += "<ul><li><em>" + SKILLNAME[eq[I_bSN5]] + "</em>" + eq[I_bSP5];
							}
						}
					}
				}
				if (eq[I_bCLASS] === "P") {
					t += "<ul><li><em><s>「" + TENINAME[eq[I_bTeni]] + "」</s></em>";
				}
				insTD.innerHTML = t + "</ul>";
			} else {
				insTD./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = "\n";
			}
			insTR.appendChild(insTD.cloneNode(true));

			var tdef = "",thr = "",bkhr = "",tzeny = "",treci = "", reci_data = getSozai(eq), zeny_data = getZeny(eq), def_data = getDef(eq), slot_data = getSlot(eq);
			for (var j = 0; j < eq[I_bLVMAX]; j++){
				//防御スロ
				tdef += def_data[j]+"/"+slot_data[j] + "<br>";
				//HR
				if (reci_data[7+j] === bkhr) {
					thr += "|<br>";
				} else {
					if (reci_data[7+j] < 1000) {
						thr += "HR" + reci_data[7+j] + "<br>";
					} else if (reci_data[7+j] < 2000) {
						thr += "SR" + (reci_data[7+j]-1000) + "<br>";
					} else if (reci_data[7+j] < 3000) {
						thr += "GR" + (reci_data[7+j]-2000) + "<br>";
					} else if (reci_data[7+j] < 4000) {
						thr += "GSR" + (reci_data[7+j]-3000) + "<br>";
					}
					bkhr = reci_data[7+j];
				}
				//ゼニー
				tzeny += zeny_data[j] + "<br>";
				//素材
				if (j === 0 && eq[I_bRECIPE1]) {
					treci += "생산:"
				}
				treci += sozaiHtml(reci_data[j]) + "<br>";
				//強化元があるのに生産素材もある
				if (j === 0 && eq[I_bUPGBACK] && eq[I_bRECIPE1]) {
					tdef = "<br>" + tdef;
					thr  = "<br>" + thr;
					tzeny   = "<br>" + tzeny;
					treci += "강화:" + sozaiHtml(MST_Equip.sozai[parseInt(eq[I_bLVUPPTN],16)].split(",")[0]) + "<br>";
				}
			}
			insTD.innerHTML = tdef;
			insTR.appendChild(insTD.cloneNode(true));
			insTD.innerHTML = thr;
			insTR.appendChild(insTD.cloneNode(true));
			insTD.innerHTML = tzeny;
			insTR.appendChild(insTD.cloneNode(true));
			insTD.innerHTML = treci;
			insTR.appendChild(insTD.cloneNode(true));
			insTD.innerHTML = eq[I_bDOC].substring(0,13)+"<br>"+eq[I_bDOC].substring(13,26)+"<br>"+eq[I_bDOC].substring(26);
			insTR.appendChild(insTD.cloneNode(true));

			if (LIST_TYPE) {
				//シリーズ別
				tBCre.appendChild(insTR.cloneNode(true));
			 } else {
				//부위別
				tBCreB[l].appendChild(insTR.cloneNode(true));
			}
		}
//		var insBODY = document.createElement("tbody");
//		tB.parentNode.replaceChild( insBODY,tB );
//		var wTR = tBCre.getElementsByTagName("tr");
//		for (var j = 0,m = wTR.length;j < m;insBODY.appendChild(wTR[j++].cloneNode(true)));
		if (!LIST_TYPE) {	//부위別
			for (var l = 0;l < 5;l++) {
				insHeader./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ = BUINAME[l] + "장비";
				tBCre.appendChild(document.createElement("tr").appendChild(insHeader.cloneNode(true)));
				tBCre.appendChild(tBCreB[l]);
			}
		}
		tB.parentNode.replaceChild( tBCre,tB );
//		location.hash = t.href.substring(t.href.length-6,t.href.length);
	}
});
//ページ離脱時に保存
addEvent(window,"pagehide",function () {
	var cre = document.getElementById("tree").getElementsByTagName("span"),
		dispflg = "";
	for (var i=0,m=cre.length; i<m; i++) {
		if (cre[i].style.color !== "") {
			dispflg = cre[i].id.substring(1);
			break;
		}
	}
	document.cookie = "bougu=" + [location.pathname+location.hash,dispflg,document.getElementById("tree").scrollTop,document.getElementById("data").scrollTop].join("!");
});
//オンロード
var t = document.cookie;
if (t.indexOf("bougu=" + location.pathname+location.hash) !== -1) {
	t = t.split("bougu=")[1].split("!");
	//作成種別
	if (t[1] !== "") {
		/*@if (@_jscript_version < 9) 
		document.getElementById("t"+t[1]).fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		document.getElementById("t"+t[1]).dispatchEvent(evt);
		/*@end@*/
		if (location.hash.length > 0) {
			//データ部生成
			var treehref = document.getElementById("t"+t[1]+"L").getElementsByTagName("a");
			for (var j=0,l=treehref.length; j<l; j++){
				if (treehref[j].href.lastIndexOf(location.hash) !== -1) {
					treehref[j].focus();

					setTimeout(function (){
						/*@if (@_jscript_version < 9) 
						treehref[j].fireEvent( "onclick" );
						@else@*/
						var evt = document.createEvent("MouseEvents");
						evt.initEvent("click", true, true);
						treehref[j].dispatchEvent(evt);
						/*@end@*/
						document.getElementById("data").scrollTop = parseInt(t[3]);
					}, 32);
					break;
				}
			}
		}
	}
	document.getElementById("tree").scrollTop = parseInt(t[2]);

} else if (location.hash.length > 0) {
	var creB = document.getElementById("tree").getElementsByTagName("div");
	for (var i=0,m=creB.length; i<m; i++){
		if (creB[i].innerHTML.indexOf(location.hash) !== -1) {
			//作成種別
			var treeid = creB[i].id.substring(0,creB[i].id.length-1);
			/*@if (@_jscript_version < 9) 
			document.getElementById(treeid).fireEvent( "onclick" );
			@else@*/
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			document.getElementById(treeid).dispatchEvent(evt);
			/*@end@*/
			//
			var treehref = creB[i].getElementsByTagName("a");
			for (var j=0,l=treehref.length; j<l; j++){
				if (treehref[j].href.lastIndexOf(location.hash) !== -1) {
					treehref[j].focus();
//					setTimeout(function (){
						//データ部生成
						/*@if (@_jscript_version < 9) 
						treehref[j].fireEvent( "onclick" );
						@else@*/
						var evt = document.createEvent("MouseEvents");
						evt.initEvent("click", true, true);
						treehref[j].dispatchEvent(evt);
						/*@end@*/
//					}, 32);

					break;
				}
			}
			break;
		}
	}
};

})(document);
