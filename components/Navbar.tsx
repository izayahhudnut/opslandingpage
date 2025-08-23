"use client"

import Image from "next/image"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Sign In Section */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">Already have an account?</span>
            <button className="px-4 py-2 bg-gradient-to-r from-white/80 to-gray-200/80 hover:from-white hover:to-gray-200 text-gray-800 text-sm font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar