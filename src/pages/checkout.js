import React from 'react'
import Header from '../components/Header'
import Image from "next/image"
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import Currency from "react-currency-formatter"
import { useSession } from 'next-auth/client'

function checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const [session] = useSession()
    console.log(session, "session")
    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/*Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />
                    <div className="flex flex-col space-y-10 p-5 bg-white">
                        <h1 className="text-3xl border-b pb-4">{items.length == 0 ? "Your Amazon Basket is empty." : "Shopping Basket"}</h1>
                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                rating={item.rating}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />)
                        )}
                    </div>
                </div>
                {/*Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap"> Subtotals
                            ({items.length} items):
                            <span className="font-bold">
                                    <Currency quantity={total} currency="GBP" />
                                </span>
                            </h2>

                            <button
                                disabled={!session}
                                className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`
                                }>
                                {!session ? "Sign into checkout" : "Proceed to Checkout"}
                            </button>

                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default checkout
