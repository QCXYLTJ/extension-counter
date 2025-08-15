# 📊 浏览器扩展使用计数服务

一个基于 Vercel 的简单计数服务，用于统计你的浏览器扩展有多少人在使用。

## 🚀 功能

- 接收扩展发来的 `POST /api/count` 请求并计数
- 去重：同一个用户只计一次
- 网页展示当前人数
- 支持跨域，适合浏览器扩展

## 📦 部署步骤

1. 将此项目推到 GitHub 仓库
2. 登录 [Vercel](https://vercel.com)
3. 导入仓库，自动部署
4. 部署成功后，你会得到一个 URL，如：`https://your-project.vercel.app`

## 🔌 扩展中调用

```js
fetch('https://your-project.vercel.app/api/count', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ clientId: '唯一ID' }),
	keepalive: true,
});
```
