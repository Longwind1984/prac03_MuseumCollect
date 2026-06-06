#!/usr/bin/env node
/**
 * build-wiki-index.mjs — scan wiki/{sites,events,topics,artifacts,bronzeware}/*.md
 * and emit wiki/index.json (the encyclopedia manifest the front-end reads).
 *
 * Each entry: { slug, category, title, summary, related_artifacts[], related_sites[],
 *               path, chars }. Agents wrote a standard header:
 *   # 标题
 *   **类别**: 遗址|事件|专题|文物
 *   **关联文物**: id1, id2   (or 无)
 *   **关联遗址**: slug        (or 无)
 *   > 摘要
 * Older bronzeware/*.md lack the meta block → treated as 专题, summary from first `>`.
 *
 * Run: node scripts/build-wiki-index.mjs
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WIKI = join(ROOT, 'wiki');
const CAT_BY_DIR = { sites: '遗址', events: '事件', topics: '专题', artifacts: '文物', bronzeware: '通论' };
const DIRS = Object.keys(CAT_BY_DIR);

const splitList = s => (!s || /^无$|^—$|^-$/.test(s.trim())) ? []
  : s.split(/[,，、\s]+/).map(x => x.trim()).filter(Boolean);

const entries = [];
for (const dir of DIRS) {
  const abs = join(WIKI, dir);
  if (!existsSync(abs)) continue;
  for (const fn of readdirSync(abs)) {
    if (!fn.endsWith('.md')) continue;
    const slug = basename(fn, '.md');
    const text = readFileSync(join(abs, fn), 'utf8');
    const lines = text.split('\n');
    const titleLine = lines.find(l => /^#\s+/.test(l));
    const title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : slug;
    const grab = (label) => { const l = lines.find(x => x.includes(`**${label}**`)); return l ? l.split(/[:：]/).slice(1).join(':').trim() : ''; };
    const catRaw = grab('类别');
    const category = catRaw || CAT_BY_DIR[dir];
    const summaryLine = lines.find(l => /^>\s+/.test(l) && !/标签说明|背景知识库/.test(l));
    const summary = summaryLine ? summaryLine.replace(/^>\s+/, '').trim() : '';
    const chars = (text.match(/[一-鿿]/g) || []).length;
    entries.push({
      slug, dir, category,
      title,
      summary,
      related_artifacts: splitList(grab('关联文物')),
      related_sites: splitList(grab('关联遗址')),
      path: `${dir}/${fn}`,
      chars,
    });
  }
}

// stable order: category then title
const CAT_ORDER = ['通论', '专题', '遗址', '事件', '文物'];
entries.sort((a, b) => (CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category)) || a.title.localeCompare(b.title, 'zh'));

const out = {
  generated: new Date().toISOString().slice(0, 10),
  count: entries.length,
  total_chars: entries.reduce((s, e) => s + e.chars, 0),
  categories: CAT_ORDER.filter(c => entries.some(e => e.category === c)),
  entries,
};
writeFileSync(join(WIKI, 'index.json'), JSON.stringify(out, null, 2), 'utf8');
console.log(`wiki/index.json: ${entries.length} entries, ${out.total_chars.toLocaleString()} 汉字`);
for (const c of out.categories) console.log(`  ${c}: ${entries.filter(e => e.category === c).length}`);
