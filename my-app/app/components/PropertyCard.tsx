import Image from "next/image";

export default function PropertyCard({ title, price, image }: { title: string; price: string; image: string }) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <Image src={image} alt={title} width={400} height={250} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{price}</p>
      </div>
    </div>
  );
}
