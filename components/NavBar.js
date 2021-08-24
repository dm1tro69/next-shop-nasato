import Link from "next/link";
import {useEffect, useState} from "react";
import {fetchJson} from "../lib/api";

const NavBar = () => {
     const [user, setUser] = useState()

    useEffect(() => {
        (
            async ()=> {
             try {
                 const user = await fetchJson('/api/user')
                 setUser(user)
             }catch (e) {

             }
            }

        )()

    }, [])

    const handleSignOut = async () => {
          await fetchJson('/api/logout')
           setUser(undefined)
    }

    return (
        <nav className={'px-2 py-1 text-sm'}>
            <ul className={'flex gap-2'}>
                <li className={'text-lg font-extrabold'}>
                    <Link href={'/'}><a>Next Shop</a></Link>
                </li>
                <li role={'separator'} className={'flex-1'}/>
                {user? (
                    <>
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </li>
                       <li>
                           {user.name}
                       </li>
                    </>
                ): (
                    <li>
                        <Link href={'/sign-in'}><a>Sign In</a></Link>
                    </li>
                )}

            </ul>
        </nav>
    );
};

export default NavBar;
