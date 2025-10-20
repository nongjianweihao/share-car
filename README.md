# 知识卡片 Knowledge Cards

本项目是一个本地优先的知识卡片管理应用，帮助教练与家长快速整理训练经验、教学灵感与家庭教育洞察。应用基于 React、Zustand、Dexie 与 MiniSearch 构建，可以离线查看、全文检索，并支持一键导出静态分享页与二维码。

## ✨ 主要特性

- **栏目导航**：以栏目和标签管理知识卡片，一眼看清重点主题。
- **全文搜索**：MiniSearch 本地索引，支持标题、标签、正文模糊搜索。
- **卡片详情**：Markdown 渲染，包含更新时间、标签与外部参考链接。
- **分享能力**：生成静态 HTML 分享页和二维码，便于传播。
- **离线存储**：Dexie（IndexedDB）保存数据，刷新页面不会丢失。
- **示例数据**：内置 5 张训练与家庭教育相关卡片和 1 个合集。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

默认端口为 `http://localhost:3000`。应用首次启动会将示例卡片写入浏览器 IndexedDB，之后即可在本地继续增删改。

## 🧱 技术栈

- **构建工具**：Vite + TypeScript
- **界面框架**：React 19
- **状态管理**：Zustand
- **本地数据库**：Dexie (IndexedDB)
- **搜索**：MiniSearch
- **Markdown 渲染**：react-markdown + remark-gfm
- **二维码**：qrcode

## 📦 项目结构

```
├─ public/
├─ src/
│  ├─ components/      # UI 组件
│  ├─ data/            # 示例数据
│  ├─ db/              # Dexie 初始化与种子数据
│  ├─ lib/             # 分享页、搜索等工具函数
│  ├─ store/           # Zustand 状态管理
│  ├─ types.ts         # 数据模型定义
│  ├─ App.tsx          # 应用入口
│  └─ main.tsx         # React 启动
├─ index.html
├─ package.json
└─ README.md
```

## 📄 分享页导出

在卡片详情页点击 **「导出分享页」** 可以下载静态 HTML 文件，将其部署到任意静态站点或 GitHub Pages 即可分享。二维码按钮会根据分享页地址生成 PNG 文件，方便手机扫码查看。

## 🛠️ 下一步建议

- 增加卡片编辑与模板功能，提升创作效率。
- 引入 PWA 增强离线体验与桌面安装能力。
- 通过 GitHub Actions 自动构建并发布至 GitHub Pages。

欢迎提交 Issue 或 Pull Request，一起完善这套知识卡片工具。
