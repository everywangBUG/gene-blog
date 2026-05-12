# 开发文档

> 本文档为 Next.js 创意个人作品集项目的开发指南，涵盖项目结构、技术栈、组件说明及开发规范。

---

## 1. 项目概述

| 项目 | 说明 |
|------|------|
| **名称** | Creative Portfolio |
| **框架** | Next.js 15.2.4 (App Router) |
| **语言** | TypeScript |
| **样式** | Tailwind CSS 3.4.17 |
| **UI 库** | shadcn/ui + Radix UI |
| **动画** | Framer Motion |
| **包管理** | npm / pnpm |

这是一个单页（SPA）个人作品集网站，包含 Hero、About、Skills、Projects、Experience、Contact 等区块，采用深色主题和玻璃拟态（Glassmorphism）设计风格。

---

## 2. 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 启动生产服务
npm start
```

开发服务器默认运行在 `http://localhost:3000`。

---

## 3. 项目结构

```
gene-blog/
├── app/                          # Next.js App Router
│   ├── globals.css               # 全局样式（Tailwind 入口 + CSS 变量）
│   ├── layout.tsx                # 根布局（元数据、HTML 结构）
│   └── page.tsx                  # 首页（Portfolio 单页应用）
│
├── components/                   # React 组件
│   ├── ui/                       # shadcn/ui 基础组件（50+ 个）
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── toast.tsx / toaster.tsx
│   │   └── ...（完整列表见下方）
│   │
│   ├── contact-form.tsx          # 联系表单
│   ├── creative-hero.tsx         # Canvas 粒子动画（Hero 右侧）
│   ├── floating-nav.tsx          # 浮动导航栏
│   ├── glassmorphic-card.tsx     # 玻璃拟态卡片容器
│   ├── hero-animation.tsx        # 备用 Canvas 粒子动画
│   ├── mouse-follower.tsx        # 鼠标跟随光标效果
│   ├── project-card.tsx          # 项目展示卡片
│   ├── scroll-progress.tsx       # 顶部滚动进度条
│   ├── section-heading.tsx       # 区块标题组件
│   ├── skill-badge.tsx           # 技能徽章（含进度条）
│   ├── theme-provider.tsx        # 主题提供者（next-themes）
│   └── timeline.tsx              # 工作经历时间线
│
├── hooks/                        # 自定义 Hooks
│   ├── use-mobile.tsx            # 移动端检测（< 768px）
│   └── use-toast.ts              # Toast 通知管理
│
├── lib/                          # 工具函数
│   └── utils.ts                  # cn() 工具（clsx + tailwind-merge）
│
├── public/                       # 静态资源
│   ├── placeholder.jpg
│   ├── placeholder.svg
│   └── ...
│
├── styles/
│   └── globals.css               # 备用全局样式（未使用）
│
├── next.config.mjs               # Next.js 配置
├── tailwind.config.ts            # Tailwind CSS 配置
├── tsconfig.json                 # TypeScript 配置
├── components.json               # shadcn/ui 配置
└── package.json
```

### shadcn/ui 组件清单（components/ui/）

共 **50** 个组件，基于 Radix UI 构建：

`accordion` `alert` `alert-dialog` `aspect-ratio` `avatar` `badge` `breadcrumb` `button` `calendar` `card` `carousel` `chart` `checkbox` `collapsible` `command` `context-menu` `dialog` `drawer` `dropdown-menu` `form` `hover-card` `input` `input-otp` `label` `menubar` `navigation-menu` `pagination` `popover` `progress` `radio-group` `resizable` `scroll-area` `select` `separator` `sheet` `sidebar` `skeleton` `slider` `sonner` `switch` `table` `tabs` `textarea` `toast` `toaster` `toggle` `toggle-group` `tooltip` `use-mobile` `use-toast`

---

## 4. 核心依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| `next` | 15.2.4 | React 框架 |
| `react` / `react-dom` | ^19 | UI 库 |
| `typescript` | ^5 | 类型系统 |
| `tailwindcss` | 3.4.17 | 原子化 CSS |
| `framer-motion` | latest | 动画库 |
| `lucide-react` | ^0.454.0 | 图标库 |
| `next-themes` | latest | 主题切换 |
| `class-variance-authority` | ^0.7.1 | 组件变体管理 |
| `clsx` / `tailwind-merge` | latest | 类名合并 |
| `@radix-ui/*` | latest | 无头 UI 基元 |
| `recharts` | latest | 图表库 |
| `react-hook-form` | latest | 表单管理 |
| `zod` | ^3.24.1 | 表单校验 |
| `embla-carousel-react` | latest | 轮播组件 |
| `date-fns` | 4.1.0 | 日期处理 |
| `sonner` | latest | Toast 通知 |
| `vaul` | latest | 抽屉组件 |

---

## 5. 页面结构（page.tsx）

首页 `page.tsx` 是一个完整的单页应用，按顺序包含以下区块：

| 区块 | ID | 组件 |
|------|-----|------|
| Hero 首屏 | - | `CreativeHero`, `MouseFollower`, `ScrollProgress`, `FloatingNav` |
| 关于我 | `#about` | `SectionHeading`, `GlassmorphicCard` |
| 技能 | `#skills` | `SectionHeading`, `SkillBadge` |
| 项目展示 | `#projects` | `SectionHeading`, `ProjectCard` |
| 工作经历 | `#experience` | `SectionHeading`, `Timeline` |
| 联系方式 | `#contact` | `SectionHeading`, `GlassmorphicCard`, `ContactForm` |
| 页脚 | - | - |

### 导航锚点

浮动导航栏链接到以下锚点：
- `#about` — 关于我
- `#skills` — 技能
- `#projects` — 项目
- `#experience` — 经历
- `#contact` — 联系

---

## 6. 自定义组件详解

### 6.1 CreativeHero (`creative-hero.tsx`)
- **类型**: Client Component
- **功能**: Canvas 2D 粒子网格动画
- **特性**:
  - 1000 个粒子按网格排列
  - 鼠标靠近时粒子被排斥
  - 粒子间距离 < 30px 时绘制连线
  - 颜色范围：HSL 270°~330°（紫色到粉色）
  - 使用 `requestAnimationFrame` 实现 60fps 动画

### 6.2 FloatingNav (`floating-nav.tsx`)
- **类型**: Client Component
- **功能**: 滚动后出现的浮动导航栏
- **特性**:
  - 滚动超过 100px 时显示
  - 桌面端：圆角胶囊式导航 + Resume 按钮
  - 移动端：汉堡菜单 + 全屏导航抽屉
  - Framer Motion 入场/出场动画

### 6.3 MouseFollower (`mouse-follower.tsx`)
- **类型**: Client Component
- **功能**: 自定义鼠标光标
- **特性**:
  - 外圈：8px 白色圆点（`mix-blend-difference`）
  - 内圈：2px 白色圆点
  - Spring 物理动画跟随

### 6.4 ScrollProgress (`scroll-progress.tsx`)
- **类型**: Client Component
- **功能**: 顶部滚动进度指示条
- **特性**:
  - 使用 `framer-motion` 的 `useScroll` + `useSpring`
  - 渐变色彩：紫色 → 粉色

### 6.5 SectionHeading (`section-heading.tsx`)
- **类型**: Client Component
- **Props**: `title`, `subtitle`
- **功能**: 统一的区块标题样式
- **动画**: 副标题 → 标题 → 装饰线，依次入场

### 6.6 GlassmorphicCard (`glassmorphic-card.tsx`)
- **类型**: Client Component
- **Props**: `children`
- **功能**: 玻璃拟态卡片容器
- **样式**:
  - 背景：`bg-zinc-800/50`
  - 背景模糊：`backdrop-blur-sm`
  - 边框：`border-zinc-700/50`
  - Hover：边框变为紫色，卡片上浮 5px

### 6.7 ProjectCard (`project-card.tsx`)
- **类型**: Client Component
- **Props**: `title`, `description`, `tags`, `image`, `demoUrl`, `repoUrl`
- **功能**: 项目展示卡片
- **特性**:
  - 图片 Hover 放大（`scale-110`）
  - 标签使用 `Badge` 组件
  - 右上角状态指示点
  - 底部 Code / Live Demo 按钮

### 6.8 SkillBadge (`skill-badge.tsx`)
- **类型**: Client Component
- **Props**: `name`, `level`
- **功能**: 技能展示（名称 + 百分比进度条）
- **动画**: 进度条从 0 增长到目标值

### 6.9 Timeline (`timeline.tsx`)
- **类型**: Client Component
- **功能**: 工作经历时间线
- **特性**:
  - 桌面端：左右交替布局 + 中央时间线
  - 移动端：单列布局
  - 数据硬编码在组件内

### 6.10 ContactForm (`contact-form.tsx`)
- **类型**: Client Component
- **功能**: 联系表单
- **字段**: 姓名、邮箱、主题、消息
- **提交**: 模拟提交（1.5s 延迟）+ Toast 成功提示

---

## 7. 样式系统

### 7.1 Tailwind 配置（tailwind.config.ts）

- **暗色模式**: `class` 策略
- **容器**: 居中，padding `2rem`，最大宽度 `1400px`
- **颜色变量**: 使用 CSS 自定义属性（HSL 格式）
- **圆角**: `radius` 变量控制（默认 `0.5rem`）
- **动画**: 内置 `accordion-down` / `accordion-up`
- **插件**: `tailwindcss-animate`

### 7.2 CSS 变量（app/globals.css）

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

.dark { /* 暗色模式变量 */ }
```

### 7.3 自定义动画

```css
/* Blob 背景动画 */
@keyframes blob {
  0%   { transform: translate(0px, 0px) scale(1); }
  33%  { transform: translate(30px, -50px) scale(1.1); }
  66%  { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
```

---

## 8. 开发规范

### 8.1 组件规范

- **Client Components**: 使用 `"use client"` 指令，适用于：
  - 使用浏览器 API（Canvas、window、document）
  - 使用 React Hooks（useState, useEffect, useRef）
  - 使用 Framer Motion 动画
- **Server Components**: 默认服务端渲染，适用于静态内容

### 8.2 路径别名

```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

常用别名：
- `@/components/*` → `components/*`
- `@/hooks/*` → `hooks/*`
- `@/lib/*` → `lib/*`

### 8.3 类名合并

始终使用 `cn()` 工具函数合并 Tailwind 类名：

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-class", condition && "conditional-class", className)}>
```

---

## 9. 配置说明

### 9.1 next.config.mjs

```js
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}
```

- 构建时忽略 ESLint 和 TypeScript 错误
- 图片使用非优化模式（适合静态导出）

### 9.2 tsconfig.json

- **目标**: ES6
- **模块**: ESNext + Bundler 解析
- **严格模式**: 开启
- **JSX**: preserve（由 Next.js 处理）

---

## 10. 自定义与扩展

### 10.1 修改个人信息

编辑 `app/page.tsx` 中的以下内容：
- 姓名、职位描述
- 社交链接（GitHub、LinkedIn、邮箱）
- 技能列表和熟练度
- 项目信息
- 工作经历

### 10.2 替换图片

将个人照片放入 `public/` 目录，替换 `page.tsx` 中的：
```tsx
<img src="/placeholder.svg?height=600&width=600" ... />
```

### 10.3 修改配色

项目使用紫粉渐变主题（`purple-500` → `pink-500`）。如需修改：
1. 全局搜索 `purple-500` / `pink-500` / `purple-400` / `pink-600`
2. 替换为新的 Tailwind 颜色类

### 10.4 添加新页面

在 `app/` 目录下创建新文件夹：
```
app/
  blog/
    page.tsx    # /blog 路由
  projects/
    page.tsx    # /projects 路由
```

---

## 11. 部署

项目已配置为静态导出友好。如需静态导出：

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
```

推荐部署平台：
- **Vercel**（原生支持 Next.js）
- **Netlify**
- **Cloudflare Pages**

---

## 12. 常见问题

### Q: 粒子动画卡顿？
A: `creative-hero.tsx` 中粒子数量为 1000，在低端设备上可减少 `particleCount` 或增大 `gridSize`。

### Q: 如何关闭鼠标跟随效果？
A: 在 `app/page.tsx` 中移除 `<MouseFollower />` 组件。

### Q: 如何添加暗色/亮色模式切换？
A: 项目已集成 `next-themes`，在 `layout.tsx` 中包裹 `ThemeProvider` 即可启用。

---

*文档生成时间: 2026-05-12*
