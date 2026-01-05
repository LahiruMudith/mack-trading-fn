import React, { useState } from "react"
import {Link, Navigate} from "react-router-dom"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { Edit2, LogOut, User, MapPin, List } from "lucide-react"
import { Toaster, toast } from "react-hot-toast"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../lib/authSlice.ts";
import { type RootState } from '../store.ts';

interface MenuItem {
    href: string
    label: string
    icon: any
}

export default function AccountPage() {
    // Brand colors
    const brandPrimary = "#061653" // deep blue
    const brandSecondary = "#780000" // deep red
    const neutralBorder = "#E6E9EE"
    const mutedText = "#6b7280"

    const dispatch = useDispatch()

    const isLoggedIn = useSelector((state:RootState) => state.auth.isLogin)
    console.log(isLoggedIn)
    const [isEditing, setIsEditing] = useState(false)
    const [userData, setUserData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
    })

    const [formData, setFormData] = useState(userData)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        setUserData(formData)
        setIsEditing(false)
        toast("Changes Saved", { icon: "✅", duration:2500 })

    }

    const handleCancelEdit = () => {
        setFormData(userData)
        setIsEditing(false)
    }

    const handleLogout = () => {
        toast((t) => (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: brandPrimary }}>Logout?</div>
                    <div style={{ fontSize: 13, color: mutedText }}>Are you sure you want to logout?</div>
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
                            dispatch(logout())
                            toast.dismiss(t.id)
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
                        Yes
                    </button>
                </div>
            </div>
        ), {
            position: "top-center",
            duration: Infinity,
        })
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    const menuItems: MenuItem[] = [
        { href: "/account", label: "Profile", icon: User },
        { href: "/orders", label: "Orders", icon: List },
        { href: "/address", label: "Addresses", icon: MapPin },
    ]

    return (
        <main className="min-h-screen bg-background py-12">
            <Toaster position="top-right" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8" style={{ color: brandPrimary }}>
                    My Account
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {menuItems.map((item) => (
                        <Link key={item.href} to={item.href}>
                            <Card
                                className="p-6 hover:shadow-lg transition-shadow cursor-pointer text-center"
                                style={{ borderColor: neutralBorder }}
                            >
                                <div className="text-4xl mb-3">
                                    {typeof item.icon === "string" ? (
                                        item.icon
                                    ) : (
                                        <item.icon size={32} className="mx-auto" style={{ color: brandPrimary }} />
                                    )}
                                </div>
                                <p className="font-semibold text-sm" style={{ color: brandPrimary }}>
                                    {item.label}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card className="p-8" style={{ borderColor: neutralBorder }}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold" style={{ color: brandPrimary }}>
                                    Personal Information
                                </h2>
                                <button
                                    onClick={() => {
                                        if (isEditing) handleSave()
                                        else {
                                            setIsEditing(true)
                                        }
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                                    style={{ color: brandPrimary }}
                                >
                                    <Edit2 size={18} />
                                    {isEditing ? "Save" : "Edit"}
                                </button>
                            </div>

                            {isEditing ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                                style={{ border: `1px solid ${neutralBorder}` }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                                style={{ border: `1px solid ${neutralBorder}` }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                            style={{ border: `1px solid ${neutralBorder}` }}
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
                                                className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                                style={{ border: `1px solid ${neutralBorder}` }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">State</label>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                                style={{ border: `1px solid ${neutralBorder}` }}
                                            >
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
                                                className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                                style={{ border: `1px solid ${neutralBorder}` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            onClick={handleSave}
                                            className="hover:opacity-90"
                                            style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                                        >
                                            Save Changes
                                        </Button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="px-6 py-2 rounded-lg hover:bg-muted transition-colors"
                                            style={{ border: `1px solid ${neutralBorder}` }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">First Name</p>
                                            <p className="font-semibold">{userData.firstName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Last Name</p>
                                            <p className="font-semibold">{userData.lastName}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                                        <p className="font-semibold">{userData.email}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                                        <p className="font-semibold">{userData.phone}</p>
                                    </div>

                                    <div className="pt-4 border-t" style={{ borderColor: neutralBorder }}>
                                        <p className="text-sm text-muted-foreground mb-3">Default Address</p>
                                        <p className="font-semibold">{userData.address}</p>
                                        <p className="text-muted-foreground">
                                            {userData.city}, {userData.state} {userData.zipCode}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Account Status */}
                        <Card className="p-6" style={{ borderColor: neutralBorder }}>
                            <h3 className="font-bold text-lg mb-4" style={{ color: brandPrimary }}>
                                Account Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Member Since</span>
                                    <span className="font-semibold">Jan 2024</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Total Orders</span>
                                    <span className="font-semibold">12</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Loyalty Points</span>
                                    <span className="font-semibold" style={{ color: brandPrimary }}>
                    2,450
                  </span>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Links */}
                        <Card className="p-6" style={{ borderColor: neutralBorder }}>
                            <h3 className="font-bold text-lg mb-4" style={{ color: brandPrimary }}>
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <Link to="/account/orders">
                                    <button
                                        className="w-full text-left px-4 py-2 rounded-lg transition-colors"
                                        style={{ border: `1px solid ${neutralBorder}` }}
                                    >
                                        View Orders
                                    </button>
                                </Link>
                                <Link to="/shop">
                                    <button
                                        className="w-full text-left px-4 py-2 rounded-lg transition-colors"
                                        style={{ border: `1px solid ${neutralBorder}` }}
                                    >
                                        Continue Shopping
                                    </button>
                                </Link>
                                <button
                                    className="w-full text-left px-4 py-2 rounded-lg transition-colors"
                                    style={{ border: `1px solid ${neutralBorder}` }}
                                >
                                    Download Invoices
                                </button>
                            </div>
                        </Card>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium"
                            style={{
                                border: `1px solid ${brandSecondary}`,
                                color: brandSecondary,
                                background: "transparent",
                            }}
                        >
                            <LogOut size={18} style={{ color: brandSecondary }} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </main>
    )
}