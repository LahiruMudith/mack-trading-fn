import {Link} from "react-router-dom";
import { CheckCircle, Award, Users, Heart } from "lucide-react"


const values = [
    { icon: Award, title: "Excellence", desc: "We strive for the highest quality in every repair and product" },
    { icon: Users, title: "Community", desc: "We support local artisans and crafters in our community" },
    { icon: Heart, title: "Care", desc: "We treat every machine with the care it deserves" },
    { icon: CheckCircle, title: "Integrity", desc: "Honest pricing and transparent communication always" },
]

const timeline = [
    { year: "2003", event: "Mack Trading opened and it grew to small in 2008 with 3 repair technicians and a full parts inventory. In 2008, it expanded to 3 repair technicians and a full parts inventory." },
    { year: "2015", event: "Recognized as the best machine repair service in the region." },
    { year: "2025", event: "Launched an online booking system and expanded service area. In December of 2025, we launched two brunches and in July of 2026, we launched a website." },
]

function About() {
    return (
        <>
            <main className="min-h-screen bg-background">
                {/* Our Story */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-4xl font-bold text-primary mb-4">Our Story</h2>
                                    <p className="text-lg text-foreground/70 mb-4">
                                        Mack Trading began in 2003 with a simple mission: to provide the highest quality sewing machines and
                                        professional repair services to our community.
                                    </p>
                                    <p className="text-lg text-foreground/70 mb-4">
                                        What started as a small repair shop has grown into a trusted name in the industry, serving thousands
                                        of satisfied customers from hobbyists to professional businesses.
                                    </p>
                                    <p className="text-lg text-foreground/70">
                                        Today, we remain committed to our roots: delivering excellence, integrity, and unmatched customer
                                        service in everything we do.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-muted rounded-lg h-96">
                                <img src="https://res.cloudinary.com/dkidles6w/image/upload/v1761119271/4_gpl6l7.jpg" alt="shop image" className={"w-full h-full object-cover"}/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-primary text-center mb-16">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, idx) => {
                                const Icon = value.icon
                                return (
                                    <div key={idx} className="text-center space-y-3">
                                        <div className="flex justify-center">
                                            <Icon className="text-accent" size={40} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-primary">{value.title}</h3>
                                        <p className="text-foreground/70">{value.desc}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-primary text-center mb-16">Our Journey</h2>
                        <div className="space-y-8">
                            {timeline.map((item, idx) => (
                                <div key={idx} className="flex gap-8 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-accent-foreground font-bold text-lg">
                                            {item.year}
                                        </div>
                                    </div>
                                    <div className="flex-grow pt-2">
                                        <p className="text-lg text-foreground">{item.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-primary text-center mb-4">Meet Our Team</h2>
                        <p className="text-lg text-foreground/70 text-center mb-16 max-w-2xl mx-auto">
                            Expert technicians with decades of combined experience in machine repair and restoration
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Michael Mack",
                                    role: "Founder & Lead Technician",
                                    expertise: "30+ years experience",
                                    imageUrl: "",
                                },
                                {
                                    name: "Sarah Chen",
                                    role: "Senior Technician",
                                    expertise: "Specialized in vintage machines",
                                    imageUrl: "",
                                },
                                {
                                    name: "James Rodriguez",
                                    role: "Parts Manager",
                                    expertise: "Inventory specialist",
                                    imageUrl: "",
                                },
                            ].map((member, idx) => (
                                <div key={idx} className="bg-background rounded-lg p-8 text-center border-2 border-border">
                                    <div className={`w-24 h-24 bg-accent/10 rounded-full mx-auto mb-4 ${member.imageUrl ? "" : "bg-foreground/10"}`}>
                                        {member.imageUrl ? (
                                            <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="blank-profile-picture"/>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                                    <p className="text-accent font-medium">{member.role}</p>
                                    <p className="text-sm text-foreground/70 mt-2">{member.expertise}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="text-center py-10 bg-white">
                    <Link
                        to="/shop"
                        className="inline-block px-8 py-3 bg-[#780000] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        Shop Products
                    </Link>
                </div>
            </main>
        </>
    );
}

export default About;
