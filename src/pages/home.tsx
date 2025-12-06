import { Wrench, Zap, Award, Truck } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useMemo } from "react"

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

const machines = [
    {
        id: 1,
        name: "Professional Series 2000",
        category: "New",
        price: "$2,499",
        image: "/professional-sewing-machine.jpg",
        specs: ["Heavy-duty", "1000 stitches", "Digital display"],
    },
    {
        id: 2,
        name: "Heritage Classic",
        category: "Used",
        price: "$899",
        image: "/vintage-sewing-machine.jpg",
        specs: ["Fully restored", "Mechanical", "Excellent condition"],
    },
    {
        id: 3,
        name: "Smart Stitch Pro",
        category: "New",
        price: "$3,299",
        image: "/computerized-sewing-machine.jpg",
        specs: ["500 patterns", "Touch screen", "WiFi enabled"],
    },
    {
        id: 4,
        name: "Studio Compact",
        category: "New",
        price: "$1,299",
        image: "/compact-sewing-machine.jpg",
        specs: ["Space-saving", "Portable", "Perfect for beginners"],
    },
    {
        id: 5,
        name: "Precision Series 3000",
        category: "New",
        price: "$3,999",
        image: "/precision-sewing-machine.jpg",
        specs: ["High-precision", "1200 stitches", "Digital display"],
    },
    {
        id: 6,
        name: "Classic Series 1000",
        category: "Used",
        price: "$599",
        image: "/classic-sewing-machine.jpg",
        specs: ["Leather handle", "Mechanical", "Good condition"],
    }
]

function Home() {
    const [filter, setFilter] = useState("all")

    const filtered = useMemo(
        () => (filter === "all" ? machines : machines.filter((m) => m.category.toLowerCase() === filter.toLowerCase())),
        [filter]
    )

    return (
        <section>
            {/*welcome screen*/}
            <div className="relative h-screen bg-gradient-to-b from-slate-50 to-background overflow-hidden flex items-center">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-5xl md:text-7xl font-bold text-balance">
                                <span className="text-primary text-[#061653]">Premium Sewing Machines</span>
                            </h1>
                            <p className="text-2xl md:text-3xl text-accent font-semibold text-[#780000]">Trusted Since 2003</p>
                        </div>

                        <p className="text-lg text-foreground/80 max-w-2xl mx-auto text-pretty">
                            Experience precision, durability, and innovation with Mack Trading. From professional-grade equipment to
                            expert repair services.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Link
                                to="/shop"
                                className="px-8 py-3 bg-[#780000] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                            >
                                Browse Machines
                            </Link>
                            <Link
                                to="/contact"
                                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                Our Location
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/*service*/}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Why Choose Mack Trading</h2>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            We combine decades of expertise with modern technology to deliver exceptional service
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => {
                            const Icon = service.icon
                            return (
                                <div key={service.title} className="text-center space-y-4">
                                    <div className="flex justify-center">
                                        <div className="p-3 bg-accent/10 rounded-full">
                                            <Icon aria-hidden="true" focusable="false" className="text-accent" size={32} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                                    <p className="text-foreground/70">{service.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/*shop*/}
            <div className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Featured Machines</h2>
                        <p className="text-lg text-foreground/70">Discover our selection of new and expertly restored machines</p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex justify-center gap-4 mb-12">
                        {["all", "new", "used"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                aria-pressed={filter === f}
                                title={`${f}`}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors capitalize ${
                                    filter === f ? "bg-[#071752] text-white" : "bg-muted text-foreground hover:bg-muted/80"
                                }`}
                            >
                                <span className="inline-flex items-center gap-2">
                                    {f}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Machines Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filtered.map((machine) => (
                            <div
                                key={machine.id}
                                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                            >
                                <div className="relative h-64 bg-muted">
                                    <img
                                        src={machine.image || "/placeholder.svg"}
                                        alt={machine.name || "Sewing machine"}
                                        loading="lazy"
                                        className="object-cover w-full h-full"
                                    />
                                    <div
                                        className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold"
                                        aria-label={`Category: ${machine.category}`}
                                    >
                                        {machine.category}
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <h3 className="font-semibold text-primary text-lg">{machine.name}</h3>
                                    <ul className="text-sm text-foreground/70 space-y-1">
                                        {machine.specs.map((spec, idx) => (
                                            <li key={`${machine.id}-spec-${idx}`} className="flex items-center gap-2">
                                                <span className="w-1 h-1 bg-accent rounded-full" aria-hidden="true"></span>
                                                {spec}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex items-end justify-between pt-2">
                                        <span className="text-2xl font-bold text-accent">{machine.price}</span>
                                        <Link
                                            to="/shop"
                                            aria-label={`View ${machine.name}`}
                                            className="text-primary hover:text-accent font-semibold text-sm transition-colors"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/shop"
                            className="inline-block px-8 py-3 bg-[#780000] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            View All Machines
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home