import { useState } from "react"
import { heroSectionData } from "../assets/assets";

const Login = () => {
  const [isLoginState,setIsLoginState]=useState(true);
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)

  const handleSubmit = async(e:React.SubmitEvent)=>{
    e.preventDefault();
    setLoading(true);
    setTimeout(()=>window.location.href = "/",1000)
  }
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
      <img src={heroSectionData.hero_image} alt="" className="absolute inset-0 object-cover h-full bg-center opacity-10"/>
      <div className="relative text-center px-12">
        <h2 className="text-4xl font-semibold text-white mb-4">Welcome back to Instacart</h2>
        <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">Fresh groceries and organic produce, delivered to your doorstep.</p>
      </div>

      </div>
      {/* Right Side */}

    </div>
  )
}

export default Login