import React from 'react';
import Title from '../Title';
import CartColumms from './CartColumms';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals';



export default class Cart extends React.Component {
	render() {
		return (
			<section>
				<ProductConsumer>

					{kosik => {
						const {cart} = kosik;
						// cart su storeProducts
						if(cart.length > 0) {
							return(
								<React.Fragment>
								<Title name='your' title='cart'/>
								<CartColumms/>
								<CartList kosik={kosik}/>
								<CartTotals kosik={kosik}/>
								</React.Fragment>
								)
						}
						else {
							return <EmptyCart/>
						}
					}}
				</ProductConsumer>
			</section>
		)
	}
}