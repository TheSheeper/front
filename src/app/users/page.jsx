"use client"
import UserTable from "@/components/userTable";
import { getCredentials } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function UsersPage() {
    const [credentials, setCredentials] = useState();
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (loading) {
            const user = getCredentials()
            if (!user) {
                alert("You are not logged in, redirecting")
                router.push("/")
            } else {
                setCredentials(user)
                setLoading(false)
            }
        }
    }, [loading, router])

    const onLogout = () => {
        localStorage.removeItem('credentials');
        router.push('/')
    }

    return (
        <>
            {loading ? <></> :
                <div className="min-h-screen  w-full flex flex-col items-center">
                    <div className="flex flex-row items-center justify-end p-3 gap-5 w-screen bg-gray-800">
                        <p>Hello, {credentials && credentials.fullname}</p>
                        <button onClick={onLogout}>Logout</button>
                    </div>
                    <h1 className="font-extrabold text-5xl mt-10 mb-10">Users</h1>
                    <div className="mb-20">
                        <UserTable></UserTable>
                    </div>
                </div>
            }
        </>

    )
}