import Input from "@/components/Input";
import { useState } from "react";
import styled from "styled-components";
import css from "styled-jsx/css";

const CityHolder = styled.div`
    display: flex;
    gap: 5px;


`;

const PaymentMethod = styled.div`
    display: flex;
    gap: 6px;

`;

const Button = styled.button`
  border-radius: 7px;
  border: solid 2px #f3f3f3;
  background: white;
  width: 50%;
  display: flex;
  align-items: center;
  padding: 15px 30px;
  gap: 20px;
  cursor: pointer;
  transition: border-color 200ms ease;

  ${props => props.mtn && css`
    border: solid 2px #f3f3f3;

    &:focus {
      border-color: #f3be10;
      outline: none;
    }
    ${props.selected && css`
      border-color: #f3be10;
    `}
  `}

  ${props => props.orange && css`
    border: solid 2px #f3f3f3;

    &:focus {
      border: solid 2px #ff7900; 
      outline: none;
    }
    ${props.selected && css`
      border-color: #ff7900;
    `}
  `}
`;

const Logo = styled.img`
    width: 30px;
    height: 30px;

`;

const Paymentform = styled.div`
    // padding-left: 24px;
    // padding-right: 24px;
    // padding-top: 16px;
    // padding-bottom: 16px;
    // border-radius: 16px;
    // border: 1px solid rgb(243, 243, 243);
    background-color: white;
    display:flex;
    flex-direction: column;
    gap: 6px;
`;

export default function PaymentForm() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState();
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

        // Handle the payment method selection
    function handlePaymentSelection (method) {
            setSelectedPaymentMethod(method)
        }

    return (
        <>
            <h2>Pay with</h2>
            <Paymentform className="payment-form">

                                <PaymentMethod className="payment-method">

                                    {/* Mobile Money Button */}
                                    <Button 
                                        mtn
                                        selected={selectedPaymentMethod === 'mtn'}
                                        className={`method mtn ${selectedPaymentMethod === 'mtn' ? 'selected-mtn' : ''}`}
                                        onClick={() => handlePaymentSelection('mtn')}

                                    >
                                        

                                        <Logo src='/images/momo.png' alt="mobile money logo" />

                                        <span>Mobile money</span>

                                       
                                    </Button>

                                    {/* Orange Money Button */}
                                    <Button 
                                        orange
                                        selected={selectedPaymentMethod === 'orange'}
                                        className={`method orang ${selectedPaymentMethod === 'orange' ? 'selected-orange' : ''}`}
                                        onClick={() => handlePaymentSelection('orange')}

                                    >
                                       

                                        <Logo src={'/images/orangemoney.png'} alt="Orange money logo" />

                                        <span>Orange money</span>

                                        
                                    </Button>

                                </PaymentMethod>

                                <form action="#">

                                    <div className="cardholder-name">
                                        {/* <label htmlFor="cardholder-name" className="label-default">Account number</label> */}

                                        <Input type="text" id='cardholder-name' name='cardholder-name' className="input-default" placeHolder="Account number(momo, orangemoney)"/>
                                    </div>


                                </form>
            </Paymentform>
        </>

    )
}