import Layout from "@/components/Layout";
import { data } from "autoprefixer";
import axios from "axios";
import { set } from "mongoose";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import Spinner from "./spinner";
import { ReactSortable } from "react-sortablejs";



export default function ProductForm({
    _id, 
    title:existingTitle, 
    description:existingDescription,
    price:existingPrice, 
    images:existingImages, 
    category:assignedCategory,
    properties:assignedProperties,
}){

    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory ||'');
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [deleteState, setDeleteState] = useState();
    const router = useRouter();
    useEffect(()=>{
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, [])

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {title,description,price, images, category, properties:productProperties,};

        if (_id){
            //update

            await axios.put('/api/products', {...data, _id});
        } else {
            //create
        
        await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }
    async function uploadImages(ev){
        console.log(ev.target);
        const files = ev.target?.files;
        console.log(files);
        if (files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file)
            }
 
            const  res = await axios.post('/api/upload', data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
            setIsUploading(false)
        }
    }

    function updateImagesOrder(images){
        setImages(images)
    }

    function setProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        })
    }

    const handleDeleteImage = (indexToDelete) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== indexToDelete));
      };
      

    const propertiesToFill = [];

    if (categories.length > 0 && category) {
        let catInfo = categories.find(({_id}) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        while(catInfo?.parent?._id){
            const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat; 
        }
    }

    return(
    
         
            <form onSubmit={saveProduct}>
                <label >Product name</label>
                <input 
                    type="text" 
                    placeholder="product name"
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)}/>
                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        <option value="">Uncategorized</option>
                        {categories.length > 0 && categories.map(c => (
                            <option value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    {
                        propertiesToFill.length > 0 &&  propertiesToFill.map( p => (
                            <div className="">
                            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
                            <div>
                                <select value={productProperties[p.name]} 
                                        onChange={ev => 
                                            setProductProp(p.name, ev.target.value)}
                                >

                                    {
                                        p.values.map(v => (
                                            <option value={v}>{v}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>

                            </div>
                        ))}
                    
                <label >Photos</label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable 
                        list={images} 
                        className="flex flex-wrap gap-1"
                        setList={updateImagesOrder}>
                    {!!images?.length && images.map((link, index) => (
                        // <div key={link}  className={`h-24  p-4 shadow-sm rounded-sm border border-gray-200 ${!deleteState ? 'bg-red-200' : 'bg-white'}`}>
                        //     <img src={link} alt=""onMouseEnter={() => setDeleteState(false)} onMouseLeave={() => setDeleteState(true)}  className="rounded-lg"/>
                        //     <>
                        //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 text-red-500 relative bottom-10 left-4 ${deleteState ? 'hidden' : ''}`}>
                        //         <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        //         </svg>                        
                        //     </>


                        // </div>
                    <div
                        key={link}
                        className="h-24 w-24 relative rounded-md border border-gray-300 flex items-center justify-center group"
                        >
                        <img
                            src={link}
                            alt=""
                            className="max-w-full max-h-full rounded-md"
                        />
                        
                        {/* Trash Icon shown only on hover */}
                        <button
                            type="button"
                            className="absolute top-1 right-1 p-1 bg-white rounded-full hover:bg-red-100 invisible group-hover:visible"
                            onClick={() => handleDeleteImage(index)}
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="red"
                            className="w-5 h-5"
                            >
                            <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </button>
                    </div>


                    ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24
                        flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24  h-24 cursor-pointer text-center text-sm gap-1 text-primary rounded-sm bg-white flex flex-col  items-center justify-center shadow-sm border border-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>

                        <div>
                            Add image
                        </div>
                        <input type="file" onChange={uploadImages} className="hidden" />
                    </label>
                </div>
                <label >Description</label>
                <textarea 
                    name="" id="" 
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />
                <label >Price (in FCFA)</label>
                <input 
                    type="number" 
                    placeholder="price"
                    value={price} 
                    onChange={ev => setPrice(ev.target.value)}/>
                <button type="submit" className="btn-primary">Save</button>
            </form>

        
        
    )
}