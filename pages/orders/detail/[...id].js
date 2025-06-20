import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router"
import { formatPrice } from "@/utils/priceUtils";
import Button from "@/components/Button";
import Layout from "@/components/Layout";

const  GlobalStyles = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: "Poppins", sans-serif;
  }

`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr;
    }
    gap: 40px;
    margin-top: 0;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
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
    text-align:center;
    @media screen and (min-width: 768px) {
        display: inline-block;
        padding: 0 10px;
        text-align: center;
    }
`;

const Header1 = styled.h1`
        display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
`;


export default function OrderDetail() {
    const [order, setOrder] = useState();
    const [orderStatus, setOrderStatus] = useState();
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/order?id='+id).then(response => {
            setOrder(response.data);
            console.log("order:", response.data);
        })
    }, [id]);
    
    function findProductQuantity(product, order) {
        const match = order?.products?.find(
          (p) => p.productId.toString() === product._id.toString()
        );
        console.log('match-quantity', match?.quantity);
        return match?.quantity || 0;
      }
      

      function calculateOrderTotal(order) {
        if (!order?.products || !order?.productDetails) return 0;
      
        return order.products.reduce((total, item) => {
          const product = order.productDetails.find(p => p._id === item.productId);
          const price = product?.price || 0;
          return total + item.quantity * price;
        }, 0);
      }
      
      const totalQuantity = order?.products?.reduce((sum, product) => sum + product.quantity, 0) || 0;

      const statusStyle = `text-[8px] px-[2px]  h-[25px] mx-0 mt-[0] mb-[0] inline-block text-gray-100 rounded font-bold capitalize  text-center`

      function status (order){
        if(order.status === 'completed'){
            return statusStyle+ ' bg-[#3C91E6]'
        }
        else if (order.status === 'pending'){
            return statusStyle+ ' bg-[#FD7238]'
        } 
        else if (order.status === 'processing') {
            return statusStyle+ ' bg-[#FFCE26]'
        }
        else if (order.status === 'decline') {
            return statusStyle+ ' bg-[#E01E37]'
        }
  
}

    return (
        <>
         <GlobalStyles />
         <Layout>
          <Center>
            <ColumnsWrapper>
            { order && (
                    <Box>
                        <div className="flex justify-between">
                            <h1 className="">Order: <span className="font-semibold text-gray-500"> #{order?._id.substring(0, 8)}</span></h1>
                            <div className="flex gap-8 items-center content-center">
                                <h1>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
 
                                    <span className="font-semibold text-gray-500"> {order?.createdAt.substring(0, 10)}</span></h1>
                                <h1 className="mt-2">
                                
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>

                                    <span className={`font-semibold capitalize ${status(order)}`}> {order?.status}</span>
                                </h1>
                            </div>
                            
                        </div>
                        
                         {(
                            <Table>
                                <thead>
                                        <tr>
                                            <th>Products</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                </thead>
                                <tbody>
                                    {order?.productDetails?.map(product => (
                                            <tr key={product._id}>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} alt="" />
                                                    </ProductImageBox>
                                                    {product.title}
                                                </ProductInfoCell>
                                                
                                                <td>
                                                <QuantityLabel>
                                                    {findProductQuantity(product, order)}
                                                </QuantityLabel>
                                                </td>
                                                
                                                <td className="">XAF{findProductQuantity(product, order)*product.price}</td>
                                            </tr>
                                    ))}
                                    <tr>
                                    <td className="flex items-center justify-start">
                                        <Button 
                                            state 
                                            block 
                                            type="button"
                                            onClick={() => {
                                                axios.put('/api/order', {
                                                  _id: order._id,
                                                  status: 'processing'
                                                }).then(() => {
                                                  // Optional: Update local UI
                                                  setOrder(prev => ({ ...prev, status: 'processing' }));
                                                });
                                              }}
                                            >
                                                
                                                Approve Order: #{order?._id.substring(0, 8)}


                                        </Button></td>
                                    
                                    <td>{totalQuantity}</td>
                                        
                                    <td className="font-semibold text-gray-500">XAF{calculateOrderTotal(order)}</td>
                                    </tr>                              
                                </tbody> 
                            </Table>
                    )}
                    </Box> )}
            </ColumnsWrapper>
          </Center>
          </Layout>          
        </>
    )
}