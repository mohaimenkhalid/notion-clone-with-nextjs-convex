"use client"

import { useConvexAuth } from "convex/react";
import {Spinner} from "@/components/spinner";
import {redirect} from "next/navigation";


export default function MainLayout({children}: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    if(isLoading) {
       return (
           <div className="w-full min-h-full flex justify-center items-center">
               <Spinner size={'icon'}/>
           </div>
       )
    }
    if(!isAuthenticated) {
        return redirect('/')
    }
    return (
        <div>{children}</div>
    )
}
