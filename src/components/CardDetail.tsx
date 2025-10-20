import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Card } from '../types';
import QrButton from './QrButton';
import { exportShareHtml } from '../lib/exportShare';

interface CardDetailProps {
  card: Card | null;
  shareBaseUrl: string;
}

const CardDetail: FC<CardDetailProps> = ({ card, shareBaseUrl }) => {
  if (!card) {
    return (
      <section className="card-detail">
        <div className="empty-state">选择左侧的卡片查看详情。</div>
      </section>
    );
  }

  const shareUrl = `${shareBaseUrl}${card.shareSlug ?? card.id}`;

  return (
    <section className="card-detail">
      <header className="card-detail-header">
        <div>
          <p className="card-detail-column">{card.column}</p>
          <h2>{card.title}</h2>
          <p className="card-detail-meta">
            更新：{new Date(card.updatedAt).toLocaleString()} · 标签：
            {card.tags.map((tag) => ` #${tag}`).join(' ')}
          </p>
        </div>
        <div className="card-detail-actions">
          <button type="button" className="secondary-button" onClick={() => exportShareHtml(card)}>
            导出分享页
          </button>
          <QrButton url={shareUrl} filename={`${card.shareSlug ?? card.id}.png`} />
        </div>
      </header>
      <article className="card-detail-body">
        {card.coverUrl ? <img className="card-detail-cover" src={card.coverUrl} alt="" /> : null}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.contentMd}</ReactMarkdown>
      </article>
      {card.links?.length ? (
        <footer className="card-detail-footer">
          <h3>外部参考</h3>
          <ul>
            {card.links.map((link) => (
              <li key={link}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </section>
  );
};

export default CardDetail;
