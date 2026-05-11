import { BikeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { footerData } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-app-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to={"/"} className="flex items-center gap-2 mb-4">
              <BikeIcon className="size-6 text-white" />
              <span className="text-xl font-semibold">
                {footerData.brand.name}
              </span>
            </Link>
            <p className="text-sm text-white/70 mb-4">
              {footerData.brand.description}
            </p>

            <div className="flex gap-3">
              {footerData.brand.socials.map((social, index) => (
                <a
                  href={social.link}
                  key={index}
                  className="size-9 rounded-lg bg-white/10 flex-center hover:bg-white/2"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerData.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-white/70 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom */}
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
