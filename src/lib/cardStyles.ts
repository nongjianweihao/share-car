import type { CardStyleId } from '../types';

export interface CardStyle {
  id: CardStyleId;
  name: string;
  summary: string;
  bestFor: string[];
  callPrompt: string;
  uiHints: {
    palette?: string[];
    font?: string[];
    layout?: string[];
    effects?: string[];
  };
}

export const CARD_STYLES: CardStyle[] = [
  {
    id: 'handdrawn_infographic',
    name: '手绘信息图 / 思维导图',
    summary:
      '手绘感字体与图标、发散结构、手绘线条箭头、柔和米白背景，亲和力强。',
    bestFor: ['教育（Educate）', '认知复盘卡'],
    callPrompt: '请使用手绘信息图/思维导图风格，为我设计一张卡片。',
    uiHints: {
      palette: ['#FAF7F2', '#222222', '#FF9D66', '#5AB3A8', '#6C8AE4'],
      font: ['标题：半粗圆角无衬线', '正文字：手写体/圆体'],
      layout: ['中心主题 + 分支节点', '手绘箭头/便签小圆点'],
      effects: ['纸张纹理', '手绘描边', '手绘贴纸']
    }
  },
  {
    id: 'magazine_light',
    name: '杂志亮色版',
    summary:
      '浅色背景、多栏网格、柔和阴影、专业非衬线、同色系不同饱和度。',
    bestFor: ['参与（Engage）', '共创（Co-create）', '数据反馈卡'],
    callPrompt: '请使用杂志亮色版风格，为我设计一张卡片。',
    uiHints: {
      palette: ['#F8FAFC', '#0F172A', '#3B82F6', '#94A3B8'],
      font: ['标题：几何无衬线', '正文：人文无衬线', '数值：等宽体'],
      layout: ['多栏栅格', '图文并茂', '强调对齐与留白'],
      effects: ['柔和投影', '卡片圆角 16px']
    }
  },
  {
    id: 'bento_brand_moodboard',
    name: '品牌情绪板 / Bento Grid',
    summary:
      '动态不规则网格、内容块多样、色彩明快、现代感强、社媒抓眼球。',
    bestFor: ['吸引（Hook）', '核心观点首发'],
    callPrompt: '请使用品牌情绪板/Bento Grid风格，为我设计一张卡片。',
    uiHints: {
      palette: ['#0EA5E9', '#22C55E', '#F97316', '#F43F5E', '#111827'],
      font: ['标题大字号对比', '正文精炼要点'],
      layout: ['1:1/2:1/1:2/2:2 模块组合', '重点卡放大'],
      effects: ['玻璃/渐变背景', '悬浮层级']
    }
  },
  {
    id: 'glassmorphism_3d',
    name: '3D 玻璃拟态',
    summary:
      '磨砂玻璃质感、景深光影、悬浮分层、深邃科技背景，高端未来感。',
    bestFor: ['吸引（Hook）', '品牌宣言'],
    callPrompt: '请使用3D玻璃拟态风格，为我设计一张专业级海报。',
    uiHints: {
      palette: ['#0B1026', '#111827', '#60A5FA', '#A78BFA', '#34D399'],
      font: ['标题：科技感无衬线', '小字母间距略大'],
      layout: ['中心聚焦', '分层卡片悬浮'],
      effects: ['背景高斯模糊', '玻璃高光', '柔和霓虹边']
    }
  },
  {
    id: 'growth_scrapbook_doodle',
    name: '成长手帐 / 手绘涂鸦',
    summary:
      '手写/手绘感、彩色涂鸦、纸张纹理、情绪温度高，亲子沟通友好。',
    bestFor: ['触动（Emotion）', '家长语录/孩子金句'],
    callPrompt: '请使用成长手帐/手绘涂鸦风格，为我设计一张卡片。',
    uiHints: {
      palette: ['#FFF7ED', '#1F2937', '#F59E0B', '#EF4444', '#10B981'],
      font: ['标题：手写体', '正文：圆体'],
      layout: ['贴纸/相片框', '自由排版'],
      effects: ['贴纸阴影', '胶带纹理', '铅笔/蜡笔笔触']
    }
  },
  {
    id: 'sunrise_sunset_gradient',
    name: '日出日落渐变',
    summary:
      '暖色渐变、自然光效、积极希望氛围、半透明信息面板，治愈向。',
    bestFor: ['触动（Emotion）', '孩子改变故事/品牌价值'],
    callPrompt: '请使用日出日落渐变风格，为我设计一张卡片。',
    uiHints: {
      palette: ['#FFB199', '#FF0844', '#FEC6C6', '#FDE68A', '#FFFFFF'],
      font: ['标题：大字距人文无衬线'],
      layout: ['大底图 + 透明信息块', '留白强化情绪'],
      effects: ['径向/线性渐变', '柔光叠加']
    }
  },
  {
    id: 'liquid_digitalism',
    name: '液态数字形态主义',
    summary:
      '流动渐变、液泡/波浪、未来主义、深色背景，前卫艺术化表达。',
    bestFor: ['吸引（Hook）', '创新理念/未来愿景'],
    callPrompt: '请使用液态数字形态主义风格，为我设计一张卡片。',
    uiHints: {
      palette: ['#0B1026', '#1E293B', '#06B6D4', '#8B5CF6', '#22D3EE'],
      font: ['标题：未来感无衬线'],
      layout: ['液态形状承载要点', '中心对称或非对称平衡'],
      effects: ['玻璃+液泡高光', '流体噪点']
    }
  },
  {
    id: 'elegant_retro',
    name: '优雅复古',
    summary:
      '米色纸张、深棕/暗红印刷色、典雅衬线、线条分割，权威隽永。',
    bestFor: ['教育（Educate）', '品牌历史/经典原则'],
    callPrompt: '请使用优雅复古风格，为我设计一张卡片。',
    uiHints: {
      palette: ['#F5EBD8', '#5C3D2E', '#8B5E3C', '#6B7280'],
      font: ['标题：衬线体', '正文：过渡无衬线'],
      layout: ['金线边框/分割线', '章纹印记'],
      effects: ['纸张颗粒', '压印/烫金感（平面化表达）']
    }
  },
  {
    id: 'watercolor',
    name: '水彩风格',
    summary:
      '柔和过渡、纸张纹理、不规则水渍边、轻盈透明，艺术与情感并重。',
    bestFor: ['触动（Emotion）', '诗意故事/感悟'],
    callPrompt: '请使用水彩风格，为我设计一张卡片。',
    uiHints: {
      palette: ['#FDF6F0', '#A7D8F0', '#F7A7B4', '#C5E3BF', '#7AA5D2'],
      font: ['标题：手写体/艺术字', '正文：清爽无衬线'],
      layout: ['大幅水彩底 + 信息卡', '留白呼吸'],
      effects: ['水彩晕染', '纸纤维纹理']
    }
  }
];

export const CARD_STYLE_MAP = Object.fromEntries(
  CARD_STYLES.map((s) => [s.id, s])
) as Record<CardStyleId, CardStyle>;

