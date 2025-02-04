import React from 'react'
import {SignIn,SignInButton,SignedIn,SignedOut ,UserButton} from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard,  Pen,  PenBox,  StarsIcon, User } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
    
  
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
       <Link href="/">
  
       <Image src="/Aicareerlogo.jpg" alt="AI Career" width={1200} height={220}   className="h-16  w-auto object-contain"/>
     </Link>

       
       <div className="flex items-center space-x-4">
     <SignedIn>
      <Link href={"/dashboard"}>
      <Button variant="outline">
        <LayoutDashboard className="h-4 w-4"/>
        <span className='hidden md:block'>Insight Industry</span>
      </Button>
      </Link>
     



   <DropdownMenu>
    <DropdownMenuTrigger asChild>
   <Button>
        <StarsIcon className="h-4 w-4"/>
        <span className='hidden md:block'>Growth tools</span>
        <ChevronDown className='h-4 w-4'/>
      </Button>
    </DropdownMenuTrigger>

  <DropdownMenuContent>
  <DropdownMenuItem>
    <Link href={'/resume'} className='flex items-center  gap-2'> 
    <FileText className="h-4 w-4"/>
    <span >Build Resume</span> 
    </Link>
  </DropdownMenuItem>


  <DropdownMenuItem>
    <Link href={'/ai-cover-letter'} className='flex items-center  gap-2'> 
    <PenBox className="h-4 w-4"/>
    <span >Cover Letter</span> 
    </Link>
  </DropdownMenuItem>

  <DropdownMenuItem>
    <Link href={'/interview'} className='flex items-center  gap-2'> 
    <GraduationCap className="h-4 w-4"/>
    <span >Interview Prep</span> 
    </Link>
  </DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu>
</SignedIn>

      <SignedOut>
       <SignInButton>
        <Button variant="outline">Sign In</Button>
       </SignInButton>
       </SignedOut>
       <SignedIn>
        <UserButton   appearance={{
          elements:{
            avatarBox:"w-10 h-10",
            userButtonPopoverCard:"shadow-xl",
            userPreviewMainIdentifier:"font-semibold",
          },
        }} 
        afterSignOutUrl='/'/>
       </SignedIn>
       </div>
       </nav> 


      
       </header>
      
  )
}

export default Header