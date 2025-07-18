# 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine AS base

# 安装依赖阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 安装 pnpm
RUN npm install -g pnpm

# 构建应用
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 设置正确的权限
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 复制配置文件
COPY --from=builder --chown=nextjs:nodejs /app/config ./config

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 创建 files 目录用于项目文件夹模式
RUN mkdir -p files && chown nextjs:nodejs files

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
# 默认使用项目文件夹模式
ENV FILE_BROWSER_MODE=files
ENV FILES_MODE_ENABLED=true
ENV FILES_FOLDER_PATH=files

CMD ["node", "server.js"]