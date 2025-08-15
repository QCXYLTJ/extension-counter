// api/count.js - 支持返回最近 10 位用户
let count = 0;
const logs = new Set();
const recentUsers = []; // 存储最近用户

const getIP = (req) => {
    return req.headers['x-forwarded-for']?.split(',')[0] || '127.0.0.1';
};

export default function handler(req, res) {
    const ip = getIP(req);

    if (req.method === 'GET') {
        // 返回统计数据
        res.status(200).json({
            currentCount: count,
            uniqueUsers: logs.size,
            recentUsers: recentUsers.slice(0, 10), // 返回最近 10 条
            timestamp: new Date().toISOString()
        });
        return;
    }

    if (req.method === 'POST') {
        const { clientId, userAgent, version } = req.body;

        if (!clientId) {
            return res.status(400).json({ error: 'Missing clientId' });
        }

        // 如果是新用户，计数 +1
        if (!logs.has(clientId)) {
            logs.add(clientId);
            count++;
        }

        // 记录最近用户（用于展示）
        recentUsers.unshift({
            clientId,
            ip,
            userAgent: userAgent || 'Unknown',
            version: version || 'unknown',
            timestamp: new Date().toISOString()
        });

        // 只保留最近 100 条（防止内存溢出）
        if (recentUsers.length > 100) {
            recentUsers.pop();
        }

        res.status(200).json({
            success: true,
            message: 'Counted',
            currentCount: count,
            clientId
        });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}