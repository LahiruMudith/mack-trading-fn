import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Card } from "../component/ui/card"
import { Button } from "../component/ui/button"
import { login } from "../lib/authSlice"

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    // Brand colors
    const brandPrimary = "#061653"
    const brandSecondary = "#780000"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.email && formData.password) {
            dispatch(login(formData.email))

            navigate("/account")
        } else {
            alert("Please fill in all fields")
        }
    }

    return (
        <main className="bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="p-8 w-full max-w-md shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: brandPrimary }}>
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
                            className="w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                            style={{
                                borderColor: "#E6E9EE",
                                outlineColor: brandPrimary
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
                                className="w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2"
                                style={{
                                    borderColor: "#E6E9EE",
                                    outlineColor: brandPrimary
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
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

                    <div className="flex items-center justify-self-end">
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
                        className="w-full hover:opacity-90 py-2 font-semibold mt-6 transition-opacity"
                        style={{ backgroundColor: brandPrimary, color: "#ffffff" }}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        className="w-full px-4 py-2 border rounded-lg transition-colors font-medium hover:bg-gray-50 flex justify-center items-center"
                        style={{
                            borderColor: brandPrimary,
                            color: brandPrimary,
                        }}
                    >
                        Google
                    </button>
                    <button
                        className="w-full px-4 py-2 border rounded-lg transition-colors font-medium hover:bg-gray-50 flex justify-center items-center"
                        style={{
                            borderColor: brandPrimary,
                            color: brandPrimary,
                        }}
                    >
                        Facebook
                    </button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    Don't have an account?{" "}
                    <Link
                        to="/sign-up"
                        className="hover:underline font-semibold"
                        style={{ color: brandSecondary }}
                    >
                        Sign up
                    </Link>
                </p>
            </Card>
        </main>
    )
}