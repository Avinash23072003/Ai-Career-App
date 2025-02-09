import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
const IndustryInsights = async() => {
     const {isOnboarded}=await getUserOnboardingStatus()
        if(!isOnboarded){
            redirect("/onboarding")
        }
  return (
    <div>IndustryInsights</div>
  )
}

export default IndustryInsights