import Dashboard from "@/components/Dashboard"
import Layout from "@/components/Layout"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react"
export default function Home() {
  // const {data: session} = useSession()
  // console.log({session})
  const [userProfile, setUserprofile] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserprofile(user);
    }
  }, []);

  
return (
  <Layout>
    <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{userProfile?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src="/coverphoto.jpg" alt="" className="w-6 h-6"/>
          <span className="px-2">
          {userProfile?.email}

          </span>
        </div>
    </div>
    <div>
        <Dashboard />
    </div>
  </Layout>
)
}
