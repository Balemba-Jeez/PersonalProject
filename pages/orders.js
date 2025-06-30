import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Center from '../components/Center';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestOrders();
  }, []);

  const fetchLatestOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/order?latest=true');
      const data = await response.json();
      console.log(data)
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Center>
        <OrdersContainer>
          <Title>Your Recent Orders</Title>
          
          {loading ? (
            <LoadingMessage>Loading your orders...</LoadingMessage>
          ) : orders.length === 0 ? (
            <NoOrdersMessage>No orders found</NoOrdersMessage>
          ) : (
            <OrdersList>
              {orders.map((order) => (
                <OrderCard key={order._id}>
                  <OrderHeader>
                    <OrderId>Order #{order._id.slice(-6).toUpperCase()}</OrderId>
                    <OrderDate>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </OrderDate>
                    <OrderTotal>Total: XAF{order.amount}</OrderTotal>
                  </OrderHeader>
                  
                  <ProductsList>
                    {order.products.map((product) => {
  const matchedProduct = order.productDetails?.find(p => p._id === product.productId);

  return matchedProduct ? (
    <ProductItem key={product._id}>
      <ProductImage 
        src={matchedProduct.images?.[0] || '/default-product.png'} 
        alt={matchedProduct.title || 'Product'} 
      />
      <ProductInfo>
        <ProductName>{matchedProduct.title}</ProductName>
        <ProductMeta>
          <span>Qty: {product.quantity}</span>
          <span>XAF{product.amount || matchedProduct.price}</span>
        </ProductMeta>
      </ProductInfo>
    </ProductItem>
  ) : null;
})}

                  </ProductsList>
                  
                  <OrderFooter>
                    <OrderStatus status={order.status}>
                      {order.status}
                    </OrderStatus>
                    <ShippingInfo>
                      Shipped to: {order.shipping?.address}, {order.shipping?.city}
                    </ShippingInfo>
                  </OrderFooter>
                </OrderCard>
              ))}
            </OrdersList>
          )}
        </OrdersContainer>
      </Center>
    </>
  );
}

// Styled Components
const OrdersContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
`;

const NoOrdersMessage = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const OrderId = styled.span`
  font-weight: bold;
  color: #333;
`;

const OrderDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const OrderTotal = styled.span`
  font-weight: bold;
  color: #000;
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProductItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const OrderStatus = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'completed' ? '#e6f7e6' : 
    props.status === 'shipped' ? '#e6f2ff' : '#fff2e6'};
  color: ${props => 
    props.status === 'completed' ? '#2e7d32' : 
    props.status === 'shipped' ? '#1a73e8' : '#ff6d00'};
`;

const ShippingInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
`;