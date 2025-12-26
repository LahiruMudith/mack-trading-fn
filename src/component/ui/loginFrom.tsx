"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Card } from "../ui/card.tsx"
import { Button } from "../ui/button"

interface LoginFormProps {
    onLoginSuccess: () => void
    onSwitchToSignup: () => void
}

export default function LoginForm({ onLoginSuccess, onSwitchToSignup }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    // Brand colors
    const brandPrimary = "#061653" // deep blue
    const brandSecondary = "#780000" // deep red

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.email && formData.password) {
            onLoginSuccess()
        }
    }

    return (
        <Card className="p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6" style={{ color: brandPrimary }}>
                Welcome Back
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none"
                        style={{
                            borderColor: "#E6E9EE",
                        }}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none"
                            style={{
                                borderColor: "#E6E9EE",
                            }}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff size={18} color={brandPrimary} />
                            ) : (
                                <Eye size={18} color={brandPrimary} />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded"
                            style={{ borderColor: brandPrimary }}
                        />
                        Remember me
                    </label>
                    <button
                        type="button"
                        className="text-sm hover:underline"
                        style={{ color: brandPrimary }}
                    >
                        Forgot Password?
                    </button>
                </div>

                <Button
                    type="submit"
                    className="w-full hover:opacity-90 py-2 font-semibold mt-6"
                    style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                >
                    Sign In
                </Button>
            </form>


            <div className="space-y-2 my-5">
                <button
                    className="w-full px-4 py-2 border rounded-lg transition-colors font-medium"
                    style={{
                        borderColor: brandPrimary,
                        color: brandPrimary,
                    }}
                >
                    Continue with Google
                </button>
                <button
                    className="w-full px-4 py-2 border rounded-lg transition-colors font-medium"
                    style={{
                        borderColor: brandPrimary,
                        color: brandPrimary,
                    }}
                >
                    Continue with Facebook
                </button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <button
                    onClick={onSwitchToSignup}
                    className="hover:underline font-semibold"
                    style={{ color: brandSecondary }}
                >
                    Sign up
                </button>
            </p>
        </Card>
    )
}