import { BsFillWalletFill } from "react-icons/bs";
import "./menu.css";
import {Link} from "react-router-dom";



const Menu = () => {
  return (
    <> 
    
      <div className="header">
            <div className="icon-container">
                <a href="mailto:m.2026zaki.ts@gmail.com">
                <BsFillWalletFill className="icon" />
                </a>
                <Link className="links" to="/">Home</Link>
                <Link className="links" to="/Quadratic">Quadratic</Link>
                <Link className="links" to="/pos">Binomial</Link>
                <Link className="links" to="/Poisson">Poisson</Link>
                <Link className="links" to="/Normal">Normal</Link>
                <Link className="links" to="/ChiSquared">Chi-squared</Link>
            </div>
      </div>

    </>
  );
};

export default Menu;
