import { getAuth, signOut } from '@firebase/auth'
import React from 'react'

export default function LogOut() {

    const signOutHandler = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
    }

    return (
        <div>
            <button onClick={(e) => signOutHandler()}>Sign Out</button>
        </div>
    )
}
