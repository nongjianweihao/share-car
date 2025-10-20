export type ColumnId =
  | '运动'
  | '全面体能'
  | '专项陪练'
  | '敏感期'
  | '科学训练'
  | '力量素质'
  | '速度素质'
  | '耐力素质'
  | '家庭教育'
  | 'Dose效应'
  | '奖励与惩罚'
  | string;

export type CardStyleId =
  | 'handdrawn_infographic'
  | 'magazine_light'
  | 'bento_brand_moodboard'
  | 'glassmorphism_3d'
  | 'growth_scrapbook_doodle'
  | 'sunrise_sunset_gradient'
  | 'liquid_digitalism'
  | 'elegant_retro'
  | 'watercolor';

export interface Card {
  id: string;
  title: string;
  contentMd: string;
  excerpt?: string;
  coverUrl?: string;
  column: ColumnId;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  links?: string[];
  relatedIds?: string[];
  shareSlug?: string;
  pinned?: boolean;
  meta?: Record<string, any>;

  style?: CardStyleId;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  cardIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface AppSettings {
  id?: number;
  theme: 'light' | 'dark' | 'system';
  brand?: {
    logoUrl?: string;
    qrcodeUrl?: string;
    siteName?: string;
  };
}
