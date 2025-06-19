import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="flex flex-col space-y-6 px-8 py-4">
      <Link href="#" className="text-black">Flats</Link>
      <Link href="#" className="text-black">Villas</Link>
      <Link href="#" className="text-black">Plots</Link>
      <Link href="#" className="text-black">Projects</Link>
      <Link href="#" className="text-black">Blog</Link>
      <Link href="/login" className="text-black">Login</Link>
      <Link
        href="#"
        className="bg-blue-800 text-white px-4 py-2 rounded-full font-semibold relative"
      >
        Post Property
        <span className="absolute -top-2 -right-2 text-xs font-bold text-yellow-400 bg-white rounded-full px-1">
          Free
        </span>
      </Link>
    </nav>
  );
}
