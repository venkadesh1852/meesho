
import { useEffect, useState } from 'react'
import { Icon } from '../components/Icons'
import { navigateTo } from '../utils/navigation'
import { categories } from '../data/products'
import { supabase } from '../lib/supabaseClient'

const emptyProduct = {
  name: '',
  category: categories[0],
  price: '',
  image: '',
  material: '',
  colour: '',
  sizes: 'S, M, L',
  description: '',
  rating: 4.5,
  quality: 4.5,
  look: 4.5,
  materialRating: 4.5,
  value: 4.5,
  pros: '',
  cons: '',
  personalReview: '',
  instagramUrl: '',
  meeshoUrl: '',
  published: true,
  isTrending: false,
}

export function ProductForm({ product, onSave }) {
  const [form, setForm] = useState(() => {
    if (!product) return emptyProduct

    return {
      ...emptyProduct,
      ...product,
      image: product.imageUrl || product.image || '',
      sizes: Array.isArray(product.sizes)
        ? product.sizes.join(', ')
        : product.sizes || 'S, M, L',
      quality: product.detailedRatings?.quality ?? product.ratings?.quality ?? 4.5,
      look: product.detailedRatings?.look ?? product.ratings?.look ?? 4.5,
      materialRating: product.detailedRatings?.material ?? product.ratings?.material ?? 4.5,
      value: product.detailedRatings?.value ?? product.ratings?.value ?? 4.5,
      pros: Array.isArray(product.pros) ? product.pros.join(', ') : '',
      cons: Array.isArray(product.cons) ? product.cons.join(', ') : '',
      instagramUrl: product.instagramUrl || product.instagram_url || '',
      meeshoUrl: product.meeshoUrl || product.meesho_url || '',
    }
  })

  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedImage)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const chooseImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file.')
      event.target.value = ''
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size 5 MB-kku keela irukkanum.')
      event.target.value = ''
      return
    }

    setMessage('')
    setSelectedImage(file)
  }

  const uploadImage = async () => {
    if (!selectedImage) return form.image || ''

    const safeName = selectedImage.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')

    const filePath = `products/${Date.now()}-${safeName}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, selectedImage, {
        cacheControl: '3600',
        upsert: false,
        contentType: selectedImage.type,
      })

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const submit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (!form.name.trim() || !form.price || !form.description.trim()) {
      setMessage('Add a name, price, and description before saving.')
      return
    }

    if (!form.image && !selectedImage) {
      setMessage('Please choose a product image.')
      return
    }

    setSaving(true)

    try {
      setUploading(Boolean(selectedImage))
      const imageUrl = await uploadImage()
      setUploading(false)

      await onSave({
        ...form,
        image: imageUrl,
        imageUrl,
        id: product?.id,
        price: Number(form.price),
        rating: Number(form.rating),
        sizes: form.sizes.split(',').map((item) => item.trim()).filter(Boolean),
        detailedRatings: {
          quality: Number(form.quality),
          look: Number(form.look),
          material: Number(form.materialRating),
          value: Number(form.value),
        },
        ratings: {
          quality: Number(form.quality),
          look: Number(form.look),
          material: Number(form.materialRating),
          value: Number(form.value),
        },
        pros: form.pros.split(',').map((item) => item.trim()).filter(Boolean),
        cons: form.cons.split(',').map((item) => item.trim()).filter(Boolean),
        shortReview: form.personalReview || 'A considered find worth a closer look.',
        personalReview: form.personalReview,
        instagramUrl: form.instagramUrl,
        meeshoUrl: form.meeshoUrl,
        trendingOrder: product?.trendingOrder || 0,
        trendingStartDate: product?.trendingStartDate || '',
        trendingEndDate: product?.trendingEndDate || '',
      })
    } catch (error) {
      console.error('Product save error:', error)
      setMessage(
        error?.message ||
        'Save failed. Supabase Storage policy and product save setup check pannunga.'
      )
    } finally {
      setUploading(false)
      setSaving(false)
    }
  }

  return (
    <section className="admin-content">
      <div className="admin-page-heading">
        <div>
          <button
            type="button"
            className="back-link"
            onClick={() => navigateTo('/admin/products')}
          >
            ← Back to products
          </button>
          <h2>{product ? 'Edit product' : 'Add product'}</h2>
          <p>Keep the product details clear and useful for your audience.</p>
        </div>
      </div>

      <form className="product-form" onSubmit={submit}>
        <div className="form-card">
          <h3>Basic information</h3>

          <div className="form-grid">
            <label className="wide">
              Product name
              <input
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
                placeholder="e.g. Soft Pink Co-ord Set"
              />
            </label>

            <label>
              Category
              <select
                value={form.category}
                onChange={(event) => update('category', event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              Price
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(event) => update('price', event.target.value)}
                placeholder="899"
              />
            </label>

            <div className="wide">
              <label htmlFor="product-image">Product image</label>
              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={chooseImage}
              />

              <p>
                Choose JPG, PNG or WebP. Maximum file size: 5 MB.
              </p>

              {(previewUrl || form.image) && (
                <div style={{ marginTop: 12 }}>
                  <img
                    src={previewUrl || form.image}
                    alt="Product preview"
                    style={{
                      display: 'block',
                      width: 180,
                      height: 180,
                      objectFit: 'cover',
                      borderRadius: 12,
                    }}
                  />
                  {selectedImage && (
                    <button
                      type="button"
                      className="outline-button"
                      style={{ marginTop: 8 }}
                      onClick={() => setSelectedImage(null)}
                    >
                      Keep existing image
                    </button>
                  )}
                </div>
              )}
            </div>

            <label>
              Material
              <input
                value={form.material}
                onChange={(event) => update('material', event.target.value)}
                placeholder="Poly-blend"
              />
            </label>

            <label>
              Colour
              <input
                value={form.colour}
                onChange={(event) => update('colour', event.target.value)}
                placeholder="Rose pink"
              />
            </label>

            <label>
              Available sizes
              <input
                value={form.sizes}
                onChange={(event) => update('sizes', event.target.value)}
                placeholder="S, M, L, XL"
              />
            </label>

            <label>
              Overall rating
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={(event) => update('rating', event.target.value)}
              />
            </label>

            <label className="wide">
              Description
              <textarea
                value={form.description}
                onChange={(event) => update('description', event.target.value)}
                rows="4"
                placeholder="Describe the product honestly..."
              />
            </label>
          </div>
        </div>

        <div className="form-card">
          <h3>Review notes</h3>
          <div className="form-grid rating-inputs">
            {[
              ['quality', 'Quality'],
              ['look', 'Look'],
              ['materialRating', 'Material'],
              ['value', 'Value'],
            ].map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={form[key]}
                  onChange={(event) => update(key, event.target.value)}
                />
              </label>
            ))}

            <label>
              Pros
              <input
                value={form.pros}
                onChange={(event) => update('pros', event.target.value)}
                placeholder="Comfortable, easy to style"
              />
            </label>

            <label>
              Cons
              <input
                value={form.cons}
                onChange={(event) => update('cons', event.target.value)}
                placeholder="Runs slightly small"
              />
            </label>

            <label className="wide">
              Personal review
              <textarea
                value={form.personalReview}
                onChange={(event) => update('personalReview', event.target.value)}
                rows="4"
                placeholder="Share your honest opinion..."
              />
            </label>
          </div>
        </div>

        <div className="form-card">
          <h3>Links and publishing</h3>
          <div className="form-grid">
            <label>
              Instagram Reel URL
              <input
                value={form.instagramUrl}
                onChange={(event) => update('instagramUrl', event.target.value)}
                placeholder="https://instagram.com/..."
              />
            </label>

            <label>
              Meesho product URL
              <input
                value={form.meeshoUrl}
                onChange={(event) => update('meeshoUrl', event.target.value)}
                placeholder="https://meesho.com/..."
              />
            </label>

            <label className="check-label">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => update('published', event.target.checked)}
              />
              Published
            </label>

            <label className="check-label">
              <input
                type="checkbox"
                checked={form.isTrending}
                onChange={(event) => update('isTrending', event.target.checked)}
              />
              Mark as trending
            </label>
          </div>
        </div>

        {message && (
          <div className="form-message error-message">{message}</div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="outline-button"
            onClick={() => navigateTo('/admin/products')}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            <Icon name="check" size={15} />
            {uploading ? 'Uploading image...' : saving ? 'Saving...' : 'Save product'}
          </button>
        </div>
      </form>
    </section>
  )
}