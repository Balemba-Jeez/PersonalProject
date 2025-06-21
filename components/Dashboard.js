import styled, { createGlobalStyle } from "styled-components"
import { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { CubeIcon } from '@heroicons/react/24/solid'
import { ReceiptPercentIcon } from '@heroicons/react/24/solid'
import { DocumentCheckIcon } from '@heroicons/react/24/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { ChartBarIcon } from '@heroicons/react/24/solid'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/solid'
import { ClockIcon } from '@heroicons/react/24/outline'
import { CalendarIcon } from '@heroicons/react/24/outline';
import {timeSince}  from "@/utils/dateUtils";
import getShortTitleString from "@/utils/shortProductTitleString";
import dateFormatter from "@/utils/dateFormatter";



const PageGlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    text-decoration: none;
}

li {
    list-style: none;
}

:root {
    --poppins: 'Poppins', sans-serif;
    --lato: 'Lato', sans-serif;

    --light: #F9F9F9;
    --blue: #3C91E6;
    --light-blue: #CFE8FF;
    --grey: #eee;
    --dark-grey: #AAAAAA;
    --dark: #342E37;
    --red: #DB504A;
    --yellow: #FFCE26;
    --light-yellow: #FFF2C6;
    --orange: #FD7238;
    --light-orange: #FFE0D3;
}

html {
    overflow-x: hidden;
}

body.dark {
    --light: #0C0C1E;
    --grey: #060714;
    --dark: #FBFBFB;
}

body {
    background: var(--grey);
    overflow-x: hidden;
}
`;

const StyledSection = styled.div`

/* CONTENT */
#content {
    
    width: 100%;

}


/* MAIN */
#content main {
    width: 100%;
    padding-top: 0;
    font-family: var(--poppins);
    min-height: 100vh;
}

#content main .head-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 16px;
    flex-wrap: wrap;
}

#content main .head-title .left h1 {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--dark);
}

#content main .head-title .left .breadcrumb {
    display: flex;
    align-items: center;
    grid-gap: 16px;
}

#content main .head-title .left .breadcrumb li {
    color: var(--dark);
}

#content main .head-title .left .breadcrumb li a {
    color: var(--dark-grey);
    pointer-events: none;
}

#content main .head-title .left .breadcrumb li a.active {
    color: var(--blue);
    pointer-events: unset;
}

#content main .head-title .btn-download {
    height: 36px;
    padding: 0 16px;
    border-radius: 36px;
    background: var(--blue);
    color: var(--light);
    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 10px;
    font-weight: 500;
}




#content main .box-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    grid-gap: 24px;
    margin-top: 26px;
}

#content main .box-info li {
    padding: 24px;
    background: var(--light);
    border-radius: 20px;
    display: flex;
    align-items: center;
    grid-gap: 24px;
}

#content main .box-info li .bx {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

// #content main .box-info li:nth-child(1) .bx {
//     background: #CFE8FF;
//     color: #3C91E6;
// }

// #content main .box-info li:nth-child(2) .bx {
//     background: var(--light-yellow);
//     color: var(--yellow);
// }

// #content main .box-info li:nth-child(3) .bx {
//     background: var(--light-orange);
//     color: var(--orange);
// }

#content main .box-info li .text h3 {
    font-size: 32px;
    font-weight: 600;
    color: #1e3a8a;
}

#content main .box-info li .text p {
    color: #6b7280;
    font-weight: 550;
}





#content main .table-data {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 24px;
    margin-top: 24px;
    width: 100%;
    color: var(--dark);
}

#content main .table-data>div {
    border-radius: 20px;
    background: var(--light);
    padding: 24px;
    overflow-x: auto;
}

#content main .table-data .head {
    display: flex;
    align-items: center;
    grid-gap: 16px;
    margin-bottom: 24px;
}

#content main .table-data .head h3 {
    margin-right: auto;
    font-size: 24px;
    font-weight: 600;
}

#content main .table-data .head .bx {
    cursor: pointer;
}

#content main .table-data .order {
    flex-grow: 1;
    flex-basis: 500px;
}

#content main .table-data .order table {
    width: 100%;
    border-collapse: collapse;
}

#content main .table-data .order table th {
    padding-bottom: 12px;
    font-size: 13px;
    text-align: left;
    border-bottom: 1px solid var(--grey);
}

#content main .table-data .order table th:nth-child(2){
    padding-left: 10px;
    padding-right: 16px;
} 

#content main .table-data .order table th:nth-child(3){
    padding-left: 10px;
    padding-right: 16px;
}

#content main .table-data .order table td {
    padding: 16px 0px;
}

#content main .table-data .order table tr td:nth-child(2) {
    padding-left: 10px;
    padding-right: 16px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:flex-start;
    
}

#content main .table-data .order table tr td:nth-child(3) {
    padding-left: 10px;
    padding-right: 16px;
    
}

#content main .table-data .order table td img {
    width: 70px;
    height: 70px;
    border-radius: 10%;
    object-fit: cover;
    
}

#content main .table-data .order table tbody tr:hover {
    background: var(--grey);
    cursor:pointer;
}

#content main .table-data .order table tr td .status {
    font-size: 10px;
    padding: 6px 16px;
    color: var(--light);
    border-radius: 4px;
    font-weight: 700;
    text-transform: Capitalize;
    display: block;
    text-align: center;
}

#content main .table-data .order table tr td .status.completed {
    background: var(--blue);
}

#content main .table-data .order table tr td .status.processing {
    background: var(--yellow);
}

#content main .table-data .order table tr td .status.pending {
    background: var(--orange);
    
}


#content main .table-data .todo {
    flex-grow: 1;
    flex-basis: 300px;
}

#content main .table-data .todo .todo-list {
    width: 100%;
}

#content main .table-data .todo .todo-list li {
    width: 100%;
    margin-bottom: 16px;
    background: var(--grey);
    border-radius: 10px;
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#content main .table-data .todo .todo-list li .bx {
    cursor: pointer;
}

#content main .table-data .todo .todo-list li.completed {
    border-left: 10px solid var(--blue);
}

#content main .table-data .todo .todo-list li.not-completed {
    border-left: 10px solid var(--orange);
}

#content main .table-data .todo .todo-list li:last-child {
    margin-bottom: 0;
}

/* MAIN */
/* CONTENT */









@media screen and (max-width: 768px) {
    #sidebar {
        width: 200px;
    }

    #content {
        width: calc(100% - 60px);
        left: 200px;
    }

    #content nav .nav-link {
        display: none;
    }
}






@media screen and (max-width: 576px) {
    #content nav form .form-input input {
        display: none;
    }

    #content nav form .form-input button {
        width: auto;
        height: auto;
        background: transparent;
        border-radius: none;
        color: var(--dark);
    }

    #content nav form.show .form-input input {
        display: block;
        width: 100%;
    }

    #content nav form.show .form-input button {
        width: 36px;
        height: 100%;
        border-radius: 0 36px 36px 0;
        color: var(--light);
        background: var(--red);
    }

    #content nav form.show~.notification,
    #content nav form.show~.profile {
        display: none;
    }

    #content main .box-info {
        grid-template-columns: 1fr;
    }

    #content main .table-data .head {
        min-width: 420px;
    }

    #content main .table-data .order table {
        min-width: 420px;
    }

    #content main .table-data .todo .todo-list {
        min-width: 420px;
    }
}

`;

export default function Dashboard() {
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [product, setProduct] = useState([]);
    const [orders, setOrders] = useState([]);
    const [productsPerDay, setProductsPerDay] = useState(0);
    const [productsPerWeek, setProductsPerWeek] = useState(0);
    const [productsPerMonth, setProductsPerMonth] = useState(0);

    //get all products
    useEffect(() => {
        axios.get('/api/products')
          .then(response => {
            setTotalProduct(response.data.length);
          })
          .catch(error => {
            console.error("Failed to fetch products", error);
          });
      }, []);


      //get latest products
      useEffect(() => {
        axios.get('/api/products?latest=true')
          .then(response => {
            console.log("products", product);
            setProduct(response.data);
          })
          .catch(error => {
            console.error("Failed to fetch products", error);
          });
      }, []);
      

    //get all orders
    useEffect(() => {
        axios.get('/api/order')
            .then(response => {
            setTotalOrder(response.data.length);
            console.log('orders', response.data)
            })
            .catch(error => {
            console.error("Failed to fetch products", error);
            });
        }, []);

      //get latest products
      useEffect(() => {
        axios.get('/api/order?latest=true')
          .then(response => {
            console.log("latest orders", orders);
            setOrders(response.data);
          })
          .catch(error => {
            console.error("Failed to fetch products", error);
          });
      }, []);
      

      //get all orders per day
      useEffect(() => {
        axios.get('/api/order?today=true')
          .then(response => {
            console.log("Orders today count:", response.data.count);
            setProductsPerDay(response.data.count);
          })
          .catch(error => {
            console.error("Failed to fetch orders today", error);
          });
      }, []);

        //get all orders per week
        useEffect(() => {
            axios.get('/api/order?week=true')
            .then(response => {
                console.log("Orders per week count:", response.data.count);
                setProductsPerWeek(response.data.count);
            })
            .catch(error => {
                console.error("Failed to fetch orders this week", error);
            });
        }, []);

        //get all orders per week
        useEffect(() => {
            axios.get('http://localhost:3000/api/order?month=true')
                .then(response => {
                console.log("Orders per Month count:", response.data.count);
                setProductsPerMonth(response.data.count);
            })
            .catch(error => {
                console.error("Failed to fetch orders this month", error);
            });
        }, []);



    return(
        <div>
            <PageGlobalStyle />
            <StyledSection>
                <section id="content">
                    {/* <!-- NAVBAR --> */}
                    {/* <nav>
                        <i className='bx bx-menu' ></i>
                        <a href="#" className="nav-link">Categories</a>
                        <form action="#">
                            <div className="form-input">
                                <input type="search" placeHolder="Search..." />
                                <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                            </div>
                        </form>
                        <input type="checkbox" id="switch-mode" hidden />
                        <label for="switch-mode" className="switch-mode"></label>
                        <a href="#" className="notification">
                            <i className='bx bxs-bell' ></i>
                            <span className="num">8</span>
                        </a>
                        <a href="#" className="profile">
                            <img src="img/people.png" />
                        </a>
                    </nav> */}
                    {/* <!-- NAVBAR --> */}

                    {/* <!-- MAIN --> */}
                    <main>
                        {/* <div className="head-title">
                            <div className="left">
                                <h1>Dashboard</h1>
                            </div>
                        </div> */}
                        <h1 className="block text-3xl font-medium mb-0 mt-6">Total</h1>
                        <ul className="box-info ">
                            
                            <li>
                                {/* <i className='bx bxs-calendar-check' ></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 bx text-[#3C91E6] bg-[#CFE8FF]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <span className="text">
                                    <p>PRODUCTS</p>
                                    <h3>{totalProduct}</h3>
                                    
                                </span>
                            </li>
                            <li>
                                {/* <i className='bx bxs-group' ></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 bx text-[#FFCE26] bg-[#FFF2C6]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                                <span className="text">
                                    <p>ORDERS</p>
                                    <h3>{totalOrder}</h3>
                                    
                                </span>
                            </li>
                            <li>
                                {/* <i className='bx bxs-dollar-circle' ></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 bx text-[#FD7238] bg-[#FFE0D3]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>
                                <span className="text">
                                    <p>REVENUES</p>
                                    <h3>25.5K</h3>
                                    
                                </span>
                            </li>
                        </ul>
                        
                        <h1 className="block text-3xl font-medium mb-0 mt-6">Orders</h1>
                        <ul className="box-info ">
                    
                            <li>
                                {/* <i className='bx bxs-calendar-check' ></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 bx text-[#3C91E6] bg-[#CFE8FF]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                                <span className="text">
                                    <p>TODAY</p>
                                    <h3>{productsPerDay}</h3>
                                    
                                </span>
                            </li>
                            <li>
                                {/* <i className='bx bxs-group' ></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 bx text-[#FFCE26] bg-[#FFF2C6]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="text">
                                    <p>THIS WEEK</p>
                                    <h3>{productsPerWeek}</h3>
                                    
                                </span>
                            </li>
                            <li>
                                {/* <i className='bx bxs-dollar-circle' ></i> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 bx text-[#FD7238] bg-[#FFE0D3]">
                                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                                </svg>
                                <span className="text">
                                    <p>THIS MONTH</p>
                                    <h3>{productsPerMonth}</h3>
                                    
                                </span>
                            </li>
                        </ul>

                        <div className="table-data">
                            <div className="order">
                                <div className="head">
                                    <h3>Recent orders</h3>
                                    {/* <i className='bx bx-search' ></i>
                                    <i className='bx bx-filter' ></i> */}
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order ID{"       "}</th>
                                            <th>Products</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            
                                                <tr>
                                                <td className="font-semibold">#{order._id.substring(0, 8)}</td>
                                                <td>
                                                    {/* <img src={product[0].images[0]}/> */}
                                                    <p>{getShortTitleString(order.productDetails)}</p>
                                                </td>
                                                <td>{timeSince(order.createdAt)}</td>
                                                <td><span className={"status"+` ${order.status}`}>{order.status}</span></td>
                                            </tr>
                                            )
                                        )}
                                        
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="todo">
                                <div className="head">
                                    <h3>Recent products</h3>
                                    <i className='bx bx-plus' ></i>
                                    <i className='bx bx-filter' ></i>
                                </div>
                                <ul className="todo-list">
                                    <li className="completed">
                                        <p>Todo List</p>
                                        <i className='bx bx-dots-vertical-rounded' ></i>
                                    </li>
                                    
                                </ul>
                            </div> */}
                            <div className="order">
                                <div className="head">
                                    <h3>Recent products</h3>
                                    <i className='bx bx-search' ></i>
                                    <i className='bx bx-filter' ></i>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product </th>
                                            <th>Category</th>
                                            <th>Price</th>
                                            <th>Date Added</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            product.map((product) => {
                                                return (   
                                            <tr>
                                                <td>{product.title}</td>
                                                <td>
                                                    <img src={product.images[0]}/>
                                                    
                                                </td>
                                                <td>XAF{product.price}</td>
                                                <td>{dateFormatter(product.updatedAt)}</td>
                                            </tr>
                                            );
                                            })
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                    {/* <!-- MAIN --> */}
                </section>
            </StyledSection>

        </div>
    )
}