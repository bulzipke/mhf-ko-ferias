(function(){
/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
//イベントセット
var addEvent = function (elm, type, func) {
	//追加
	elm./*@if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
};
//リストセット
var selectSet = function(e,v) {
	var m = v.length;
	/*@if (@_jscript_version < 9)
	e.options.length = m;
	for (var i = 0;i < m;e.options[i].value = e.options[i].text = v[i++]);
	@else@*/
	e.length = 0;
	for (var i = 0,o;i < m;i++){
		o = document.createElement("option");
		o.setAttribute("value", v[i]);
		o.appendChild(document.createTextNode(v[i]));
		e.appendChild(o.cloneNode(true));
	}
	/*@end@*/
};

//HTMLにボタン追加
var tH = document.getElementsByTagName("thead")[0].rows[0],
	i = document.createElement("input"),
	s = document.createElement("select");
i.type = "button",i.style.display = s.style.display = "block",
i.style.marginRight = i.style.marginLeft = s.style.marginRight = "auto";

//場所
s.title = "장소로 좁혀보기";
selectSet(s,["장소","밀림","사막","늪지","설산","화산","수해","숲과 언덕","탑","협곡","고지","조도","극해","꽃밭","죽림","요새","거점","성","투기장","결전장","절도"]);
s.selectedIndex = 0;
tH.cells[2].appendChild(s.cloneNode(true));
//ターゲット
s.title = "타겟으로 좁혀보기";
selectSet(s,["타겟","아이루","아캄토름","아크라·바심","아크라·제비아","아놀파티스","아비올그","아프케로스","아프토노스","아마츠마가츠치","알가노스","ＵＮＫＮＯＷＮ","이오스","이나가미","이블조","이블조식","얀가루루가","얀쿡크","얀쿡크 아종","바르사블로스","보쟌","볼가노스","볼가노스 아종","우라간킨","울키","에규라스","에스피나스","에스피나스 아종","에스피나스 희소종","엘제리온","엘페","오나즈치","오디바트라스","가우시카","가스라바즈라","가노토토스","가노토토스 아종","가브라스","가미자미","카무·올가론","갈바다오라","가레오스","칸타로스","기어올그","기아노스","키린","쿠아르세프스","관조룸","크샬다오라","쿠스바미","그라비모스","그라비모스 아종","그레아도모스","그렌제블","케오알볼","게네포스","게리오스","게리오스 아종","켈비","고어·마가라","고우갈프","코코모아","고고모아","골가노스","콩가","센가오렌","샤가르·마가라","샨티엔","쇼군기자미","진오우거","진오우거 아종","제나세리스","제르레우스","셀레기오스","타이쿤자무자","다이묘자자미","대뇌광충","차차브","디아블로스","디아블로스 아종","디오렉스","티가렉스","디스피로아","테오·테스카토르","듀라가우아","토아·테스카토라","두레무디라","도스이오스","도스가레오스","도스게네포스","도스팽고","도스람포스","도도블랑고","드라규로스","토리도쿠레스","나나·테스카토리","나르가쿠르가","노노·올가론","바살모스","바바콩가","파리아푸리아","하루도메르그","바루라갈","히프노크","히프노크 희소종","히프노크 번식기","휴지키키","파르노크","포로쿠루루","브라키디오스","블랑고","브룩","불팽고","푸루푸루","푸루푸루 아종","벨리오로스","벨큐로스","포카라","포카라돈","포포","보가바도름","포볼바룸","미·루","미드가론","밀라보레아스","밀라보레아스【홍룡】","밀라보레아스【조룡】","메라기나스","메라루","모스","모노블로스","모노블로스 아종","야오자미","야마쿠라이","야마츠카미","라잔","라비엔테","라비엔테 맹광기","라오샨룽","라오샨룽 아종","랑고스타","람포스","리오레이아","리오레이아 아종","리오레이아 희소종","리오레우스","리오레우스 아종","리오레우스 희소종","루코디오라","레비디오라"]);
tH.cells[6].appendChild(s.cloneNode(true));
var ckTtarget_F = function (e) {
	if (e === "타겟") {
		return function(){return true};
	} else {
		var reg = new RegExp(">"+e+"[０-９].+の|>"+e+"の");
		return function (cell) {return reg.test(">"+cell.innerHTML.replace("아크라·제비아기종","아크라·제비아").replace("히프노크기종","히프노크 번식기").split("기종").join("아종").split("변종").join(""));};
	}
};
/*こっちは亜種も引っかかるので没
var ckTtarget = function (cell,s) {
		return s === "-" ? true : (cell.innerHTML.indexOf(s) === 0 || cell.innerHTML.indexOf(">"+s) >= 1);
	}
*/

//HR
s.title = "HR로 좁혀보기";
if (location.pathname.indexOf("_g") !== -1 && location.pathname.indexOf("_go") === -1) {
	selectSet(s,["ＧＲ","1이상"]);
} else {
	selectSet(s,["ＨＲ","100이상","91이상","81이상","71이상","61이상","51이상","41이상","31이상","22이상","17이상","15이상","11이상","8이상","5이상","3이상","2","1"]);
}
tH.cells[7].appendChild(s.cloneNode(true));
var ckHr_F = function (e) {
	if (e === "ＨＲ" || e === "ＧＲ") {
		return function(){return true};
	} else {
		e = parseInt(e);
		return function (cell) {
			if (!cell.firstChild) return true;   //指定なし

			var wk = cell.firstChild.nodeValue.replace("-","");

			if (wk.indexOf("이상") !== -1) {
				return parseInt(wk.substring(2))  <= e;
			} else if (wk.indexOf("이하") !== -1) {
				return parseInt(wk.substring(2))  >= e;
			} else {
				var hantei = wk.substring(2).split("～");
				return hantei[0] <= e && hantei[1] >= e;
			}
		}
	}
};

//季節
s.title = "계절로 좁혀보기";
selectSet(s,["계절","온난기","한랭기","번식기"]);
s.style.position = "relative",s.style.top = "0",s.style.right = "-150px";
tH.cells[1].appendChild(s.cloneNode(true));
var ckField_F = function (e1,e2) {
	if (e1 === "장소" && e2 === "계절") {
		return function(){return true};
	} else if (e1 !== "장소" && e2 !== "계절") {
		return function (cell) {return cell.firstChild.nodeValue.indexOf(e1) !== -1 && cell.childNodes[2].nodeValue === e2;};
	} else if (e1 !== "장소") {
		return function (cell) {return cell.firstChild.nodeValue.indexOf(e1) !== -1;};
	} else {
		return function (cell) {return cell.childNodes[2].nodeValue === e2;};
	}
};

//金額ソート
i.value = "금액",i.title = "금액순 정렬";
tH.cells[4].appendChild(i.cloneNode(false));

//HRPソート
i.value = "포인트",i.title = "포인트순 정렬";
tH.cells[5].appendChild(i.cloneNode(false));

tH=i=s=null;

//イベントのみソートしてみる
if (location.pathname.indexOf("ev_") !== -1) {
	var marker = document.createElement("tbody"),
		tB = document.getElementsByTagName("tbody")[0],
		tr = tB.rows,
		N = tr.length,
		x = [],
		date = new Date(),
		dateTxt = (date.getFullYear() + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2));

	for (var i = 0,w = ""; i<N;) {
		w = tr[i].cells[1].lastChild.firstChild.nodeValue.split("～")[1];
		if (tr[i].className !== "h" && w < dateTxt) tr[i].className = "h";	//期間を過ぎたら非表示
		x[i] = [w + ("000" + i).slice(-3)],
		x[i].row = tr[i++];
	}
	//x.sort(function(a, b){return b < a});
	x.sort();
	for (var i = 0; i<N; marker.appendChild(x[i++].row));
	tB.parentNode.replaceChild( marker,tB );
}
//フィルター
var filter = function () {
	var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),
		tr = document.getElementsByTagName("tbody")[0].rows,
		N = tr.length;
	//状態
	if (document.getElementById("top")) {
		var sw = document.getElementById("top").getElementsByTagName("span");
		if (sw[0].style.color !== "") { //今週分のみ
			var ckLine = function (tr) {return tr.className === "" || tr.className === "e" || tr.className === "r";};
		} else if (sw[1].style.color !== "") { //全て
			var ckLine = function () {return true;};
		} else { //廃止除く
			var ckLine = function (tr) {return tr.className !== "h";};
		}
	} else {
		var ckLine = function () {return true;};
	}
	var ckField = ckField_F(s[1].value,s[0].value),ckTtarget = ckTtarget_F(s[2].value),ckHr = ckHr_F(s[3].value);
	for (var i = 0; i < N; i++ ) {
		tr[i].style.display = ckLine(tr[i]) && ckField(tr[i].cells[2]) && ckTtarget(tr[i].cells[6]) && ckHr(tr[i].cells[7]) ? "" : "none";
		/*@if (@_jscript_version <= 5.7)
		if (tr[i].style.display === "" && tr[i].cells[0].style.borderStyle === "none") {
			tr[i].cells[0].style.borderStyle = tr[i].cells[1].style.borderStyle = tr[i].cells[2].style.borderStyle = tr[i].cells[3].style.borderStyle = tr[i].cells[4].style.borderStyle = tr[i].cells[5].style.borderStyle = tr[i].cells[6].style.borderStyle = tr[i].cells[7].style.borderStyle = "ridge";
		} else if (tr[i].style.display !== "" && tr[i].cells[0].style.borderStyle !== "none") {
			tr[i].cells[0].style.borderStyle = tr[i].cells[1].style.borderStyle = tr[i].cells[2].style.borderStyle = tr[i].cells[3].style.borderStyle = tr[i].cells[4].style.borderStyle = tr[i].cells[5].style.borderStyle = tr[i].cells[6].style.borderStyle = tr[i].cells[7].style.borderStyle = "none";
		}
		/*@end@*/
	}
}

var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");
for (var i = 0,max = s.length; i < max; addEvent(s[i++],"change",filter));
s=null;
if (document.getElementById("top")){
	addEvent(document.getElementById("top"),"click",
	function (evt) {
		/*@if (@_jscript_version < 9)
		var t = evt.srcElement;
		@else@*/
		var t = evt.target;
		/*@end@*/
		if (t.tagName === "SPAN"){
			var sw = document.getElementById("top").getElementsByTagName("span");
			sw[0].style.color = sw[1].style.color = sw[2].style.color = "";
			t.style.color = "red";
			filter();
			if (sw[1].style.color !== "") { //全て表示の場合
				/*@if (@_jscript_version < 9)
				document.styleSheets[0].addRule( "table#list tr.h", "display: block;");
				document.styleSheets[0].addRule( "table#list tr.h", "display: table-row;");
				@else@*/
				document.styleSheets[0].insertRule( "table#list tr.h { display: table-row;} ",document.styleSheets[0].cssRules.length );
				/*@end@*/
			}
		}
	});
}

addEvent(document,"click",
function (evt) {
	/*@if (@_jscript_version < 9)
	var t = evt.srcElement;
	@else@*/
	var t = evt.target;
	/*@end@*/
	if (t.tagName === "INPUT"){
		var marker = document.createElement("tbody"),
			tB = document.getElementsByTagName("tbody")[0],
			tr = tB.rows,
			N = tr.length
			x = [];
		x.sum = function (cell){
				return parseInt(cell.firstChild.nodeValue) + parseInt(cell.childNodes[2].nodeValue) + parseInt(cell.childNodes[4].nodeValue);
			}
		switch (t.title) {
		case "금액순 정렬":
			var col = 4;
			marker.id = "Z"+tB.id.charAt(0);
			break;
		case "포인트순 정렬":
			var col = 5;
			marker.id = "H"+tB.id.charAt(0);
			break;
/*		case "장소순으로 정렬":
			var col = 2;
			break;
*/		}
		for (var i = 0; i < N; x[i] = [x.sum(tr[i].cells[col])], x[i].row=tr[i++]);
		x.sort(function(a, b){return b - a});
		for (var i = 0; i < N; marker.appendChild(x[i++].row));
		tB.parentNode.replaceChild( marker,tB );
	}
});

//ページ離脱時に保存
addEvent(window,"pagehide",function () {
var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),
	dispflg = "";
if (document.getElementById("top")) {
	var sw = document.getElementById("top").getElementsByTagName("span");
	if (sw[0].style.color !== "") { //今週分のみ
		dispflg = 0;
	} else if (sw[1].style.color !== "") { //全て
		dispflg = 1;
	} else { //廃止除く
		//dispflg = 2;
	}
}
document.cookie = "quest=" + [location.pathname,s[0].selectedIndex,s[1].selectedIndex,s[2].selectedIndex,s[3].selectedIndex,document.getElementsByTagName("tbody")[0].id,dispflg,document.documentElement.scrollTop].join("!");
});
//オンロード
var w = document.cookie;
if (w.indexOf("quest=" + location.pathname) !== -1) {
	w = w.split("quest=")[1].split("!");
	var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");
	if (w[1]+w[2]+w[3]+w[4] > 0) {
		s[0].selectedIndex = w[1];
		s[1].selectedIndex = w[2];
		s[2].selectedIndex = w[3];
		s[3].selectedIndex = w[4];
		filter();
	}
	//ソート
	if (w[5] !== "") {
		var i = document.getElementsByTagName("thead")[0].getElementsByTagName("input");
		if (w[5].length === 2) {
			/*@if (@_jscript_version < 9) 
			i[w[5].charAt(1) === "Z" ? 0 : 1].fireEvent( "onclick" );
			@else@*/
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			i[w[5].charAt(1) === "Z" ? 0 : 1].dispatchEvent(evt);
			/*@end@*/
		}
		/*@if (@_jscript_version < 9) 
		i[w[5].charAt(0) === "Z" ? 0 : 1].fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		i[w[5].charAt(0) === "Z" ? 0 : 1].dispatchEvent(evt);
		/*@end@*/
	}
	//今週分のみなど
	if (w[6] !== "") {
		/*@if (@_jscript_version < 9) 
		document.getElementById("top").getElementsByTagName("span")[+w[6]].fireEvent( "onclick" );
		@else@*/
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		document.getElementById("top").getElementsByTagName("span")[+w[6]].dispatchEvent(evt);
		/*@end@*/
	}
//	window.scrollTo(0,parseInt(w[7]));
};
//廃止クエスト
if (location.pathname.indexOf("x") !== -1) { //全て表示の場合
	/*@if (@_jscript_version < 9)
	document.styleSheets[0].addRule( "table#list tr.h", "display: block;");
	document.styleSheets[0].addRule( "table#list tr.h", "display: table-row;");
	@else@*/
	document.styleSheets[0].insertRule( "table#list tr.h { display: table-row;} ",document.styleSheets[0].cssRules.length );
	/*@end@*/
}

})();
