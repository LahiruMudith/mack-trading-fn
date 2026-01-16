import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { CheckCircle2, MapPin, CreditCard, Home, Plus, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import type { RootState } from "../store.ts";

// --- Import Services ---
import { getAllUserAddresses, type AddressBackendType } from "../services/address.ts";
import { getTotalAmount } from "../services/cart.ts";
import { createOrderAPI } from "../services/order.ts";

// --- Fix 1: Add PayHere Type Definition ---
declare global {
    interface Window {
        payhere: any;
    }
}

export default function Checkout() {
    const [step, setStep] = useState(1)

    // State for real addresses
    const [savedAddresses, setSavedAddresses] = useState<AddressBackendType[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | number | null>(null);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
    const [cartTotal, setCartTotal] = useState(0);

    // --- Fix 2: Call useSelector at top level ---
    const userEmail = useSelector((state: RootState) => state.auth.email);

    const [formData, setFormData] = useState({
        email: userEmail || "",
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        phone2: "",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
    })

    // --- 1. Fetch Addresses on Mount ---
    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const response = await getAllUserAddresses();
                if (response && Array.isArray(response.data)) {
                    setSavedAddresses(response.data);
                }
            } catch (error) {
                console.error("Failed to load addresses", error);
            } finally {
                setIsLoadingAddresses(false);
            }
        };
        loadAddresses();
    }, []);

    // --- Fix 3: Fix Infinite Loop in Dependency Array ---
    useEffect(() => {
        const loadCartData = async () => {
            try {
                const data = await getTotalAmount();
                if (data) {
                    setCartTotal(data);
                }
            } catch (error) {
                console.error("Failed to load cart total", error);
            }
        };
        loadCartData();
    }, []); // Empty array = run once on mount

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        // If user types manually, deselect the "saved address" highlight
        if (selectedAddressId && step === 1) setSelectedAddressId(null);
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // --- 2. Map Backend Data to Form ---
    const handleSelectAddress = (addr: any) => {
        if (!addr._id) return;

        setSelectedAddressId(addr._id);

        setFormData(prev => ({
            ...prev,
            address: addr.address,
            city: addr.city,
            state: addr.state,
            zipCode: addr.zip || addr.zipCode || "",
            phone: addr.phone_number_01 || "",
            phone2: addr.phone_number_02 || "",
        }));
    };

    const handleNewAddress = () => {
        setSelectedAddressId("new");
        setFormData(prev => ({
            ...prev,
            address: "",
            city: "",
            state: "",
            zipCode: "",
            phone: "",
            phone2: ""
        }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
    }

    const handlePrev = () => {
        if (step > 1) setStep(step - 1)
    }

    const brandPrimary = "#061653"
    console.log(selectedAddressId)

    // --- PayHere Payment Logic ---
    const handlePayHerePayment = async () => {
        try {
            // 1. Validation
            console.log(selectedAddressId)
            if (!selectedAddressId || selectedAddressId === "new") {
                alert("Please select a saved address to proceed (or save your new address first).");
                return;
            }

            // 2. Create Order & Get PayHere Data
            const response = await createOrderAPI(selectedAddressId.toString());
            const { payhere_data } = response;

            // 3. Define PayHere Callbacks
            window.payhere.onCompleted = function onCompleted(orderId: string) {
                console.log("Payment completed. OrderID:" + orderId);
                setStep(3);
            };

            window.payhere.onDismissed = function onDismissed() {
                console.log("Payment dismissed");
            };

            window.payhere.onError = function onError(error: string) {
                console.log("Error:" + error);
                alert("Payment Error: " + error);
            };

            // 4. Prepare Payment Object
            const payment = {
                sandbox: true,
                merchant_id: payhere_data.merchant_id,
                return_url: payhere_data.return_url,
                cancel_url: payhere_data.cancel_url,
                notify_url: payhere_data.notify_url,
                order_id: payhere_data.order_id,
                items: payhere_data.items,
                amount: payhere_data.amount,
                currency: payhere_data.currency,
                hash: payhere_data.hash,
                first_name: payhere_data.first_name,
                last_name: payhere_data.last_name,
                email: payhere_data.email,
                phone: payhere_data.phone,
                address: payhere_data.address,
                city: payhere_data.city,
                country: payhere_data.country,
                delivery_address: payhere_data.address,
                delivery_city: payhere_data.city,
                delivery_country: payhere_data.country,
            };

            // 5. Open Popup
            if (window.payhere) {
                window.payhere.startPayment(payment);
            } else {
                alert("PayHere SDK is not loaded. Please refresh.");
            }

        } catch (error: any) {
            console.error("Failed to initiate order", error);
            alert(typeof error === "string" ? error : "Could not initiate order. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-background py-12">
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

                                {index !== 2 && (
                                    <div className="absolute top-5 left-1/2 w-[200%] h-[2px] -z-10 bg-border"
                                         style={{
                                             left: "50%",
                                             width: "calc(100% * 6)",
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

                            {isLoadingAddresses ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="animate-spin" size={16} /> Loading addresses...
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {savedAddresses.map((addr: any) => (
                                        <div
                                            key={addr._id}
                                            onClick={() => handleSelectAddress(addr)}
                                            className={`cursor-pointer border rounded-lg p-4 transition-all relative ${
                                                selectedAddressId === addr._id
                                                    ? "bg-blue-50/50"
                                                    : "hover:border-gray-400 hover:bg-muted/50"
                                            }`}
                                            style={
                                                selectedAddressId === addr._id
                                                    ? {
                                                        borderColor: brandPrimary,
                                                        boxShadow: `0 0 0 2px ${brandPrimary}`
                                                    }
                                                    : {}
                                            }
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Home size={16} className="text-muted-foreground" />
                                                <span className="font-bold text-sm">{addr.type}</span>
                                            </div>
                                            <p className="text-sm font-medium truncate">{addr.address}</p>
                                            <p className="text-xs text-muted-foreground">{addr.city}, {addr.zip || addr.zipCode}</p>

                                            {selectedAddressId === addr._id && (
                                                <div className="absolute top-2 right-2">
                                                    <CheckCircle2 size={16} style={{ color: brandPrimary }} />
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div
                                        onClick={handleNewAddress}
                                        className={`cursor-pointer border border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                                            selectedAddressId === "new" ? "border-solid" : "hover:bg-muted/50"
                                        }`}
                                        style={
                                            selectedAddressId === "new"
                                                ? {
                                                    borderColor: brandPrimary,
                                                    boxShadow: `0 0 0 2px ${brandPrimary}`
                                                }
                                                : {}
                                        }
                                    >
                                        <Plus size={24} className="text-muted-foreground" />
                                        <span className="text-sm font-medium">Use New Address</span>
                                    </div>
                                </div>
                            )}
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
                                    <label className="block text-sm font-semibold mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Phone Number 1</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Primary Contact"
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Phone Number 2</label>
                                    <input
                                        type="tel"
                                        name="phone2"
                                        value={formData.phone2}
                                        onChange={handleChange}
                                        placeholder="Secondary Contact"
                                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
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
                                        <option value="Western Province">Western Province</option>
                                        <option value="Southern Province">Southern Province</option>
                                        <option value="Central Province">Central Province</option>
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
                                className="w-full sm:w-auto hover:opacity-90 px-8 cursor-pointer"
                                style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Step 2: Payment Review & PayHere */}
                {step === 2 && (
                    <Card className="p-8 shadow-md">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <CreditCard size={24} style={{ color: brandPrimary }} /> Payment Method
                        </h2>

                        <div className="space-y-6">
                            {/* Billing Summary */}
                            <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">Billing Name</span>
                                    <span className="font-medium">{formData.name}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-muted-foreground">Email</span>
                                    <span className="font-medium">{formData.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Total Amount</span>
                                    {/* --- Fix 4: Format Currency --- */}
                                    <span className="text-lg font-bold" style={{ color: brandPrimary }}>
                                        LKR {cartTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* PayHere Logo */}
                            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                                <img
                                    src="https://www.payhere.lk/downloads/images/payhere_square_banner.png"
                                    alt="PayHere"
                                    className="w-16 h-16 object-contain rounded-md"
                                />
                                <div>
                                    <h3 className="font-semibold">Pay Securely with PayHere</h3>
                                    <p className="text-sm text-muted-foreground">Visa, MasterCard, Amex, eZ Cash, mCash, etc.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between">
                            <Button
                                onClick={handlePrev}
                                variant="outline"
                                className="border-border hover:bg-muted bg-transparent cursor-pointer"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handlePayHerePayment}
                                className="hover:opacity-90 px-8 cursor-pointer"
                                style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                            >
                                Pay with PayHere
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Step 3: Complete */}
                {step === 3 && (
                    <Card className="p-12 text-center shadow-lg">
                        <div className="mb-6">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${brandPrimary}20` }}>
                                <CheckCircle2 size={40} color={brandPrimary} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
                        <div className="bg-muted p-6 rounded-lg mb-8 text-left max-w-sm mx-auto border border-border">
                            <p className="text-sm font-semibold mb-1 text-muted-foreground">Shipping To</p>
                            <p className="text-sm font-medium">{formData.name}</p>
                            <p className="text-sm text-muted-foreground">{formData.address}, {formData.city}</p>
                            <p className="text-sm text-muted-foreground mt-2">Contact: {formData.phone}</p>
                            {formData.phone2 && <p className="text-sm text-muted-foreground">Alt: {formData.phone2}</p>}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/orders"><Button className="w-full sm:w-auto min-w-[200px] cursor-pointer" style={{ backgroundColor: brandPrimary, color: "#ffffff" }}>View Order Details</Button></Link>
                            <Link to="/shop"><Button variant="outline" className="w-full sm:w-auto min-w-[200px] border-border hover:bg-muted bg-transparent cursor-pointer">Continue Shopping</Button></Link>
                        </div>
                    </Card>
                )}
            </div>
        </main>
    )
}