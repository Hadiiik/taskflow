import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-violet-50 text-violet-800 flex items-center justify-end py-4 px-6 shadow-lg sticky top-0 z-50">
      <Link className="text-xl font-bold hover:cursor-pointer hover:text-violet-700" href={"/"}>
        TaskFlow
      </Link>
    </header>
  );
}

export default Header;
