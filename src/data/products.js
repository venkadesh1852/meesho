const productImages = {
  woman: 'https://images.pexels.com/photos/27127408/pexels-photo-27127408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sneakers: 'https://images.pexels.com/photos/27008326/pexels-photo-27008326.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  bag: 'https://images.pexels.com/photos/27127410/pexels-photo-27127410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  orangeBag: 'https://images.pexels.com/photos/34976481/pexels-photo-34976481.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  watch: 'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  silverWatch: 'https://images.pexels.com/photos/16958879/pexels-photo-16958879.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  denimSneakers: 'https://images.pexels.com/photos/27063098/pexels-photo-27063098.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
}

export const categories = ['Women\'s Fashion', 'Men\'s Fashion', 'Beauty', 'Home & Living', 'Accessories', 'Footwear']

export const products = [
  {
    id: 'soft-pink-coord', name: 'Soft Pink Co-ord Set', category: "Women's Fashion", price: 899, rating: 4.9,
    image: productImages.woman, shortReview: 'A soft, flattering set that looks more premium than its price.',
    description: 'A polished co-ord set with an easy silhouette, soft hand-feel, and the kind of colour that works across seasons.',
    material: 'Poly-blend', colour: 'Rose pink', sizes: ['S', 'M', 'L', 'XL'], isTrending: true, trendingOrder: 1,
    trendingStartDate: '2026-10-01', trendingEndDate: '2026-12-31', instagramUrl: 'https://www.instagram.com/', meeshoUrl: 'https://www.meesho.com/',
    ratings: { quality: 4.8, look: 5, material: 4.7, value: 4.9 }, pros: ['Rich colour', 'Comfortable fit', 'Easy to style'], cons: ['Slight colour variation'], personalReview: 'The fabric photographs beautifully and the fit feels considered. I would size up for a relaxed look.', published: true,
  },
  {
    id: 'everyday-court-sneaker', name: 'Everyday Court Sneaker', category: 'Footwear', price: 1299, rating: 4.7,
    image: productImages.sneakers, shortReview: 'A versatile pair for daily outfits and long casual days.',
    description: 'A clean everyday sneaker with a cushioned sole and a simple shape that works with dresses, denim, and relaxed tailoring.',
    material: 'Synthetic leather', colour: 'Ivory white', sizes: ['6', '7', '8', '9'], isTrending: true, trendingOrder: 2,
    trendingStartDate: '2026-10-01', trendingEndDate: '2026-12-31', instagramUrl: 'https://www.instagram.com/', meeshoUrl: 'https://www.meesho.com/',
    ratings: { quality: 4.6, look: 4.8, material: 4.5, value: 4.7 }, pros: ['Cushioned sole', 'Goes with everything', 'Lightweight'], cons: ['Needs a short break-in'], personalReview: 'A reliable wardrobe basic with enough detail to feel elevated.', published: true,
  },
  {
    id: 'sculpted-mini-bag', name: 'Sculpted Mini Bag', category: 'Accessories', price: 799, rating: 4.8,
    image: productImages.bag, shortReview: 'Small, structured, and surprisingly spacious for everyday essentials.',
    description: 'A structured mini bag with a sculpted profile and a detachable strap for shoulder or hand carry.',
    material: 'Vegan leather', colour: 'Olive green', sizes: ['One size'], isTrending: true, trendingOrder: 3,
    trendingStartDate: '2026-10-01', trendingEndDate: '2026-12-31', instagramUrl: 'https://www.instagram.com/', meeshoUrl: 'https://www.meesho.com/',
    ratings: { quality: 4.8, look: 4.9, material: 4.6, value: 4.8 }, pros: ['Structured shape', 'Detachable strap', 'Good hardware'], cons: ['Mini profile'], personalReview: 'The shape instantly makes a simple outfit feel styled. It holds a phone, cards, keys, and lipstick.', published: true,
  },
  {
    id: 'soft-form-shoulder-bag', name: 'Soft Form Shoulder Bag', category: 'Accessories', price: 999, rating: 4.6,
    image: productImages.orangeBag, shortReview: 'A warm statement accessory with a flexible everyday shape.',
    description: 'A softly structured shoulder bag with a roomy interior and a warm finish that lifts neutral outfits.',
    material: 'Faux leather', colour: 'Tangerine', sizes: ['One size'], isTrending: true, trendingOrder: 4,
    trendingStartDate: '2026-10-01', trendingEndDate: '2026-12-31', instagramUrl: 'https://www.instagram.com/', meeshoUrl: 'https://www.meesho.com/',
    ratings: { quality: 4.5, look: 4.7, material: 4.4, value: 4.6 }, pros: ['Roomy interior', 'Strong colour', 'Comfortable strap'], cons: ['No inner zip pocket'], personalReview: 'A fun alternative to black that still feels easy to wear.', published: true,
  },
  {
    id: 'classic-silver-timepiece', name: 'Classic Silver Timepiece', category: 'Accessories', price: 1499, rating: 4.9,
    image: productImages.silverWatch, shortReview: 'Minimal, polished, and easy to dress up or down.',
    description: 'A clean silver timepiece with a refined face and a strap that sits comfortably on the wrist.',
    material: 'Stainless steel', colour: 'Silver', sizes: ['Adjustable'], isTrending: true, trendingOrder: 5,
    trendingStartDate: '2026-10-01', trendingEndDate: '2026-12-31', instagramUrl: 'https://www.instagram.com/', meeshoUrl: 'https://www.meesho.com/',
    ratings: { quality: 4.9, look: 4.9, material: 4.8, value: 4.8 }, pros: ['Clean dial', 'Premium finish', 'Adjustable strap'], cons: ['Reflective in direct sun'], personalReview: 'Looks especially good paired with a watch stack or a crisp white shirt.', published: true,
  },
  {
    id: 'minimal-black-watch', name: 'Minimal Black Watch', category: 'Accessories', price: 1199, rating: 4.5,
    image: productImages.watch, shortReview: 'A quietly classic piece for minimal wardrobes.',
    description: 'An understated black watch with a clear face and a comfortable strap for daily wear.',
    material: 'Alloy and PU leather', colour: 'Black', sizes: ['Adjustable'], isTrending: true, trendingOrder: 6,
    trendingStartDate: '2026-10-01', trendingEndDate: '2026-12-31', instagramUrl: 'https://www.instagram.com/', meeshoUrl: 'https://www.meesho.com/',
    ratings: { quality: 4.4, look: 4.7, material: 4.3, value: 4.6 }, pros: ['Timeless look', 'Lightweight', 'Clear dial'], cons: ['Strap runs slim'], personalReview: 'A simple finishing touch that works for workdays and weekends.', published: true,
  },
  {
    id: 'denim-day-trainer', name: 'Denim Day Trainer', category: 'Footwear', price: 1099, rating: 4.4,
    image: productImages.denimSneakers, shortReview: 'A playful denim texture for casual everyday styling.',
    description: 'A casual trainer with a denim-inspired finish and a flexible sole for everyday movement.',
    material: 'Textile and rubber', colour: 'Denim blue', sizes: ['6', '7', '8', '9'], isTrending: false, trendingOrder: 0,
    trendingStartDate: '', trendingEndDate: '', instagramUrl: 'https://www.instagram.com/', meeshoUrl: 'https://www.meesho.com/',
    ratings: { quality: 4.3, look: 4.6, material: 4.3, value: 4.5 }, pros: ['Flexible sole', 'Distinct texture', 'Easy to clean'], cons: ['Runs slightly narrow'], personalReview: 'A good pick when you want a sneaker that is not plain white.', published: true,
  },
]

export const getProductById = (id) => products.find((product) => product.id === id)
