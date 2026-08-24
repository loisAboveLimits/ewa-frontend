import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          My Website
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link href="/services" className="hover:text-blue-600">
            Services
          </Link>

          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </nav>

      </div>
    </header>
  );
}