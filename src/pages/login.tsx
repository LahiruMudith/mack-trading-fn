"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Card } from "../component/ui/card.tsx"
import { Button } from "../component/ui/button.tsx"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        // Basic example validation — replace with real auth call
        if (!formData.email || !formData.password) {
            setError("Please provide both email and password.")
            return
        }

        // Simulate success (replace this with API call)
        // Example: call an auth API, then setLoggedIn(true) on success
        setLoggedIn(true)
    }

    const handleLogout = () => {
        setLoggedIn(false)
        setFormData({ email: "", password: "" })
        setShowPassword(false)
        setError("")
    }

    if (loggedIn) {
        return (
            <Card className="p-8 w-full max-w-md justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
                <p className="mb-6 text-muted-foreground">You are now signed in.</p>
                <div className="flex gap-3">
                    <Button className="bg-accent text-accent-foreground" onClick={() => { /* go to dashboard */ }}>
                        Go to Dashboard
                    </Button>
                    <Button variant="outline" className="border-border" onClick={handleLogout}>
                        Sign out
                    </Button>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-8 w-full max-w-md justify-center items-center">
            <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>

            {error && <div className="mb-4 text-sm text-destructive">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
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
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="w-4 h-4 rounded border-border" />
                        Remember me
                    </label>
                    <button type="button" className="text-sm text-accent hover:underline">
                        Forgot Password?
                    </button>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:opacity-90 py-2 font-semibold mt-6"
                >
                    Sign In
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">Or</span>
                </div>
            </div>

            <div className="space-y-2">
                <button
                    type="button"
                    className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                    onClick={() => {
                        /* Integrate OAuth flow here */
                    }}
                >
                    Continue with Google
                </button>
                <button
                    type="button"
                    className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                    onClick={() => {
                        /* Integrate OAuth flow here */
                    }}
                >
                    Continue with Facebook
                </button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={() => {
                        /* show signup flow or navigate to signup page */
                    }}
                    className="text-accent hover:underline font-semibold"
                >
                    Sign up
                </button>
            </p>
        </Card>
    )
}