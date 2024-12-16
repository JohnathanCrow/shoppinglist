// Simple Express server to handle data persistence
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const dataFile = '/data/shopping-list.json';

app.use(express.json());
app.use(express.static('/usr/share/nginx/html'));

// Ensure data file exists
async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify({ items: [], theme: 'dark' }));
  }
}

// API Routes
app.get('/api/data', async (req, res) => {
  try {
    await ensureDataFile();
    const data = await fs.readFile(dataFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    await fs.writeFile(dataFile, JSON.stringify(req.body));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(80, () => {
  console.log('Server running on port 80');
});