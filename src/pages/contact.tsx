import { Phone, Mail, MapPin, Clock } from "lucide-react"

function Contact() {
    const phoneNumber = "+15551234567" // keep the plus for tel: links
    const whatsappNumber = "15551234567" // international format, no plus or spaces for wa.me
    const email = "info@macktrading.com"
    const whatsappMessage = "Hi, I would like to inquire about your products."
    const mapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.017380964992!2d79.92988917456212!3d6.835934493162088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25012dad0b74d%3A0x65316ff51bd395ac!2sMack%20Trading!5e1!3m2!1sen!2slk!4v1765006060525!5m2!1sen!2slk"

    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`


    return (
        <>
            <main className="min-h-screen bg-background">
                {/* Hero */}
                <section className="bg-gradient-to-r from-primary to-accent py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4">Contact Us</h1>
                        <p className="text-lg text-primary-foreground/90">Get in touch with our team today</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-bold text-primary mb-6">Get In Touch</h2>
                                <p className="text-lg text-foreground/70 mb-8">
                                    Have questions about our services or machines? We're here to help. Reach out to us using any of the
                                    methods below.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <Phone className="text-accent flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-primary mb-2">Phone</h3>
                                        <p className="text-foreground/70">+1 (555) 123-4567</p>
                                        <p className="text-sm text-foreground/60">Available Mon-Fri, 9AM-5PM EST</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <Mail className="text-accent flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-primary mb-2">Email</h3>
                                        <p className="text-foreground/70">info@macktrading.com</p>
                                        <p className="text-sm text-foreground/60">We respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <MapPin className="text-accent flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-primary mb-2">Address</h3>
                                        <p className="text-foreground/70">123 Craft Street</p>
                                        <p className="text-foreground/70">Tech City, TC 12345</p>
                                        <p className="text-foreground/70">United States</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <Clock className="text-accent flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-semibold text-primary mb-2">Business Hours</h3>
                                        <p className="text-foreground/70">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                                        <p className="text-foreground/70">Saturday & Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                                <a
                                    href={`tel:${phoneNumber}`}
                                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                    aria-label="Call Mack Trading"
                                >
                                    <Phone size={18} />
                                    Call Now
                                </a>

                                <a
                                    href={`mailto:${email}`}
                                    className="flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                    aria-label="Email Mack Trading"
                                >
                                    <Mail size={18} />
                                    Email Us
                                </a>

                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                    aria-label="Chat on WhatsApp with Mack Trading"
                                >
                                    {/* WhatsApp SVG icon (small, inline) */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.373 0 0 5.373 0 12a11.9 11.9 0 0 0 1.64 6.02L0 24l6.15-1.6A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 21.5c-1.49 0-2.95-.4-4.2-1.16l-.3-.18-3.65.95.97-3.56-.2-.3A9.5 9.5 0 1 1 21.5 12 9.48 9.48 0 0 1 12 21.5zM17.1 14.3c-.29-.15-1.71-.84-1.97-.93-.26-.08-.45-.15-.64.15s-.74.93-.9 1.12c-.16.19-.31.21-.6.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.6-2.01-.16-.29-.02-.45.13-.6.13-.12.29-.31.43-.46.15-.15.2-.26.3-.43.1-.16.05-.31-.02-.46-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48l-.55-.01c-.19 0-.5.07-.76.31-.26.23-1 1-1 2.44 0 1.44 1.03 2.83 1.17 3.03.15.19 2.01 3.07 4.87 4.3 1.36.58 1.92.62 2.62.52.42-.06 1.36-.56 1.55-1.1.19-.54.19-1.01.14-1.11-.05-.1-.17-.15-.36-.26z" />
                                    </svg>

                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Google Map Section */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[500px] h-full">
                            <iframe
                                src={mapLink}
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: "500px" }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map Location"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-primary text-center mb-16">Frequently Asked Questions</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {[
                                {
                                    q: "How long does a typical repair take?",
                                    a: "Most repairs are completed within 5-7 business days. Urgent repairs can often be done within 24-48 hours.",
                                },
                                {
                                    q: "What's your warranty on repairs?",
                                    a: "All repairs come with a 6-month warranty on parts and labor. Premium services include extended warranties.",
                                },
                                {
                                    q: "Do you work on vintage machines?",
                                    a: "Yes! We specialize in vintage and antique machine restoration. Bring in your heirloom machines.",
                                },
                                {
                                    q: "Can I drop off my machine for repair?",
                                    a: "Yes, we accept drop-offs during business hours. Please call ahead to schedule an appointment.",
                                },
                            ].map((faq, idx) => (
                                <div key={idx} className="bg-background rounded-lg p-6 border-2 border-border">
                                    <h3 className="font-semibold text-primary mb-3 text-lg">{faq.q}</h3>
                                    <p className="text-foreground/70">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Contact;