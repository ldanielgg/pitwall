const fs = require("node:fs/promises");
const path = require("node:path");

const CACHE_DIR = path.join(__dirname, "../../cache");

const readCache = async (filename, ttl) => {
    try {
        const filePath = path.join(CACHE_DIR, filename);
        const stats = await fs.stat(filePath);
        const cacheAge = Date.now() - stats.mtimeMs;
        if (cacheAge > ttl) {
            return null;
        }
        const data = await fs.readFile(filePath, "utf-8");

        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return null;
        }
        throw error;
    }
};

const writeCache = async (filename, data) => {
    const filePath = path.join(CACHE_DIR, filename);
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = { readCache, writeCache };