#!/bin/bash

# Snake Game - Vercel Deployment Script
echo "🐍 Snake Game - Vercel 部署脚本"
echo "================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "运行: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI 已安装"

# Check if logged in
echo ""
echo "检查登录状态..."
if vercel whoami &> /dev/null; then
    echo "✅ 已登录到 Vercel"
    vercel whoami
else
    echo "❌ 未登录"
    echo "请运行: vercel login"
    exit 1
fi

# Build the project
echo ""
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功"

# Deploy to Vercel
echo ""
echo "🚀 部署到 Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo "🎮 你的游戏已经上线了！"
else
    echo "❌ 部署失败"
    exit 1
fi
