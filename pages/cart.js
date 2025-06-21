import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { formatPrice } from "@/utils/priceUtils";
import { useRouter } from 'next/router';
import OrderInfo from "@/components/orderInfo";
import css from "styled-jsx/css";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr .8fr;
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
            top: 5rem;
            
}`}
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



export default function CartPage() {
    const {cartProducts, addProduct, removeProduct} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState(0);
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const router = useRouter();
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
    return (
        <>
          <Header />
          <Center>
            <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
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
                    {!!cartProducts?.length && (
                                        <Box summary>
                                            <h2>Summary</h2>
                                                <OrderInfo items={cartProducts.length} total={total} transport={500} displayOrderTotal={false}/>
                                                <input 
                                                    type="hidden" 
                                                    name="products" 
                                                    value={cartProducts.join(',')} />
                                                <Button 
                                                    black 
                                                    block 
                                                    type="button"
                                                    onClick={() => router.push('/payment')}
                                                >
                                                    Continue to payment
                                                
                                                </Button>
                                            
                                        </Box>
                    )}

            </ColumnsWrapper>
          </Center>

        </>
    )
}