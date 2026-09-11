"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/content/company";
import { telHref } from "@/lib/contact";
import { ArrowIcon } from "@/components/ui/Button";

const nav = [
  { label: "Packaging", href: "/packaging" },
  { label: "Rigid & Luxury", href: "/rigid-boxes" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Industries", href: "/industries" },
  { label: "Quality", href: "/quality" },
  { label: "Company", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-paper-300 bg-paper-100/95 backdrop-blur-md"
          : "border-b border-transparent bg-paper-100"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="-my-2 flex items-center gap-3 py-2"
          aria-label={`${company.name} — home`}
        >
          <Image
            src="/images/brand/logo.png"
            alt=""
            width={132}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] transition-colors ${
                  active ? "text-ink-900" : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={telHref}
            className="text-[15px] text-ink-600 transition-colors hover:text-ink-900"
          >
            Call us
          </a>
          <Link
            href="/request-a-quote"
            className="inline-flex items-center gap-2 rounded-sm bg-accent-500 px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-accent-600"
          >
            Request a Quote
            <ArrowIcon />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-[1.5px] w-6 bg-ink-900 transition-transform duration-300 ${
                open ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-6 bg-ink-900 transition-transform duration-300 ${
                open ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-paper-300 bg-paper-100 lg:hidden">
          <nav className="mx-auto max-w-6xl px-5 py-3 sm:px-8" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-paper-300 py-4 text-lg font-medium text-ink-900"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 py-5">
              <Link
                href="/request-a-quote"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent-500 px-6 py-4 font-medium text-white"
              >
                Request a Quote <ArrowIcon />
              </Link>
              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-ink-900/25 px-6 py-4 font-medium text-ink-900"
              >
                Call us
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
