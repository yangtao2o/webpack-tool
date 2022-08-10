# Webpack@5

## 结构化理解 Webpack 配置项

- 输入：从文件系统读入代码文件；
- 模块递归处理：调用 Loader 转译 Module 内容，并将结果转换为 AST，从中分析出模块依赖关系，进一步递归调用模块处理过程，直到所有依赖文件都处理完毕；
- 后处理：所有模块递归处理完毕后开始执行后处理，包括模块合并、注入运行时、产物优化等，最终输出 Chunk 集合；
- 输出：将 Chunk 写出到外部文件系统；

## 目录

- [Babel+TS+ESLint 构建 JS 工程环境](./v5/babel%2Bts%2Beslint.md)
- [使用预处理器、PostCSS 等构建 CSS 工程环境](./v5/css%2Bless%2Bsass%2Bstylus%2Bpostcss.md)