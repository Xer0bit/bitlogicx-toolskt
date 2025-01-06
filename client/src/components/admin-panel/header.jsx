import React from "react";
import { Menu } from "lucide-react";
import { SquareUser } from "lucide-react";
const Header = ({ currentPath }) => {
  return (
    <div className="w-4/5 z-50 flex items-center border-b mb-5 fixed bg-white/5 backdrop-blur-md justify-between py-5">
      <div className="flex items-center gap-10 ">
        <Menu className=" cursor-pointer" size={35} />
        <span className=" text-lg text-gray-700 opacity-80">
          Admin / {currentPath}
        </span>
      </div>
      <SquareUser className=" cursor-pointer" size={35} />
    </div>
  );
};

export default Header;
