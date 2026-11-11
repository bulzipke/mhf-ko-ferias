(function (document) {
/*@cc_on if (@_jscript_version < 9) {_d=document;eval('var document=_d');}@*/
// Generated/copied by tools/ferias_equipment_search.py.
var addEvent = function (elm, type, func) {
    elm./*@if (@_jscript_version < 9) attachEvent ('on' + @else@*/ addEventListener (/*@end@*/ type, func, false);
};
var input = document.getElementById('equip'), index = null;
var BouguName = {h:'머리 방어구',b:'몸통 방어구',a:'팔 방어구',w:'허리 방어구',l:'다리 방어구',d:'장식품',p:'장식품',t:'천랑석',f:'장식품',k:'각인',z:'커프',c:'커프',s:'시질',n:'네코',H:'Ｐ머리',B:'Ｐ몸통'},
    BouguId = {h:'head',b:'body',a:'arm',w:'wst',l:'leg',d:'deco',c:'decocf',p:'decosp',n:'deconk',t:'decotr',f:'decotf',k:'decotk',z:'decocz',s:'sigil',H:'head_partnya',B:'body_partnya'},
    BukiName = {'0':'대검','1':'헤비보우건','2':'해머','3':'랜스','4':'한손검','5':'라이트보우건','6':'쌍검','7':'태도','8':'수렵피리','9':'건랜스',A:'활',B:'천룡곤',C:'슬래시액스',D:'마그넷스파이크',a:'Ｐ대검',c:'Ｐ해머'},
    BukiId = {'0':'taiken','1':'heavy','2':'hammer','3':'lance','4':'katate','5':'right','6':'souken','7':'tachi','8':'horn','9':'gunlance',A:'yumi',B:'tonfa',C:'slaxe',D:'magspike',a:'taiken_partnya',c:'hammer_partnya'};

// Match the material search: Korean and Japanese ignore spacing; English matches word prefixes.
var SEP = /[\s\u3000.,'"`\u00b7\u30fb\-_\/\\()\[\]{}<>\u3010\u3011\u300c\u300d\u300e\u300f:;!?~\u2026]+/g;
function words(s) {
    if (s.normalize) { s = s.normalize('NFKC'); }
    // Fold hiragana into katakana (\u308c\u3046\u3059 = \u30ec\u30a6\u30b9); Korean and English are unaffected.
    s = s.replace(/[\u3041-\u3096]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) + 0x60); });
    return s.toLowerCase().replace(SEP, ' ').replace(/^ +| +$/g, '');
}
// Japanese names are fetched only once a query contains kana or kanji.
var JP_QUERY = /[\u3005\u3041-\u30ff\u3400-\u9fff\uf900-\ufaff\uff66-\uff9f]/, JP_SRC = 'equip_jp.js?kr=bb59b4cf6361',
    jpState = 0, jpWait = null;
function loadJapanese(callback) {
    if (jpState === 2) { return true; }
    jpWait = callback;
    if (jpState === 0) {
        jpState = 1;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = JP_SRC;
        script.onload = script.onerror = function () {
            var next = jpWait;
            jpState = 2;
            jpWait = null;
            index = null;
            if (next) { next(); }
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    return false;
}
function roman(s, f) {
    var h = f(s);
    if (/[\u2160-\u216b]/.test(s)) {
        h += '\u0001' + f(s.replace(/[\u2160-\u216b]/g, function (c) { return ' ' + (c.charCodeAt(0) - 0x215f); }));
    }
    return h;
}
function hayKo(s) { return roman(s, function (x) { return words(x).replace(/ /g, ''); }); }
function hayEn(s) { return roman(s, function (x) { return ' ' + words(x) + ' '; }); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function inGroup(group, code) { return group.indexOf(',' + code + ',') !== -1; }

// Cache only names, search keys and links; construction material tables are not needed.
function buildIndex() {
    var en = typeof setEquipEN === 'function' ? setEquipEN() : {},
        jp = typeof setEquipJP === 'function' ? setEquipJP() : {}, result = [];
    function append(data, names, jpNames, weapon) {
        var groups = {};
        if (weapon) {
            for (var g = 0, keys = ['G', 'SP', 'Neko', 'Sinka']; g < keys.length; g++) {
                groups[keys[g]] = ',' + data[keys[g]] + ',';
            }
        }
        for (var code in data.Name) {
            if (!Object.prototype.hasOwnProperty.call(data.Name, code)) { continue; }
            var name = data.Name[code], type = code.charAt(0), id = code.substring(1, 5),
                english = names[code] || '', japanese = jpNames[code] || '', suffix = '', category, href, label;
            if (weapon) {
                if (inGroup(groups.G, code)) { suffix = '_g'; }
                else if (inGroup(groups.SP, code)) { suffix = '_sp'; }
                else if (inGroup(groups.Neko, code)) { suffix = '_n'; }
                else if (inGroup(groups.Sinka, code)) { suffix = '_s'; }
                category = 'buki';
                label = BukiName[type];
                href = '../buki/' + BukiId[type] + suffix + '.htm#l' + id;
            } else {
                label = BouguName[type];
                if ('dncpstfkz'.indexOf(type) !== -1) {
                    category = 'dec';
                    href = '../bougu/' + BouguId[type] + '.htm#l' + id;
                } else {
                    category = 'bougu';
                    if (type === 'H' || type === 'B') {
                        href = '../bougu/' + BouguId[type] + '.htm#l' + id;
                    } else if (name.lastIndexOf('SP') !== -1) {
                        href = '../bougu/' + BouguId[type] + 'sp.htm#l' + id;
                    } else {
                        href = '../bougu/_tree.htm#' + BouguId[type].charAt(0) + id;
                    }
                }
            }
            result[result.length] = {name:name, en:english, jp:japanese, ko:hayKo(name),
                english:english ? hayEn(english) : '', japanese:japanese ? hayKo(japanese) : '',
                category:category, label:label, href:href};
        }
    }
    append(setBuki(), en.buki || {}, jp.buki || {}, true);
    append(setBougu(), en.bougu || {}, jp.bougu || {}, false);
    return result;
}
function search() {
    var parts = input.value.split(/\s+/), toks = [], solid = [], longest = 0, k, w;
    for (k = 0; k < parts.length; k++) {
        w = words(parts[k]);
        if (!w) { continue; }
        toks[toks.length] = w;
        solid[solid.length] = w.replace(/ /g, '');
        longest = Math.max(longest, solid[solid.length - 1].length);
    }
    var out = {buki:[], bougu:[], dec:[]}, waiting = false;
    // A query with kana/kanji is a Japanese-name search; English word prefixes would only add noise
    // ("レウス G" matching Azure *G*linsword).
    var useJp = JP_QUERY.test(input.value), useEn = longest >= 3 && !useJp;
    if (useJp && !loadJapanese(search)) { waiting = true; }
    if (toks.length && !waiting) {
        if (!index) { index = buildIndex(); }
        for (var i = 0; i < index.length; i++) {
            // used: 1 = matched through the English name, 2 = through the Japanese name
            var row = index[i], used = 0, hit = true;
            for (k = 0; k < toks.length; k++) {
                if (row.ko.indexOf(solid[k]) !== -1) { continue; }
                if (useJp && row.japanese && row.japanese.indexOf(solid[k]) !== -1) { used |= 2; continue; }
                if (useEn && row.english && row.english.indexOf(' ' + toks[k]) !== -1) { used |= 1; continue; }
                hit = false;
                break;
            }
            if (!hit) { continue; }
            out[row.category][out[row.category].length] = '<tr><td>' + esc(row.label) +
                '</td><td><a href="' + row.href + '">' + esc(row.name) +
                (used & 2 ? '<span class="en">' + esc(row.jp) + '</span>' : '') +
                (used & 1 ? '<span class="en">' + esc(row.en) + '</span>' : '') + '</a></td></tr>';
        }
    }
    function render(id, group, heading, title, width) {
        var empty = waiting ? '<tr><td colspan="2">일본어 이름을 불러오는 중…</td></tr>' :
            toks.length && !out[group].length ? '<tr><td colspan="2">검색 결과가 없습니다.</td></tr>' : '';
        document.getElementById(id).innerHTML = '<table><tr><th style="width:' + width +
            'em;">' + heading + '</th><th style="width:10em;">' + title + '</th></tr>' + out[group].join('') + empty + '</table>';
    }
    render('tblBuki', 'buki', '무기 종류', '무기명', 7);
    render('tblBougu', 'bougu', '부위', '방어구명', 4);
    render('tblDec', 'dec', '장식품', '장식명', 4);
}
addEvent(document.getElementById('b_search'), 'click', search);
input.focus();
addEvent(window, 'pagehide', function () {
    document.cookie = 'equip=' + [escape(input.value), document.documentElement.scrollTop].join(':');
});
var saved = /(?:^|;\s*)equip=([^;]*)/.exec(document.cookie);
if (saved) {
    var value = saved[1].split(':');
    input.value = unescape(value[0]);
    search();
    window.scrollTo(0, parseInt(value[1], 10) || 0);
}
})(document);
