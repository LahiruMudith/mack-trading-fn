import { useState } from "react"
import { Card } from "../component/ui/card.tsx"
import { useParams, useNavigate } from "react-router-dom" // Added useNavigate
import { Button } from "../component/ui/button.tsx"
import { Star, Truck, Shield, RotateCcw, ArrowLeft } from "lucide-react" // Added ArrowLeft
import { products, getProductById, type Product } from "../lib/product.ts"
import { Link } from "react-router-dom"

// Defined constants for reference, used directly in classNames below
// const PRIMARY = "#061653"; // Dark Blue
// const SECONDARY = "#780000"; // Dark Red

export default function Product() {
    const { productId } = useParams()
    const navigate = useNavigate() // Hook for back navigation
    const product: Product | any = getProductById(productId)
    const [quantity, setQuantity] = useState(1)
    // const [isWishlisted, setIsWishlisted] = useState(false)

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>
    }

    const relatedProducts = products.filter((p) => p.category === "machines" && p.id !== product.id).slice(0, 4)

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Button & Breadcrumb Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="w-fit p-0 hover:bg-transparent hover:underline text-muted-foreground gap-2"
                    >
                        <ArrowLeft size={18} /> Back
                    </Button>

                    <div className="text-sm text-muted-foreground border-l border-gray-300 pl-4 ml-0 sm:ml-2 hidden sm:block">
                        <Link to="/shop" className="hover:text-[#061653]">
                            Shop
                        </Link>{" "}
                        /
                        <Link to="/shop/machines" className="hover:text-[#061653]">
                            {" "}
                            Machines
                        </Link>{" "}
                        /<span className="text-[#061653] font-medium ml-1">{product.name}</span>
                    </div>
                </div>

                {/* Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Image */}
                    <div>
                        <div className="bg-muted rounded-lg overflow-hidden sticky top-24 border border-gray-100 shadow-sm">
                            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-96 object-cover" />
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-[#061653]">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        // Keeping yellow for stars as it's standard, or you could use SECONDARY
                                        className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-semibold text-[#061653]">{product.rating}</span>
                            <span className="text-muted-foreground">({product.reviews} reviews)</span>
                        </div>

                        {/* Price */}
                        <p className="text-5xl font-bold text-[#061653] mb-6">${product.price.toFixed(2)}</p>

                        {/* Description */}
                        <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

                        {/* Specifications */}
                        {product.specs && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-lg mb-3 text-[#061653]">Key Features</h3>
                                <ul className="space-y-2">
                                    {Object.entries(product.specs).map(([key, value], index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            {/* Used SECONDARY (Red) for the checkmark to make it pop */}
                                            <span className="text-[#780000] font-bold">✓</span>
                                            <span className="capitalize">
                                                <strong className="text-gray-700">{key.replace(/_/g, " ")}:</strong> {String(value)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className={`mb-8 p-4 rounded-lg border ${product.inStock ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                            <p className={`font-semibold ${product.inStock ? "text-green-800" : "text-red-800"}`}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                            </p>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex gap-4 mb-8">
                            <div className="flex items-center border border-border rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 text-muted-foreground hover:text-[#061653] transition-colors"
                                >
                                    −
                                </button>
                                <span className="px-6 py-2 font-semibold text-[#061653]">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 text-muted-foreground hover:text-[#061653] transition-colors"
                                >
                                    +
                                </button>
                            </div>

                            {/* Primary Action Button - Uses PRIMARY Blue */}
                            <Button
                                className="flex-1 bg-[#061653] text-white hover:bg-[#061653]/90"
                                disabled={!product.inStock}
                            >
                                Add to Cart
                            </Button>

                            {/*<button*/}
                            {/*    onClick={() => setIsWishlisted(!isWishlisted)}*/}
                            {/*    className="px-6 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors"*/}
                            {/*>*/}
                            {/*    <Heart*/}
                            {/*        size={20}*/}
                            {/*        // Uses SECONDARY Red when active*/}
                            {/*        className={isWishlisted ? "fill-[#780000] text-[#780000]" : "text-gray-400"}*/}
                            {/*    />*/}
                            {/*</button>*/}
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                            <div className="text-center group">
                                <Truck className="w-6 h-6 mx-auto mb-2 text-[#061653] group-hover:text-[#780000] transition-colors" />
                                <p className="text-sm font-semibold text-[#061653]">Free Shipping</p>
                                <p className="text-xs text-muted-foreground">On orders over $100</p>
                            </div>
                            <div className="text-center group">
                                <Shield className="w-6 h-6 mx-auto mb-2 text-[#061653] group-hover:text-[#780000] transition-colors" />
                                <p className="text-sm font-semibold text-[#061653]">Warranty</p>
                                <p className="text-xs text-muted-foreground">2 years coverage</p>
                            </div>
                            <div className="text-center group">
                                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-[#061653] group-hover:text-[#780000] transition-colors" />
                                <p className="text-sm font-semibold text-[#061653]">Easy Returns</p>
                                <p className="text-xs text-muted-foreground">30-day policy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-[#061653]">Related Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <Card key={p.id} className="hover:shadow-lg transition-shadow overflow-hidden group border-gray-200">
                                    <div className="relative overflow-hidden bg-muted h-48">
                                        <img
                                            src={p.image || "/placeholder.svg"}
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold mb-2 line-clamp-2 text-[#061653]">{p.name}</h3>
                                        <p className="text-xl font-bold text-[#061653] mb-4">${p.price.toFixed(2)}</p>
                                        <Link to={`/shop/machines/${p.id}`}>
                                            <Button className="w-full bg-white border border-[#061653] text-[#061653] hover:bg-[#061653] hover:text-white transition-colors">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}