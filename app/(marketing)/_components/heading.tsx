import React from 'react';
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {SignInButton, UserButton} from "@clerk/clerk-react";
import {useConvexAuth} from "convex/react";
import {Spinner} from "@/components/spinner";


function Heading() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your Ideas, Documents, & Plans. Unified. Welcome to <span className="underline">Jotion</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Jotion is the connected workspace where <br/>
                better, faster work happens.
            </h3>
            {isLoading && (
                <div className="w-full flex justify-center"><Spinner /></div>
            )}
            {!isAuthenticated && !isLoading && (
                <>
                    <SignInButton mode="modal">
                        <Button size="sm">
                            Get Jotion free
                        </Button>
                    </SignInButton>
                </>
            )}
            {isAuthenticated && !isLoading && (
                <>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/documents">
                            Enter Jotion
                        </Link>
                    </Button>
                    <UserButton
                        afterSignOutUrl="/"
                    />
                </>
            )}
            {/*{isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Jotion
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get Jotion free
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}*/}
        </div>
    );
}

export default Heading;