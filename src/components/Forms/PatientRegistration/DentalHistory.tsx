import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { PatientRegistrationData } from './types';

interface DentalHistoryProps {
  control: Control<PatientRegistrationData>;
}

export function DentalHistory({ control }: DentalHistoryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dental History</h3>
      
      <div className="space-y-4">
        <FormField
          control={control}
          name="dentalHistory.lastVisit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Dental Visit</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dentalHistory.concerns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Dental Concerns</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  placeholder="Describe any current dental concerns or problems"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dentalHistory.sensitivities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tooth Sensitivities</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  placeholder="Describe any tooth sensitivities (hot, cold, sweet, etc.)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dentalHistory.currentSymptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Symptoms</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  placeholder="List any current dental symptoms or pain"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}