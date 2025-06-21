import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { formatPrice } from "@/utils/priceUtils";
import OrderInfo from "@/components/orderInfo";
import css from "styled-jsx/css";
import Contact from "@/components/contact";
import PaymentForm from "@/components/paymentForm";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr .8fr
    }
    gap: 40px;
    margin: 40px 0 35px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    ${props => props.summary && css`
        @media screen and (min-width: 768px) {
        align-self: start;
        position: sticky;
        top: 15px;
        
        }
    `}
        ${props => props.deliverypayment && css`
        @media screen and (min-width: 768px) {

        
        }
    `}
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
    
`;

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 2px;
    @media screen and (min-width: 768px) {
        display: flex;
    }
    border:1px solid rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    img{
        max-width: 60px;
        max-height: 60px;
    }
    @media screen and (min-width: 768px) {
        width: 100px;
        height: 100px;
        padding: 10px;
        img{
            max-width: 80px;
            max-height: 80px;
        }
    }
`;

const QuantityLabel = styled.span`
    padding: 0 15px;
    display: block;
    @media screen and (min-width: 768px) {
        display: inline-block;
        padding: 0 10px;
    }

`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;


`;

const InformationWrapper = styled.div`
    @media screen and (min-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export default function Payment() {
    const {cartProducts, addProduct, removeProduct} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        console.log("cartProducts:", cartProducts);

        if (cartProducts.length > 0) {
            console.log("Fetching products for IDs:", cartProducts);
            axios.post('/api/cart', {ids:cartProducts}).then(response => {
                console.log("Response from API:", response.data);
                setProducts(response.data);
                
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);
    function moreOfThisProduct(id){
        addProduct(id)
    }
    function lessOfThisProduct(id){
        removeProduct(id);
    }
    


    let total = 0;
    for (const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    const productOrderDetails =
    products.map((product) => {
        return (
            {
                productId: product._id,
                quantity: cartProducts.filter(id => id === product._id).length,
                amount: cartProducts.filter(id => id === product._id).length * product.price,
            }
        )
    })


    function makeOrder(cart_Products, amount){
        const order = {
            amount: amount,
            total: cart_Products.length,
            shipping: {
                ...JSON.parse(localStorage.getItem('shipping'))
            },
            products: productOrderDetails,
            
        }
        console.log('Final order', order);
        axios.post('http://localhost:3001/api/order', order).then(response =>{
            console.log('api response',response.data);
        })
        .catch(error => {
            console.error('API error:', error);
          });
    }
    return (
        <>
          <Header />
          <Center>
            <ColumnsWrapper>
              <InformationWrapper>
                <Box>
                        <h2>Review order</h2>
                        {!cartProducts?.length && (
                            <div>Your cart is empty</div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                            <tr>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} alt="" />
                                                    </ProductImageBox>
                                                    {product.title}
                                                </ProductInfoCell>
                                                
                                                <td>
                                                <Button
                                                onClick={() => lessOfThisProduct(product._id)}>
                                                        -
                                                </Button>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                    <Button 
                                                    onClick={() => moreOfThisProduct(product._id)}>
                                                            +
                                                    </Button>
                                                </td>
                                                
                                                <td>XAF{cartProducts.filter(id => id === product._id).length * product.price}</td>
                                            </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>XAF{total}</td>
                                    </tr>                              
                                </tbody> 
                            </Table>
                    )}
                    </Box>
                    <Box delivery>
                        <Contact />
                        
                    </Box>
                    <Box>
                        <PaymentForm payment/>
                    </Box>
                </InformationWrapper>

                    {!!cartProducts?.length && (
                                        <Box summary>
                                            <h2>Summary</h2>
                                            
                                            <OrderInfo items={cartProducts.length} total={total} transport={500} displayOrderTotal={true}/>
                                            
                                            <input 
                                                    type="hidden" 
                                                    name="products" 
                                                    value={cartProducts.join(',')} />
                                            <Button black block type="button"
                                            onClick={() => {
                                                console.log('clicked');
                                                makeOrder(cartProducts,total)}}
                                            >Confirm and pay
                                            </Button>
                                            
                                        </Box>
                    )}

            </ColumnsWrapper>
          </Center>

        </>
    )
}