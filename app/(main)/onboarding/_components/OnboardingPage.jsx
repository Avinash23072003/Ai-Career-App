'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { onboardingSchema } from '@/app/lib/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateUser } from '@/actions/user';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  // Custom Fetch Hook
  const { loading: updateLoading, fn: updateUserfn, data: updateResult } = useFetch(updateUser);

  // Form Handling
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const watchIndustry = watch('industry');

  // Handle Form Submit
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry || 'General'}`;
      await updateUserfn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Error updating profile");
    }
  };

  // Handle Success Response
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully");
      router.push("/dashboard");
    }
  }, [updateResult, updateLoading]);

  return (
    <div className="flex items-center justify-center bg-background min-h-screen overflow-auto">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">Complete your profile</CardTitle>
          <CardDescription>Select your industry to get personalized career insights and recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 mt-2">
              <Label htmlFor="industry">Industry</Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedIndustry(industries.find((ind) => ind.id === value));
                      setValue('subIndustry', '');
                    }}
                    value={field.value}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem value={ind.id} key={ind.id}>
                          {ind.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && <p className="text-sm text-red-600">{errors.industry.message}</p>}
            </div>

            {watchIndustry && (
              <div className="space-y-2 mt-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Controller
                  name="subIndustry"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="subIndustry">
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedIndustry?.subIndustries.map((subInd) => (
                          <SelectItem value={subInd} key={subInd}>
                            {subInd}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subIndustry && <p className="text-sm text-red-600">{errors.subIndustry.message}</p>}
              </div>
            )}

            <div className="space-y-2 mt-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" min="0" max="50" placeholder="Enter your years of experience" {...register('experience')} />
              {errors.experience && <p className="text-sm text-red-600">{errors.experience.message}</p>}
            </div>

            <div className="space-y-2 mt-2">
              <Label htmlFor="skills">Skills</Label>
              <Input id="skills" placeholder="e.g., Python, Java, ..." {...register('skills')} />
              <p className="text-sm text-muted-foreground">Separate multiple skills with commas</p>
              {errors.skills && <p className="text-sm text-red-600">{errors.skills.message}</p>}
            </div>

            <div className="space-y-2 mt-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself" className="h-32" {...register('bio')} />
              {errors.bio && <p className="text-sm text-red-600">{errors.bio.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-4" disabled={updateLoading}>
              {updateLoading ? <><Loader2 className="mr-2 w-4 animate-spin" />Saving...</> : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
