import React from 'react';
import CartItem from './CartItem';




export default function CartList({kosik}) {
	
	const {cart} = kosik;
	// cart su storeProducts
	console.log(kosik, cart);


	return (
		<div className= 'container-fluid'>
			{cart.map(item => {
				return <CartItem key={item.id} item={item} kosik={kosik}/>
				// key, lebo vypise viacero produktov, teda musi vediet podla coho loopovat
			})}
			
		</div>
	)
}