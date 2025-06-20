import Layout from "@/components/Layout"
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function DeleteProductPage(){
    const router = useRouter();
    const {id} = router.query;
    const [orderInfo, setOrderInfo] = useState();
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/order?id='+id).then(response => {
            setOrderInfo(response.data);
        })
    }, [id])
    function goBack(){
        router.push('/orders')
    }
    async function deleteProduct(){
       await axios.delete('/api/order?id='+id);
       goBack();
    }
    return (
        <Layout>
            <h1 className="text-center">Do you really want to decline order <span className="font-semibold">#{orderInfo?._id}</span> ?</h1>
            <div className="flex gap-2 justify-center">
                <button 
                    className="btn-red"
                    onClick={deleteProduct}>
                    Yes
                </button>
                <button 
                    onClick={goBack} 
                    className="btn-default">
                    No
                </button>
            </div>

        </Layout>
        
)
}