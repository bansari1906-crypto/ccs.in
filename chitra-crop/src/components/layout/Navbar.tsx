import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "https://chitracropsciencepartners.com", label: "Become a Dealer", external: true },
  { to: "/blog", label: "Blogs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <img src="/logo.png" alt="Chitra Crop Science Logo" className="h-10 w-auto" />
          <span className="font-serif text-lg leading-tight tracking-tight">
            Chitra<span className="text-primary"> Crop Science</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.to}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-2 text-sm font-medium transition-smooth hover:text-primary text-foreground/75"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-smooth hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/75"
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="sm" className="gradient-leaf text-primary-foreground hover:opacity-90">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button className="p-2" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-3">
            {links.map((link) => {
              if (link.external) {
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-muted text-primary" : "text-foreground/75"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild size="sm" className="flex-1 gradient-leaf text-primary-foreground">
                <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
