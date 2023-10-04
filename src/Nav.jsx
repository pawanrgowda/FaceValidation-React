import React from 'react'
import logo from './int logo.png';
function Nav() {
  return (
    <div className='d'>
      <img className='logo' src={logo} alt="logo" />
      <ul className='ul'>
        <li>Home</li>
        <li>About</li>
        <li>Contact us</li>
      </ul>
    </div>
  )
}

export default Nav
