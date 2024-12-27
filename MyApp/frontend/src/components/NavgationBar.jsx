import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';


import { FaNewspaper } from 'react-icons/fa6';
import useAuth from '../hooks/useAuth';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { AuthState ,Logout} = useAuth();
  const toggle = () => setIsOpen(!isOpen);
  console.log(AuthState.isAuthenticated);
  return (
    <div>
      <Navbar expand="md" color='dark' dark >
        <NavbarBrand href="/">
        Note App 
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">
                <FaNewspaper></FaNewspaper>
                &nbsp;
                Notlarım</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-left" navbar>
            {
              AuthState.isAuthenticated ?
                <>
                  <NavItem>
                    <NavLink href="/">
                      <Button className="bg-warning" onClick={Logout}>Çıkış Yap</Button>
                    </NavLink>
                  </NavItem>
                </>
                : <>
                  <NavItem>
                    <NavLink href="/login">
                      <Button className="bg-danger">Giriş Yap</Button>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/register">
                      <Button className="bg-info">Üye Ol</Button>
                    </NavLink>
                  </NavItem>
                </>
            }

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
