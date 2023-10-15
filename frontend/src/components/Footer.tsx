import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import {
    socialLinks,
    quickLinks,
    quickLinks2,
    quickLinks3,
} from "../constant/QuickLinks";


const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-primary-300">
            <div className="flex flex-col justify-between md:flex-row flex-wrap w-5/6 mx-auto pt-10">
                <div>
                    <img src={Logo} alt="" />
                    <p className="text-[16px] leading-7 font-[400] mt-4">
                        Copyright &copy; {year} developed by Rafi All right reserved
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                        {socialLinks.map((link, index) => (
                            <Link
                                to={link.path}
                                key={index}
                                className="w-9 h-9 border-[#181A1E] rounded-full flex items-center justify-center group  "
                            >
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-[20px] leading-[30px] font-[700] mb-6 ">
                        Quick Links
                    </h2>
                    <ul>
                        {quickLinks.map((link, index) => (
                            <li key={index} className="mb-4">
                                <Link
                                    to={link.path}
                                    className="text-[16px] leading-7 font-[400] hover:text-primaryColor transition duration-300"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-[20px] leading-[30px] font-[700] mb-6 ">
                        I Want To
                    </h2>
                    <ul>
                        {quickLinks2.map((link, index) => (
                            <li key={index} className="mb-4">
                                <Link
                                    to={link.path}
                                    className="text-[16px] leading-7 font-[400] hover:text-primaryColor transition duration-300"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-[20px] leading-[30px] font-[700] mb-6 ">
                        Support
                    </h2>
                    <ul>
                        {quickLinks3.map((link, index) => (
                            <li key={index} className="mb-4">
                                <Link
                                    to={link.path}
                                    className="text-[16px] leading-7 font-[400] hover:text-primaryColor transition duration-300"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
