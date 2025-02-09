'use client';

import React, { useState } from 'react';
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

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const {register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const watchIndustry = watch('industry');

  const onSubmit = async (values) => {
    // Handle form submission
    console.log(values);
    // Redirect or perform other actions
  
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-15 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete your profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <Label htmlFor="industry">Industry</Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedIndustry(
                        industries.find((ind) => ind.id === value)
                      );
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
              {errors.industry && (
                <p className="text-sm text-red-600">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div className="space-y-6">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Controller
                  name="subIndustry"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
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
                {errors.subIndustry && (
                  <p className="text-sm text-red-600">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Additional form fields (bio, experience, skills) */}
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter your years of experience"
                {...register('experience')}
              />
              {errors.experience && (
                <p className="text-sm text-red-600">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., Python, Java, ..."
                {...register('skills')}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-600">
                  {errors.skills.message}
                </p>
              )}
            </div>



            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                className="h-32"
                {...register('bio')}
              />
              
              {errors.bio&& (
                <p className="text-sm text-red-600">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <Button type="submit" className="mt-4">
             Complete profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
