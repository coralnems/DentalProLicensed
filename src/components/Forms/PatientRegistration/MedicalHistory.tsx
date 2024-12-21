import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { PatientRegistrationData } from './types';

interface MedicalHistoryProps {
  control: Control<PatientRegistrationData>;
}

export function MedicalHistory({ control }: MedicalHistoryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Medical History</h3>
      
      <div className="space-y-4">
        <FormField
          control={control}
          name="medicalHistory.conditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Existing Medical Conditions</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  placeholder="List any chronic conditions or diseases"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="medicalHistory.medications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Medications</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  placeholder="List any medications you are currently taking"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="medicalHistory.allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  placeholder="List any allergies (medications, latex, etc.)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="medicalHistory.surgeries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Surgeries</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  placeholder="List any previous surgeries and their dates"
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