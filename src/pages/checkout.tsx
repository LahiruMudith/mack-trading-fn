import type React from "react"

import { useState } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { CheckCircle2, MapPin, CreditCard } from "lucide-react"
import {Link} from "react-router-dom";

export default function Checkout() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleNext = () => {
        if (step < 4) setStep(step + 1)
    }

    const handlePrev = () => {
        if (step > 1) setStep(step - 1)
    }

    const cartItems = [
        { name: "Professional Bernina 570", price: 3499.99, quantity: 1 },
        { name: "Sewing Machine Carry Case", price: 79.99, quantity: 2 },
        { name: "Universal Presser Feet Set", price: 89.99, quantity: 1 },
    ]

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1
    const shipping = subtotal > 100 ? 0 : 15
    const total = subtotal + tax + shipping

    // Brand colors
    const brandPrimary = "#061653" // deep blue
    const brandSecondary = "#780000" // deep red

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-12">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Checkout Area */}
                    <div className="lg:col-span-2">
                        {/* Progress Steps */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-8">
                                {[
                                    { number: 1, label: "Shipping" },
                                    { number: 2, label: "Payment" },
                                    { number: 3, label: "Complete" },
                                ].map((item) => (
                                    <div key={item.number} className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                                                step >= item.number
                                                    ? "" // use inline styles for brand color below
                                                    : "bg-muted text-muted-foreground border border-border"
                                            }`}
                                            style={
                                                step >= item.number
                                                    ? { backgroundColor: brandPrimary, color: "#ffffff" }
                                                    : {}
                                            }
                                        >
                                            {step > item.number ? <CheckCircle2 size={20} color="#ffffff" /> : item.number}
                                        </div>
                                        <p className="text-xs text-center text-muted-foreground">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step 1: Shipping */}
                        {step === 1 && (
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin size={24} /> Shipping Information
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                            style={{ focus: { ringColor: brandPrimary } } as any}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="John"
                                                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="123 Main Street"
                                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="New York"
                                                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">State</label>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                            >
                                                <option value="">Select State</option>
                                                <option value="NY">New York</option>
                                                <option value="CA">California</option>
                                                <option value="TX">Texas</option>
                                                <option value="FL">Florida</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Zip Code</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                placeholder="10001"
                                                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button
                                        onClick={handleNext}
                                        className="hover:opacity-90"
                                        style={{ backgroundColor: brandPrimary, color: "#ffffff" } as any}
                                    >
                                        Continue to Payment
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <CreditCard size={24} /> Payment Information
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\s/g, "").slice(0, 16)
                                                value = value.replace(/(\d{4})/g, "$1 ").trim()
                                                handleChange({ ...e, target: { ...e.target, value } })
                                            }}
                                            placeholder="4532 1234 5678 9010"
                                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 font-mono"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/\D/g, "").slice(0, 4)
                                                    if (value.length >= 2) {
                                                        value = value.slice(0, 2) + "/" + value.slice(2)
                                                    }
                                                    handleChange({ ...e, target: { ...e.target, value } })
                                                }}
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 font-mono"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">CVC</label>
                                            <input
                                                type="text"
                                                name="cardCVC"
                                                value={formData.cardCVC}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, "").slice(0, 3)
                                                    handleChange({ ...e, target: { ...e.target, value } })
                                                }}
                                                placeholder="123"
                                                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <Button
                                        onClick={handlePrev}
                                        variant="outline"
                                        className="border-border hover:bg-muted bg-transparent"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={handleNext}
                                        className="hover:opacity-90"
                                        style={{ backgroundColor: brandPrimary, color: "#ffffff" } as any}
                                    >
                                        Review Order
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Step 4: Complete */}
                        {step === 3 && (
                            <Card className="p-8 text-center">
                                <div className="mb-6">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                        style={{ backgroundColor: brandPrimary, opacity: 0.12 }}
                                    >
                                        <CheckCircle2 size={32} color={brandPrimary} />
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
                                <p className="text-muted-foreground mb-8">
                                    Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                                </p>

                                <div className="bg-muted p-6 rounded-lg mb-8 text-left">
                                    <p className="text-sm font-semibold mb-2">Order Number</p>
                                    <p className="text-2xl font-bold" style={{ color: brandSecondary }}>
                                        #MTW-2024-98765
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-4">
                                        A confirmation email has been sent to {formData.email}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <Link to="/account/orders" className="block">
                                        <Button className="w-full hover:opacity-90" style={{ backgroundColor: brandPrimary, color: "#ffffff" } as any}>
                                            View Order Details
                                        </Button>
                                    </Link>
                                    <Link to="/shop" className="block">
                                        <Button variant="outline" className="w-full border-border hover:bg-muted bg-transparent">
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div>
                        <Card className="p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                            <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} <span className="text-xs">x{item.quantity}</span>
                    </span>
                                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-6 pb-6 border-b border-border">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (10%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Shipping {shipping === 0 && <span className="text-xs" style={{ color: brandPrimary }}>(Free)</span>}
                  </span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between mb-6 text-lg font-bold">
                                <span>Total</span>
                                <span style={{ color: brandPrimary }}>${total.toFixed(2)}</span>
                            </div>

                            {/* Trust Indicators */}
                            <div className="space-y-3 p-4 bg-muted rounded-lg text-xs">
                                <div className="flex gap-2">
                                    <span style={{ color: brandPrimary }}>✓</span>
                                    <span>Secure SSL encrypted</span>
                                </div>
                                <div className="flex gap-2">
                                    <span style={{ color: brandPrimary }}>✓</span>
                                    <span>30-day money back guarantee</span>
                                </div>
                                <div className="flex gap-2">
                                    <span style={{ color: brandPrimary }}>✓</span>
                                    <span>2 year warranty included</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}