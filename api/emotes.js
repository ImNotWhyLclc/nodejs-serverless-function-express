// api/emotes.js
export default async function handler(req, res) {
  try {
    const catalogUrl = "https://catalog.roblox.com/v1/search/items/details?Category=24&Subcategory=39&Limit=25&SortType=1";

    const r = await fetch(catalogUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; EmoteFetcher/1.0)"
      }
    });

    if (!r.ok) {
      return res.status(502).json({ error: "catalog_fetch_failed", status: r.status });
    }

    const body = await r.json();
    const emotes = (body.data || []).map(item => ({
      name: item.name,
      id: item.id,
      thumbnail: item.thumbnailUrl || null
    }));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(emotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
