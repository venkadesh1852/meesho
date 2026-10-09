
import { supabase } from '../lib/supabaseClient'

const mapProduct = (product) => ({
  id: product.id,
  name: product.name,
  category: product.category,
  price: Number(product.price) || 0,
  rating: Number(product.rating) || 0,
  imageUrl: product.image_url || '',
  image: product.image_url || '',
  material: product.material || '',
  colour: product.colour || '',
  sizes: product.sizes
    ? product.sizes.split(',').map((size) => size.trim())
    : [],
  description: product.description || '',
  shortReview: product.short_review || '',
  detailedRatings: product.detailed_ratings || {},
  pros: Array.isArray(product.pros) ? product.pros : [],
  cons: Array.isArray(product.cons) ? product.cons : [],
  personalReview: product.personal_review || '',
  instagramUrl: product.instagram_url || '',
  meeshoUrl: product.meesho_url || '',
  published: product.published ?? true,
  isTrending: product.is_trending ?? false,
  trendingOrder: product.trending_order || 0,
  trendingStartDate: product.trending_start || null,
  trendingEndDate: product.trending_end || null,
  updatedAt: product.updated_at || null,
})

const toDatabaseProduct = (product) => ({
  name: product.name.trim(),
  category: product.category,
  price: Number(product.price),
  rating: Number(product.rating) || 0,
  image_url: product.imageUrl || product.image || '',
  material: product.material || '',
  colour: product.colour || '',
  sizes: Array.isArray(product.sizes)
    ? product.sizes.join(', ')
    : product.sizes || '',
  description: product.description || '',
  short_review: product.shortReview || '',
  detailed_ratings: product.detailedRatings || product.ratings || {},
  pros: Array.isArray(product.pros) ? product.pros : [],
  cons: Array.isArray(product.cons) ? product.cons : [],
  personal_review: product.personalReview || '',
  instagram_url: product.instagramUrl || '',
  meesho_url: product.meeshoUrl || '',
  published: product.published ?? true,
  is_trending: product.isTrending ?? false,
  trending_order: Number(product.trendingOrder) || 0,
  trending_start: product.trendingStartDate || null,
  trending_end: product.trendingEndDate || null,
  updated_at: new Date().toISOString(),
})

// Add new product or update existing product
export const saveProductToSupabase = async (product) => {
  const databaseProduct = toDatabaseProduct(product)

  let result

  if (product.id != null && /^\d+$/.test(String(product.id))) {
    result = await supabase
      .from('products')
      .update(databaseProduct)
      .eq('id', product.id)
      .select()
      .single()
  } else {
    result = await supabase
      .from('products')
      .insert(databaseProduct)
      .select()
      .single()
  }

  if (result.error) {
    console.error('Product save error:', result.error)
    throw result.error
  }

  return mapProduct(result.data)
}

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .order('id', { ascending: false })

  if (error) throw error
  return (data || []).map(mapProduct)
}

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })

  if (error) throw error
  return (data || []).map(mapProduct)
}

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .eq('published', true)

  if (error) throw error

  const categories = [
    ...new Set((data || []).map((item) => item.category).filter(Boolean)),
  ]

  return ['All', ...categories]
}

export const getProduct = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error loading product:', error)
    return null
  }

  return mapProduct(data)
}

export const getTrendingProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .eq('is_trending', true)
    .order('trending_order', { ascending: true })
    .limit(6)

  if (error) throw error
  return (data || []).map(mapProduct)
}

export const searchProducts = async (query = '', category = 'All') => {
  const products = await getProducts()
  const searchQuery = query.toLowerCase().trim()

  return products.filter((product) => {
    const matchesCategory =
      category === 'All' || product.category === category

    const searchText = `
      ${product.name}
      ${product.category}
      ${product.shortReview}
      ${product.description}
    `.toLowerCase()

    return (
      matchesCategory &&
      (!searchQuery || searchText.includes(searchQuery))
    )
  })
}