import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Zomato</h3>
                        <p className="text-gray-400">
                            Discover the best food & drinks around you.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                            <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                                <FaInstagram size={24} />
                            </a>
                        </div>
                    </div>

                    {/* App Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Get Our App</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="block">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5LOPUgzjbz_m4aVulC-GU5zu-30HBdYnAg&s" alt="Google Play Store" className="h-10"/>
                            </a>
                            <a href="#" className="block">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzXhxvY5kBIuT7susVa22FenQ9WjhTluzKw&s" alt="Apple App Store" className="h-10"/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Zomato. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
