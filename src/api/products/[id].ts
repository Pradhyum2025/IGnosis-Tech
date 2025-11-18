import products from "../../api/products";

export default function handler(req:any, res:any) {
  const { id } = req.query;

  const product = products.find((p:any) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(product);
}
