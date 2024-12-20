import React, { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const AccessibleNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
    >
      <button
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>

      <ul
        role="menubar"
        aria-hidden={!isOpen}
      >
        {navItems.map((item, index) => (
          <li
            key={item.href}
            role="none"
          >
            <a
              href={item.href}
              role="menuitem"
              aria-current={item.href === '/' ? 'page' : undefined}
              tabIndex={index === 0 ? 0 : -1}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}; 