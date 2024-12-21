export interface PatientRegistrationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    policyHolder: string;
  };
  medicalHistory: {
    conditions: string;
    medications: string;
    allergies: string;
    surgeries: string;
  };
  dentalHistory: {
    lastVisit: string;
    concerns: string;
    sensitivities: string;
    currentSymptoms: string;
  };
}