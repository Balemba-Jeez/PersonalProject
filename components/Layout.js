import Nav from "@/components/Nav"
// import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";
import Logo from "@/components/Logo"
import Login from "@/pages/login";
import { useRouter } from 'next/router';

export default function Layout({children}) {
  const router = useRouter();
  // const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Only runs in the browser
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      
    }else {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    
    <div className="bg-gray-200 min-h-screen">
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} setShowNav={setShowNav}/>
        <div className=" flex-grow mt-1  p-4">{children}</div>
      </div>
    </div>
    
  )
}
