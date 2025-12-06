import {ShoppingCart, User, Menu, X} from "lucide-react"
import { useState } from "react";
import {Link} from "react-router-dom";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        {label: "Home", href: "/"},
        {label: "About", href: "/about"},
        {label: "Gallery", href: "/gallery"},
        {label: "Contact", href: "/contact"},
        {label: "Shop", href: "/shop"},
    ]

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={"flex justify-between items-center h-16"}>
                    <Link to={"/"}>
                        <img
                            src={"https://res.cloudinary.com/dkidles6w/image/upload/v1763217901/logo-remove-bg_qapadg.png"}
                            width={120}/>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link to={item.href} key={item.href}
                               className="px-3 py-2 text-sm font-medium text-foreground hover:text-shadow-lg hover:text-accent hover:bg-muted rounded-md transition-colors">
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/cart"
                            className="relative p-2 text-foreground hover:text-accent transition-colors"
                            title="Shopping Cart"
                        >
                            <ShoppingCart size={20}/>
                            <span
                                className="absolute top-1 right-1 w-4 h-4 bg-[#DF1C11] text-white text-xs rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                        <Link
                            to="/account"
                            className="p-2 text-foreground hover:text-accent transition-colors"
                            title="My Account"
                        >
                            <User size={20}/>
                        </Link>
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="block px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="px-3 py-2 text-sm font-medium text-foreground">Shop</div>
                            <Link
                                to={"/shop"}
                                className="block pl-6 px-3 py-2 text-sm text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Shop
                            </Link>
                        <Link
                            to="/cart"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <ShoppingCart size={18} /> Cart
                        </Link>
                        <Link
                            to="/account"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-muted rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <User size={18} /> Account
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}