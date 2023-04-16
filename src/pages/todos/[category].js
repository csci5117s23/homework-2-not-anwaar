import { useRouter } from "next/router";
import HeaderBar from "@/components/HeaderBar";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FilterUndoneByCategory from "@/components/FilterUndoneByCategory";

export default function UndoneTodoItemsInCategory() {
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const router = useRouter()
    const {category} = router.query

    useEffect(() => {
        if (isLoaded && !userId) {
            router.push("/")
        }
    }, [isLoaded])

    return (
        <>
            <SignedIn>
                <HeaderBar />
                <FilterUndoneByCategory category={category} />
            </SignedIn>
            <SignedOut>
                Redirecting...
            </SignedOut>
        </>
    )
}