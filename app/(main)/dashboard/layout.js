import React, { Suspense } from 'react'
import {BarLoader} from "react-spinners"
const Layout = ({children}) => {
  return (
    <div className="px-5"> 
        <div className="flex items-center justify-between mb-5">
   <h1 className="font-bold text-3xl gradient-title">Industry Insights</h1>
            </div>
            <Suspense fallback={<BarLoader className="mt-5" width={"100%"} color="gray"/>} >{children}</Suspense>
            
    </div>
  )
}

export default Layout