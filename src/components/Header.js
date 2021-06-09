import React, { useState } from 'react'
import Image from "next/image"
import { MenuIcon, SearchIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'

function Header() {
    const [session] = useSession()
    const router = useRouter()
    const items= useSelector(selectItems)
    return (
        <header>
            {/*Top nav  */}
            
            <div className=" header-top flex  items-center  bg-amazon_blue flex-grow py-2">
                <div className="flex mt-2 items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={() => router.push('/')}
                        src="https://links.papareact.com/f90"
                        height={40}
                        width={150}
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>

                {/* Search */}
                <div className="hidden sm:flex items-center flex-grow cursor-pointer rounded-md h-10 bg-yellow-400 hover:bg-yellow-500">
                    <input type="text" className="p-2 h-full w-6 flex-grow rounded-l-md flex-strink focus:outline-none px-4" />
                    <SearchIcon className="h-12 p-4" />
                </div>

                {/* Right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div onClick={!session ? signIn : signOut} className="link">
                        <p>{session ? `Hello ${session.user.name}` : 'Sign In'}</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div >
                    <div className="link">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">orders</p>
                    </div>
                    <div onClick={() => router.push("/checkout")} className="relative link flex items-center">
                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                            {items.length}
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline mt-2 font-extrabold md:text-sm">Basket</p>
                    </div>
                </div>
            </div>

            {/* Bottom nav */}
            <div className="header-second-top flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime video</p>
                <p className="link">Amazon Bussiness</p>
                <p className="link">Today's deals</p>
                <p className="hidden lg:inline link">Electronics</p>
                <p className="hidden lg:inline link">Food & Grocery</p>
                <p className="hidden lg:inline link">Prime</p>
                <p className="hidden lg:inline link">Shopper Toolkit</p>
                <p className="hidden lg:inline link">Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header