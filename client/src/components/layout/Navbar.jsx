import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import Filter from "./Filter";
import Logo from "./Logo";
import Search from "./Search";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa"; // Icon for closing the drawer

const Navbar = () => {
    const [name, setName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            navigate(`/filter-result?countryId=${""}&cuisineId=${""}&averageCostForTwo=${""}&name=${name}&latitude=${""}&longitude=${""}`);
        }
    };

    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        {/* Hamburger Menu Icon */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="p-2 rounded-md focus:outline-none"
                            >
                                <FaBars size={24} />
                            </button>
                        </div>
                        {/* Menu content for desktop */}
                        <div className="hidden lg:flex flex-row items-center gap-3">
                            <Search />
                            <div className="flex flex-row">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Name of restaurant"
                                    className="p-2 border-2 rounded-lg text-lg"
                                />
                                <Filter />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            {/* Drawer for mobile */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg transform ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out z-20`}
            >
                {/* Close button */}
                <div className="p-4 flex justify-end">
                    <button onClick={() => setMenuOpen(false)}>
                        <FaTimes size={24} />
                    </button>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <Search />
                    <div className="pl-5 pr-5 flex flex-col gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Name of restaurant"
                        className="p-2 border-2 rounded-lg text-lg w-full mt-2"
                    />
                    <Filter />
                    </div>
                </div>
            </div>
            {/* Overlay to close drawer */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Navbar;
