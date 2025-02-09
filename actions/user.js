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
    const result = await db.$transaction(
      async (tx) => {
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
              demandLevel: 'Medium',
              topSkills: [],
              marketOutlook: 'Neutral',
              keyTrends: [],
              recommendedSkills: [],
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
      },
      {
        timeout: 10000, // 10 seconds
      }
    );
    return result.updatedUser;
  } catch (error) {
    console.error('Error updating user and industry:', error.message);
    throw new Error('Failed to update user');
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();

  if (!userId) throw new Error('Unauthorized');

  // Fetch the user from the database using the clerkUserId
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
    },
  });

  if (!user) throw new Error('User not found');

  try {
    return {
      isOnBoarded: !!user.industry,
    };
  } catch (error) {
    console.error('Failed to check onboarding status:', error.message);
    throw new Error('Failed to check onboarding status');
  }
}
