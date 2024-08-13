import { FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-14">
            <div className="container mx-auto max-w-screen-xl px-4 md:px-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="text-2xl font-semibold flex items-center space-x-3 mb-4">
                            <span>Achmad Putra Arifky</span>
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <FaInstagram />
                                <a href="https://www.instagram.com/cemet1232" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    Instagram
                                </a>
                            </li>
                            
                            <li className="flex items-center space-x-2">
                                <FaEnvelope />
                                <span>Email: ahmad.arifki90@gmail.com</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaPhone />
                                <span>Phone: <a href="https://wa.me/6285850093110" target="_blank">085850093110</a> </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <div className="text-center mt-10">
                    <p className="text-sm">&copy; 2024 Achmad Putra Arifky.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
