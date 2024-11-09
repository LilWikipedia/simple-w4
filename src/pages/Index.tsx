import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PersonalInfo from "@/components/PersonalInfo";
import TaxStatus from "@/components/TaxStatus";
import Deductions from "@/components/Deductions";
import SignatureStep from "@/components/SignatureStep";

const Index = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      ssn: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    taxStatus: {
      filingStatus: "single",
      multipleJobs: false,
      claimDependents: false,
      otherIncome: "",
      deductions: "",
      extraWithholding: "",
    },
    signature: null as string | null,
  });

  const handleSubmit = async () => {
    // Here we would generate the filled W4 PDF
    toast({
      title: "Form Completed!",
      description: "Your W-4 form has been generated and is ready for download.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <Card className="max-w-4xl mx-auto">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">W-4 Form Assistant</h1>
            <p className="text-gray-500 mb-6">Complete your tax withholding certificate with ease</p>
            
            <Tabs value={`step-${currentStep}`} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="step-1">Personal Info</TabsTrigger>
                <TabsTrigger value="step-2">Tax Status</TabsTrigger>
                <TabsTrigger value="step-3">Deductions</TabsTrigger>
                <TabsTrigger value="step-4">Sign & Submit</TabsTrigger>
              </TabsList>

              <TabsContent value="step-1">
                <PersonalInfo
                  data={formData.personalInfo}
                  onChange={(data) => setFormData({ ...formData, personalInfo: data })}
                  onNext={() => setCurrentStep(2)}
                />
              </TabsContent>

              <TabsContent value="step-2">
                <TaxStatus
                  data={formData.taxStatus}
                  onChange={(data) => setFormData({ ...formData, taxStatus: data })}
                  onNext={() => setCurrentStep(3)}
                  onBack={() => setCurrentStep(1)}
                />
              </TabsContent>

              <TabsContent value="step-3">
                <Deductions
                  data={formData.taxStatus}
                  onChange={(data) => setFormData({ ...formData, taxStatus: data })}
                  onNext={() => setCurrentStep(4)}
                  onBack={() => setCurrentStep(2)}
                />
              </TabsContent>

              <TabsContent value="step-4">
                <SignatureStep
                  signature={formData.signature}
                  onChange={(signature) => setFormData({ ...formData, signature })}
                  onSubmit={handleSubmit}
                  onBack={() => setCurrentStep(3)}
                />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;