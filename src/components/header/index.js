import './index.css'
import React from 'react'
import logo from './images/ig-real.png'
import {AiOutlineHome, AiOutlineHeart, AiOutlinePlusCircle} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'

class Header extends React.Component{


  render(){
    return(
      <nav className='nav-tab'>
        <button><img src={logo} alt='logo'/></button>
        <div className='nav-links'>
          <ul>
            <li><AiOutlineHome /><a href='#'>Home</a></li>
            <li><CgProfile /><a href='#'>Profile</a></li>
            <li><AiOutlineHeart /><a href='#'>Notifications</a></li>
            <li><AiOutlinePlusCircle /><a href='#'>Create</a></li>
          </ul>
          <button>Logout</button>

        </div>

      </nav>
    )
  }
}


export default Header;