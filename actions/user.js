'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';




export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  // Fetch the user from the database using the clerkUserId
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error('User not found');

  try {
    const result = await db.$transaction(async (tx) => {
      // Check if the industry exists
      let industryInsight = await tx.industryInsight.findUnique({
        where: {
          industry: data.industry,
        },
      });

      // If not, create it with default values
      if (!industryInsight) {
        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
            salaryRanges: [],
            growthRate: 0,
            demandLevel: 'MEDIUM',
            topSkills: [],
            marketOutlook: 'NEUTRAL',
            keyTrends: [],
            recommendationSkills: [],
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
          },
        });
      }

      // Update the user
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updatedUser, industryInsight };
    });

    return {
      success: true,
      updatedUser: result.updatedUser,
    };
  } catch (error) {
    console.error('Error updating user and industry:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}


export async function getUserOnboardingStatus() {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error('No user ID found.');
      return { isOnboarded: false };  // Return false instead of throwing an error
    }

    // Fetch user from the database using Clerk user ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    if (!user) {
      console.error('User not found in the database.');
      return { isOnboarded: false }; // Return false instead of throwing
    }

    return { isOnboarded: !!user.industry };  // Corrected property name
  } catch (error) {
    console.error('Failed to check onboarding status:', error.message);
    return { isOnboarded: false }; // Return false instead of throwing
  }
}
