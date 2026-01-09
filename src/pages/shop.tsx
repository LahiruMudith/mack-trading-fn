"use client"

import { useState, useEffect } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { Star, ChevronDown, ArrowUpDown, Loader2 } from "lucide-react"
import { Link } from "react-router-dom";
import { getAllItems } from "../services/item.ts"; // Import the service

// Interface matching your UI requirements (transformed from backend)
interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    inStock: boolean;
}

export default function Shop() {
    const categories = [
        {
            id: "all",
            name: "All",
            description: "Browse everything",
            icon: "🧵",
        },
        {
            id: "machines",
            name: "Sewing Machines",
            description: "New and used sewing machines for all skill levels",
            icon: "🪡",
        },
        {
            id: "parts",
            name: "Parts & Supplies",
            description: "Replacement parts, needles, and threads",
            icon: "⚙️",
        },
        {
            id: "accessories",
            name: "Accessories",
            description: "Presser feet, carrying cases, and more",
            icon: "🎒",
        },
    ]

    const [items, setItems] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("featured")

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getAllItems();

                // Handle different response structures (array directly or wrapped in data object)
                const rawData = Array.isArray(response) ? response : (response.data || []);

                // Transform Backend Data (IItem) -> Frontend Data (Product)
                const transformedData = rawData.map((item: any) => ({
                    id: item._id,                    // Map _id to id
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    image: item.image_url,           // Map image_url to image
                    inStock: item.stock > 0,         // Calculate inStock based on stock count

                    // Generate Random Rating (4.0 - 5.0) as requested "fix value"
                    rating: Number((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)),

                    // Generate Random Reviews (< 1000) as requested
                    reviews: Math.floor(Math.random() * 1000)
                }));

                setItems(transformedData);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // --- FILTER & SORT ---
    const filtered = selectedCategory === "all"
        ? items
        : items.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price
        if (sortBy === "price-high") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        return 0
    })

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4 text-[#061653]">Shop Mack Trading</h1>
                    <p className="text-lg text-muted-foreground">
                        Browse our collection of sewing machines, parts, and accessories
                    </p>
                </div>

                {/* Category Buttons - Pill Style */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((category) => {
                        const isSelected = selectedCategory === category.id
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                aria-pressed={isSelected}
                                className={`
                                    flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                                    ${isSelected
                                    ? `bg-[#061653] text-white border-[#061653] shadow-md`
                                    : "bg-white text-gray-700 border-gray-200 hover:border-[#061653] hover:text-[#061653] hover:bg-blue-50"
                                }
                                `}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span>{category.name}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-[#061653]">
                            {selectedCategory === "all"
                                ? "All Products"
                                : categories.find((c) => c.id === selectedCategory)?.name}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            {selectedCategory === "all"
                                ? "Explore our full catalog"
                                : `Showing ${sorted.length} items`}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                        <label htmlFor="sort" className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <ArrowUpDown className="w-4 h-4 text-[#061653]" />
                            <span className="hidden sm:inline">Sort by</span>
                        </label>

                        <div className="relative">
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none w-48 bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg leading-tight focus:outline-none focus:border-[#061653] focus:ring-1 focus:ring-[#061653] transition-all cursor-pointer text-sm"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#061653]">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-[#061653]" size={48} />
                    </div>
                ) : (
                    /* Products Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sorted.map((item) => (
                            <Card key={item.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-gray-200">
                                {/* Image */}
                                <div className="relative overflow-hidden bg-gray-50 h-64 border-b border-gray-100">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {!item.inStock && (
                                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                                            <span className="text-[#780000] font-bold text-lg border-2 border-[#780000] px-4 py-1 rounded rotate-[-12deg] bg-white/90">
                                                Out of Stock
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col h-[220px]">
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{item.category}</p>
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-[#061653] transition-colors">
                                            {item.name}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-muted-foreground">({item.reviews})</span>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                                        <p className="text-2xl font-bold text-[#061653]">{item.price.toFixed(2)}</p>

                                        <Link to={`/product/${item.id}`} className="flex-1 max-w-[120px]">
                                            <Button
                                                disabled={!item.inStock}
                                                className="w-full bg-[#061653] text-white hover:bg-[#061653]/90 transition-colors h-10 cursor-pointer"
                                            >
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {!loading && sorted.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No products found in this category.</p>
                        <Button
                            onClick={() => setSelectedCategory("all")}
                            className="text-[#061653] mt-2"
                        >
                            View all products
                        </Button>
                    </div>
                )}
            </div>
        </main>
    )
}