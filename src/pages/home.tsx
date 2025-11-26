import {Link} from "react-router-dom";

function Home() {
    return (
        <section className="w-full h-[90vh]">
            <div className="max-w-7xl mx-auto px-6 sm:px-4 lg:px-8">
                <div className="flex flex-col items-center text-center gap-3 py-20 md:py-45">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#061652] leading-tight">
                        Premium Sewing Machines
                    </h1>

                    <h3 className="text-lg sm:text-xl md:text-2xl text-[#78082E] font-medium">
                        Trusted Since 2003
                    </h3>

                    <p className="max-w-2xl text-base sm:text-lg text-gray-700">
                        Experience precision, durability, and innovation with Mack Trading. From professional-grade
                        equipment to expert repair services.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <Link to="/" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-[#78082E] text-white px-6 py-3 font-medium rounded-md shadow-sm">
                                Browse Machines
                            </button>
                        </Link>

                        <Link to="/" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-[#061652] text-white px-6 py-3 font-medium rounded-md shadow-sm hover:opacity-95 transition">
                                Our Location
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
