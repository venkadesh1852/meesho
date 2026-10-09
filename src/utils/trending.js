export const isTrendingActive = (product, now = new Date()) => {
  if (!product.isTrending || !product.trendingStartDate || !product.trendingEndDate) return false
  const today = now.toISOString().slice(0, 10)
  return today >= product.trendingStartDate && today <= product.trendingEndDate
}

export const sortTrending = (productList) => productList.filter((product) => isTrendingActive(product)).sort((a, b) => a.trendingOrder - b.trendingOrder).slice(0, 6)
