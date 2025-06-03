import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
    // Ended at 8:25:21
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    useEffect(() => {
        if (cartProducts?.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])
    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId]);
    }
    return(
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct}}>
            {children}
        </CartContext.Provider>
    )
}