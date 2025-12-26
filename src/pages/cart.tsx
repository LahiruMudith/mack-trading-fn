import { useState } from "react";
import { Trash2, ArrowRight, CarIcon as CartIcon } from "lucide-react";
import { Button } from "../component/ui/button.tsx";
import { Card } from "../component/ui/card.tsx";
import { Link } from "react-router-dom";

const PRIMARY = "#061653"; // dark blue
const SECONDARY = "#780000"; // dark red

const mockCartItems = [
    {
        id: "m1",
        name: "Professional Bernina 570",
        price: 3499.99,
        quantity: 1,
        image: "/placeholder.svg?key=i5lsu",
    },
    {
        id: "a2",
        name: "Sewing Machine Carry Case",
        price: 79.99,
        quantity: 2,
        image: "/placeholder.svg?key=siziq",
    },
    {
        id: "p1",
        name: "Universal Presser Feet Set",
        price: 89.99,
        quantity: 1,
        image: "/placeholder.svg?key=81tes",
    },
    {
        id: "m1",
        name: "Professional Bernina 570",
        price: 3499.99,
        quantity: 1,
        image: "/placeholder.svg?key=i5lsu",
    },
    {
        id: "a2",
        name: "Sewing Machine Carry Case",
        price: 79.99,
        quantity: 2,
        image: "/placeholder.svg?key=siziq",
    },
    {
        id: "p1",
        name: "Universal Presser Feet Set",
        price: 89.99,
        quantity: 1,
        image: "/placeholder.svg?key=81tes",
    },

];

const Cart = () => {
    const [cartItems, setCartItems] = useState(mockCartItems);

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeItem(id);
            return;
        }
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 15;
    const total = subtotal + tax + shipping;

    // class applied when there are more than 4 items: constrains height and enables vertical scrolling
    // max heights chosen to approximately fit 4 items (adjust if your item row height changes)
    const scrollContainerClass =
        cartItems.length > 3 ? "max-h-[580px] sm:max-h-[430px] overflow-y-auto" : "";

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-background py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-24">
                        <CartIcon size={64} className="mx-auto mb-4" style={{ color: PRIMARY, opacity: 0.5 }} />
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
                {/* Header */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden">
                            {/* Scrollable container when cartItems.length > 4 */}
                            <div
                                role="region"
                                aria-label="Cart items"
                                className={`${scrollContainerClass} divide-y divide-border`}
                            >
                                {cartItems.map((item) => (
                                    <div key={item.id}>
                                        {/* Responsive item: column on mobile, row on sm+ */}
                                        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                                            {/* Product Image */}
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-md sm:text-lg font-semibold mb-1 truncate">{item.name}</h3>
                                                <p className="text-lg sm:text-2xl font-bold" style={{ color: PRIMARY }}>
                                                    ${item.price.toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Quantity + Actions + Line Total: stack on small screens, horizontally on larger */}
                                            <div className="w-full sm:w-auto flex sm:flex-row sm:items-center gap-3 sm:gap-6 mt-2 sm:mt-0">
                                                {/* Quantity Control */}
                                                <div className="flex items-center border border-border rounded-lg">
                                                    <button
                                                        aria-label={`Decrease quantity for ${item.name}`}
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="cursor-pointer px-2 sm:px-3 py-1 text-muted-foreground hover:text-foreground cursor-pointer"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-3 sm:px-4 py-1 font-semibold min-w-[36px] text-center text-sm sm:text-base">
                            {item.quantity}
                          </span>
                                                    <button
                                                        aria-label={`Increase quantity for ${item.name}`}
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="cursor-pointer px-2 sm:px-3 py-1 text-muted-foreground hover:text-foreground cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Remove button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="cursor-pointer p-2 rounded-lg transition-colors hover:bg-destructive/10 cursor-pointer"
                                                    title="Remove item"
                                                    aria-label={`Remove ${item.name} from cart`}
                                                    style={{ color: SECONDARY }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                                {/* Line Total */}
                                                <div className="ml-auto text-right">
                                                    <p className="text-md sm:text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                                    <p className="text-xs text-muted-foreground">Total</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Continue Shopping */}
                        <div className="mt-4 sm:mt-6">
                            <Link to="/shop">
                                <Button variant="outline" className="cursor-pointer w-full sm:w-auto border-border hover:bg-muted bg-transparent">
                                    Continue Shopping
                                </Button>
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
                  <span className="text-sm sm:text-base text-muted-foreground">
                    Shipping
                      {shipping === 0 && <span className="text-xs text-green-600 ml-2">(Free)</span>}
                  </span>
                                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between mb-4 sm:mb-6 text-base sm:text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary" style={{ color: PRIMARY }}>
                  ${total.toFixed(2)}
                </span>
                            </div>

                            <Link to="/checkout">
                                <Button className="w-full mb-3 cursor-pointer" style={{ backgroundColor: PRIMARY, color: "#ffffff" }}>
                                    Proceed to Checkout
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>

                            {/* Info Box */}
                            <div className="bg-[#780000]/30 p-3 sm:p-4 rounded-lg text-sm">
                                <p className="font-semibold mb-1">Free Shipping</p>
                                <p className="text-muted-foreground">
                                    Get free shipping on orders over $100. You're{" "}
                                    <span className="font-semibold" style={{ color: PRIMARY }}>
                    ${Math.max(0, 100 - subtotal).toFixed(2)}
                  </span>{" "}
                                    away!
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;