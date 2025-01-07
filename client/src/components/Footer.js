import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
              Scriptro
            </h3>
            <p className="text-gray-400 text-sm">
              Transform your digital workflow with our comprehensive suite of online tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-300 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Tools', href: '/category' },
                { name: 'Pricing', href: '/pricing-plans' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-yellow-300 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-300 mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              {[
                'Image Background Remover',
                'Text to Audio',
                'Text to QR',
                'JPG to PNG',
              ].map((tool) => (
                <li key={tool}>
                  <Link
                    href={`category/tool/${tool.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-400 hover:text-yellow-300 transition-colors text-sm"
                  >
                    {tool}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-300 mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-yellow-300 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Scriptro. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-yellow-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-yellow-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-yellow-300 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
