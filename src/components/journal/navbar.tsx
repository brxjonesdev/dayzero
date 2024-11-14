'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  const navItems = [
    { name: 'Home', path: '/journal/home' },
    { name: 'Goals', path: '/journal/goals' },
    { name: 'Tags', path: '/journal/tags' },
    { name: 'Settings', path: '/journal/settings' },
    { name: 'Account', path: '/journal/account' },
  ];

  return (
    <nav className="font-onest hidden lg:block">
      <ul className="flex gap-4">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <li
              key={item.path}
              className={
                pathname === item.path
                  ? 'dark:text-purple-300 text-cyan-300 font-bold underline underline-offset-4'
                  : ''
              }
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
