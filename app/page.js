import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  console.log("Clerk Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    
    <div>
     Hello Felloo devlopers
     <br></br>
     <Button>Hello</Button>
    </div>
   

  );
}
