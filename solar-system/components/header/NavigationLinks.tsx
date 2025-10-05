'use client';

import NavLink from '@/components/header/NavLink';
import { createClient } from '@/lib/supabase/client';
import { Translation } from '@/types/i18n';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export type NavLink = {
  href: string;
  label: string;
  auth?: 'any' | 'guest' | 'user';
};

interface NavigationLinksProps {
  vertical?: boolean;
  links?: NavLink[];
  t: Translation;
  onLinkClick?: () => void;
}

export default function NavigationLinks({
  links: linksArr,
  t,
  onLinkClick,
}: NavigationLinksProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const links: NavLink[] = linksArr
    ? linksArr
    : [
        { href: '/', label: t.home ?? '', auth: 'any' as const },
        { href: '/planets', label: t.planets ?? '', auth: 'any' as const },
        { href: '/contact', label: t.contact_us ?? '', auth: 'any' as const },
        ...(user
          ? [
              {
                href: '/score',
                label: t.leaderboard ?? '',
                auth: 'user' as const,
              },
              { href: '/logout', label: t.logout ?? '', auth: 'user' as const },
            ]
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
