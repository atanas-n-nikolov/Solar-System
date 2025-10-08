'use client';

import NavLink from '@/components/header/NavLink';
import { Translation } from '@/types/i18n';

export type NavLinkType = {
  href: string;
  label: string;
  auth?: 'any' | 'guest' | 'user';
};

interface NavigationLinksProps {
  isLoggedIn?: boolean;
  vertical?: boolean;
  links?: NavLinkType[];
  t: Translation;
  onLinkClick?: () => void;
}

export default function NavigationLinks({
  isLoggedIn,
  links: linksArr,
  t,
  onLinkClick,
}: NavigationLinksProps) {
  const links: NavLinkType[] = linksArr
    ? linksArr
    : [
        { href: '/', label: t.home ?? '', auth: 'guest' },
        { href: '/planets', label: t.planets ?? '', auth: 'guest' },
        { href: '/contact', label: t.contact_us ?? '', auth: 'guest' },
        ...(isLoggedIn
          ? ([
              { href: '/score', label: t.leaderboard ?? '', auth: 'user' },
              { href: '/logout', label: t.logout ?? '', auth: 'user' },
            ] as const)
          : []),
      ];

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
