import { Wrench, Zap, Award, Truck, ArrowRight, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

const services = [
    {
        icon: Wrench,
        title: "Expert Repair",
        description: "Professional repair and maintenance for all major sewing machine brands",
    },
    {
        icon: Award,
        title: "Quality Machines",
        description: "New and refurbished sewing machines from trusted manufacturers",
    },
    {
        icon: Zap,
        title: "Fast Service",
        description: "Quick turnaround times without compromising on quality",
    },
    {
        icon: Truck,
        title: "Parts & Delivery",
        description: "Complete parts inventory with same-day delivery available",
    },
]

function Home() {

    return (
        <section>
            {/*welcome screen*/}
            <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 flex items-center">

                {/* --- Subtle Background Elements (Abstract Shapes) --- */}
                {/* These break up the flat white without cluttering it */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />


                {/* --- Main Content Grid --- */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full py-12 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                        {/* --- Left Column: Text Content --- */}
                        <div className="space-y-8 text-center lg:text-left animate-fade-in-up">

                            {/* Trust Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[#061653] text-sm font-semibold tracking-wide">
                                <Award size={16} className="text-[#780000]" />
                                <span>Trusted Quality Since 2003</span>
                            </div>

                            {/* Headings */}
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl font-extrabold text-[#061653] tracking-tight leading-[1.1]">
                                    Define Your <br />
                                    <span className="relative inline-block">
                                    Masterpiece.
                                        {/* Subtle underline effect */}
                                        <span className="absolute bottom-2 left-0 w-full h-3 bg-[#780000]/10 -z-10 skew-x-6"></span>
                                </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-[#780000] font-medium">
                                    Premium Sewing Machines & Expert Care.
                                </p>
                            </div>

                            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Experience precision, durability, and innovation with Mack Trading. We provide professional-grade equipment and expert repair services to elevate your craft.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <Link
                                    to="/shop"
                                    className="group relative px-8 py-4 bg-[#061653] text-white text-lg rounded-xl font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Browse Collection
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    to="/contact"
                                    className="group px-8 py-4 bg-white border-2 border-[#061653]/20 text-[#061653] text-lg rounded-xl font-bold hover:border-[#061653] hover:bg-[#061653]/5 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <MapPin size={20} />
                                    Visit Showroom
                                </Link>
                            </div>

                            {/* Stats block (Optional modern touch) */}
                            <div className="pt-8 flex gap-8 justify-center lg:justify-start border-t border-slate-200 mt-8">
                                <div>
                                    <p className="text-3xl font-bold text-[#061653]">20+</p>
                                    <p className="text-sm text-slate-500">Years Experience</p>
                                </div>
                                <div className="w-px bg-slate-200 h-12"></div>
                                <div>
                                    <p className="text-3xl font-bold text-[#061653]">5k+</p>
                                    <p className="text-sm text-slate-500">Happy Clients</p>
                                </div>
                            </div>
                        </div>


                        {/* --- Right Column: Hero Image --- */}
                        <div className="relative hidden lg:block animate-fade-in animate-delay-300">
                            {/* Abstract colored blob behind image to make it pop off the white background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#061653]/10 to-[#780000]/10 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] rotate-12 scale-90" />

                            {/* High-quality Hero Image */}
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                {/* Replace with a high-quality photo of your actual machines */}
                                <img
                                    src="https://res.cloudinary.com/dkidles6w/image/upload/v1767981164/mack-trading-web-site/item-photos/egfxsxfe5to9s3wrbskb.png"
                                    alt="Premium Modern Sewing Machine"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Floating accent (Optional) */}
                            <div className="absolute -bottom-6 -right-6 bg-[#780000] text-white p-4 rounded-2xl shadow-lg z-20">
                                <p className="font-bold text-lg">Pro Series</p>
                                <p className="text-sm opacity-90">Now Available</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

                {/* Scroll Indicator (Optional) */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
                    </div>
                </div>

            {/*service*/}
            <div className="py-24 bg-slate-50 relative overflow-hidden">
                {/* Subtle decorative background blob to tie into the hero section */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#061653]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="text-[#780000] font-bold tracking-wider uppercase text-sm">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#061653] mt-3 mb-6">
                            Why Choose Mack Trading
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            We combine decades of technical expertise with a commitment to quality, ensuring your equipment performs perfectly.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => {
                            const Icon = service.icon
                            return (
                                <div
                                    key={service.title}
                                    className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:-translate-y-2"
                                >
                                    {/* Icon Container */}
                                    <div className="flex justify-center mb-6">
                                        <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-2xl group-hover:bg-[#061653] transition-colors duration-300">
                                            <Icon
                                                aria-hidden="true"
                                                focusable="false"
                                                className="text-[#061653] group-hover:text-white transition-colors duration-300"
                                                size={32}
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-[#061653] mb-3 text-center">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-500 text-center leading-relaxed text-sm">
                                        {service.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/*shop*/}
            {/*<div className="py-20 bg-background">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*        <div className="text-center mb-16">*/}
            {/*            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Featured Machines</h2>*/}
            {/*            <p className="text-lg text-foreground/70">Discover our selection of new and expertly restored machines</p>*/}
            {/*        </div>*/}

            {/*        /!* Filter Buttons *!/*/}
            {/*        <div className="flex justify-center gap-4 mb-12">*/}
            {/*            {["all", "new", "used"].map((f) => (*/}
            {/*                <button*/}
            {/*                    key={f}*/}
            {/*                    onClick={() => setFilter(f)}*/}
            {/*                    aria-pressed={filter === f}*/}
            {/*                    title={`${f}`}*/}
            {/*                    className={`px-6 py-2 rounded-full font-semibold transition-colors capitalize ${*/}
            {/*                        filter === f ? "bg-[#071752] text-white" : "bg-muted text-foreground hover:bg-muted/80"*/}
            {/*                    }`}*/}
            {/*                >*/}
            {/*                    <span className="inline-flex items-center gap-2">*/}
            {/*                        {f}*/}
            {/*                    </span>*/}
            {/*                </button>*/}
            {/*            ))}*/}
            {/*        </div>*/}

            {/*        /!* Machines Grid *!/*/}
            {/*        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">*/}
            {/*            {filtered.map((machine) => (*/}
            {/*                <div*/}
            {/*                    key={machine.id}*/}
            {/*                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"*/}
            {/*                >*/}
            {/*                    <div className="relative h-64 bg-muted">*/}
            {/*                        <img*/}
            {/*                            src={machine.image || "/placeholder.svg"}*/}
            {/*                            alt={machine.name || "Sewing machine"}*/}
            {/*                            loading="lazy"*/}
            {/*                            className="object-cover w-full h-full"*/}
            {/*                        />*/}
            {/*                        <div*/}
            {/*                            className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold"*/}
            {/*                            aria-label={`Category: ${machine.category}`}*/}
            {/*                        >*/}
            {/*                            {machine.category}*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="p-4 space-y-3">*/}
            {/*                        <h3 className="font-semibold text-primary text-lg">{machine.name}</h3>*/}
            {/*                        <ul className="text-sm text-foreground/70 space-y-1">*/}
            {/*                            {machine.specs.map((spec, idx) => (*/}
            {/*                                <li key={`${machine.id}-spec-${idx}`} className="flex items-center gap-2">*/}
            {/*                                    <span className="w-1 h-1 bg-accent rounded-full" aria-hidden="true"></span>*/}
            {/*                                    {spec}*/}
            {/*                                </li>*/}
            {/*                            ))}*/}
            {/*                        </ul>*/}
            {/*                        <div className="flex items-end justify-between pt-2">*/}
            {/*                            <span className="text-2xl font-bold text-accent">{machine.price}</span>*/}
            {/*                            <Link*/}
            {/*                                to="/shop"*/}
            {/*                                aria-label={`View ${machine.name}`}*/}
            {/*                                className="text-primary hover:text-accent font-semibold text-sm transition-colors"*/}
            {/*                            >*/}
            {/*                                View →*/}
            {/*                            </Link>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}

            {/*        <div className="text-center mt-12">*/}
            {/*            <Link*/}
            {/*                to="/shop"*/}
            {/*                className="inline-block px-8 py-3 bg-[#780000] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"*/}
            {/*            >*/}
            {/*                View All Machines*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </section>
    )
}

export default Home