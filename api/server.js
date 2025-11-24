// api/server.js
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

async function loadLocalKnowledge() {
  const p = path.resolve(__dirname, '..', 'knowledge.json');
  const raw = await fs.readFile(p, 'utf-8');
  return JSON.parse(raw);
}

// Simple enrichment mock (adds paragraphs)
function enrichLocalResults(items, query) {
  return items.map(it => ({
    title: it.title,
    description: it.description,
    content: `${it.content}\n\n[Enriquecido para a demo] Resultado encontrado para: "${query}". Dicas: estude os exemplos e pratique os exercícios.`,
    tags: it.tags,
    examples: it.examples,
    exercises: it.exercises
  }));
}

app.post('/api/search', async (req, res) => {
  const query = (req.body && req.body.query) ? String(req.body.query).trim() : '';
  if (!query) return res.status(400).json({error: 'query required'});

  try {
    // If GEMINI_API_KEY exists, you can integrate here (placeholder)
    if (process.env.GEMINI_API_KEY) {
      // Optional: call Gemini API integration here.
      // For demo safety we return local fallback. Implement real call when desired.
      // return res.json({ items: [] });
    }

    const knowledge = await loadLocalKnowledge();
    // very simple local matching
    const lower = query.toLowerCase();
    const filtered = knowledge.filter(k => (k.title + ' ' + k.tags.join(' ') + ' ' + k.content).toLowerCase().includes(lower));
    const items = (filtered.length ? filtered : knowledge.slice(0,6)).map(it => it);
    const enriched = enrichLocalResults(items, query);
    return res.json({items: enriched});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'internal'});
  }
});

app.use('/api/static', express.static(path.join(__dirname, '..')));
app.listen(PORT, ()=> console.log(`StudyInsight API running on port ${PORT}`));
