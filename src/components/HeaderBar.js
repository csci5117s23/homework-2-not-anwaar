import { SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import 'bulma/css/bulma.min.css';


export default function HeaderBar() {
    return (
        <>
            <nav className='navbar' role='navigation'>
                <SignedIn>
                    <span className='navbar-item'>
                        <UserButton 
                        afterMultiSessionSingleSignOutUrl='/' 
                        afterSignOutUrl='/'
                        afterSwitchSessionUrl='/'
                        />
                    </span>
                </SignedIn>
                <Link className='navbar-item' href="/todos">Todos Page</Link>
                <Link className='navbar-item' href="/done">Done Todos</Link>
            </nav>
            <br></br>
        </>
    )

}