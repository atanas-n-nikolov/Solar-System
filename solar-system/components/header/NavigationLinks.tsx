'use client';

import NavLink from '@/components/header/NavLink';
import { Translation } from '@/types/i18n';

export type NavLink = {
  href: string;
  label: string;
  auth?: 'any' | 'guest' | 'user';
};

interface NavigationLinksProps {
  links: NavLink[];
  t: Translation;
  onLinkClick?: () => void;
}

export default function NavigationLinks({
  links,
  t,
  onLinkClick,
}: NavigationLinksProps) {
  return (
    <ul className='flex gap-8'>
      {links.map((link, index) => {
        return (
          <li key={index} onClick={onLinkClick}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        );
      })}
    </ul>
  );
}
