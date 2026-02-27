import React from "react";

const Navbar = () => {

  return (
    <nav className="overflow-x-hidden w-full transition-all duration-500 px-6 py-4 border border-b-[#4eff4e] bg-[#1fff1f15]">
      


        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer  ">
          <span className="text-xl font-bold tracking-tight  bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-teal-200">
            GoodPass
          </span>
        </div>


    </nav>
  );
};

export default Navbar;