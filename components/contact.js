import Input from "@/components/Input";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CityHolder = styled.div`
    display: flex;
    gap: 5px;


`;

export default function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState();
    const [streetAddress, setStreetAddress] = useState("");
    const [cni, setCNI] = useState("");
    useEffect(()=>{
      const shipping = {
            name: name,
            email: email,
            number: contact,
            city: city,
            address: streetAddress,
            cni: cni,
        }
        console.log('shipping',shipping);
        localStorage.setItem('shipping',
            JSON.stringify(shipping)
        );
    },[name,email,city,streetAddress,cni]);


    return (
        <>
            <h2>Ship to</h2>
            <Input type="text" 
                placeholder="Name"
                name="name" 
                value={name} 
                onChange={ev => setName(ev.target.value)}/>
            <Input type="text" 
                placeholder="Email"
                name="email" 
                value={email} 
                onChange={ev => setEmail(ev.target.value)}/>
            <CityHolder>
                <Input type="text" 
                    placeholder="City"
                    name="city" 
                    value={city} 
                    onChange={ev => setCity(ev.target.value)}/>
                <Input type="text" 
                    placeholder="Contact"
                    name="contact" 
                    value={contact} 
                    onChange={ev => setContact(ev.target.value)}/>
            </CityHolder>
            <Input type="text" 
                placeholder="Street Address"
                name="streetAddress" 
                value={streetAddress} 
                onChange={ev => setStreetAddress(ev.target.value)}/>
            <Input type="text" 
                placeholder="CNI e.g., CE04357I5I...."
                name="cni" 
                value={cni} 
                onChange={ev => setCNI(ev.target.value)}/>
        </>

    )
}