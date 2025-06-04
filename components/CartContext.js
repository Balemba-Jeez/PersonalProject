import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);
    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts]);
    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
            
        }
    }, []);
    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId]);
    }
    function removeProduct(productId) {
        
    }
    return(
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct}}>
            {children}
        </CartContext.Provider>
    )
} // Ended at 9:01:30