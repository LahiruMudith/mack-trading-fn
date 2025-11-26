import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#071752] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            <span className="text-accent">MACK</span> TRADING
                        </h3>
                        <p className="text-sm opacity-90">
                            Premium sewing machines and professional repair services for over 20 years.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/home" className="hover:text-accent transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="hover:text-accent transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/gallery" className="hover:text-accent transition-colors">
                                    Gallery
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-accent transition-colors">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/shop" className="hover:text-accent transition-colors">
                                    Shop
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                                <span>info@macktrading.com</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                                <span>123 Craft Street, Tech City, TC 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-primary-foreground/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-center items-center text-sm opacity-75">
                        <div>
                            <p>&copy; 2025 Mack Trading. All rights reserved</p>
                            <p>Developed by Lahiru Mudith</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
