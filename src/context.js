import React, {Component} from 'react';
import {storeProducts,detailProduct} from './data';


const ProductContext = React.createContext();
// Provider
// Consumer



class ProductProvider extends Component {

 	state={
 		products: [],
 		detailProduct: detailProduct,
 		cart: [],
 		modalOpen: false,
 		modalProduct: detailProduct,
 		cartSubTotal: 0,
 		cartTax: 0,
 		cartTotal: 0
 	};




	componentDidMount() {
		this.setProducts();
	}


	setProducts = () => {
		let tempProducts = [];
		storeProducts.forEach(item => {
			const singleItem = { ...item};
			tempProducts = [ ...tempProducts,singleItem];
		});
		this.setState(() => {
		return {products: tempProducts};
		});
		// tempProducts su skopirovane product
	}




	getItem = (id) => {
		const product = this.state.products.find(item => item.id === id);
		return product;
		// z products(tempProducts) vyberie product so zvolenym id
		// product je tu definovany, pouziva sa napriec app
	}


	handleDetail = (id) => {
		const product = this.getItem(id);
		this.setState(() => {
			return {detailProduct: product}
		})
		// zobrazi detail produktu, ktory sme vytiahli z getItem
		// product je zaroven detailProduct
	} 	




	addToCart = (id) => {
		let tempProducts = [...this.state.products];
		const index = tempProducts.indexOf(this.getItem(id));
		const product = tempProducts[index];
		product.inCart = true;
		product.count = 1;
		const price = product.price;
		product.total = price;
		this.setState (
			() => {
				return { products: tempProducts, cart: [ ...this.state.cart, product] };}, 
				() => {this.addTotals();}
			);
		// vlozi product do kosika a zmeni jeho parametre, zaroven product su tempProducts, v ktorom je zmena z kosika zaznamenana
		// cart je KOSIK, vsetky premenne produktu, ktore sa zobrazuju v cart
	}; 	




	openModal = (id) => {
		const product = this.getItem(id);
		this.setState (() => {
			return {modalProduct: product, modalOpen:true} 
		})
		// openModal a modalProduct bude product na zahlade id, modalOpen bude true 
	}


	closeModal = () => {
		this.setState (() => {
			return {modalOpen: false}
		})
	}



	increment = (id) => {
		let tempCart = [...this.state.cart];
		const selectedProduct = tempCart.find(item =>item.id ===id)

		const index = tempCart.indexOf(selectedProduct);
		const product = tempCart[index];

		product.count = product.count + 1;
		product.total = product.count * product.price;

		this.setState(() => {
			return {cart: [...tempCart]}
		}, () => {
			this.addTotals();
		})
	}



	decrement = (id) => {
		let tempCart = [...this.state.cart];
		const selectedProduct = tempCart.find(item =>item.id ===id)

		const index = tempCart.indexOf(selectedProduct);
		const product = tempCart[index];

		product.count = product.count - 1;

		if(product.count === 0) {
			this.removeItem(id)
		}else {
			product.total = product.count * product.price;

			this.setState(() => {
				return {cart: [...tempCart]}
				}, () => {
				this.addTotals();
			})
		}
	}



	removeItem = (id) => {
		let tempProducts = [...this.state.products];
		let tempCart = [...this.state.cart];
		tempCart = tempCart.filter(item => item.id !==id);

		const index = tempProducts.indexOf(this.getItem(id));
		let removedProduct = tempProducts[index];
		removedProduct.inCart = false;
		removedProduct.count = 0;
		removedProduct.total = 0;

		this.setState(
			() => {
				return {
					cart: [...tempCart],
					products: [...tempProducts]
				}
			},
			() => {
				this.addTotals();
			}
		)
		// tempCart pozostava z ostatnych produktov, ktore nemaju id ako to, co chceme vymazat.
		// removedProduct je ten, ktory sa maze + specifikovane zmeny, ktore po vymazani nastanu
		// nakoniec je callback funkcia (spusti sa hned ako nastane zmena), ktora upravi totals na zakladne zvysnych poloziek v kosiku
	}



	clearCart = () => {
		this.setState(() => {
			return {cart: [] };
		}, () => {
			this.setProducts();
			this.addTotals();
		})
		// aby sa vynulovali totals z predoslych transakcii a zaroven vynuloval kosik, je potrebne pridat tieto 2 state,
		// lebo inak by stale item bol v cart, aj ked cart je prazdna. To iste totals.
	}



	addTotals = () => {
		let subTotal = 0;
		this.state.cart.map(item => (subTotal += item.total));
		const tempTax = subTotal * 0.2;
		const tax = parseFloat(tempTax.toFixed(2));
		const total = subTotal + tax;
			this.setState(() => {
			return {
				cartSubTotal: subTotal,
				cartTax: tax,
				cartTotal: total
			}
		})
		// prida subTotal,total a tax ku polozke v kosiku
	}





	render() {
		return (
			<ProductContext.Provider value={{
				...this.state,
				handleDetail: this.handleDetail,
				addToCart: this.addToCart,
				openModal: this.openModal,
				closeModal: this.closeModal,
				increment: this.increment,
				decrement: this.decrement,
				removeItem: this.removeItem,
				clearCart: this.clearCart
			}}>
				{this.props.children}
			</ProductContext.Provider>
		)
	}
}


const ProductConsumer = ProductContext.Consumer;



export {ProductProvider,ProductConsumer};