# Favicon 生成说明

## 当前状态
- 已创建 `favicon.svg` 作为基础图标
- SVG 图标会被现代浏览器自动使用

## 生成多尺寸 favicon（可选）

如需生成完整的 favicon 套件（包括 .ico 和各种尺寸的 PNG），可以使用以下工具：

### 在线工具
1. https://realfavicongenerator.net/
2. https://favicon.io/

### 本地工具
```bash
# 安装 sharp-cli
npm install -g sharp-cli

# 从 SVG 生成 PNG
sharp -i favicon.svg -o favicon-32x32.png resize 32 32
sharp -i favicon.svg -o favicon-16x16.png resize 16 16
sharp -i favicon.svg -o apple-touch-icon.png resize 180 180
```

## 推荐的 favicon 文件
- `favicon.ico` (16x16, 32x32, 48x48 多尺寸)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `favicon.svg` (已创建)

## 当前配置
VitePress 配置已包含 favicon 引用，浏览器会自动查找 `/favicon.ico` 或 `/favicon.svg`
