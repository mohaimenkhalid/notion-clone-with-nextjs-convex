"use client"

import React, {ElementRef, useEffect, useRef, useState} from 'react';
import {ChevronsLeft, MenuIcon} from "lucide-react";
import {useMediaQuery} from 'usehooks-ts'
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import UserItem from "@/app/(main)/_components/user-item";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";


function Navigation() {
    const pathname = usePathname();
    const isMobile = useMediaQuery('(max-width: 768px)');
    // @ts-ignore
    const documents = useQuery(api.documents.getSidebar)
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;
        console.log(isResizingRef)
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if(!isResizingRef.current) return;
        let newWidth = event.clientX;

        if(newWidth < 240) newWidth = 240;
        if(newWidth > 480) newWidth = 480;

        if(sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.left = `${newWidth}px`;
            navbarRef.current.style.width = `calc(100%-${newWidth}px)`
        }
    }

    const handleMouseUp = (event: MouseEvent) => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const resetWidth = () => {
        if(sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.left = isMobile ? "0" : "`calc(100%-240px)`";
            navbarRef.current.style.width = isMobile ? "100%" : "240px";
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const collapse = () => {
        if(sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.left = "0";
            navbarRef.current.style.width = "100%";
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    useEffect(() => {
        if(isMobile) {
            collapse()
        } else {
            resetWidth()
        }
    }, [isMobile])

    useEffect(() => {
        if(isMobile) {
            collapse()
        }
    }, [pathname, isMobile])

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isMobile && "w-0",
                    isResetting && "transition-all ease-in-out duration-300"
                )}>
                <ChevronsLeft
                    onClick={collapse}
                    className={cn("w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100",
                        isMobile && "opacity-100"
                    )}/>
                <div>
                </div>
                <UserItem/>
                <div className="mt-4">
                    {
                        documents?.map((document) => (
                            <p key={document._id}>{document.title}</p>
                        ))
                    }
                    <p>Documents</p>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100
                            transition cursor-ew-resize absolute h-full w-1 bg-primary/10
                            right-0 top-0
                "/>
            </aside>
            <div ref={navbarRef}
                 className={cn("absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]",
                     isMobile && "left-0 w-full"
                 )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon onClick={resetWidth} className="h-6 w-6"/>}
                </nav>
            </div>
        </>
    );
}

export default Navigation;