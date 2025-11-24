// api/gemini_stub.js
// Placeholder: integration with Gemini should be implemented here.
// Use environment variable GEMINI_API_KEY and the official Gemini HTTP API or SDK.
// For the Imersão demo, this module remains as a guide.
module.exports = {
  async callGemini(prompt) {
    // Example structure:
    // const res = await fetch(GEMINI_ENDPOINT, { method:'POST', headers:{ 'Authorization':'Bearer '+process.env.GEMINI_API_KEY, 'Content-Type':'application/json' }, body: JSON.stringify({ prompt }) });
    // const json = await res.json();
    // return json;
    return { text: `Resposta simulada para: ${prompt}` };
  }
};
