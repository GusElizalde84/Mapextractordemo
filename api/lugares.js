export default async function handler(req, res) {
  try {
    const { q = "restaurants in Mexico City" } = req.query || {};
    const key = process.env.GOOGLE_PLACES_KEY;

    if (!key) {
      return res.status(500).json({ error: "Falta GOOGLE_PLACES_KEY en Vercel → Settings → Environment Variables." });
    }

    const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
    url.searchParams.set("query", q);
    url.searchParams.set("key", key);
    url.searchParams.set("region", "mx");
    url.searchParams.set("language", "es");

    const resp = await fetch(url.toString());
    const data = await resp.json();

    res.status(200).json({ ok: true, query: q, results: data.results || [] });
  } catch (e) {
    res.status(500).json({ error: "Error al consultar Google Places", details: String(e) });
  }
}
