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

//HTMLにボタン追加

//初期設定

var topDiv=document.getElementsByTagName("div")[0],i=document.createElement("input");

i.type="button";

//昼夜

i.value="낮",i.title="낮으로 좁혀보기",i.style.marginLeft = "20px";

topDiv.appendChild(i.cloneNode(false));

i.value="밤",i.title="밤으로 좁혀보기",i.style.marginLeft = "0";

topDiv.appendChild(i.cloneNode(false));

topDiv=i=null;



addEvent(document,"click",

function (evt) {

	/*@if (true)

	var t = evt.srcElement;

	@else@*/

	var t = evt.target;

	/*@end@*/

	if (t.tagName === "INPUT"){

		var tr=document.getElementsByTagName("tbody")[0].rows, N=tr.length,wk = t.value === "밤" ? "y" : "";

		for(var i=0; i<N; i++) tr[i].style.display = tr[i].className === wk || tr[i].cells[1]./*@if (@_jscript_version < 9) innerText @else@*/ textContent /*@end@*/ === "0" ? "" : "none";

	}

});

}, 32);

