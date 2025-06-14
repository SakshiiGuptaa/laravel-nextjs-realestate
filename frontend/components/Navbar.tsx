import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
<>      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold text-blue-600">roofandfloor<span className="text-sm text-gray-500">.com</span></span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-700">
          <Link href="#">Flats</Link>
          <Link href="#">Villas</Link>
          <Link href="#">Plots</Link>
          <Link href="#">Projects</Link>
          <Link href="#">Blog</Link>
          <Link href="/login">Login</Link>
          <Link
            href="#"
            className="bg-blue-800 text-white px-4 py-1.5 rounded-full font-semibold relative"
          >
            Post Property
            <span className="absolute -top-2 -right-2 text-xs font-bold text-yellow-400 bg-white rounded-full px-1">
              Free
            </span>
          </Link>
        </nav>
      </header>
</>
  )
}

export default Navbar
