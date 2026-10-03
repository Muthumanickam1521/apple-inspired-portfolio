import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Portfolio } from "@/lib/portfolio";

// On the homepage the nav scrolls to sections; on other pages it links back to them.
export function SiteHeader({ content, home = false }: { content: Portfolio; home?: boolean }) {
  const base = home ? "" : "/";
  const { profile } = content;

  return (
    <header className="global-nav"><div className="nav-inner">
      <Link href={home ? "#top" : "/"} className="mark" aria-label={`${profile.name} home`}>{profile.name}</Link>
      <nav aria-label="Main navigation">{content.navigation.map((item) => <Link key={item.label} href={`${base}${item.href}`}>{item.label}</Link>)}</nav>
      <div className="nav-actions"><ThemeToggle /><Link className="nav-contact" href={`${base}#contact`}>Let&apos;s talk</Link></div>
    </div></header>
  );
}

export function SiteFooter({ content }: { content: Portfolio }) {
  return (
    <footer><div className="shell footer-meta"><p>© {new Date().getFullYear()} {content.profile.name}</p><div>{content.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}</a>)}</div><p>{content.footer.credit}</p></div></footer>
  );
}
