import { Link } from "react-router-dom";
import logo from "../../assets/logo_zomato.png"

const Logo = () => {

    return (
        <Link to='/'>
            <img
                alt="logo"
                className="md:block cursor-pointer"
                height="200"
                width="200"
                src={logo}
            />
        </Link>
    );
}

export default Logo;