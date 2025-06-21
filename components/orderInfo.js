import { useEffect, useState } from "react";
import styled from "styled-components";
import css from "styled-jsx/css";

const H3 = styled.h3`
    font-weight: 500;
    font-size: 1.05rem;
    margin: 0;
    ${props => props.bold  && css`
        font-weight: 600;    
    `}
`;

const OrderInfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    
`;

const OrderInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
`;


export default function OrderInfo({items, total, transport, displayOrderTotal}) {

    // const [numberOfItems, setNumberOfItems] = useState();
    // const [itemsTotal, setItemsTotal] = useState();
    // const [itemsTransport, setItemsTransport] = useState();
    // const [itemsOrderTotal, setItemsOrderTotal] = useState();
    // useEffect(() => {

    //     setNumberOfItems(items);
    //     setItemsTotal(total);
    //     setItemsTransport(transport);
    //     setItemsOrderTotal(total+itemsTransport);
    // }, []);

    return (    
            <OrderInfoWrapper>
                <OrderInfoItem>
                    <H3>Items({items})</H3>
                    <H3 >XAF {total}</H3>
                </OrderInfoItem>
                <OrderInfoItem>
                    <H3 >Transport</H3>
                    <H3 >XAF {transport}</H3>
                </OrderInfoItem>
         {displayOrderTotal && (<OrderInfoItem>
                    <H3 >Order total</H3>
                    <H3 >XAF {transport+total}</H3>
                </OrderInfoItem>)}                
            </OrderInfoWrapper>
    );
}