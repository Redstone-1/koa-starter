# 参考

本项目代码参考了开源项目：https://github.com/jj112358/node-api

# 关于 typescript

本项目虽然不使用 typescript，但是借助 tsc 将 esm 编译为 cjs，如果你想使用 typescript 可直接使用，不需要再做额外配置

但是我个人认为 koa 项目使用 js 就足够了，要的就是快，如果你想使用 ts 进行更大型接口服务的开发，建议使用 nest

# 关于项目

项目已经自带 User 模块，若你的项目不需要用户角色可以删除，自带 User 模块仅为了代码模块的拆分

但是当前的 User 已经较为完备，若你需要，几乎不用再为用户角色功能编写额外的代码

同时也实现了静态资源上传的能力，可直接使用

## 2023-09-30 新增

本次更新新增了 Hero 模块，为了方便你快速入门全栈开发，我还写了一个前端项目：https://gitee.com/redstone-1/full-stack-front-react.git

前端使用的技术栈是 react@18、react-router@6、typescript@5、fetch，还有其它辅助工具，就不展开了。如果你想学习 koa，那么我这里给你提供了一个基础的用户登录注册鉴权模块，一个英雄列表的增删改查+图片上传模块，基本涵盖后端接口服务的主要功能点。

如果你是通过我的掘金找到此项目的，记得点个关注。

本次更新还调整了项目目录结构，传统的 koa 项目目录结构是比较分散的，按照 controller，router，middleware，model 等进行代码文件的组织

我发现这样组织的代码在找代码时比较费劲，常常需要在目录中上下横跳

还有一个点是，当其他人想要使用我的项目模板作为基础开发项目时，按照以前的文件目录删除代码比较容易出错，比如删错代码，少删、漏删、多删代码

现在功能模块全部整合到 module 目录下，基本想删除哪个模块直接删除对应的文件夹即可
