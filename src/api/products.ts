import products from "../mocks/data/products.json"

export default function handler(req:any, res:any) {
  const { query = "", category = "", page = "1", limit = "10" } = req.query;

  const pageNum = Number(page);
  const limitNum = Number(limit);

  let filtered = products;

  if (query) {
    filtered = filtered.filter((p:any) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter((p:any) => p.category === category);
  }

  const start = (pageNum - 1) * limitNum;
  const paginated = filtered.slice(start, start + limitNum);
  console.log("paginated --->",paginated)
  return res.status(200).json({
    data: paginated,
    total: filtered.length,
    page: pageNum,
    limit: limitNum,
  });
}
