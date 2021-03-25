import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import {ButtonContainer} from './Button';


export default class Navbar extends Component {
	render () {
		return (
			<NavWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5'>
		{/* oznacenia nav cek https://getbootstrap.com/docs/4.0/components/navbar/ */}
		{/* export default class Navbar extends Component je len iny zapis, nemusis davat na konci */}		
		<Link to='/'>
					<img src={logo} alt='store' className='navbar-brand'/>
				</Link>
				<ul className='navbar-nav align-items-center'>
			{/*navbar-nav je default bootstrap oznacenie pre ul, nav-item pre li*/}	
					<li className='nav-item ml-5'>
						<Link to='/' className='nav-link'>
						products
						</Link>
					</li>
				</ul>
				<Link to='/cart' className='ml-auto'>
					<ButtonContainer>
						<span className='mr-2'>
						<i className='fas fa-cart-plus'/>
						</span>
					my cart
					</ButtonContainer>
				</Link>
			</NavWrapper>
		)
	}
}


const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link{
	color: var(--mainWhite)!important;
	font-size:1.3rem;
	text-transform: capitalize;
}
`;