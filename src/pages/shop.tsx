"use client"

import { useState } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { Star, ChevronDown, ArrowUpDown } from "lucide-react"
import { products } from "../lib/product.ts"
import {Link} from "react-router-dom";

export default function Shop() {
    const categories = [
        {
            id: "all",
            name: "All",
            description: "Browse everything",
            icon: "🧵",
            href: "/shop",
            color: "from-gray-700 to-gray-500",
        },
        {
            id: "machines",
            name: "Sewing Machines",
            description: "New and used sewing machines for all skill levels",
            icon: "🪡",
            href: "/shop/machines",
            color: "from-primary to-primary/50",
        },
        {
            id: "parts",
            name: "Parts & Supplies",
            description: "Replacement parts, needles, and threads",
            icon: "⚙️",
            href: "/shop/parts",
            color: "from-accent to-accent/50",
        },
        {
            id: "accessories",
            name: "Accessories",
            description: "Presser feet, carrying cases, and more",
            icon: "🎒",
            href: "/shop/accessories",
            color: "from-secondary to-secondary/50",
        },
    ]

    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("featured")

    const filtered = selectedCategory === "all"
        ? products
        : products.filter((p:any) => p.category === selectedCategory)

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
                    <h1 className="text-4xl font-bold mb-4">Shop Mack Trading</h1>
                    <p className="text-lg text-muted-foreground">
                        Browse our collection of sewing machines, parts, and accessories
                    </p>
                </div>

                {/* Category Buttons - Pill Style */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => {
                        const isSelected = selectedCategory === category.id
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                aria-pressed={isSelected}
                                className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                    ${isSelected
                                    ? `bg-[#071752] text-white border-transparent shadow-md`
                                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {selectedCategory === "all"
                                ? "All Products"
                                : categories.find((c) => c.id === selectedCategory)?.name}
                        </h2>
                        <p className="text-muted-foreground">
                            {selectedCategory === "all"
                                ? "Explore our full catalog"
                                : `Showing ${products.filter((p:any) => p.category === selectedCategory).length} items`}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Optional: Add an icon to the label for visual flair */}
                        <label htmlFor="sort" className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <ArrowUpDown className="w-4 h-4" />
                            <span className="hidden sm:inline">Sort by</span>
                        </label>

                        <div className="relative">
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>

                            {/* Custom Chevron Icon positioned absolutely */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sorted.map((item) => (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden group">
                            {/* Image */}
                            <div className="relative overflow-hidden bg-muted h-64">
                                <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {!item.inStock && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">Out of Stock</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">({item.reviews})</span>
                                </div>

                                {/* Price */}
                                <p className="text-2xl font-bold text-primary mb-4">${item.price.toFixed(2)}</p>

                                {/* Category label */}
                                <p className="text-xs text-muted-foreground mb-3 capitalize">{item.category}</p>

                                {/* Button */}
                                <Link to={`/shop/${item.category}/${item.id}`} className="block">
                                    <Button className="w-full bg-accent text-accent-foreground hover:opacity-90">View Details</Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    )
}