"use client"
//
// import { useConvexAuth } from "convex/react";
// import {Spinner} from "@/components/spinner";
// import {redirect} from "next/navigation";
import Navigation from "@/app/(main)/_components/navigation";


export default function MainLayout({children}: { children: React.ReactNode }) {
    // const { isAuthenticated, isLoading } = useConvexAuth();
    // if(isLoading) {
    //    return (
    //        <div className="w-full min-h-full flex justify-center items-center">
    //            <Spinner size={'icon'}/>
    //        </div>
    //    )
    // }
    // if(!isAuthenticated) {
    //     return redirect('/')
    // }
    return (
        <div className="flex h-full dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
