"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MenuBar: React.FC = ({}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="hidden md:flex flex-row justify-end gap-24 p-6 px-12">
        <button className="px-6 py-2 hover:cursor-pointer">About</button>
        <button className="px-6 py-2 hover:cursor-pointer">Pricing</button>
        <div className=" p-[2px] rounded-[10px] bg-gradient-to-br to-85% from-indigo-300 to-indigo-800">
          <button
            onClick={() => {
              router.push("/sign-in");
            }}
            className="px-6 py-2 hover:cursor-pointer bg-indigo-500 text-white rounded-lg"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden p-6 px-12">
        {/* Burger Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMenu}
        ></div>

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={toggleMenu}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col space-y-8 px-6 pt-8">
            <button
              onClick={toggleMenu}
              className="text-left text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors py-3 border-b border-gray-100"
            >
              Blog
            </button>
            <button
              onClick={toggleMenu}
              className="text-left text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors py-3 border-b border-gray-100"
            >
              Pricing
            </button>
            <button
              onClick={toggleMenu}
              className="text-left text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors py-3 border-b border-gray-100"
            >
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
