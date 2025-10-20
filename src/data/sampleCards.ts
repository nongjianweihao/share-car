import type { Card, Collection, AppSettings } from '../types';

export const sampleCards: Card[] = [
  {
    id: 'speed-fundamentals',
    title: '速度素质：反应与冲刺的艺术',
    column: '速度素质',
    tags: ['反应', '敏捷', '冲刺'],
    createdAt: Date.parse('2024-01-10T08:00:00Z'),
    updatedAt: Date.parse('2024-11-01T08:00:00Z'),
    shareSlug: 'speed-basics',
    excerpt:
      '速度素质不仅仅是跑得快，更包含反应速度、动作速度与位移速度三大核心能力。',
    contentMd: `## 速度素质是什么？
速度素质是儿童身体在**短时间内快速完成动作**的能力，涵盖反应、动作频率与位移效率。

### 速度的三要素
- 🧠 **反应速度**：看到或听到信号后迅速做出动作。
- 🏃 **动作速度**：完成单个动作的快慢，例如快速摆臂。
- 💨 **位移速度**：从起点移动到终点的速度。

### 常见误区
> “速度是天生的，练也没用。”

科学训练可以显著提升速度素质，尤其是神经系统反应与动作频率。

### 训练建议
- 初级：追逐游戏、灯光或口令反应
- 中级：敏捷梯、低栏跨步跑
- 高级：短距离冲刺，结合球类反应练习
`,
  },
  {
    id: 'strength-foundation',
    title: '力量素质：让动作更有力、更稳定',
    column: '力量素质',
    tags: ['核心力量', '稳定性', '成长'],
    createdAt: Date.parse('2024-03-03T08:00:00Z'),
    updatedAt: Date.parse('2024-11-05T08:00:00Z'),
    shareSlug: 'strength-foundation',
    excerpt:
      '儿童力量训练的目标是建立动作控制、关节稳定与身体协调，而不是单纯追求负重。',
    contentMd: `## 为什么要练力量？
力量是其他体能素质的基石，可以帮助孩子在日常活动和专项运动中保持动作稳定性，降低伤害风险。

### 课堂建议
1. 以自重训练为主：深蹲、俯卧撑、平板支撑。
2. 设计趣味挑战：闯关卡、双人协作动作。
3. 注意动作质量：强调身体对线与呼吸节奏。

### 家长提示
鼓励孩子记录完成次数或坚持时间，让训练可视化并建立成就感。
`,
  },
  {
    id: 'family-encourage',
    title: '家庭教育：鼓励 vs. 惩罚',
    column: '家庭教育',
    tags: ['家长沟通', '正向反馈'],
    createdAt: Date.parse('2024-04-12T08:00:00Z'),
    updatedAt: Date.parse('2024-10-18T08:00:00Z'),
    shareSlug: 'family-encouragement',
    excerpt:
      '正向反馈能让孩子将训练视为自我成长，而不是完成任务。',
    contentMd: `## 正向鼓励的四个步骤
1. **观察具体行为**：描述孩子做得好的动作或态度。
2. **表达情绪**：让孩子知道你因何而骄傲或开心。
3. **链接价值**：指出行为背后的品质，如坚持、合作。
4. **共创目标**：一起设定下一次的挑战。

惩罚只能带来短期服从，而鼓励建立的是长期自驱力。`,
  },
  {
    id: 'dose-effect',
    title: 'DOSE效应：训练带来的正向化学反应',
    column: 'Dose效应',
    tags: ['多巴胺', '血清素', '内啡肽'],
    createdAt: Date.parse('2024-02-22T08:00:00Z'),
    updatedAt: Date.parse('2024-09-15T08:00:00Z'),
    shareSlug: 'dose-effect',
    excerpt:
      '运动让孩子在多巴胺、催产素、血清素与内啡肽四大化学物质间循环，形成积极反馈。',
    contentMd: `### 四大快乐激素
- **Dopamine**：设定目标→完成任务→获得奖励感。
- **Oxytocin**：团队协作与亲密互动。
- **Serotonin**：稳定情绪，提升安全感。
- **Endorphin**：有氧或力量训练后的愉悦与放松。

> 设计课堂时，把“成就时刻”“互动环节”“节奏调整”“放松收尾”串联起来，就能持续激活 DOSE。`,
  },
  {
    id: 'sensitive-period',
    title: '敏感期：抓住黄金窗口',
    column: '敏感期',
    tags: ['成长曲线', '阶段性目标'],
    createdAt: Date.parse('2024-05-08T08:00:00Z'),
    updatedAt: Date.parse('2024-11-10T08:00:00Z'),
    shareSlug: 'sensitive-period',
    excerpt:
      '不同年龄段在力量、速度、协调等方面都有最佳介入时间，要用“梯度”来规划训练。',
    contentMd: `## 关键敏感期
- 6-8 岁：基础协调、核心控制
- 9-12 岁：速度与灵敏
- 12 岁以上：专项力量与耐力

### 训练策略
把敏感期与课程设计表格化，便于教练与家长沟通下一阶段目标。`,
  },
];

export const sampleCollections: Collection[] = [
  {
    id: 'speed-toolkit',
    name: '速度训练工具包',
    description: '从认知、练习到课堂设计，一套帮助孩子提升速度素质的组合卡。',
    cardIds: ['speed-fundamentals', 'sensitive-period'],
    createdAt: Date.parse('2024-09-01T08:00:00Z'),
    updatedAt: Date.parse('2024-11-11T08:00:00Z'),
  },
];

export const defaultSettings: AppSettings = {
  id: 1,
  theme: 'system',
  brand: {
    siteName: '爱德华思跳绳 · 知识卡片',
  },
};
