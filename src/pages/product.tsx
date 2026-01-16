import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../component/ui/button.tsx"
import { Star, Truck, Shield, RotateCcw, ArrowLeft, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { getItemById } from "../services/item.ts"
import toast, { Toaster } from 'react-hot-toast'; // Import Toast

// --- Redux & Service Imports ---
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../lib/cartSlice.ts"; // Ensure this path matches your file
import { addItemToCartAPI } from "../services/cart.ts"; // Ensure this path matches your file
import type {RootState} from "../store.ts"; // Import your RootState type
// Import your RootState type

interface ProductType {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    specs: Record<string, any>;
    inStock: boolean;
    rating: number;
    reviews: number;
}

export default function Product() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    // Redux: Check if user is logged in
    // Adjust 'state.auth.isLogin' based on your actual Redux store structure
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin)

    // State
    const [product, setProduct] = useState<ProductType | null>(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false) // State for button loading

    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;

            try {
                setLoading(true);
                const response = await getItemById(productId);
                const data = response.data || response;

                const transformedProduct: ProductType = {
                    id: data._id,
                    name: data.name,
                    description: data.description,
                    image: data.image_url,
                    price: data.price,
                    category: data.category,
                    specs: data.key_features ?
                        data.key_features.reduce((acc: any, feature: string, index: number) => {
                            acc[`Feature ${index + 1}`] = feature;
                            return acc;
                        }, {}) : {},
                    inStock: data.stock > 0,
                    rating: 4.8,
                    reviews: 124
                };

                setProduct(transformedProduct);
            } catch (error) {
                console.error("Failed to load product", error);
                toast.error("Could not load product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    // --- HANDLE ADD TO CART ---
    const handleAddToCart = async () => {
        if (!product) return;

        setIsAdding(true);

        // 1. Update Redux (Immediate UI feedback)
        dispatch(addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            stock: product.inStock ? 100 : 0
        }));

        // 2. Sync with Backend (If Logged In)
        console.log(isLoggedIn)
        if (isLoggedIn) {
            try {
                await addItemToCartAPI(product.id, quantity);
                toast.success("Added to cart!");
            } catch (error) {
                console.error("Cart sync error:", error);
                // We keep the Redux state to not disrupt the user,
                // but warn them that it wasn't saved to the server.
                toast.success("Added to cart (Local only)");
            }
        } else {
            // Guest User
            toast.success("Added to cart");
        }

        setIsAdding(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-[#061653]" size={48} />
            </div>
        )
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>
    }

    return (
        <main className="min-h-screen bg-background py-12">
            <Toaster position="top-center" />
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
                        <span className="text-[#061653] font-medium ml-1">{product.name}</span>
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
                                        className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-semibold text-[#061653]">{product.rating}</span>
                            <span className="text-muted-foreground">({product.reviews} reviews)</span>
                        </div>

                        {/* Price */}
                        <p className="text-5xl font-bold text-[#061653] mb-6">LKR {product.price.toFixed(2)}</p>

                        {/* Description */}
                        <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

                        {/* Specifications */}
                        {product.specs && Object.keys(product.specs).length > 0 && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-lg mb-3 text-[#061653]">Key Features</h3>
                                <ul className="space-y-2">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <li key={key} className="flex items-center gap-2">
                                            <span className="text-[#780000] font-bold">✓</span>
                                            <span className="capitalize">
                                                 {String(value)}
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

                            {/* UPDATED BUTTON WITH LOGIC */}
                            <Button
                                onClick={handleAddToCart}
                                className="flex-1 bg-[#061653] text-white hover:bg-[#061653]/90 transition-all active:scale-95"
                                disabled={!product.inStock || isAdding}
                            >
                                {isAdding ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    "Add to Cart"
                                )}
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                            <div className="text-center group">
                                <Truck className="w-6 h-6 mx-auto mb-2 text-[#061653] group-hover:text-[#780000] transition-colors" />
                                <p className="text-sm font-semibold text-[#061653]">Islandwide Delivery</p>
                            </div>
                            <div className="text-center group">
                                <Shield className="w-6 h-6 mx-auto mb-2 text-[#061653] group-hover:text-[#780000] transition-colors" />
                                <p className="text-sm font-semibold text-[#061653]">Warranty</p>
                            </div>
                            <div className="text-center group">
                                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-[#061653] group-hover:text-[#780000] transition-colors" />
                                <p className="text-sm font-semibold text-[#061653]">Easy Returns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}