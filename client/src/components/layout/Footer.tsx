import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Service',
      links: [
        { name: 'Bonus Program', href: '#' },
        { name: 'Gift Cards', href: '#' },
        { name: 'Credit and Payment', href: '#' },
        { name: 'Service Contracts', href: '#' },
        { name: 'Non-cash Account', href: '#' },
        { name: 'Payment', href: '#' },
      ],
    },
    {
      title: 'Assistance to the buyer',
      links: [
        { name: 'Find an Order', href: '#' },
        { name: 'Terms of Delivery', href: '#' },
        { name: 'Exchange and Return of Goods', href: '#' },
        { name: 'Guarantee', href: '#' },
        { name: 'Frequently Asked Questions', href: '#' },
        { name: 'Terms of Use of the Site', href: '#' },
      ],
    },
  ]

  const companyInfo = [
    { icon: Phone, text: '+7 (495) 234-5678' },
    { icon: Mail, text: 'hello@modulive.com' },
    { icon: MapPin, text: '123 Design Street, Furniture City, FC 12345' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">Modulive</span>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Transform your space with our sustainable furniture collection. 
              Quality craftsmanship meets modern design.
            </p>
            <div className="space-y-3">
              {companyInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm text-gray-300">
                  <item.icon className="h-4 w-4 text-gray-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="w-full lg:col-span-1">
            <h3 className="font-semibold text-white mb-4">Social Links</h3>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Modulive. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-white transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
