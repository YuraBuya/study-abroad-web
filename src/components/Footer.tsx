import Link from 'next/link';

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/CCAgency.ub", icon: "f" },
];

export default function Footer() {
  return (
    <footer
      className="supports-[color-scheme:dark]:bg-slate-900 supports-[color-scheme:dark]:text-slate-200 bg-slate-50 text-slate-800 border-t border-slate-200"
      aria-labelledby="site-footer-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
         {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span aria-hidden>📞</span>
                <a
                  href="tel:+97694247600"
                  className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  +976 9424 7600
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden>📞</span>
                <a
                  href="tel:+8201042523878"
                  className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  +82 010 4252 3878
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden>✉️</span>
                <a
                  href="mailto:Ccagency.mn@gmail.com"
                  className="hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Ccagency.mn@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden>📍</span>
                <address className="not-italic text-slate-600">
                  Peace Avenue 51, BGD - 2 khoroo, Ulaanbaatar 16051, Mongolia
                </address>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-4">
              <ul className="flex items-center gap-3" aria-label="Social links">
                {socials.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <span aria-hidden>{s.icon}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} CCA Education Agency. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Back to top"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
}
