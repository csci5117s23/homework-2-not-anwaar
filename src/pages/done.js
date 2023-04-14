import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import HeaderBar from "@/components/HeaderBar";
import ShowDoneTodos from "@/components/ShowDoneTodos";


export default function done() {
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
                <ShowDoneTodos />
            </SignedIn>
            <SignedOut>
                Redirecting...
            </SignedOut>
        </>
    )
}