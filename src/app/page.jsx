"use client"
import { login } from "@/api/auth";
import { save } from "@/utils/localStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const router = useRouter()

  const onsubmit = async (data) => {
    const credentials = await login(data)
    if (credentials.error) alert(credentials.message)
    else {
      save("credentials", credentials)
      router.push("/users")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col bg-gray-800 rounded-md p-10">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl mb-4">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col justify-center items-center">
          <div className="flex flex-col">
            <label >Email</label>
            <input {...register("email", { required: true, type: "email", maxLength: "40" })} className="text-black p-1 rounded-sm" />
            {errors.email?.type === "required" && (
              <div className="error">Email is required</div>
            )}
            {errors.email?.type === "maxLength" && (
              <div className="error">Max length of 20</div>
            )}
          </div>
          <div className="flex flex-col">
            <label >Password</label>
            <input type="password" {...register("password", { required: true, type: "email", maxLength: "40" })} className="text-black p-1 rounded-sm" />

            {errors.password?.type === "required" && (
              <div className="error">Password is required</div>
            )}
            {errors.password?.type === "maxLength" && (
              <div className="error">Max length of 20</div>
            )}
          </div>
          <input type="submit" value={"Login"} className="bg-lime-500 w-1/2 mt-4 rounded-sm font-bold cursor-pointer" />
          <div className="m-1">
            <Link href="/register" className="text-gray-400 ">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
