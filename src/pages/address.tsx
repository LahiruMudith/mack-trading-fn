import React, { useEffect, useRef, useState } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { Plus, Edit2, Trash2, MapPin, X, Loader2, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

// Import the service functions
import {
    getAllUserAddresses,
    createUserAddress,
    updateUserAddress,
    deleteUserAddress
} from "../services/address.ts";

// 1. Define Enum
export enum AddressType {
    "HOME" = "HOME",
    "WORK" = "WORK",
    "OTHER" = "OTHER"
}

type Addr = {
    _id: number | string
    type: string // Stores "HOME", "WORK", or "OTHER"
    address: string
    city: string
    state: string
    zipCode: string
    country: string,
    phone_number_01: string
    phone_number_02: string
    isDefault?: boolean
}

export default function Address() {
    const brandPrimary = "#061653"
    const brandSecondary = "#780000"
    const neutralBorder = "#E6E9EE"
    const mutedText = "#6b7280"

    // State for data
    const [addresses, setAddresses] = useState<Addr[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Reusable empty form
    const emptyForm: Addr = {
        _id: "",
        type: AddressType.HOME, // 2. Set Default to HOME
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Sri Lanka",
        phone_number_01: "",
        phone_number_02: "",
        isDefault: false,
    }

    // Modal form state
    const [modalOpen, setModalOpen] = useState(false)
    const [formData, setFormData] = useState<Addr>({ ...emptyForm })
    const [isEditingId, setIsEditingId] = useState<number | string | null>(null)

    // Refs
    const modalRef = useRef<HTMLDivElement | null>(null)
    const lastActiveElement = useRef<HTMLElement | null>(null)

    /* ---------- API Fetching ---------- */

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            const response = await getAllUserAddresses();
            const data = Array.isArray(response) ? response : (response.data || []);
            setAddresses(data);
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Could not load addresses");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch on Mount
    useEffect(() => {
        fetchAddresses();
    }, []);

    /* ---------- Actions ---------- */

    const handleAddNew = () => {
        lastActiveElement.current = document.activeElement as HTMLElement | null
        setFormData({ ...emptyForm })
        setIsEditingId(null)
        setModalOpen(true)
    }

    const handleEdit = (addr: Addr) => {
        lastActiveElement.current = document.activeElement as HTMLElement | null
        setFormData({ ...addr })
        setIsEditingId(addr._id)
        setModalOpen(true)
    }

    const handleDelete = (id: number | string) => {
        const isDefault = addresses.find((a) => a._id === id && a.isDefault === true)
        console.log(addresses)
        console.log(id)
        if (isDefault) {
            toast.error("Default address cannot be deleted.")
            return
        }

        toast((t) => (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: brandPrimary }}>Delete address?</div>
                    <div style={{ fontSize: 13, color: mutedText }}>This action cannot be undone.</div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: `1px solid ${neutralBorder}`,
                            background: "transparent",
                            color: brandPrimary,
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            toast.dismiss(t.id)
                            try {
                                await deleteUserAddress(id);
                                setAddresses((prev) => prev.filter((a) => a._id !== id))
                                if (isEditingId === id) {
                                    setModalOpen(false)
                                    setIsEditingId(null)
                                }
                                toast.success("Address deleted")
                            } catch (error) {
                                toast.error("Failed to delete address");
                            }
                        }}
                        style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: `1px solid ${brandSecondary}`,
                            background: brandSecondary,
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), { duration: Infinity })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        if (!formData.type || !formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.phone_number_01) {
            toast.error("Please fill in required fields.")
            return
        }

        try {
            if (isEditingId) {
                await updateUserAddress(isEditingId, formData);
                toast.success("Address updated");
            } else {
                await createUserAddress(formData);
                toast.success("Address added");
            }
            await fetchAddresses();
            closeModal();
        } catch (error: any) {
            toast.error(typeof error === 'string' ? error : "Failed to save address");
        }
    }

    const closeModal = () => {
        setModalOpen(false)
        setIsEditingId(null)
        setFormData({ ...emptyForm })
        setTimeout(() => {
            lastActiveElement.current?.focus()
            lastActiveElement.current = null
        }, 0)
    }

    /* ---------- Accessibility ---------- */
    useEffect(() => {
        if (!modalOpen) return
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        // Focus management logic remains
        // (Note: firstInputRef should be attached to the select if you want it focused first)

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation()
                closeModal()
            }
        }
        document.addEventListener("keydown", onKeyDown)
        return () => {
            document.body.style.overflow = originalOverflow
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [modalOpen, isEditingId])

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold" style={{ color: brandPrimary }}>
                        Saved Addresses
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

                <div className="mb-6 flex gap-3 items-center">
                    <Button
                        onClick={handleAddNew}
                        className="hover:opacity-90"
                        style={{ backgroundColor: brandPrimary, color: "#ffffff", borderColor: brandPrimary }}
                    >
                        <Plus size={18} style={{ marginRight: 8, color: "#ffffff" }} />
                        Add New Address
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="animate-spin text-gray-500" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {!Array.isArray(addresses) || addresses.length === 0 ? (
                            <div className="col-span-2 text-center py-10 text-gray-500">
                                No addresses found. Add one to get started.
                            </div>
                        ) : (
                            addresses.map((address) => (
                                <Card key={address._id} className="p-6 relative" style={{ borderColor: neutralBorder }}>
                                    {address.isDefault && (
                                        <div
                                            className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
                                            style={{
                                                backgroundColor: brandPrimary,
                                                color: "#ffffff",
                                                boxShadow: "0 1px 2px rgba(6,22,83,0.12)",
                                            }}
                                        >
                                            Default
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3 mb-4">
                                        <MapPin size={20} style={{ color: brandPrimary, marginTop: 4 }} />
                                        <div>
                                            <h3 className="font-bold text-lg" style={{ color: brandPrimary }}>
                                                {address.type}
                                            </h3>
                                            <p className="text-sm" style={{ color: mutedText }}>
                                                {address.address}
                                            </p>
                                            <p className="text-sm" style={{ color: mutedText }}>
                                                {address.city}, {address.state} {address.zipCode}
                                            </p>

                                            <div className="mt-2 space-y-1">
                                                <div className="flex items-center gap-2 text-sm" style={{ color: mutedText }}>
                                                    <Phone size={14} />
                                                    <span>{address.phone_number_01}</span>
                                                </div>
                                                {address.phone_number_02 && (
                                                    <div className="flex items-center gap-2 text-sm" style={{ color: mutedText }}>
                                                        <span className="w-3.5"></span>
                                                        <span>{address.phone_number_02}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t" style={{ borderColor: neutralBorder }}>
                                        <button
                                            onClick={() => handleEdit(address)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                                            style={{
                                                border: `1px solid ${neutralBorder}`,
                                                color: brandPrimary,
                                                background: "transparent",
                                            }}
                                        >
                                            <Edit2 size={18} />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(address._id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                                            style={{
                                                border: `1px solid ${brandSecondary}`,
                                                color: brandSecondary,
                                                background: "transparent",
                                            }}
                                        >
                                            <Trash2 size={16} style={{ color: brandSecondary }} />
                                            Delete
                                        </button>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="address-modal-title"
                >
                    <div
                        className="absolute inset-0"
                        style={{ background: "rgba(0,0,0,0.45)" }}
                        onClick={closeModal}
                    />
                    <div
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-full max-w-2xl"
                    >
                        <Card
                            className="p-6"
                            style={{
                                borderColor: neutralBorder,
                                boxShadow: "0 10px 30px rgba(6,22,83,0.12)",
                                borderRadius: 8,
                                background: "#ffffff",
                            }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 id="address-modal-title" className="text-lg font-semibold" style={{ color: brandPrimary }}>
                                    {isEditingId ? "Edit Address" : "Add New Address"}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    <X size={18} style={{ color: mutedText }} />
                                </button>
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSave()
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* 3. REPLACED INPUT WITH SELECT DROPDOWN */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Label</label>
                                        <div className="relative">
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 rounded-lg appearance-none bg-white"
                                                style={{ border: `1px solid ${neutralBorder}` }}
                                            >
                                                <option value={AddressType.HOME}>Home</option>
                                                <option value={AddressType.WORK}>Work</option>
                                                <option value={AddressType.OTHER}>Other</option>
                                            </select>
                                            {/* Dropdown Arrow Icon */}
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone 1 */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
                                        <input
                                            name="phone_number_01"
                                            value={formData.phone_number_01}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                            placeholder="+94 7X XXX XXXX"
                                        />
                                    </div>

                                    {/* Phone 2 */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Second Phone Number</label>
                                        <input
                                            name="phone_number_02"
                                            value={formData.phone_number_02}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                            placeholder="+94 7X XXX XXXX"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                            placeholder="123 Main Street"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">City</label>
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                        />
                                    </div>

                                    {/* State */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">State</label>
                                        <input
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                        />
                                    </div>

                                    {/* Zip Code */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Zip Code</label>
                                        <input
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 rounded-lg"
                                        style={{ border: `1px solid ${neutralBorder}` }}
                                    >
                                        Cancel
                                    </button>

                                    <Button
                                        type="submit"
                                        className="hover:opacity-90"
                                        style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            )}
            <Toaster position="top-right" reverseOrder={false} />
        </main>
    )
}