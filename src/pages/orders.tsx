import { useState, useEffect } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { ChevronRight, Package, Truck, CheckCircle2, Loader2, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { getMyOrders, type IOrder } from "../services/order.ts" // Import service

export default function Orders() {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
    const [orders, setOrders] = useState<IOrder[]>([])
    const [loading, setLoading] = useState(true)

    // --- Fetch Orders on Mount ---
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Brand colors
    const brandPrimary = "#061653"
    const neutralBorder = "#E6E9EE"
    const mutedText = "#6b7280"

    const statusColor = (status: string) => {
        switch (status) {
            case "DELIVERED": return "#16a34a"; // Green
            case "SHIPPED": return brandPrimary; // Blue
            case "PLACED": return "#d97706"; // Orange
            case "PAYMENT_PENDING": return "#dc2626"; // Red
            default: return mutedText;
        }
    }

    const getStatusIcon = (status: string) => {
        const color = statusColor(status)
        switch (status) {
            case "DELIVERED": return <CheckCircle2 size={20} color={color} />
            case "SHIPPED": return <Truck size={20} color={color} />
            case "PLACED": return <Package size={20} color={color} />
            case "PAYMENT_PENDING": return <Clock size={20} color={color} />
            default: return <Package size={20} color={color} />
        }
    }

    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }

    // Helper to calculate total (if not saved in DB, calculate on fly)
    const calculateTotal = (order: IOrder) => {
        if (order.totalAmount) return order.totalAmount;
        return order.items.reduce((sum, i) => sum + (i.item.price * i.qty), 0);
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
    }

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold" style={{ color: brandPrimary }}>My Orders</h1>
                    <Link to="/account">
                        <Button variant="outline" className="border-border hover:bg-muted bg-transparent" style={{ borderColor: neutralBorder, color: brandPrimary }}>
                            Back to Account
                        </Button>
                    </Link>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.map((order) => {
                        const total = calculateTotal(order);

                        return (
                            <Card
                                key={order._id}
                                className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                                style={{ borderColor: neutralBorder }}
                            >
                                {/* Order Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2" style={{ color: brandPrimary }}>
                                            {order.tracking_number}
                                        </h3>
                                        <p className="text-sm" style={{ color: mutedText }}>
                                            Placed on {formatDate(order.date)}
                                        </p>
                                    </div>

                                    <div className="text-right mr-6">
                                        <div className="flex items-center gap-2 font-semibold mb-2" style={{ color: statusColor(order.status) }}>
                                            {getStatusIcon(order.status)}
                                            <span>{order.status.replace(/_/g, " ")}</span>
                                        </div>
                                        <p className="text-2xl font-bold" style={{ color: brandPrimary }}>
                                            LKR {total.toFixed(2)}
                                        </p>
                                    </div>

                                    <ChevronRight
                                        size={24}
                                        style={{
                                            color: mutedText,
                                            transform: selectedOrder === order._id ? "rotate(90deg)" : "none",
                                            transition: "transform 150ms ease",
                                        }}
                                    />
                                </div>

                                {/* Order Details - Expanded */}
                                {selectedOrder === order._id && (
                                    <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${neutralBorder}` }}>
                                        <div className="space-y-6">
                                            {/* Items */}
                                            <div>
                                                <h4 className="font-semibold mb-3" style={{ color: brandPrimary }}>Items Ordered</h4>
                                                <div className="space-y-2">
                                                    {order.items.map((itemObj, idx) => (
                                                        <div key={idx} className="flex justify-between text-sm">
                                                            <span>{itemObj.item.name}</span>
                                                            <span className="text-sm" style={{ color: mutedText }}>
                                                                x{itemObj.qty} - LKR {(itemObj.item.price * itemObj.qty).toFixed(2)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Shipping Info */}
                                            <div>
                                                <h4 className="font-semibold mb-3" style={{ color: brandPrimary }}>Shipping & Tracking</h4>
                                                <div className="rounded-lg" style={{ background: "#F3F4F6", padding: 16 }}>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span style={{ color: mutedText }}>Status</span>
                                                        <span className="font-semibold" style={{ color: statusColor(order.status) }}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm mb-2">
                                                        <span style={{ color: mutedText }}>Est. Delivery</span>
                                                        <span className="font-semibold">{formatDate(order.est_delivery)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span style={{ color: mutedText }}>Tracking #</span>
                                                        <span className="font-semibold font-mono">{order.tracking_number}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            {/*<div className="flex gap-3 pt-4">*/}
                                            {/*    <Button className="flex-1 hover:opacity-90" style={{ backgroundColor: brandPrimary, color: "#ffffff" }}>*/}
                                            {/*        Track Package*/}
                                            {/*    </Button>*/}
                                            {/*    /!* Only allow re-payment if pending *!/*/}
                                            {/*    {order.status === "PAYMENT_PENDING" && (*/}
                                            {/*        <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">*/}
                                            {/*            Pay Now*/}
                                            {/*        </Button>*/}
                                            {/*    )}*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        )
                    })}
                </div>

                {/* Empty State */}
                {!loading && orders.length === 0 && (
                    <Card className="p-12 text-center" style={{ borderColor: neutralBorder }}>
                        <Package size={48} className="mx-auto mb-4" style={{ color: mutedText, opacity: 0.6 }} />
                        <h2 className="text-2xl font-bold mb-2" style={{ color: brandPrimary }}>No Orders Yet</h2>
                        <p className="mb-6" style={{ color: mutedText }}>Start shopping to place your first order</p>
                        <Link to="/shop">
                            <Button className="bg-accent text-accent-foreground hover:opacity-90" style={{ backgroundColor: brandPrimary, color: "#ffffff" }}>
                                Shop Now
                            </Button>
                        </Link>
                    </Card>
                )}
            </div>
        </main>
    )
}