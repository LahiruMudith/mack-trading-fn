import { X } from "lucide-react"
import { useState } from "react"
import {getAllGalleries} from "../services/gallery.ts";

interface GalleryItem {
    _id:string
    image_url:string
    image_category:string
    title:string
    description:string
}

const galleryItems:any = await getAllGalleries()

function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

    const categories = ["all", "restoration", "machines", "workshop", "parts"]

    const filtered =
        selectedCategory === "all" ? galleryItems.data : galleryItems.data.filter((item:GalleryItem) => item.image_category === selectedCategory)

    const handleImageClick = (item:any) => {
        setSelectedItem(item)
        setLightboxOpen(true)
    }

    return (
        <>
            <main className="min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors capitalize ${
                                    selectedCategory === cat
                                        ? "bg-[#780000] text-white"
                                        : "bg-white text-wh border-2 border-border hover:border-accent"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((item:GalleryItem) => (
                            <div
                                key={item._id}
                                onClick={() => handleImageClick(item)}
                                className="group cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                                    <p className="text-white/80 text-sm">{item.description}</p>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 right-3 bg-[#780000] text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                                    {item.image_category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lightbox Modal */}
                {lightboxOpen && selectedItem && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setLightboxOpen(false)}
                                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
                            >
                                <X size={32} />
                            </button>

                            <div className="relative h-96 bg-black rounded-lg overflow-hidden">
                                <img
                                    src={selectedItem.image_url || "/placeholder.svg"}
                                    alt={selectedItem.title}
                                    className="object-cover"
                                />
                            </div>

                            <div className="mt-6 text-white space-y-3">
                                <h2 className="text-3xl font-bold">{selectedItem.title}</h2>
                                <p className="text-lg text-gray-300">{selectedItem.description}</p>
                                <p className="text-sm text-gray-400 uppercase font-semibold">{selectedItem.image_category}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default Gallery;
