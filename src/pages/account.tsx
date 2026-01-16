import React, { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"
import { Edit2, LogOut, User, MapPin, List, Shield, Activity, Lock } from "lucide-react" // Added Lock icon
import { Toaster, toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../lib/authSlice.ts";
import { persistor, type RootState } from '../store.ts';
import {getUserData, logoutUserAPI, updateUserDetails, updateUserPassword} from "../services/user.ts";
import { getAllUserAddresses } from "../services/address.ts"

interface MenuItem {
    href: string
    label: string
    icon: any
}

interface UserDataType {
    name: string;
    email: string;
    role: string;
    status: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone_1: string;
    phone_2: string;
    country: string;
}

export default function AccountPage() {
    // Brand colors
    const brandPrimary = "#061653"
    const brandSecondary = "#780000"
    const neutralBorder = "#E6E9EE"
    const mutedText = "#6b7280"

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userEmail = useSelector((state: RootState) => state.auth.email) as string;
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin)

    const [isEditing, setIsEditing] = useState(false)

    // --- 1. User Profile State ---
    const [userData, setUserData] = useState<UserDataType>({
        name: "",
        email: "",
        role: "",
        status: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone_1: "",
        phone_2: "",
        country: "",
    })

    const [formData, setFormData] = useState<UserDataType>(userData)

    // --- 2. Password Management State (NEW) ---
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const validateUser = async () => {
            try {
                const user: any = await getUserData(userEmail as string);

                if (user?.code === 200 && user.data) {
                    dispatch(login(userEmail));
                    const addressResponse: any = await getAllUserAddresses();
                    const addressList = addressResponse?.data || [];
                    const defaultAddr = addressList.find((addr: any) => addr.isDefault === true) || addressList[0];

                    let addressFields = {};
                    if (defaultAddr) {
                        addressFields = {
                            address: defaultAddr.address,
                            city: defaultAddr.city,
                            state: defaultAddr.state,
                            zipCode: defaultAddr.zip,
                            phone_1: defaultAddr.phone_number_01,
                            phone_2: defaultAddr.phone_number_02,
                            country: defaultAddr.country
                        };
                    }

                    const mappedData = {
                        ...userData,
                        ...user.data,
                        ...addressFields
                    };

                    setUserData(mappedData);
                    setFormData(mappedData);
                } else {
                    dispatch(logout());
                    await persistor.purge();
                    navigate("/login", { replace: true });
                }
            } catch (error) {
                console.error("Validation Error:", error);
                navigate("/login", { replace: true });
            }
        };

        if (userEmail) {
            validateUser();
        }
    }, [userEmail, dispatch, navigate]);

    // Handle Profile Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Handle Password Input Changes (NEW)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    // --- UPDATED: PROFILE SAVE LOGIC ---
    const handleSave = () => {
        // 1. Construct the payload (send only what you want to update)
        const payload = {
            name: formData.name,
            // If you add phone or other fields to the form, add them here
        };

        // 2. Call API with Toast Promise
        toast.promise(
            updateUserDetails(userEmail, payload),
            {
                loading: 'Updating profile...',
                success: (response) => {
                    // 3. On success, update local state and close edit mode
                    setUserData(prev => ({ ...prev, ...payload }));
                    setIsEditing(false);
                    return response.message;
                },
                error: (err) => <b>{err || "Could not save changes"}</b>
            }
        );
    }
    // Save Password Logic (NEW)
    const handleSavePassword = () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;

        // 1. Validation Checks
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters.");
            return;
        }

        // 2. Real API Call wrapped in Toast Promise
        toast.promise(
            updateUserPassword(currentPassword, newPassword),
            {
                loading: 'Verifying and updating...',
                success: () => {
                    // Clear the password fields on success
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    return <b>Password updated successfully!</b>;
                },
                // Display the specific error message from the backend (e.g., "Current password incorrect")
                error: (err) => <b>{err || "Failed to update password."}</b>,
            }
        );
    };

    const handleCancelEdit = () => {
        setFormData(userData)
        // Reset password fields on cancel
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
                    <button onClick={() => toast.dismiss(t.id)} style={{
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: `1px solid ${neutralBorder}`,
                        background: "transparent",
                        color: brandPrimary,
                        cursor: "pointer"
                    }}>Cancel
                    </button>
                    <button onClick={async () => {
                        toast.dismiss(t.id);

                        // 1. Call Backend Logout
                        await logoutUserAPI();

                        // 2. Clear Frontend State
                        dispatch(logout());
                        await persistor.purge();

                        // 3. Navigate
                        navigate("/login", { replace: true });
                    }} style={{
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: `1px solid ${brandSecondary}`,
                        background: brandSecondary,
                        color: "#fff",
                        cursor: "pointer"
                    }}>Yes
                    </button>
                </div>
            </div>
        ), { position: "top-center", duration: Infinity })
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
                <h1 className="text-4xl font-bold mb-8" style={{ color: brandPrimary }}>My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {menuItems.map((item) => (
                        <Link key={item.href} to={item.href}>
                            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer text-center"
                                  style={{ borderColor: neutralBorder }}>
                                <div className="text-4xl mb-3">
                                    {typeof item.icon === "string" ? item.icon :
                                        <item.icon size={32} className="mx-auto" style={{ color: brandPrimary }} />}
                                </div>
                                <p className="font-semibold text-sm" style={{ color: brandPrimary }}>{item.label}</p>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="p-8" style={{ borderColor: neutralBorder }}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold" style={{ color: brandPrimary }}>Personal
                                    Information</h2>
                                <button
                                    onClick={() => {
                                        isEditing ? handleSave() : setIsEditing(true)
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                                    style={{ color: brandPrimary }}
                                >
                                    <Edit2 size={18} />
                                    {isEditing ? "Save Profile" : "Edit Profile"}
                                </button>
                            </div>

                            {isEditing ? (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-bold">Account Role</p>
                                                <p className="font-medium flex items-center gap-2">
                                                    <Shield size={16} /> {formData.role || "N/A"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-bold">Status</p>
                                                <p className="font-medium flex items-center gap-2">
                                                    <Activity size={16} /> {formData.status || "N/A"}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Name</label>
                                            <input type="text" name="name" value={formData.name}
                                                   onChange={handleChange}
                                                   className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                                   style={{ border: `1px solid ${neutralBorder}` }} />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Email</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                                                   className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                                   style={{ border: `1px solid ${neutralBorder}` }}
                                                   disabled />
                                        </div>
                                    </div>

                                    <hr className="border-t" style={{ borderColor: neutralBorder }} />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: brandPrimary }}>
                                            <Lock size={20} /> Security
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="col-span-1 md:col-span-2">
                                                <label className="block text-sm font-semibold mb-2">Current Password</label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    placeholder="Enter current password"
                                                    value={passwordData.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    style={{ border: `1px solid ${neutralBorder}` }}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-2">New Password</label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    placeholder="Min 6 chars"
                                                    value={passwordData.newPassword}
                                                    onChange={handlePasswordChange}
                                                    className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    style={{ border: `1px solid ${neutralBorder}` }}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    placeholder="Re-type new password"
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    style={{ border: `1px solid ${neutralBorder}` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-2">
                                            <button
                                                onClick={handleSavePassword}
                                                className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                                                style={{ backgroundColor: "#374151", color: "#ffffff" }}
                                            >
                                                <Lock size={14} /> Update Password
                                            </button>
                                        </div>
                                    </div>

                                    <hr className="border-t" style={{ borderColor: neutralBorder }} />

                                    <div className="flex gap-3 pt-2">
                                        <Button onClick={handleSave} className="hover:opacity-90"
                                                style={{ backgroundColor: brandPrimary, color: "#ffffff" }}>Save
                                            Profile Info</Button>
                                        <button onClick={handleCancelEdit}
                                                className="px-6 py-2 rounded-lg hover:bg-muted transition-colors"
                                                style={{ border: `1px solid ${neutralBorder}` }}>Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                                            <p className="font-semibold text-lg">{userData.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Email</p>
                                            <p className="font-semibold">{userData.email}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t" style={{ borderColor: neutralBorder }}>
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Default
                                                Address</p>
                                            <span
                                                className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                                                Selected
                                            </span>
                                        </div>

                                        <div className="bg-gray-50 p-5 rounded-xl border"
                                             style={{ borderColor: neutralBorder }}>
                                            <div className="flex flex-col md:flex-row md:items-start gap-6">

                                                <div className="flex-1">
                                                    <p className="font-bold text-lg" style={{ color: brandPrimary }}>
                                                        {userData.address || "No address provided"}
                                                    </p>
                                                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                        <p>{userData.city}, {userData.state} {userData.zipCode}</p>
                                                        <p className="font-medium">{userData.country}</p>
                                                    </div>
                                                </div>

                                                <div
                                                    className="md:text-right border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6"
                                                    style={{ borderColor: neutralBorder }}>
                                                    <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Contact
                                                        Info</p>
                                                    {userData.phone_1 && (
                                                        <p className="text-sm text-muted-foreground mt-1">{userData.phone_1}</p>
                                                    )}
                                                    {userData.phone_2 && (
                                                        <p className="text-sm text-muted-foreground mt-1">{userData.phone_2}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="p-6" style={{ borderColor: neutralBorder }}>
                            <h3 className="font-bold text-lg mb-4" style={{ color: brandPrimary }}>
                                Account Status
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Current Status</span>
                                    <span className="font-semibold capitalize">{userData.status || "Active"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Role</span>
                                    <span className="font-semibold capitalize">{userData.role}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6" style={{ borderColor: neutralBorder }}>
                            <h3 className="font-bold text-lg mb-4" style={{ color: brandPrimary }}>
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <Link to="/orders">
                                    <button
                                        className="w-full text-left px-4 py-2 rounded-lg transition-colors"
                                        style={{ border: `1px solid ${neutralBorder}` }}
                                    >
                                        View Orders
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
        </main>
    )
}