'use client'

import Link from 'next/link'
import CartModal from "@/app/components/CartModel";
import { useParams } from "next/navigation";
import HeaderBar from "@/app/components/HeaderBar";
import MenuCard from "@/app/components/MenuCard";

export default function MenuPage() {
    const params = useParams()
    const id = params.id

    return (
        <div>
            <HeaderBar />
            <div className="px-6 py-12 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10">Menu</h1>
                <Link href="/restaurants" className="text-blue-600 underline mb-4 block">Go Back</Link>
                <MenuCard id={id as string} />
                <CartModal />
            </div>
        </div>
    )
}