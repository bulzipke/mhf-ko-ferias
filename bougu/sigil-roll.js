(() => {
    'use strict';

    const timeEffect = 0x71;
    const cooldownEffect = 0x72;
    const rangeFirstEffect = 0x7d;
    const repeatableShelling = 0x51;
    const uniqueEffects = new Set([
        0x2f, 0x30, 0x31, 0x34, 0x35, 0x37, 0x38, 0x39, 0x3a, 0x3b,
        0x3c, 0x3d, 0x3e, 0x3f, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45,
        0x46, 0x47, 0x48, 0x49, 0x4a, 0x4b, 0x4c, 0x4d, 0x4e, 0x4f,
        0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x6b, 0x6c,
        0x6d, 0x6e, 0x6f, 0x70,
    ]);

    // Both native generators keep these two states across consecutive sigils.
    function roller(data, effectSeed, valueSeed) {
        function nextEffect() {
            effectSeed = (Math.imul(effectSeed, 0x343fd) + 0x269ec3) >>> 0;
            return effectSeed;
        }

        function nextValue() {
            valueSeed = ((valueSeed || 1) * 176) % 65363;
            return valueSeed;
        }

        function ordinaryValue(low, high) {
            if (low === high) return low;
            const width = high - low + 1;
            return (nextValue() % width + low) || (nextEffect() % width + low) || low;
        }

        function allowed(id, results) {
            if (id === repeatableShelling) return true;
            const [low, high] = data.effects[id].tiers[0];
            return !(uniqueEffects.has(id) || (low === 1 && high === 1)) ||
                !results.some(effect => effect[0] === id);
        }

        function pool(first, last, preferred, excluded) {
            const blocked = new Set([...excluded, ...preferred.map(row => row[0])]);
            const candidates = [];
            for (let id = first; id <= last; id++) if (!blocked.has(id)) candidates.push(id);
            return candidates;
        }

        function tier(id, budget) {
            const choices = data.effects[id].tiers.filter(([, , cost]) => cost > 0 && cost <= budget);
            return choices.length ? choices[nextEffect() % choices.length] : null;
        }

        function ordinaryFallback(candidates, budget, results) {
            const group = data.fallbackExclusive;
            const groupUsed = results.some(effect => group.includes(effect[0]));
            for (let attempt = 0; attempt < candidates.length; attempt++) {
                const id = candidates[nextEffect() % candidates.length];
                if ((groupUsed && group.includes(id)) || !allowed(id, results)) continue;
                const range = tier(id, budget);
                if (range) return [id, ordinaryValue(range[0], range[1]), range[2]];
            }
            return null;
        }

        function ordinary(lowBudget, highBudget, preferred, excluded) {
            const results = [];
            const candidates = pool(1, 0x70, preferred, excluded);
            let remaining = lowBudget;
            if (highBudget > lowBudget) remaining += nextValue() % (highBudget - lowBudget + 1);
            for (let attempt = 0; attempt < 3 && remaining > 0; attempt++) {
                const budgetRoll = nextEffect() % remaining;
                const lastChance = attempt === 2 && results.length === 0;
                const budget = lastChance ? remaining : budgetRoll;
                const roll = nextEffect() % 100;
                let cumulative = 0;
                let result = null;
                let pickedPreferred = false;
                for (const [id, weight, required, low, high] of preferred) {
                    cumulative += weight;
                    if ((roll >= cumulative && !required) || !allowed(id, results)) continue;
                    pickedPreferred = true;
                    const value = ordinaryValue(low, high);
                    const cost = data.effects[id].tiers.find(([min, max]) => min <= value && value <= max)?.[2] ?? 0;
                    if (cost <= remaining) result = [id, value, cost];
                    break;
                }
                if (!pickedPreferred || (!result && lastChance)) {
                    result = ordinaryFallback(candidates, budget, results);
                }
                if (result) {
                    remaining -= result[2];
                    results.push(result);
                }
            }
            return results;
        }

        function weightedRange(rows) {
            let roll = nextEffect() % 100;
            for (const row of rows) {
                if (roll < row[1]) return row;
                roll -= row[1];
            }
            return null;
        }

        function zenith(preferred, excluded) {
            const results = [];
            const sorted = preferred.slice().sort((a, b) => a[1] - b[1]);
            const ranged = !preferred.some(row => row[0] === timeEffect);
            const fallback = ranged ? [] : pool(timeEffect, rangeFirstEffect - 1, preferred, excluded);
            for (let slot = 0; slot < 3; slot++) {
                let id;
                let range;
                if (ranged) {
                    do {
                        id = rangeFirstEffect + nextValue() % 7;
                    } while (id >= 0x80 && id <= 0x82 && results.some(effect => effect[0] === id));
                    range = weightedRange(sorted);
                } else {
                    const rows = sorted.filter(([id]) => slot === 0 ? id === timeEffect :
                        slot === 1 ? id === cooldownEffect : id !== timeEffect && id !== cooldownEffect);
                    range = weightedRange(rows);
                    if (range) id = range[0];
                }
                if (range) {
                    const [, , , low, high] = range;
                    const value = low + nextValue() % (high - low + 1);
                    results.push([id, ranged && id >= 0x80 && id <= 0x82 ? 1 : value, 65]);
                } else if (fallback.length) {
                    let choice;
                    do {
                        id = fallback[nextValue() % fallback.length];
                        choice = tier(id, 999);
                    } while (!choice);
                    results.push([id, choice[0] + nextEffect() % (choice[1] - choice[0] + 1), 65]);
                }
            }
            return results;
        }

        return recipeId => {
            const [kind, low, high, excluded, preferred] = data.recipes[recipeId];
            const exclusions = data.exclusions[excluded];
            return kind === 2 ? zenith(preferred, exclusions) : ordinary(low, high, preferred, exclusions);
        };
    }

    if (typeof module === 'object' && module.exports) {
        module.exports = {roller};
        return;
    }

    const data = globalThis.feriasSigilData;
    const dialog = document.getElementById('sigil-roll-dialog');
    const title = document.getElementById('sigil-roll-title');
    const results = document.getElementById('sigil-roll-results');
    if (!data || !dialog || typeof dialog.showModal !== 'function') return;

    function format([id, value]) {
        const effect = data.effects[id];
        if (effect.variants?.[value]) return effect.variants[value];
        const [low, high] = effect.tiers[0];
        if (low === 1 && high === 1 && !effect.tiers.some(([min, max]) => min < 0 || max > 1)) return effect.name;
        return `${effect.name} ${value > 0 ? '+' : ''}${value}`;
    }

    document.querySelectorAll('#s tbody td[id^="l"]').forEach(cell => {
        const recipeId = Number.parseInt(cell.id.slice(1), 16);
        if (!data.recipes[recipeId]) return;
        const recipeName = cell.textContent.trim();
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'sigil-roll-button';
        button.textContent = '10회 추첨';
        button.setAttribute('aria-label', `${recipeName} 10회 추첨`);
        button.addEventListener('click', () => {
            const seeds = crypto.getRandomValues(new Uint32Array(2));
            const roll = roller(data, seeds[0], seeds[1] & 0xffff);
            title.textContent = recipeName;
            const entries = [];
            for (let i = 0; i < 10; i++) {
                const item = document.createElement('li');
                const effects = roll(recipeId);
                item.textContent = effects.length ? effects.map(format).join(' · ') : '발현 효과 없음';
                entries.push(item);
            }
            results.replaceChildren(...entries);
            dialog.showModal();
        });
        cell.appendChild(button);
    });
})();
