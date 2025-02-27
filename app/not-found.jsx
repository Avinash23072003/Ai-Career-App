import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound(){
    return(
<div className="flex flex-col items-center justify-center min-h-[100vh] mx-4">
    <h1 className="text-6xl font-bold gradient-title animate-bounce">404</h1>
    <h2 className="font-semibold text-2xl mb-4">Page not found</h2>
    <p className="text-gray-600 mb-8">Oops! You r lookig is page not found</p>
    <Link href="/">
    <Button classname="">Retrun Home</Button>
    </Link>
</div>
    )
}