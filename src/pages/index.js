import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const { isLoaded, userId, sessionId, getToken } = useAuth()

  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/todos")
    }
  }, [isLoaded])

  return (
    <>
        <SignedIn>
          Redirecting...
        </SignedIn>
        <SignedOut>
          <div>
            Welcome to Anwaar's Todo List App <br></br>
            Please Sign In...
          </div>
          <div className='sign-in-thingy'>
            <SignIn />
          </div>
        </SignedOut>
    </>
  )
}