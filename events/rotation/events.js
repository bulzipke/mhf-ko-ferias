(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ErupeEvents = factory();
}(this, function () {
  'use strict';
  var names = {festa: '헌터축제', tower: '천랑원정록', diva: '가희수위전'};
  var labels = {registration: '등록', souls: '입혼', tally: '집계', rewards: '보수', exploration: '진행', prayer: '기도의 장', battle: '전가의 장', welcome: '가영의 장'};
  // Matches Erupe server/channelserver/festa_trials.go, festaSecrets.
  // Links use the existing Korean Ferias quest definitions where available.
  var secretQuests = [
    {name: '히프노크 번식기', hr: 26229, gr: 23369, bonus: 94, hrLink: 'hn_zy.htm#l6675', grLink: 'hn_gr.htm#l5B49'},
    {name: '카무·올가론', hr: 26460, gr: 23311, bonus: 91, hrLink: 'hn_zy.htm#l675C', grLink: 'hn_gr.htm#l5B0F'},
    {name: '디오렉스', hr: 21709, gr: 23490, bonus: 88, hrLink: 'od_go.htm#l54CD'},
    {name: '에스피나스', hr: 26253, gr: 23480, bonus: 90, hrLink: 'hn_zy.htm#l668D', grLink: 'tn.htm#l5BB8'},
    {name: '볼가노스', hr: 26022, gr: 23238, bonus: 91, grLink: 'hn_gr.htm#l5AC6'},
    {name: '가스라바즈라', hr: 21929, gr: 23380, bonus: 88, hrLink: 'od_go.htm#l55A9', grLink: 'hn_gr.htm#l5B54'},
    {name: '하루도메르그', hr: 21914, gr: 55929, bonus: 88, hrLink: 'od_go.htm#l559A', grLink: 'tn.htm#lDA79'},
    {name: '고고모아', hr: 26675, gr: 0, bonus: 94, hrLink: 'hn_ka.htm#l6833'}
  ];
  var hour = 3600000, day = 24 * hour, kst = 9 * hour;
  function secretSchedule(e) {
    if (!e || e.kind !== 'festa' || e.mode !== 'automatic') return [];
    var gathering = e.phases.filter(function (p) { return p.key === 'souls'; })[0];
    if (!gathering) return [];
    var start = Date.parse(gathering.starts_at), end = Date.parse(gathering.ends_at), result = [];
    if (!isFinite(start) || !isFinite(end) || end <= start || end - start > 8 * day) return result;
    var midnight = Math.floor((start + kst) / day) * day - kst;
    for (var date = midnight; date < end; date += day) {
      var weekday = new Date(date + kst).getUTCDay();
      [6, 14, 22].forEach(function (h, period) {
        var at = date + h * hour;
        // The game starts secrets eight hours after gathering begins.
        if (at < start + 8 * hour || at >= end) return;
        var slot = ((weekday + 6) % 7) * 3 + period;
        var index = slot === 18 ? 7 : (slot + e.round % 7) % 7;
        var both = (weekday === 6 && h >= 14) || weekday === 0 || (weekday === 1 && h === 6);
        result.push({starts_at: at, ends_at: Math.min(at + 2 * hour, end), quest: secretQuests[index], both: both});
      });
    }
    return result;
  }
  function secretState(e, now) {
    var gathering = e && e.phases.filter(function (p) { return p.key === 'souls'; })[0];
    if (!gathering || now < Date.parse(gathering.starts_at) || now >= Date.parse(gathering.ends_at)) return null;
    var rows = secretSchedule(e), current = null, next = null;
    rows.forEach(function (row) {
      if (row.starts_at <= now && now < row.ends_at) current = row;
      else if (!next && now < row.starts_at) next = row;
    });
    return rows.length ? {rows: rows, current: current, next: next} : null;
  }
  function format(value) {
    var d = new Date((typeof value === 'number' ? value : Date.parse(value)) + kst);
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    return (d.getUTCMonth() + 1) + '/' + d.getUTCDate() + '(' + '일월화수목금토'.charAt(d.getUTCDay()) + ') ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes());
  }
  function validate(raw) {
    if (!raw || raw.version !== 'event-schedule-v1' || raw.timezone !== 'Asia/Seoul' || !isFinite(Date.parse(raw.generated_at)) || !Array.isArray(raw.events) || raw.events.length !== 3) throw new Error('invalid schedule');
    var seen = {};
    raw.events.forEach(function (e) {
      if (!Object.prototype.hasOwnProperty.call(names, e.kind) || seen[e.kind] || !Array.isArray(e.phases) || ['automatic', 'manual', 'unavailable'].indexOf(e.mode) < 0) throw new Error('invalid event');
      seen[e.kind] = true;
      if (e.mode === 'automatic' && (typeof e.round !== 'number' || Math.floor(e.round) !== e.round || e.round <= 0 || e.phases.length === 0 || e.phases.length > 4)) throw new Error('invalid round');
      var previous = -Infinity;
      e.phases.forEach(function (p) {
        var start = Date.parse(p.starts_at), end = Date.parse(p.ends_at);
        if (!Object.prototype.hasOwnProperty.call(labels, p.key) || !isFinite(start) || !isFinite(end) || start >= end || start < previous) throw new Error('invalid phase');
        previous = end;
      });
      if (e.claim_until && !isFinite(Date.parse(e.claim_until))) throw new Error('invalid claim date');
    });
    return raw;
  }
  function state(e, now) {
    if (e.mode !== 'automatic') return {label: e.mode === 'manual' ? '자동 일정 없음' : '개최 정보 없음'};
    for (var i = 0; i < e.phases.length; i++) {
      var p = e.phases[i];
      if (now < Date.parse(p.starts_at)) return {label: '시작 예정', next: p.starts_at, nextLabel: labels[p.key]};
      if (now < Date.parse(p.ends_at)) return {label: labels[p.key], phase: p, next: p.ends_at, nextLabel: e.phases[i + 1] ? labels[e.phases[i + 1].key] : '새 회차'};
    }
    return {label: '회차 갱신 대기'};
  }
  function mount(container) {
    var doc = container.ownerDocument, model = null, offset = 0, request = null, destroyed = false, rendered = '';
    function el(tag, text, cls) { var node = doc.createElement(tag); if (text !== undefined) node.textContent = text; if (cls) node.className = cls; return node; }
    var message = el('p', '서버 일정을 불러오는 중입니다.', 'erupe-events-message');
    var content = el('div', undefined, 'erupe-events-content');
    container.appendChild(message); container.appendChild(content);
    function secretTeam(row) { return row.both ? '양 팀' : '열세팀 · 동률 시 양 팀'; }
    function secretBonus(row) { return '추가 ' + row.quest.bonus + '혼' + (row.both ? ' · 열세팀 +20혼' : ''); }
    function secretRange(row) { return format(row.starts_at) + ' ~ ' + format(row.ends_at); }
    function appendSecretSchedule(e, secrets, now) {
      if (!secrets) return;
      var block = el('div', undefined, 'erupe-events-secrets');
      var active = secrets.current || secrets.next;
      var lead = el('p', undefined, 'erupe-events-secret-current');
      if (active) {
        lead.appendChild(el('strong', secrets.current ? '진행 중 시크릿' : '다음 시크릿'));
        lead.appendChild(el('span', secretRange(active)));
        lead.appendChild(el('span', active.quest.name + ' · ' + secretTeam(active) + ' · ' + secretBonus(active)));
      } else {
        lead.textContent = '이번 회차의 시크릿은 모두 종료됐습니다.';
      }
      block.appendChild(lead);
      var details = el('details', undefined, 'erupe-events-secret-details');
      details.setAttribute('data-schedule-details', 'secrets');
      details.appendChild(el('summary', '이번 ' + e.round + '회차 시크릿 전체 일정 (' + secrets.rows.length + '회)'));
      var scroll = el('div', undefined, 'erupe-events-secret-scroll');
      var table = el('table', undefined, 'erupe-events-table erupe-events-secret-table');
      var thead = el('thead'), head = el('tr'), body = el('tbody');
      ['상태', '진행 시간', '대상', '퀘스트 번호', '참여 팀', '추가 입혼수'].forEach(function (name) { head.appendChild(el('th', name)); });
      thead.appendChild(head); table.appendChild(thead); table.appendChild(body);
      secrets.rows.forEach(function (row) {
        var running = row.starts_at <= now && now < row.ends_at;
        var past = now >= row.ends_at;
        var tr = el('tr', undefined, running ? 'erupe-events-secret-live' : past ? 'erupe-events-secret-past' : '');
        tr.appendChild(el('td', running ? '진행 중' : past ? '종료' : '예정'));
        tr.appendChild(el('td', secretRange(row)));
        tr.appendChild(el('td', row.quest.name));
        var quests = el('td');
        ['hr', 'gr'].forEach(function (rank) {
          if (!row.quest[rank]) return;
          var text = rank.toUpperCase() + ' ' + row.quest[rank], item = el(row.quest[rank + 'Link'] ? 'a' : 'span', text);
          if (row.quest[rank + 'Link']) item.setAttribute('href', 'quest/' + row.quest[rank + 'Link']);
          quests.appendChild(item);
        });
        tr.appendChild(quests);
        tr.appendChild(el('td', secretTeam(row)));
        tr.appendChild(el('td', secretBonus(row)));
        body.appendChild(tr);
      });
      scroll.appendChild(table); details.appendChild(scroll);
      details.appendChild(el('p', '한국 시간 기준입니다. 기본 입혼수는 별도로 더해집니다. 열세팀은 시작 2시간 전 집계로 결정되며, 동률이면 양 팀이 참여합니다.', 'erupe-events-secret-note'));
      block.appendChild(details); content.appendChild(block);
    }
    function render() {
      if (!model || destroyed) return;
      var now = Date.now() + offset;
      var festa = model.events.filter(function (e) { return e.kind === 'festa'; })[0];
      var secrets = secretState(festa, now);
      var signature = JSON.stringify(model.events) + model.events.map(function (e) { return state(e, now).label; }).join('|');
      if (secrets) signature += secrets.rows.map(function (row) { return now < row.starts_at ? 'next' : now < row.ends_at ? 'live' : 'past'; }).join('|');
      if (signature === rendered) return;
      rendered = signature;
      var openDetails = {};
      Array.prototype.forEach.call(content.querySelectorAll('details[data-schedule-details]'), function (details) {
        openDetails[details.getAttribute('data-schedule-details')] = details.open;
      });
      while (content.firstChild) content.removeChild(content.firstChild);
      var table = el('table', undefined, 'erupe-events-table'), head = el('tr'), body = el('tbody');
      ['콘텐츠', '현재 단계', '진행 기간', '다음 전환'].forEach(function (t) { head.appendChild(el('th', t)); });
      var thead = el('thead'); thead.appendChild(head); table.appendChild(thead); table.appendChild(body);
      model.events.forEach(function (e) {
        var tr = el('tr'), s = state(e, Date.now() + offset);
        tr.appendChild(el('th', names[e.kind] + (e.round ? ' ' + e.round + '회' : '')));
        tr.appendChild(el('td', s.label, 'erupe-events-phase'));
        tr.appendChild(el('td', s.phase ? format(s.phase.starts_at) + ' ~ ' + format(s.phase.ends_at) : '-'));
        tr.appendChild(el('td', s.next ? format(s.next) + ' ' + s.nextLabel : '-')); body.appendChild(tr);
      });
      content.appendChild(table);
      appendSecretSchedule(festa, secrets, now);
      var details = el('details'), summary = el('summary', '단계별 전체 일정'); details.appendChild(summary);
      details.setAttribute('data-schedule-details', 'phases');
      model.events.forEach(function (e) {
        if (!e.phases.length) return;
        var block = el('div', undefined, 'erupe-events-detail');
        block.appendChild(el('strong', names[e.kind] + ' ' + e.round + '회'));
        e.phases.forEach(function (p) { block.appendChild(el('div', labels[p.key] + ': ' + format(p.starts_at) + ' ~ ' + format(p.ends_at))); });
        details.appendChild(block);
      });
      content.appendChild(details);
      Array.prototype.forEach.call(content.querySelectorAll('details[data-schedule-details]'), function (details) {
        details.open = !!openDetails[details.getAttribute('data-schedule-details')];
      });
    }
    function refresh() {
      if (destroyed || request) return;
      request = new XMLHttpRequest(); request.open('GET', container.getAttribute('data-schedule-url') || '/v2/events/schedule', true); request.timeout = 8000;
      request.onload = function () {
        if (destroyed) return;
        try {
          if (request.status !== 200) throw new Error('unavailable');
          var next = validate(JSON.parse(request.responseText));
          model = next; offset = Date.parse(next.generated_at) - Date.now();
          message.hidden = true; render();
        } catch (_) { fail(); }
        request = null;
      };
      function fail() {
        // Keep an old response visibly stale instead of presenting it as live.
        model = null; rendered = ''; while (content.firstChild) content.removeChild(content.firstChild);
        message.hidden = false;
        message.textContent = '서버 일정을 불러오지 못했습니다. 잠시 후 자동으로 다시 확인합니다.'; request = null;
      }
      request.onerror = fail; request.ontimeout = fail; request.send();
    }
    var poll = setInterval(refresh, 30000), tick = setInterval(render, 1000);
    refresh();
    function destroy() { destroyed = true; clearInterval(poll); clearInterval(tick); if (request) request.abort(); }
    window.addEventListener('pagehide', destroy);
    return {destroy: destroy};
  }
  return {validate: validate, state: state, format: format, secretSchedule: secretSchedule, secretState: secretState, mount: mount};
}));
