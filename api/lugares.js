export default async function handler(req, res) {
  try {
    const { q = "restaurants in Mexico City", type, pageToken } = req.query || {};
    const key = process.env.GOOGLE_PLACES_KEY;

    if (!key) {
      return res.status(500).json({
        error: "Falta GOOGLE_PLACES_KEY en Vercel → Settings → Environment Variables.",
      });
    }

    // URL base de la API de Google Places
    const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");

    // Si existe pageToken → solo se pide la siguiente página
    if (pageToken) {
      url.searchParams.set("pagetoken", pageToken);
      url.searchParams.set("key", key);
    } else {
      // Primera búsqueda normal
      url.searchParams.set("query", q);
      url.searchParams.set("key", key);
      url.searchParams.set("region", "mx");
      url.searchParams.set("language", "es");
      if (type) url.searchParams.set("type", type);
    }

    // Llamada a Google
    const resp = await fetch(url.toString());
    const data = await resp.json();

    // Estructura compatible con el frontend 51.1
    res.status(200).json({
      ok: true,
      query: q,
      type: type || null,
      results: data.results || [],
      next_page_token: data.next_page_token || null,
      status: data.status,
    });
  } catch (e) {
    console.error("Error API:", e);
    res.status(500).json({
      error: "Error al consultar Google Places",
      details: String(e),
    });
  }
}
