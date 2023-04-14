import { useRouter } from "next/router";
import HeaderBar from "@/components/HeaderBar";
import { useAuth } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import 'bulma/css/bulma.min.css';
import Link from 'next/link';
import { getTodo } from "@/modules/db";
import SingleTodo from "@/components/SingleTodo";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function todoItem() {
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        if (isLoaded && !userId) {
            router.push("/")
        }
    }, [isLoaded])

    return (
        <>
            <SignedIn>
                <HeaderBar />
                <SingleTodo id={id} />
            </SignedIn>
            <SignedOut>
                Redirecting...
            </SignedOut>
        </>
    )
}