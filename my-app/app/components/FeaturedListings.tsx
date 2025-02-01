import PropertyCard from "./PropertyCard";

export default function FeaturedListings() {
  const properties = [
    { id: 1, title: "Modern Apartment", price: "$1200/mo", image: "/images/house1.jpg" },
    { id: 2, title: "Cozy Family House", price: "$950/mo", image: "/images/house2.jpg" },
    { id: 3, title: "Luxury Villa", price: "$3000/mo", image: "/images/house3.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center">Featured Listings</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}
