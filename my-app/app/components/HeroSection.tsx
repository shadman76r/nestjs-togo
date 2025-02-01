import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <div className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/banner.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white p-6">
        <h1 className="text-4xl font-bold">Find Your Dream Home</h1>
        <p className="mt-4 text-lg">Search, rent, buy, or bid on properties with ease</p>
        <SearchBar />
      </div>
    </div>
  );
}
