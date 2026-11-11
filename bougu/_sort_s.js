setTimeout(function (){
/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
//イベントセット
var addEvent = function (elm, type, func) {
	//追加
	elm./*@if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type,func,false);
	//アンロードで削除
	window./*@if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ "unload",
		function(){
			elm./*@if (@_jscript_version < 9) detachEvent ('on' + @else@*/ removeEventListener (/*@end@*/ type,func,false);
		}
		,false);
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

//初期設定
var tH = document.getElementsByTagName("thead")[0].rows[0],
	dt = document.createElement("div"),
	s = document.createElement("select");
dt.className="m",s.style.display="block",s.title="스킬로 좁히기";
selectSet(s,[
"특수효과","공격력 보정","속성값","상태이상치","회심률","방어력","스턴치","비룡종 특효","조룡종 특효","갑각종 특효","어룡종 특효","아수종 특효","수룡종 특효","해룡종 특효","고룡종 특효","소형 특효","－－－－－－","폭염","혹한","아침 특효","심야 특효","번식기 특효","온난기 특효","한랭기 특효","월요일 특효","화요일 특효","수요일 특효","목요일 특효","금요일 특효","토요일 특효","일요일 특효","관리인의 친구","기구의 친구","다우징","헌터혼","입혼의 권유","구쿠의 친구","호르크의 친구","보수의 재주","경험치의 재주","잡식","해체상","졸음","미끼","떼쓰기 연줄","결속","원호","속사 추가","초속사 추가","속사 무효","배열분사 추가","발리스타 절약","무속성 활 강화","무속성 한손검 강화","소리 폭탄 범위 확대","기술 강화[한손검]","기술 강화[쌍검]","기술 강화[대검]","기술 강화[태도]","기술 강화[창]","기술 강화[총창]","기술 강화[추]","기술 강화[피리]","기술 변화[한손검]","기술 변화[쌍검]","기술 변화[대검]","기술 변화[태도]","기술 변화[창]","기술 변화[총창]","기술 변화[추]","기술 변화[피리]","기술 변화[경총]","기술 변화[중총]","기술 변화[활]","리치UP","포격 변화","선율 변화1","선율 변화2","선율 변화3","곡사 변화","희귀도 변화","포격 강화","기술 강화[활]","냥 브리더","탄 변화","발도강화[대검]","발도강화[추]","발도강화[창]","발도강화[한손검]","발도강화[쌍검]","발도강화[태도]","발도강화[피리]","발도강화[총창]","발도강화[곤]","기술강화[곤]","아룡종특효","발도이동속도","기술강화[검부]","기술강화[중총]","대검 강화","중총 강화","추 강화","창 강화","한손검 강화","경총 강화","쌍검 강화","태도 강화","수렵피리 강화","총창 강화","무기 강화","천룡곤 강화","검부 강화","자참추 강화","재사용대기시간","효과 시간","[천이]화내성","[천이]수내성","[천이]빙내성","[천이]뇌내성","[천이]용내성","[천이]지속회복","[천이]호걸","[천이]공격력","[천이]속성값","[천이]이동속도","[범위]공격력","[범위]속성값","[범위]회심률","[범위]상태이상","[범위]스턴치","[범위]지속회복","[범위]모든내성"
]);
tH.cells[1].appendChild(s.cloneNode(true));
tH.cells[1].appendChild(s.cloneNode(true));
var ckSkill_F = function (e) {
	return e === "특수효과" ? function(){return true} : function (cell) {return cell.innerHTML.indexOf(">"+e+"<") !== -1;};
	};
tH=dt=s=null;

//장식품
var filter = function () {
	var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select"),
		tr = document.getElementsByTagName("tbody")[0].rows,
		N = tr.length,
		ckSkill1 = ckSkill_F(s[0].value);
		ckSkill2 = ckSkill_F(s[1].value);
	for (var i = 0; i < N; i++) tr[i].style.display = ckSkill1(tr[i].cells[1]) && ckSkill2(tr[i].cells[1]) ? "" : "none";
}

var s = document.getElementsByTagName("thead")[0].getElementsByTagName("select");
for (var i = 0, max = s.length; i < max; addEvent(s[i++],"change",filter));
s=null;

}, 32);
