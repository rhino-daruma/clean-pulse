export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'url parameter required' });
  }

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.setHeader('Content-Type', 'text/calendar');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
