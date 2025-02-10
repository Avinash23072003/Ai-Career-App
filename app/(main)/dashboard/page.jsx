import { getIndustryInsights } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import DashboardView from './_components/DashBoard-View';
const IndustryInsights = async () => {
  const { isOnboarded } = await getUserOnboardingStatus(); 
  const insights=await getIndustryInsights(); // Correct variable name

  console.log("User Onboarding Status:", isOnboarded);

  if (!isOnboarded) {
    console.log("Redirecting to onboarding...");
    redirect("/onboarding");
  }

  return(

    <div className="container mx-auto">
    <DashboardView insights={insights}/>
  </div>
  ) 
};

export default IndustryInsights;
