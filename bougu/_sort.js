setTimeout(function (){

/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/

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

//リストセット

var selectSet = function(e,v) {

	var m = v.length;

	/*@if (@_jscript_version < 9)

	e.options.length = m;

	for (var i = 0; i < m; e.options[i].value = e.options[i].text = v[i++]);

	@else@*/

	e.length = 0;

	for (var i = 0,o; i < m; i++){

		o = document.createElement("option");

		o.setAttribute("value", v[i]);

		o.appendChild(document.createTextNode(v[i]));

		e.appendChild(o.cloneNode(true));

	}

	/*@end@*/

};

var selectSetGroup = function(e,v) {

	var m = v.length;

	e.length = 0;

	for (var j = 0,g; j < m; j++){

		g = document.createElement("optgroup");

		g.label = v[j][0];

		var w = v[j][1], n = w.length;

		for (var i = 0,o; i < n ;i++){

			o = document.createElement("option");

			o.setAttribute("value", w[i]);

			o.appendChild(document.createTextNode(w[i]));

			g.appendChild(o.cloneNode(true));

		}

		e.appendChild(g.cloneNode(true));

	}

};



//HTMLにボタン追加



//初期設定

var armorCK = location.pathname.indexOf("deco") === -1,

	tH = document.getElementsByTagName("thead")[0].rows[0],

	dt = document.createElement("div"),

	i = document.createElement("input"),

	s = document.createElement("select");

dt.className = "m",i.type = "button";

//名称ソート

i.value = "이름",i.title = "이름순으로 정렬";

dt.appendChild(i.cloneNode(false));

tH.cells[0].appendChild(dt);

if (armorCK) {

	//防御ソート

	i.value = "방어",i.title = "방어순 정렬";

	dt.appendChild(i.cloneNode(false));

	//レア制限

	s.title = "레어로 좁히기";

	selectSet(s,["레어","11","10","9","8","7","6","5","4","3","2","1"]);

	s.selectedIndex = 0;

	dt.appendChild(s.cloneNode(true));

	var ckRare_F = function (e) {

		return e === "레어" ? function(){return true} : function (cell) {return +cell.firstChild.nodeValue <= e};

	};

	//耐性ソート

	s.style.display = "block",s.title = "내성순 정렬";

	selectSet(s,["순","화","수","뇌","빙","용"]);

	tH.cells[3].appendChild(s.cloneNode(true));

	//スロ制限

	s.title = "슬롯으로 좁히기";

	selectSet(s,["슬롯","3","2","1"]);

	tH.cells[5].removeChild(tH.cells[5].childNodes.item(1));

	tH.cells[5].appendChild(s.cloneNode(true));

	var ckSlot_F = function (e) {

		return e === "슬롯" ? function(){return true} : function (cell) {return cell.lastChild.nodeValue.split("/")[1] >= e;};

	};

} else { //장식품

	//G制限

	s.title = "GR로 좁히기";

	selectSet(s,["GR","GX","GF","G"]);

	s.selectedIndex = 0;

	if (location.pathname.indexOf("deco.htm") === -1) s.style.display = "none";

	dt.appendChild(s.cloneNode(true));

	var ckGr_F = function (e) {

		return e === "GR" ? function(){return true} : 

				e === "GX" ? function (cell) {return cell.firstChild.nodeValue.indexOf("사주GX") !== -1 || cell.firstChild.nodeValue.indexOf("검주GX") !== -1;} :

				e === "GF" ? function (cell) {return cell.firstChild.nodeValue.indexOf("사주GF") !== -1 || cell.firstChild.nodeValue.indexOf("검주GF") !== -1;} :

							function (cell) {return cell.firstChild.nodeValue.indexOf("사주Ｇ") !== -1 || cell.firstChild.nodeValue.indexOf("검주Ｇ") !== -1;};

	};

	//素材絞りこみ

	var dt = document.createElement("div"),

		i = document.createElement("input");

	i.type = "text",i.title = "소재로 좁혀보기";

	dt.appendChild(i.cloneNode(false));

	i.type = "button",i.value = "좁혀보기",i.title = "소재로 좁혀보기";

	dt.appendChild(i.cloneNode(false));

	tH.cells[7].appendChild(dt);

	var ckSozai_F = function (e) {

		return e === "" ? function(){return true} : function (cell) {return cell./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/.indexOf(e) !== -1;}

	};

}

//スキル制限

s.style.display = "block",s.title = "스킬로 좁히기";

if (location.pathname.indexOf("deconk") !== -1) {

	selectSetGroup(s,[

	["스킬",["선택"]],

	["공격 계열",["공격","회심","담력","화속성 강화","수속성 강화","뇌속성 강화","빙속성 강화","용속성 강화","검술","심안술","관통투척","특대투척","마비 공격","수면 공격","독 공격","특수공격"]],

	["방어 계열",["방어","반사신경","반사술"]],

	["체력·스태미나계",["체력"]],

	["상태이상계",["독","마비","수면","기절"]],

	["내성 계열",["모든내성","화내성","수내성","뇌내성","빙내성","용내성"]],

	["보호계",["방음","흔들림방지","풍압","담력"]],

	["아이템·조합계",["귀인 피리술","회복 피리술","경화 피리술","마비함정술"]],

	["보수 계열",["운"]],

	["기타 계열",["복귀력","발분술","격려술","인연술","이동속도"]]

	]);

} else if (location.pathname.indexOf("decotk") !== -1 || location.pathname.indexOf("decotf") !== -1) {

	selectSet(s,["선택"]);

	s.style.display = "none";

} else {

	selectSetGroup(s,[

	["스킬",["선택"]],

	["공격 계열",["강격","공격","일필랑","일섬","달인","섬전","통격","교격","속격","변칙","극물의 소양","특수공격","기괴","화속성공격","수속성공격","뇌속성공격","빙속성공격","용속성공격","속성 공격력","폭탄강화","포술사","고무","피리명인","체술","역경","분노","저력","솜씨꾼","노련함","단식","차지단축","차지위력","무기다루기","뒷심","적응격","투혼","혈기활성","전뢰","혹사","인내","돌진","난타","일점돌파","사자분신","불퇴"]],

	["방어 계열",["생명력","반사","방어","요새","가드성능","자동방어","줄행랑"]],

	["체력·스태미나계",["체력","회복속도","회복","흡혈","약초학","기력회복","배고픔","스태미나","식사","먹보"]],

	["검사 계열",["연마도사","예리도","교류","도검장인","장인","폭격검","맹독검","마비검","수면검","화염검","수격검","뇌신검","빙결검","용왕검","한손검기","쌍검기","대검기","태도기","추기","수렵적기","창기","총창기","검부기","천룡곤기","자참추기","검술","검신"]],

	["거너 계열",["사수","일반탄강화","관통탄강화","산탄강화","일반탄추가","관통탄추가","산탄추가","유탄추가","확산탄추가","독병추가","마비병추가","수면병추가","장착","숨고르기","장전수","속사","연사","장전","반동","백발백중","정밀사격","탄조합","탄환절약술","저격","틈새사격","중총기","경총기","궁기"]],

	["상태이상계",["독","마비","수면","내상태이상","기절","탈취","눈사람방지","성대","대방어DOWN","멀미내성","폭파내성","자력내성","결정내성","동결내성"]],

	["내성 계열",["모든내성UP","화내성","수내성","빙내성","뇌내성","용내성"]],

	["보호계",["삼계의 수호","청각보호","흔들림방지","풍압","훔치기무효","더위방지","추위방지","경계","지형","초회피","회피성능","회피거리","낙법","심판","근성","절대방어"]],

	["아이템·조합계",["조합사","효과지속","광역","변덕","투척","강철어깨","헌터","고기굽기","낚시","조합성공률","연금술","고속설치","철완","나이프술"]],

	["MAP탐지계",["지도","천리안","기척","선동"]],

	["채집운반계",["운반","고속채집","채집","갈무리","평상심"]],

	["보수 계열",["운기","몬스터","압력"]],

	["기타 계열",["브리더","인연","번뜩임","포획고수","구원","보살핌","이동속도","갈!","지원","은총","대가","흑의 명맥","염총","발납술","절대영도"]]

	]);

}

tH.cells[4].appendChild(s.cloneNode(true));

tH.cells[4].appendChild(s.cloneNode(true));

var ckSkill_F = function (e) {

	return e === "선택" ? function(){return true} : function (cell) {return cell.innerHTML.indexOf(">"+e+"<") !== -1;};

	};

//辿異制限

if (armorCK || location.pathname.indexOf("decocz") !== -1) {

	s = document.createElement("select");

	s.title = "천이로 좁히기";

	selectSet(s,["천이","스킬 슬롯 확장","회심전환 강화","교격 강화","속성특효 강화","전광석화 강화","절대영도 강화","귀마개 강화","풍압 강화","흔들림방지 강화","내독 강화","내마비 강화","내수면 강화","흡혈 강화","극물취급달인 강화","지원 강화","탄환절약술 강화","가드성능 강화","적응격 강화","격려 강화","반사 강화","칼날회피 강화","혈기활성 강화","인내 강화","갈! 강화","난타 강화","돌진 강화"]);

	tH.cells[4].appendChild(s.cloneNode(true));

	var ckTeni_F = function (e) {

		return e === "천이" ? function(){return true} : function (cell) {return cell.innerHTML.indexOf("「"+e) !== -1;};

		};

}

tH=dt=i=s=null;



//フィルター

if (armorCK) {

	//防具

	var filter = function () {

		var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),

			tr = document.getElementsByTagName("tbody")[0].rows, 

			N = tr.length,

			ckRare = ckRare_F(s[0].value),

			ckSkill1 = ckSkill_F(s[2].value),

			ckSkill2 = ckSkill_F(s[3].value),

			ckTeni = ckTeni_F(s[4].value),

			ckSlot = ckSlot_F(s[5].value);

		for (var i = 0,cel; i < N; i++) cel = tr[i].cells,tr[i].style.display = ckRare(cel[2]) && ckSkill1(cel[4]) && ckSkill2(cel[4]) && ckTeni(cel[4]) && ckSlot(cel[5]) ? "" : "none";

		}

	var taisort = function () {

		var s1 = document.getElementsByTagName("thead")[0].getElementsByTagName("select")[1].selectedIndex;

		if (!s1) return false;

		s1--

		

		var marker = document.createElement("tbody"),

			tB = document.getElementsByTagName("tbody")[0],

			tr = tB.rows,

			N = tr.length,

			x = [];

		for (var i = 0; i  <N; i++) {

			x[i] = tr[i].style.display ? [0] : [+tr[i].cells[3].childNodes[s1*2].nodeValue.substring(2)];

			x[i].row = tr[i];

		}

		x.sort(function(a, b){return b - a});

		for (var i = 0; i < N; marker.appendChild(x[i++].row));

		tB.parentNode.replaceChild( marker,tB );

		}

} else if (location.pathname.indexOf("decocz") !== -1) {

	//장식품

	var filter = function () {

		var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),

			i = document.getElementsByTagName("thead")[0].getElementsByTagName("input"),

			tr = document.getElementsByTagName("tbody")[0].rows,

			N = tr.length;

			ckGr = ckGr_F(s[0].value),

			ckSkill1 = ckSkill_F(s[1].value),

			ckSkill2 = ckSkill_F(s[2].value),

			ckTeni = ckTeni_F(s[3].value),

			ckSozai = ckSozai_F(i[1].value);

		for (var i = 0,cel; i < N; i++) cel = tr[i].cells,tr[i].style.display = ckGr(cel[0]) && ckSkill1(cel[4]) && ckSkill2(cel[4]) && ckTeni(cel[4]) && ckSozai(cel[7]) ? "" : "none";

		}

} else {

	//장식품

	var filter = function () {

		var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),

			i = document.getElementsByTagName("thead")[0].getElementsByTagName("input"),

			tr = document.getElementsByTagName("tbody")[0].rows,

			N = tr.length;

			ckGr = ckGr_F(s[0].value),

			ckSkill1 = ckSkill_F(s[1].value),

			ckSkill2 = ckSkill_F(s[2].value),

			ckSozai = ckSozai_F(i[1].value);

		for (var i = 0,cel; i < N; i++) cel = tr[i].cells,tr[i].style.display = ckGr(cel[0]) && ckSkill1(cel[4]) && ckSkill2(cel[4]) && ckSozai(cel[7]) ? "" : "none";

		}

}



var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");

if (armorCK) {

	addEvent(s[0],"change",filter);

	addEvent(s[1],"change",taisort);

	addEvent(s[2],"change",filter);

	addEvent(s[3],"change",filter);

	addEvent(s[4],"change",filter);

	addEvent(s[5],"change",filter);

	//防具

} else {

	//장식품

	for (var i = 0,max = s.length; i < max; addEvent(s[i++],"change",filter));

	addEvent(document.getElementsByTagName("thead")[0].getElementsByTagName("input")[1],"change",filter);

}

s=null;



//イベント登録

addEvent(document,"click",

function (evt) {

	/*@if (true)

	var t = evt.srcElement;

	@else@*/

	var t = evt.target;

	/*@end@*/

	if (t.tagName === "INPUT"){

		var marker = document.createElement("tbody"),

			tB = document.getElementsByTagName("tbody")[0],

			tr = tB.rows,

			N = tr.length,

			x = [];

		switch (t.title) {

		case "이름순 정렬":

			var Fulltohalf = (function (){

				var han = "0123456789.,-+ABCDEFGHIJKLMNOPQRSTUVWXYZｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｧｨｨｩｩｪｪｫｫｯｯｬｬｭｭｮｮｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾊﾋﾌﾍﾎﾊﾋﾌﾍﾎｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾊﾋﾌﾍﾎﾊﾋﾌﾍﾎｳ";

				var zen = "０１２３４５６７８９．，－＋ＡＢＣＤＥＦＪＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁァぃィぅゥぇェぉォっッゃャゅュょョガぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽガギグゲゴザジズゼゾダジヅデドバビブベボ파피프페ポヴ";

				return function (strVal) {

					for (var i = 0,str = "",m = strVal.length,c,n; i<m; i++){

						c = strVal.charAt(i),n = zen.indexOf(c,0);

						str += n >= 0 ? han.charAt(n) : "ﾞ" + c;

					}

					return str;

				}

			})();

			for (var i = 0; i < N; x[i] = [Fulltohalf(tr[i].cells[0].firstChild.nodeValue)], x[i].row=tr[i++]);

			x.sort();

			for (var i = 0; i < N; marker.appendChild(x[i++].row));

			tB.parentNode.replaceChild( marker,tB );

			break;

		case "방어순 정렬":

			for (var i = 0; i < N; x[i] = [tr[i].cells[5].lastChild.nodeValue.split("/")[0]], x[i].row=tr[i++]);

			x.sort(function(a, b){return b - a});

			for (var i = 0; i < N; marker.appendChild(x[i++].row));

			tB.parentNode.replaceChild( marker,tB );

			break;

		}

	}

});

}, 32);

