"use client"
import Link from 'next/link'
import React, { useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useEffect } from 'react'
const HeroSection = () => {
  const imageRef=useRef(null);

  useEffect(() => {
    const imageElement=imageRef.current;
    const handScroll=()=>{
      const scrollPosition=window.scrollY;
      const scrollThreshold=100;

      if(scrollPosition>scrollThreshold){
        imageElement.classList.add("scrolled");
      }
      else{
        imageElement.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll",handScroll);
    return()=> window.removeEventListener("scroll",handScroll);

      
  },[])
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div  className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
        <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
         Your AI Career Coach for <br />
         Professional Success{" "}
         <span size="lg" variant="secondary" className="h-11 mt-5 animate-bounce text-blue-50" >🚀</span>!
          </h1>


            <p>Advance your career with Personalised guidance,interview prep and AI powered tools for job sucess </p>
        </div>

        <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
           <Button size="lg" className="px-8" >
            Get Started
           </Button>
            </Link>


            <Link href="https://youtu.be/UbXpRv5ApKA?si=lH8QhgrwG_vHTuAB">
           <Button size="lg" className="px-8" variant="outline"> 
            Get Started
           </Button>
            </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
            <div ref={imageRef} className="hero-image">
            <Image
            src="/Ai robot.jpg"
            width={1200}
            height={720}
           alt="AI Robot"
            className="rounded-lg shadow-2xl border mx-auto"
            priority
             />
            </div>
        </div>
    </div>
    </section>
  )
}

export default HeroSection