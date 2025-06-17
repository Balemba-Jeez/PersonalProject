import Dashboard from "@/components/Dashboard"
import Layout from "@/components/Layout"
// import { useSession } from "next-auth/react"
export default function Home() {
  // const {data: session} = useSession()
  // console.log({session})
return (
  <Layout>
    <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{"Admin"}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={""} alt="" className="w-6 h-6"/>
          <span className="px-2">
          {"Admin user"}

          </span>
        </div>
    </div>
    <div>
        <Dashboard />
    </div>
  </Layout>
)
}
