(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FeriasPlaza = factory();
}(this, function () {
  'use strict';
  // Vorbis dllmain.cpp g_ftSched: inclusive local MMDD, first matching window.
  var windows = [
    [1226,115,0],[116,204,15],[205,219,1],[220,304,2],[305,317,3],
    [318,423,4],[424,510,5],[601,610,16],[611,620,6],[621,717,7],
    [718,815,8],[816,903,7],[904,930,9],[1011,1106,10],[1207,1225,11]
  ];
  var names = {
    '-1':'기본 광장',0:'정월',1:'발렌타인',2:'히나마쓰리',3:'화이트데이',
    4:'벚꽃',5:'어린이날',6:'장마',7:'주년제',8:'여름',9:'달맞이',
    10:'할로윈',11:'크리스마스',15:'겨울',16:'10주년 기념'
  };
  function md(date) { return (date.getMonth() + 1) * 100 + date.getDate(); }
  function matches(value, start, end) { return start <= end ? value >= start && value <= end : value >= start || value <= end; }
  function feature(date) {
    var value = md(date);
    for (var i = 0; i < windows.length; i++) if (matches(value, windows[i][0], windows[i][1])) return windows[i][2];
    return -1;
  }
  // Local noon avoids DST midnight transitions while retaining the client's local date.
  function day(date, delta) { return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta, 12); }
  function entry(start, end, feat) { return {start:start,end:end,feature:feat,name:names[feat]}; }
  function upcoming(now, count) {
    var start = day(now, 0), result = [], feat = feature(start), previous;
    while (feature(previous = day(start, -1)) === feat) start = previous;
    for (var i = 0; i < count; i++) {
      feat = feature(start);
      var end = start, next;
      while (feature(next = day(end, 1)) === feat) end = next;
      result.push(entry(start, end, feat)); start = next;
    }
    return result;
  }
  function annual(year) {
    var date = new Date(year, 0, 1, 12), start = date, feat = feature(date), rows = [];
    while (date.getFullYear() === year) {
      var next = day(date, 1);
      if (next.getFullYear() !== year || feature(next) !== feat) {
        rows.push(entry(start, date, feat)); start = next; feat = feature(next);
      }
      date = next;
    }
    // Show the New Year window once, spanning December and the following January.
    if (rows.length > 1 && rows[0].feature === rows[rows.length - 1].feature) {
      var first = rows.shift(), last = rows[rows.length - 1];
      last.end = new Date(year + 1, first.end.getMonth(), first.end.getDate(), 12);
    }
    return rows;
  }
  function format(date) { return (date.getMonth() + 1) + '/' + date.getDate(); }
  function range(row) { return format(row.start) + ' ~ ' + (row.start.getFullYear() !== row.end.getFullYear() ? '다음 해 ' : '') + format(row.end); }
  function current(row, now) { return matches(md(now), md(row.start), md(row.end)); }
  function mount(container) {
    var doc = container.ownerDocument, view = doc.defaultView, signature = '';
    function el(tag, text, cls) { var n = doc.createElement(tag); if (text !== undefined) n.textContent = text; if (cls) n.className = cls; return n; }
    function cell(row, tag, text) { var n = el(tag, text); if (tag === 'th') n.scope = 'row'; row.appendChild(n); return n; }
    function render() {
      var now = new Date(), key = now.getFullYear() + '-' + md(now);
      if (key === signature) return;
      signature = key;
      var expanded = container.querySelector('details');
      var wasOpen = expanded && expanded.open;
      while (container.firstChild) container.removeChild(container.firstChild);
      container.appendChild(el('h2', '·광장 장식'));
      var scroll = el('div', undefined, 'ferias-plaza-scroll');
      var table = el('table', undefined, 'ferias-plaza-table ferias-plaza-overview');
      var head = el('thead'), headers = el('tr'), body = el('tbody'), nameRow = el('tr'), dateRow = el('tr');
      ['일정','현재','다음','이어서','이후'].forEach(function (text) { var th = cell(headers, 'th', text); th.scope = 'col'; });
      head.appendChild(headers); table.appendChild(head);
      cell(nameRow, 'th', '장식'); cell(dateRow, 'th', '기간');
      upcoming(now, 4).forEach(function (row, i) {
        var name = cell(nameRow, 'td', row.name), dates = cell(dateRow, 'td', range(row));
        if (i === 0) { name.className = dates.className = 'ferias-plaza-current'; }
      });
      body.appendChild(nameRow); body.appendChild(dateRow); table.appendChild(body); scroll.appendChild(table); container.appendChild(scroll);
      var details = el('details'), summary = el('summary', '연간 전체 일정'); details.appendChild(summary); details.open = !!wasOpen;
      var fullScroll = el('div', undefined, 'ferias-plaza-scroll');
      var full = el('table', undefined, 'ferias-plaza-table ferias-plaza-annual'), fullHead = el('thead'), titles = el('tr'), fullBody = el('tbody');
      ['기간 · 매년 반복','광장 장식'].forEach(function (text) { var th = cell(titles, 'th', text); th.scope = 'col'; });
      fullHead.appendChild(titles); full.appendChild(fullHead);
      annual(now.getFullYear()).forEach(function (row) {
        var tr = el('tr'); cell(tr, 'td', range(row)); cell(tr, 'td', row.name);
        if (current(row, now)) { tr.className = 'ferias-plaza-current'; tr.setAttribute('aria-current', 'date'); }
        fullBody.appendChild(tr);
      });
      full.appendChild(fullBody); fullScroll.appendChild(full); details.appendChild(fullScroll); container.appendChild(details);
      container.appendChild(el('p', '장식은 로컬PC 시간 설정에 따라 바뀌며, 콜라보 월드는 예외입니다', 'ferias-plaza-note'));
    }
    render();
    var timer = view.setInterval(render, 30000);
    function destroy() { view.clearInterval(timer); view.removeEventListener('pagehide', destroy); }
    view.addEventListener('pagehide', destroy);
    return {destroy:destroy};
  }
  return {feature:feature,upcoming:upcoming,annual:annual,range:range,mount:mount};
}));
