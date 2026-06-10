# cyrene-web

Cyrene Launcher 官网：账号（Discord/GitHub OAuth + 邀请注册）、新闻 CMS、启动器 device-code 登录与心跳。

Next.js 15 (App Router) + Auth.js v5 + Drizzle + Postgres (Neon) + Tailwind 4 / DaisyUI 5。

## 本地开发

```bash
cp .env.example .env   # 填入各项
npm install
npm run db:migrate     # 需要可用的 DATABASE_URL
npm run dev
```

## 部署（Vercel + Neon）

1. Neon 创建数据库，取 pooled 连接串 → `DATABASE_URL`，跑 `npm run db:migrate`
2. Discord Developer Portal 建应用，OAuth redirect: `https://<域名>/api/auth/callback/discord` → `AUTH_DISCORD_ID/SECRET`
3. GitHub OAuth App，callback: `https://<域名>/api/auth/callback/github` → `AUTH_GITHUB_ID/SECRET`
4. Vercel 导入仓库，配置上述环境变量 + `AUTH_SECRET`（`openssl rand -base64 32`）
5. Vercel 控制台开启 Blob 存储 → `BLOB_READ_WRITE_TOKEN`（新闻封面上传）
6. **第一个登录的账号自动成为管理员**
7. 把启动器 `pkg/constant/constant.go` 的 `WebBaseURL` 改成正式域名后发版
