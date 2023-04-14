import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import HeaderBar from "@/components/HeaderBar";
import { useEffect } from "react";
import TodoEditor from "@/components/TodoEditor";


export default function todos() {
    const router = useRouter()
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    useEffect(() => {
        if (isLoaded && !userId) {
            router.push("/")
        }
    }, [isLoaded])
    return (
        <>
            <SignedIn>
                <HeaderBar />
                <TodoEditor />
            </SignedIn>
            <SignedOut>
                Redirecting...
            </SignedOut>
        </>
    )
}