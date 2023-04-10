import React,{ useState, useEffect, useContext} from 'react';
import {Button, Container, Modal} from 'react-bootstrap';
//you need to also add bootstrap link in the ap.js page or here
//modal sis the cart popup
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from '../CartContext.js';
import CartProduct from './CartProduct.js';
import { doc, getDoc,getDocs,collection,where,query} from "firebase/firestore"; 
import { db, auth } from '../firebase.js';
import "./Css/Navbar.css"
import Profile from "./Css/Images/profile.png"
import Logo from "./Css/Images/logo.png"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {

    const [show,setShow]=useState(false);
    const [isChild,setIsChild]=useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    let navigate = useNavigate();
    const user =  auth.currentUser;

    const cart = useContext(CartContext);
    
    const cartCount = cart.items.reduce((sum,itemamt) => sum + itemamt.quantity, 0);
    
    useEffect(()=> {
    const child = async () => {
      setIsChild(cart.checkChild())
      setIsLoaded(true);
    }
    setIsLoaded(false);
     child()
     if(isLoaded===true)console.log("hehe child? "+ isChild)
  },[isLoaded])

  if (isLoaded===false) {
    return null;
  }
  return (
    <>
    <div className="nav-bar">
            <Link className='logoimg' to="/details"><img 
            className="main-logo"
            src={Logo}
            alt="logo"
            ></img></Link>
            
            <div className='nav-right'>
            <div className='link'>
            <Link className="links" to="/transactions">Transactions</Link>
            </div>
            {(isChild)&&<div className='link'>
            <Link className="links" to="/expenditure">Expenditure</Link>
            </div>}
            {(!isChild)&&<div className='link'>
            <Link className="links" to="/restrictions">Restrictions</Link>
            </div>}
            <div className="profile">
                <Link className='profileLink' to="/details"><img
                className="profile-logo"
                src={Profile}
                alt="profile-logo"/>
                <p className="hello-user">Profile</p></Link>
            </div>
            </div>  
            
        </div>
        <div className='phoneNavBar'>
      <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img 
            className="main-logo"
            src={Logo}
            alt="logo"
            ></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='navBtn'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link to="/home">Home</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/restrictions">Restrictions</Link>
            <Link to="/details">Profile</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
    </div>
    </>
  )
}

export default NavBar