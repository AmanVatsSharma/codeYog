import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='problems w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500 '>
            <div className='header flex justify-between items-center gap-10 px-10 py-5 text-white shadow-lg rounded-lg mx-10 my-5 bg-gradient-to-r from-blue-500 to-purple-500'>
                <div className='logo text-white text-2xl font-bold'>
                    <Image src="/logo.png" alt="logo" width={100} height={100} />
                </div>
            </div>
            <div className="main flex flex-col items-center justify-center gap-5 px-10 py-5">

                <div className="problems-section flex flex-col items-center justify-center gap-5 px-10 py-5">
                    <div className="problems-container flex flex-col items-center justify-center gap-5 px-10 py-5">
                        <div className="problem-card flex flex-col items-center justify-center gap-5 px-10 py-5">
                            <h1>Problem 1</h1>
                        </div>
                    </div>
                    <div className="problems-container flex flex-col items-center justify-center gap-5 px-10 py-5">
                        <div className="problem-card flex flex-col items-center justify-center gap-5 px-10 py-5">
                            <h1>Problem 2</h1>
                        </div>
                    </div>
                    <div className="problems-container flex flex-col items-center justify-center gap-5 px-10 py-5">
                        <div className="problem-card flex flex-col items-center justify-center gap-5 px-10 py-5">
                            <h1>Problem 3</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page

export const Card = (problem: string) => {
    return (
        <div className="card flex flex-col items-center justify-center gap-5 px-10 py-5">
            <h1>{problem}</h1>
        </div>
    )
}