'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className='text-[color:var(--muted-text)]'
      href={href}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
