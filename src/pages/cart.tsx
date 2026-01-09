import { useState, useEffect } from "react";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../component/ui/button.tsx";
import { Card } from "../component/ui/card.tsx";
import { Link } from "react-router-dom";

// Import your service
import CartService, {type ICartItem } from "../services/cart.ts";

const PRIMARY = "#061653";
const SECONDARY = "#780000";

const Cart = () => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --- 1. Fetch Cart Data (Refactored) ---
    const fetchCart = async () => {
        try {
            setLoading(true);
            // Call the service instead of axios directly
            const items = await CartService.getCart();
            setCartItems(items);
        } catch (err) {
            console.error("Failed to fetch cart", err);
            setError("Could not load cart items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // --- 2. Remove Item (Refactored) ---
    const removeItem = async (itemId: string) => {
        const previousItems = [...cartItems];
        // Optimistic Update
        setCartItems(cartItems.filter((item) => item._id !== itemId));

        try {
            await CartService.removeCartItem(itemId);
        } catch (err) {
            console.error("Error removing item", err);
            setCartItems(previousItems); // Revert on failure
            alert("Failed to remove item.");
        }
    };

    // --- 3. Update Quantity (Refactored) ---
    const updateQuantity = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return removeItem(itemId);

        const previousItems = [...cartItems];
        // Optimistic Update
        setCartItems(cartItems.map((item) =>
            (item._id === itemId ? { ...item, quantity: newQuantity } : item)
        ));

        try {
            await CartService.updateCartItem(itemId, newQuantity);
            fetchCart()
        } catch (err) {
            console.error("Error updating quantity", err);
            setCartItems(previousItems); // Revert on failure
        }
    };

    // --- Calculations ---
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + tax + shipping;

    const scrollContainerClass =
        cartItems.length > 3 ? "max-h-[580px] sm:max-h-[430px] overflow-y-auto" : "";

    // --- Render Loading State ---
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Cart...</div>;

    // --- Render Empty State ---
    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-background py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-24">
                        <ShoppingCart size={64} className="mx-auto mb-4" style={{ color: PRIMARY, opacity: 0.5 }} />
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Your Cart is Empty</h1>
                        <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
                        <Link to="/shop">
                            <Button className="w-full sm:w-auto cursor-pointer" style={{ backgroundColor: PRIMARY, color: "#ffffff" }}>
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-background py-8 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden">
                            <div role="region" aria-label="Cart items" className={`${scrollContainerClass} divide-y divide-border`}>
                                {cartItems.map((item) => (
                                    <div key={item._id}>
                                        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                                            {/* Product Image */}
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.product.image_url || "/placeholder.svg"}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-md sm:text-lg font-semibold mb-1 truncate">{item.product.name}</h3>
                                                <p className="text-lg sm:text-2xl font-bold" style={{ color: PRIMARY }}>
                                                    ${item.product.price.toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Controls */}
                                            <div className="w-full sm:w-auto flex sm:flex-row sm:items-center gap-3 sm:gap-6 mt-2 sm:mt-0">
                                                <div className="flex items-center border border-border rounded-lg">
                                                    <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="px-2 sm:px-3 py-1 text-muted-foreground hover:text-foreground cursor-pointer">−</button>
                                                    <span className="px-3 sm:px-4 py-1 font-semibold min-w-[36px] text-center text-sm sm:text-base">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="px-2 sm:px-3 py-1 text-muted-foreground hover:text-foreground cursor-pointer">+</button>
                                                </div>

                                                <button onClick={() => removeItem(item._id)} className="p-2 rounded-lg transition-colors hover:bg-destructive/10 cursor-pointer" style={{ color: SECONDARY }}>
                                                    <Trash2 size={18} />
                                                </button>

                                                <div className="ml-auto text-right">
                                                    <p className="text-md sm:text-lg font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                                    <p className="text-xs text-muted-foreground">Total</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <div className="mt-4 sm:mt-6">
                            <Link to="/shop">
                                <Button variant="outline" className="w-full sm:w-auto border-border hover:bg-muted bg-transparent">Continue Shopping</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="p-4 sm:p-6 lg:sticky lg:top-24">
                            <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">Order Summary</h2>
                            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                                <div className="flex justify-between">
                                    <span className="text-sm sm:text-base text-muted-foreground">Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm sm:text-base text-muted-foreground">Tax</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm sm:text-base text-muted-foreground">Shipping {shipping === 0 && <span className="text-xs text-green-600 ml-2">(Free)</span>}</span>
                                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between mb-4 sm:mb-6 text-base sm:text-lg font-bold">
                                <span>Total</span>
                                <span style={{ color: PRIMARY }}>${total.toFixed(2)}</span>
                            </div>
                            <Link to="/checkout">
                                <Button className="w-full mb-3 cursor-pointer" style={{ backgroundColor: PRIMARY, color: "#ffffff" }}>
                                    Proceed to Checkout
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                            <div className="bg-[#780000]/30 p-3 sm:p-4 rounded-lg text-sm">
                                <p className="font-semibold mb-1">Free Shipping</p>
                                <p className="text-muted-foreground">Get free shipping on orders over 10 000 LKR. You're <span className="font-semibold" style={{ color: PRIMARY }}>{Math.max(0, 100 - subtotal).toFixed(2)}</span> away!</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;