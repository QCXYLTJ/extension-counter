// api/count.js - Vercel Serverless Function

// ⚠️ 注意：这是内存版，重启会清零。生产环境建议用数据库。

let totalUsers = 0;
const clientSet = new Set();

export default function handler(req, res) {
    // 支持跨域请求（浏览器扩展需要）
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { clientId } = req.body;

        if (!clientId) {
            return res.status(400).json({ error: 'Missing clientId' });
        }

        if (!clientSet.has(clientId)) {
            clientSet.add(clientId);
            totalUsers++;
            console.log(`✅ 新用户加入: ${clientId}, 当前总数: ${totalUsers}`);
        } else {
            console.log(`🔁 已存在用户: ${clientId}`);
        }

        return res.status(200).json({
            success: true,
            message: '计数成功',
            currentCount: totalUsers,
            clientId
        });
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            currentCount: totalUsers,
            uniqueUsers: clientSet.size,
            timestamp: new Date().toISOString()
        });
    }

    res.status(405).json({ error: 'Method not allowed' });
}