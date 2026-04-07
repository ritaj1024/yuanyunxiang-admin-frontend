# 缘·云香后台管理系统 Frontend

说明
- 本工程按 `D:\LJ\个人事项\余总\后台管理--素材\RuoYi-SpringBoot3-ElementPlus` 的前端工程风格生成。
- 技术栈：`Vue 3 + Vite + Element Plus + Vue Router`
- 目标：将《缘·云香+后台管理系统需求文档.pdf》的后台模块落成可继续开发的前端工程骨架。

默认登录
- 账号：`admin`
- 密码：`admin123`

项目入口
- `src/main.js`
- `src/router/index.js`
- `src/layout/index.vue`
- `src/data/modules.js`

说明
- 当前为前端 demo 工程，页面数据为本地 mock。
- 菜单、路由、页面类型、功能覆盖按需求文档拆分完成。
- `功能覆盖矩阵.txt` 用于核对 PDF 功能点落位。

GitHub Pages
- 仓库已配置 GitHub Pages 自动部署工作流：推送到 `main` 后会自动构建并发布。
- 预期访问地址：`https://ritaj1024.github.io/yuanyunxiang-admin-frontend/`
- 为适配 GitHub Pages，生产环境路由使用 `hash` 模式，因此分享链接会带 `#/`。
- 首次启用时，请到 GitHub 仓库 `Settings -> Pages`，将 `Source` 设为 `GitHub Actions`。
