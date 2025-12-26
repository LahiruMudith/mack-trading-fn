import React, { useEffect, useRef, useState } from "react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { Plus, Edit2, Trash2, MapPin, X } from "lucide-react"
import { Link } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

type Addr = {
    id: number
    name: string
    address: string
    city: string
    state: string
    zipCode: string
    phone: string
    isDefault?: boolean
}

export default function Address() {
    const brandPrimary = "#061653" // deep blue
    const brandSecondary = "#780000" // deep red
    const neutralBorder = "#E6E9EE"
    const mutedText = "#6b7280"

    const [addresses, setAddresses] = useState<Addr[]>([
        {
            id: 1,
            name: "Home",
            address: "123 Main Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            phone: "+1 (555) 123-4567",
            isDefault: true,
        },
        {
            id: 2,
            name: "Office",
            address: "456 Business Ave",
            city: "New York",
            state: "NY",
            zipCode: "10002",
            phone: "+1 (555) 987-6543",
            isDefault: false,
        },
    ])

    // Reusable empty form
    const emptyForm: Addr = {
        id: 0,
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        isDefault: false,
    }

    // Modal form state
    const [modalOpen, setModalOpen] = useState(false)
    const [formData, setFormData] = useState<Addr>({ ...emptyForm })
    const [isEditingId, setIsEditingId] = useState<number | null>(null)

    // Refs for accessibility & focus management
    const modalRef = useRef<HTMLDivElement | null>(null)
    const firstInputRef = useRef<HTMLInputElement | null>(null)
    const lastActiveElement = useRef<HTMLElement | null>(null)

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
        setIsEditingId(addr.id)
        setModalOpen(true)
    }

    // Delete address — replaced confirm() with react-hot-toast confirmation toast
    const handleDelete = (id: number) => {
        const isDefault = addresses.find((a) => a.isDefault === true)
        if (isDefault) {
            toast.error("Default address cannot be deleted.")
            return
        }

        // show an interactive toast with Cancel / Delete actions
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
                        onClick={() => {
                            // perform delete
                            setAddresses((prev) => prev.filter((a) => a.id !== id))

                            // if deleted address was being edited, close modal
                            if (isEditingId === id) {
                                setModalOpen(false)
                                setIsEditingId(null)
                                setFormData({ ...emptyForm })
                            }

                            // dismiss this confirmation toast and show success toast
                            toast.dismiss(t.id)
                            toast.success("Address deleted")
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
        ), {
            // Keep the toast visible until user chooses an action
            duration: Infinity,
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        // simple validation
        if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.phone) {
            toast.error("Please fill in all fields.")
            return
        }

        if (isEditingId) {
            setAddresses((prev) => prev.map((a) => (a.id === isEditingId ? { ...formData, id: isEditingId } : a)))
            toast.success("Address updated")
        } else {
            const newId = Date.now()
            setAddresses((prev) => prev.concat({ ...formData, id: newId, isDefault: false }))
            toast.success("Address added")
        }

        closeModal()
    }

    const closeModal = () => {
        setModalOpen(false)
        setIsEditingId(null)
        setFormData({ ...emptyForm })
        // restore focus to the element that opened the modal
        setTimeout(() => {
            lastActiveElement.current?.focus()
            lastActiveElement.current = null
        }, 0)
    }

    /* ---------- Accessibility & body scroll lock ---------- */

    useEffect(() => {
        if (!modalOpen) return

        // Lock body scroll
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        // Focus first input when modal opens
        setTimeout(() => {
            firstInputRef.current?.focus()
        }, 0)

        // Key handlers: ESC to close, Tab to trap focus
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.stopPropagation()
                closeModal()
            }

            if (e.key === "Tab") {
                const container = modalRef.current
                if (!container) return

                const focusable = Array.from(
                    container.querySelectorAll<HTMLElement>(
                        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                    )
                ).filter((el) => !el.hasAttribute("disabled"))

                if (focusable.length === 0) {
                    e.preventDefault()
                    return
                }

                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault()
                        last.focus()
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault()
                        first.focus()
                    }
                }
            }
        }

        document.addEventListener("keydown", onKeyDown)
        return () => {
            document.body.style.overflow = originalOverflow
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [modalOpen, isEditingId])

    /* ---------- Render ---------- */

    return (
        <main className="min-h-screen bg-background py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
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

                {/* Add Address Button */}
                <div className="mb-6 flex gap-3 items-center">
                    <Button
                        onClick={handleAddNew}
                        className="hover:opacity-90"
                        style={{ backgroundColor: brandPrimary, color: "#ffffff", borderColor: brandPrimary }}
                    >
                        <Plus size={18} style={{ marginRight: 8, color: "#ffffff" }} />
                        Add New Address
                    </Button>

                    <span style={{ color: mutedText }} className="text-sm">
            You can add, edit or remove saved addresses. The default address is shown on each card.
          </span>
                </div>

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                        <Card key={address.id} className="p-6 relative" style={{ borderColor: neutralBorder }}>
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
                                        {address.name}
                                    </h3>
                                    <p className="text-sm" style={{ color: mutedText }}>
                                        {address.address}
                                    </p>
                                    <p className="text-sm" style={{ color: mutedText }}>
                                        {address.city}, {address.state} {address.zipCode}
                                    </p>
                                    <p className="text-sm mt-2" style={{ color: mutedText }}>
                                        {address.phone}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
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
                                    onClick={() => handleDelete(address.id)}
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
                    ))}
                </div>
            </div>

            {/* Modal (Add / Edit) - improved layout & accessibility */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="address-modal-title"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0"
                        style={{ background: "rgba(0,0,0,0.45)" }}
                        onClick={closeModal}
                    />

                    {/* Modal content */}
                    <div
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()} // prevent backdrop click when interacting with modal
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
                                    aria-label="Close"
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
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Label</label>
                                        <input
                                            ref={firstInputRef}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                            placeholder="Home, Office, etc."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

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
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </main>
    )
}