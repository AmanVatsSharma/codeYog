import { Goal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500">

      <div className="header flex justify-between items-center gap-10 px-10 py-5 text-white shadow-lg rounded-lg mx-10 my-5 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="logo text-white text-2xl font-bold">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <div className="nav flex gap-3 text-white">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>

      <div className="content flex-col items-center justify-center gap-5 px-10 py-5">
        <div className="hero flex flex-col items-center justify-center gap-5">
          <h1 className="text-white text-4xl font-bold">Welcome to CodeYog</h1>
          <p className="text-white text-2xl font-bold">
            CodeYog is a platform for learning coding.
          </p>
          <p className="text-white text-2xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <button className="bg-white text-black px-4 py-2 rounded-md" >
            <Link className="flex gap-3" href="/dashboard">
            <Goal />
            Go To Dashboard</Link>
          </button>
        </div>
      </div>

    </div>
  );
}
