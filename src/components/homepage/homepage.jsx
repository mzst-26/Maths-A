import Menu from '../navigationMenu/navbar';
import './homepage.css'
import logo from '../../assets/logo.png'


const Homepage = () => {


    return (

        <>
        <Menu/>
      <div className="body">
            <h1 className="logo-container">
                <img src={logo} alt="logo" className="logo" />
            </h1>
            
      </div> 
      

     </>
    );
  };


  export default Homepage;