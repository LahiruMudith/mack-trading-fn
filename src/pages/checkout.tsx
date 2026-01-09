import type React from "react"
import { useState } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { CheckCircle2, MapPin, CreditCard, Home, Plus } from "lucide-react"
import { Link } from "react-router-dom"

// --- Mock Data for Saved Addresses ---
// In the future, fetch this using useEffect -> axios.get('/api/users/addresses')
const savedAddresses = [
    {
        id: "addr_1",
        type: "Home",
        firstName: "Lahiru",
        lastName: "Mudith",
        email: "lahiru@example.com",
        phone: "+94 77 123 4567",
        address: "123 Galle Road",
        city: "Colombo",
        state: "WP",
        zipCode: "00300"
    },
    {
        id: "addr_2",
        type: "Office",
        firstName: "Lahiru",
        lastName: "Mudith",
        email: "work@websonic.lk",
        phone: "+94 11 222 3333",
        address: "45 Tech Park, Trace City",
        city: "Maradana",
        state: "WP",
        zipCode: "01000"
    }
];

export default function Checkout() {
    const [step, setStep] = useState(1)
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)

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
        // If user types manually, deselect the "saved address" highlight to avoid confusion
        if (selectedAddressId && step === 1) setSelectedAddressId(null);
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectAddress = (address: any) => {
        setSelectedAddressId(address.id);
        setFormData(prev => ({
            ...prev,
            firstName: address.firstName,
            lastName: address.lastName,
            email: address.email,
            phone: address.phone,
            address: address.address,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode
        }));
    };

    const handleNewAddress = () => {
        setSelectedAddressId("new");
        setFormData(prev => ({
            ...prev,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: ""
        }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
    }

    const handlePrev = () => {
        if (step > 1) setStep(step - 1)
    }

    // Brand colors
    const brandPrimary = "#061653"
    const brandSecondary = "#780000"

    return (
        <main className="min-h-screen bg-background py-12">
            {/* Changed max-width to readable centered layout since sidebar is gone */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-8 px-10">
                        {[
                            { number: 1, label: "Shipping" },
                            { number: 2, label: "Payment" },
                            { number: 3, label: "Complete" },
                        ].map((item, index) => (
                            <div key={item.number} className="flex flex-col items-center relative z-10">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                                        step >= item.number
                                            ? ""
                                            : "bg-muted text-muted-foreground border border-border"
                                    }`}
                                    style={step >= item.number ? { backgroundColor: brandPrimary, color: "#ffffff" } : {}}
                                >
                                    {step > item.number ? <CheckCircle2 size={20} /> : item.number}
                                </div>
                                <p className="text-xs text-center text-muted-foreground font-medium">{item.label}</p>

                                {/* Connector Line (Visual only) */}
                                {index !== 2 && (
                                    <div className="absolute top-5 left-1/2 w-[200%] h-[2px] -z-10 bg-border"
                                         style={{
                                             left: "50%",
                                             width: "calc(100% * 6)", // Rough approximation for connector
                                             backgroundColor: step > item.number ? brandPrimary : undefined,
                                             opacity: step > item.number ? 0.3 : 1
                                         }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 1: Shipping */}
                {step === 1 && (
                    <Card className="p-8 shadow-md">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <MapPin size={24} style={{ color: brandPrimary }} /> Shipping Information
                        </h2>

                        {/* --- Address Selection Section --- */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Select Saved Address</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {savedAddresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        onClick={() => handleSelectAddress(addr)}
                                        className={`cursor-pointer border rounded-lg p-4 transition-all relative ${
                                            selectedAddressId === addr.id
                                                ? "ring-2 ring-offset-2 bg-blue-50/50"
                                                : "hover:border-gray-400 hover:bg-muted/50"
                                        }`}
                                        style={selectedAddressId === addr.id ? { ringColor: brandPrimary, borderColor: brandPrimary } : {}}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <Home size={16} className="text-muted-foreground" />
                                            <span className="font-bold text-sm">{addr.type}</span>
                                        </div>
                                        <p className="text-sm font-medium">{addr.address}</p>
                                        <p className="text-xs text-muted-foreground">{addr.city}, {addr.zipCode}</p>

                                        {selectedAddressId === addr.id && (
                                            <div className="absolute top-2 right-2">
                                                <CheckCircle2 size={16} style={{ color: brandPrimary }} />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* New Address Button */}
                                <div
                                    onClick={handleNewAddress}
                                    className={`cursor-pointer border border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                                        selectedAddressId === "new" ? "ring-2 ring-offset-2 border-solid" : "hover:bg-muted/50"
                                    }`}
                                    style={selectedAddressId === "new" ? { ringColor: brandPrimary, borderColor: brandPrimary } : {}}
                                >
                                    <Plus size={24} className="text-muted-foreground" />
                                    <span className="text-sm font-medium">Use New Address</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-border my-6"></div>

                        {/* --- Manual Input Form --- */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
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
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
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
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
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
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">State</label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2"
                                    >
                                        <option value="">Select</option>
                                        <option value="WP">Western Prov</option>
                                        <option value="SP">Southern Prov</option>
                                        <option value="CP">Central Prov</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Zip Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <Button
                                onClick={handleNext}
                                className="w-full sm:w-auto hover:opacity-90 px-8"
                                style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <Card className="p-8 shadow-md">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <CreditCard size={24} style={{ color: brandPrimary }} /> Payment Information
                        </h2>

                        <div className="space-y-4 max-w-lg mx-auto">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    value={formData.cardName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
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
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 font-mono"
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
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 font-mono"
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
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 font-mono"
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
                                className="hover:opacity-90 px-8"
                                style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                            >
                                Pay Now
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Step 3: Complete */}
                {step === 3 && (
                    <Card className="p-12 text-center shadow-lg">
                        <div className="mb-6">
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: `${brandPrimary}20` }} // 20% opacity hex
                            >
                                <CheckCircle2 size={40} color={brandPrimary} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                        </p>

                        <div className="bg-muted p-6 rounded-lg mb-8 text-left max-w-sm mx-auto border border-border">
                            <p className="text-sm font-semibold mb-1 text-muted-foreground">Order Number</p>
                            <p className="text-xl font-bold mb-4" style={{ color: brandSecondary }}>#ORD-71-2026</p>

                            <p className="text-sm font-semibold mb-1 text-muted-foreground">Shipping To</p>
                            <p className="text-sm font-medium">{formData.firstName} {formData.lastName}</p>
                            <p className="text-sm text-muted-foreground">{formData.address}, {formData.city}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/account/orders">
                                <Button className="w-full sm:w-auto min-w-[200px]" style={{ backgroundColor: brandPrimary, color: "#ffffff" }}>
                                    View Order Details
                                </Button>
                            </Link>
                            <Link to="/shop">
                                <Button variant="outline" className="w-full sm:w-auto min-w-[200px] border-border hover:bg-muted bg-transparent">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </div>
        </main>
    )
}