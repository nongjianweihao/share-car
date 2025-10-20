import type { Card } from '../types';

const shareTemplate = (card: Card) => `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${card.title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
  <style>
    body { max-width: 780px; margin: 0 auto; padding: 2.5rem 1.5rem; }
    article { background: #fff; padding: 2rem; border-radius: 18px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1); }
    .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .tag { background: #e2e8f0; color: #0f172a; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; }
    footer { margin-top: 2rem; font-size: 0.75rem; color: #475569; }
  </style>
</head>
<body>
  <article>
    <header>
      <p><small>${new Date(card.updatedAt).toLocaleString()}</small></p>
      <h1>${card.title}</h1>
      <div class="tags">
        ${(card.tags || []).map((tag) => `<span class="tag">#${tag}</span>`).join('')}
      </div>
    </header>
    ${card.coverUrl ? `<img src="${card.coverUrl}" alt="" style="width: 100%; border-radius: 16px; margin-bottom: 1.5rem;" />` : ''}
    <main id="content"></main>
    <footer>
      <p>栏目：${card.column}</p>
      <p>来自：爱德华思跳绳 · 知识卡片</p>
    </footer>
  </article>
  <script type="module">
    import { marked } from 'https://cdn.jsdelivr.net/npm/marked@15.0.12/lib/marked.esm.min.js';
    const md = ${JSON.stringify(card.contentMd)};
    document.getElementById('content').innerHTML = marked.parse(md);
  </script>
</body>
</html>`;

export function exportShareHtml(card: Card) {
  const blob = new Blob([shareTemplate(card)], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${card.shareSlug ?? card.id}.html`;
  anchor.click();
  URL.revokeObjectURL(url);
}
