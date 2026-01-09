export type Product = {
    id: string
    name: string
    category: "machines" | "parts" | "accessories" | string
    price: number
    rating: number
    reviews: number
    image?: string
    inStock?: boolean
    description?: string
    specs?: Record<string, string | number>
}

/**
 * Example product list used by the shop pages.
 * Replace these entries with your real data, or adapt this module to fetch from an API/db.
 */
export const products: Product[] = [
    {
        id: "m1",
        name: "Janome 5000 Sewing Machine",
        category: "machines",
        price: 799.0,
        rating: 4.6,
        reviews: 124,
        image: "/images/machines/janome-5000.jpg",
        inStock: true,
        description: "Reliable computerised machine for hobbyists and small studios.",
        specs: { weight_lbs: 24, bobbin_type: "top-loading", stitch_count: 100 },
    },
    {
        id: "m2",
        name: "Brother Xplore Industrial Machine",
        category: "machines",
        price: 1599.0,
        rating: 4.8,
        reviews: 48,
        image: "/images/machines/brother-xplore.jpg",
        inStock: false,
        description: "High-speed heavy-duty sewing machine for professional use.",
        specs: { speed_spm: 5000, motor: "servo", warranty_years: 2 },
    },
    {
        id: "p1",
        name: "Universal Needle Pack (100 pcs)",
        category: "parts",
        price: 12.5,
        rating: 4.2,
        reviews: 210,
        image: "/images/parts/needles.jpg",
        inStock: true,
        description: "Mixed-size needles suitable for most domestic machines.",
    },
    {
        id: "p2",
        name: "Metal Bobbin (5-pack)",
        category: "parts",
        price: 7.99,
        rating: 4.4,
        reviews: 76,
        image: "/images/parts/bobbins.jpg",
        inStock: true,
    },
    {
        id: "a1",
        name: "Carrying Case XL",
        category: "accessories",
        price: 49.0,
        rating: 4.1,
        reviews: 32,
        image: "/images/accessories/case-xl.jpg",
        inStock: true,
        description: "Padded carrying case for full-size sewing machines.",
    },
    {
        id: "a2",
        name: "Presser Feet Set (12 pcs)",
        category: "accessories",
        price: 29.0,
        rating: 4.5,
        reviews: 89,
        image: "/images/accessories/presser-feet.jpg",
        inStock: true,
    },
]

export function getProductsByCategory(category: "machines" | "parts" | "accessories") {
    return products.filter((p) => p.category === category)
}

export function getProductById(id:any) {
    return products.find((p) => p.id === id)
}