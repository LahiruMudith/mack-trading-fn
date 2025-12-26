import { useState } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { ChevronRight, Package, Truck, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function Orders() {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

    // Brand colors
    const brandPrimary = "#061653" // deep blue
    // const brandSecondary = "#780000" // deep red
    const neutralBorder = "#E6E9EE"
    const mutedText = "#6b7280" // similar to text-muted-foreground

    const orders = [
        {
            id: "MTW-2024-98765",
            date: "Dec 15, 2024",
            status: "Delivered",
            total: 3669.97,
            items: [
                { name: "Professional Bernina 570", quantity: 1, price: 3499.99 },
                { name: "Sewing Machine Carry Case", quantity: 1, price: 79.99 },
            ],
            estimatedDelivery: "Dec 18, 2024",
            trackingNumber: "1Z999AA10123456784",
        },
        {
            id: "MTW-2024-87654",
            date: "Nov 20, 2024",
            status: "In Transit",
            total: 189.98,
            items: [
                { name: "Universal Presser Feet Set", quantity: 1, price: 89.99 },
                { name: "Sewing Machine Oil & Cleaner Set", quantity: 2, price: 39.99 },
            ],
            estimatedDelivery: "Nov 24, 2024",
            trackingNumber: "1Z999BB20456789012",
        },
        {
            id: "MTW-2024-76543",
            date: "Oct 10, 2024",
            status: "Delivered",
            total: 2999.99,
            items: [{ name: "Janome Horizon Memory Craft 15000", quantity: 1, price: 2899.99 }],
            estimatedDelivery: "Oct 14, 2024",
            trackingNumber: "1Z999CC30789012345",
        },
    ]

    const statusColor = (status: string) => {
        switch (status) {
            case "Delivered":
                return "#16a34a" // green
            case "In Transit":
                return brandPrimary // use primary for active/in-progress
            default:
                return mutedText
        }
    }

    const getStatusIcon = (status: string) => {
        const color = statusColor(status)
        switch (status) {
            case "Delivered":
                return <CheckCircle2 size={20} color={color} />
            case "In Transit":
                return <Truck size={20} color={color} />
            default:
                return <Package size={20} color={color} />
        }
    }

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold" style={{ color: brandPrimary }}>
                        My Orders
                    </h1>
                    <Link to="/account">
                        <Button
                            variant="outline"
                            className="border-border hover:bg-muted bg-transparent"
                            style={{ borderColor: neutralBorder, color: brandPrimary }}
                        >
                            Back to Account
                        </Button>
                    </Link>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Card
                            key={order.id}
                            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                            style={{ borderColor: neutralBorder }}
                        >
                            {/* Order Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-2" style={{ color: brandPrimary }}>
                                        {order.id}
                                    </h3>
                                    <p className="text-sm" style={{ color: mutedText }}>
                                        Order placed on {order.date}
                                    </p>
                                </div>

                                <div className="text-right mr-6">
                                    <div className="flex items-center gap-2 font-semibold mb-2" style={{ color: statusColor(order.status) }}>
                                        {getStatusIcon(order.status)}
                                        <span>{order.status}</span>
                                    </div>
                                    <p className="text-2xl font-bold" style={{ color: brandPrimary }}>
                                        ${order.total.toFixed(2)}
                                    </p>
                                </div>

                                <ChevronRight
                                    size={24}
                                    style={{
                                        color: mutedText,
                                        transform: selectedOrder === order.id ? "rotate(90deg)" : "none",
                                        transition: "transform 150ms ease",
                                    }}
                                />
                            </div>

                            {/* Order Details - Expanded */}
                            {selectedOrder === order.id && (
                                <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${neutralBorder}` }}>
                                    <div className="space-y-6">
                                        {/* Items */}
                                        <div>
                                            <h4 className="font-semibold mb-3" style={{ color: brandPrimary }}>
                                                Items Ordered
                                            </h4>
                                            <div className="space-y-2">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between text-sm">
                                                        <span>{item.name}</span>
                                                        <span className="text-sm" style={{ color: mutedText }}>
                              x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                            </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Shipping Info */}
                                        <div>
                                            <h4 className="font-semibold mb-3" style={{ color: brandPrimary }}>
                                                Shipping & Tracking
                                            </h4>
                                            <div className="rounded-lg" style={{ background: "#F3F4F6", padding: 16 }}>
                                                <div className="flex justify-between text-sm" style={{ marginBottom: 8 }}>
                                                    <span style={{ color: mutedText }}>Status</span>
                                                    <span className="font-semibold" style={{ color: statusColor(order.status) }}>
                            {order.status}
                          </span>
                                                </div>
                                                <div className="flex justify-between text-sm" style={{ marginBottom: 8 }}>
                                                    <span style={{ color: mutedText }}>Est. Delivery</span>
                                                    <span className="font-semibold">{order.estimatedDelivery}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span style={{ color: mutedText }}>Tracking #</span>
                                                    <span className="font-semibold" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace" }}>
                            {order.trackingNumber}
                          </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                className="flex-1 hover:opacity-90"
                                                style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                                            >
                                                Track Package
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                style={{ borderColor: neutralBorder, color: brandPrimary, background: "transparent" }}
                                            >
                                                View Invoice
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                style={{ borderColor: neutralBorder, color: brandPrimary, background: "transparent" }}
                                            >
                                                Return Item
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {orders.length === 0 && (
                    <Card className="p-12 text-center" style={{ borderColor: neutralBorder }}>
                        <Package size={48} className="mx-auto mb-4" style={{ color: mutedText, opacity: 0.6 }} />
                        <h2 className="text-2xl font-bold mb-2" style={{ color: brandPrimary }}>
                            No Orders Yet
                        </h2>
                        <p className="mb-6" style={{ color: mutedText }}>
                            Start shopping to place your first order
                        </p>
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