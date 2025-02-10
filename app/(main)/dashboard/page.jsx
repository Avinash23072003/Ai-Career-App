import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

const IndustryInsights = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();  // Correct variable name

  console.log("User Onboarding Status:", isOnboarded);

  if (!isOnboarded) {
    console.log("Redirecting to onboarding...");
    redirect("/onboarding");
  }

  return <div>IndustryInsights</div>;
};

export default IndustryInsights;
