import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"


export default function Layout({children}) {
  const { data: session } = useSession()
  if (!session) {
      return (
    <div className="bg-bgGray w-screen h-screen flex items-center">
      <div className='text-center w-full'>
        <button onClick={() => signIn('google')} className='bg-white p-2 px-4 cursor-pointer rounded-lg'>Login with Google</button>
      </div>
    </div>
  )
  }
  return (
    <div className="bg-gray-200 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-1 mr-1 mb-2 rounded-lg p-4">{children}</div>
    </div>
    
  )
}
