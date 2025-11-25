export function calculateProfit(rows, cogsMap = {}) {
  const result = []; const total = { revenue:0, fees:0, shipping:0, returns:0, cogs:0, net:0 };
  for (const r of rows) {
    const sku = r["Supplier SKU"] || r["SKU"] || "";
    const qty = Number(r["Quantity"] || 1);
    const price = Number(r["Listing Price (Incl. taxes)"] || 0);
    const fee = Number(r["Commission"] || 0);
    const shipping = Number(r["Shipping Received"] || 0);
    const returns = Number(r["Return Amount"] || 0);
    const cogs = (cogsMap[sku] || 0) * qty;
    const revenue = price * qty;
    const net = revenue - fee - returns - cogs + shipping;
    result.push({ sku, qty, revenue, fee, shipping, returns, cogs, net });
    total.net += net;
  }
  return { rows: result, total };
}
