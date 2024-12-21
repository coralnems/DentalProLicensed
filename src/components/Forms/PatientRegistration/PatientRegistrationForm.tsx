import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientRegistrationSchema } from './schema';
import { Form } from '@/components/ui/form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PersonalInformation } from './PersonalInformation';
import { InsuranceInformation } from './InsuranceInformation';
import { MedicalHistory } from './MedicalHistory';
import { DentalHistory } from './DentalHistory';
import type { PatientRegistrationData } from './types';

export default function PatientRegistrationForm() {
  const form = useForm<PatientRegistrationData>({
    resolver: zodResolver(patientRegistrationSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      },
      insurance: {
        provider: '',
        policyNumber: '',
        groupNumber: '',
        policyHolder: ''
      },
      medicalHistory: {
        conditions: '',
        medications: '',
        allergies: '',
        surgeries: ''
      },
      dentalHistory: {
        lastVisit: '',
        concerns: '',
        sensitivities: '',
        currentSymptoms: ''
      }
    }
  });

  const onSubmit = async (data: PatientRegistrationData) => {
    try {
      console.log('Form submitted:', data);
      // Handle form submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">New Patient Registration</h2>
        <p className="text-muted-foreground">Please fill out all required fields (*)</p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInformation control={form.control} />
            <InsuranceInformation control={form.control} />
            <MedicalHistory control={form.control} />
            <DentalHistory control={form.control} />

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">
                Save as Draft
              </Button>
              <Button type="submit">
                Submit Registration
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}