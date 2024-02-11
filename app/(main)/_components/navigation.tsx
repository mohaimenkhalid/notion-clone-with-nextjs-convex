"use client"

import React, {ElementRef, useRef} from 'react';
import {ChevronsLeft} from "lucide-react";

function Navigation() {

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    return (
        <>
            <aside className="group/sidebar h-full bg-secondary overflow-y-auto
            relative flex w-60 flex-col z-[99999]">
                <ChevronsLeft className="w-6 h-6 text-muted-foreground rounded-sm
                                        hover:bg-neutral-300 dark:hover:bg-neutral-600
                                        absolute top-3 right-2
                                        opacity-0 group-hover/sidebar:opacity-100
                " />
                <div>
                    {JSON.stringify(isResizingRef)}
                    {JSON.stringify(sidebarRef)}
                </div>
                <div>
                    <p>Action items</p>
                </div>
                <div className="mt-4">
                    <p>Documents</p>
                </div>
                <div className="opacity-0 group-hover/sidebar:opacity-100
                            transition cursor-ew-resize absolute h-full w-1 bg-primary/10
                            right-0 top-0
                " />
            </aside>
        </>
    );
}

export default Navigation;