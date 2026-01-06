import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Check } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Card } from "../component/ui/card"
import { Button } from "../component/ui/button"
import {register} from "../services/user.ts";
import {toast, Toaster} from "react-hot-toast";

export default function SignupPage() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    })

    const [passwordStrength, setPasswordStrength] = useState(0)

    const brandPrimary = "#061653"
    const brandSecondary = "#780000"
    const neutralBorder = "#E6E9EE"
    const danger = brandSecondary
    const success = "#16a34a"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))

        if (name === "password") {
            let strength = 0
            if (value.length >= 8) strength++
            if (/[A-Z]/.test(value)) strength++
            if (/[0-9]/.test(value)) strength++
            if (/[^A-Za-z0-9]/.test(value)) strength++
            setPasswordStrength(strength)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            formData.name &&
            formData.email &&
            formData.password === formData.confirmPassword &&
            formData.agreeToTerms
        ) {
            const registerPromise = async () => {
                const response: any = await register(formData);

                if (response.code !== 201) {
                    throw new Error("Registration failed");
                }

                return response;
            };

            toast.promise(
                registerPromise(),
                {
                    loading: 'Creating account...',
                    success: () => {
                        setTimeout(() => {
                            navigate("/login");
                        }, 1500);
                        return "Account created successfully!";
                    },
                    error: (err) => {
                        console.log(err)
                        return "Registration failed. Please try again.";
                    },
                }
            );

        } else {
            toast.error("Please fix form errors");
        }
    }

    const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0
    const createDisabled = !passwordsMatch || !formData.agreeToTerms

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="p-8 w-full max-w-md shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: brandPrimary }}>
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* 3. First Name & Last Name ඉවත් කර Full Name Field එක දැම්මා */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                            style={{ border: `1px solid ${neutralBorder}` }}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                            style={{ border: `1px solid ${neutralBorder}` }}
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
                                className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                style={{ border: `1px solid ${neutralBorder}` }}
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
                        {/* Password Strength Meter */}
                        <div className="mt-2 flex gap-2 items-center">
                            <div className="flex-1 flex gap-1">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-2 flex-1 rounded-full transition-colors"
                                        style={{
                                            background:
                                                i < passwordStrength
                                                    ? i === 3
                                                        ? `linear-gradient(90deg, ${brandPrimary}, ${brandSecondary})`
                                                        : brandPrimary
                                                    : neutralBorder,
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="text-xs" style={{ color: passwordStrength < 2 ? danger : passwordStrength < 3 ? "#b45309" : success }}>
                                {passwordStrength < 2 ? "Weak" : passwordStrength < 3 ? "Fair" : "Strong"}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-background text-foreground focus:outline-none"
                                style={{
                                    border: `1px solid ${formData.confirmPassword && !passwordsMatch ? danger : neutralBorder}`,
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} color={brandPrimary} />
                                ) : (
                                    <Eye size={18} color={brandPrimary} />
                                )}
                            </button>
                        </div>
                        {formData.confirmPassword && passwordsMatch && (
                            <div className="flex items-center gap-1 text-xs mt-1" style={{ color: success }}>
                                <Check size={14} /> Passwords match
                            </div>
                        )}
                        {formData.confirmPassword && !passwordsMatch && (
                            <div className="text-xs mt-1" style={{ color: danger }}>
                                Passwords do not match
                            </div>
                        )}
                    </div>

                    <label className="flex items-start gap-2 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={Boolean(formData.agreeToTerms)}
                            onChange={handleChange}
                            className="w-4 h-4 rounded mt-0.5 cursor-pointer"
                            style={{ accentColor: brandPrimary }}
                            required
                        />
                        <span>
                            I agree to the{" "}
                            <button type="button" className="hover:underline" style={{ color: brandPrimary }}>
                                Terms &amp; Conditions
                            </button>{" "}
                            and{" "}
                            <button type="button" className="hover:underline" style={{ color: brandPrimary }}>
                                Privacy Policy
                            </button>
                        </span>
                    </label>

                    <Button
                        type="submit"
                        className="w-full py-2 font-semibold mt-6 transition-opacity"
                        style={{
                            backgroundColor: createDisabled ? "#CBD5E1" : brandPrimary,
                            color: createDisabled ? "#69707A" : "#ffffff",
                            cursor: createDisabled ? "not-allowed" : "pointer",
                            opacity: createDisabled ? 0.9 : 1,
                        }}
                        disabled={createDisabled}
                    >
                        Create Account
                    </Button>
                </form>

                <div className="space-y-3 my-6">
                    <button
                        className="w-full px-4 py-2 rounded-lg transition-colors font-medium hover:bg-gray-50"
                        style={{
                            border: `1px solid ${brandPrimary}`,
                            color: brandPrimary,
                            background: "transparent",
                        }}
                    >
                        Sign up with Google
                    </button>
                    {/*<button*/}
                    {/*    className="w-full px-4 py-2 rounded-lg transition-colors font-medium hover:bg-gray-50"*/}
                    {/*    style={{*/}
                    {/*        border: `1px solid ${brandPrimary}`,*/}
                    {/*        color: brandPrimary,*/}
                    {/*        background: "transparent",*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Sign up with Facebook*/}
                    {/*</button>*/}
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="hover:underline font-semibold"
                        style={{ color: brandPrimary }}
                    >
                        Sign in
                    </Link>
                </p>
            </Card>
            <Toaster position="top-center" reverseOrder={false} />
        </main>
    )
}