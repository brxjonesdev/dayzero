'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Journal', path: '/journal' },
    { name: 'Goals', path: '/goals' },
    { name: 'Tags', path: '/tags' },
    { name: 'Settings', path: '/settings' },
    { name: 'Account', path: '/account' },
  ];

  return (
    <nav className="font-onest">
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
