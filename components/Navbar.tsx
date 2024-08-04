import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ToggleMode";

const Navbar = () => {
  return (
    <nav className="container flex justify-between items-center py-6 border-b border-slate-200">
      <Link href="/" className="text-3xl font-bold">
        Sheharyar&apos;s <span className="text-blue-500">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
