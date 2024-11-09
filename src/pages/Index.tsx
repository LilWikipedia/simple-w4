import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PersonalInfo from "@/components/PersonalInfo";
import TaxStatus from "@/components/TaxStatus";
import Deductions from "@/components/Deductions";
import SignatureStep from "@/components/SignatureStep";
import jsPDF from "jspdf";

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

  const generatePDF = () => {
    const pdf = new jsPDF();
    
    // Add form title
    pdf.setFontSize(20);
    pdf.text("Form W-4 (2024)", 105, 20, { align: "center" });
    
    // Add personal information
    pdf.setFontSize(12);
    pdf.text(`Name: ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`, 20, 40);
    pdf.text(`SSN: XXX-XX-${formData.personalInfo.ssn.slice(-4)}`, 20, 50);
    pdf.text(`Address: ${formData.personalInfo.address}`, 20, 60);
    pdf.text(`${formData.personalInfo.city}, ${formData.personalInfo.state} ${formData.personalInfo.zip}`, 20, 70);
    
    // Add tax status information
    pdf.text(`Filing Status: ${formData.taxStatus.filingStatus}`, 20, 90);
    pdf.text(`Multiple Jobs: ${formData.taxStatus.multipleJobs ? "Yes" : "No"}`, 20, 100);
    pdf.text(`Claim Dependents: ${formData.taxStatus.claimDependents ? "Yes" : "No"}`, 20, 110);
    
    // Add deductions information
    pdf.text(`Other Income: $${formData.taxStatus.otherIncome || "0"}`, 20, 130);
    pdf.text(`Deductions: $${formData.taxStatus.deductions || "0"}`, 20, 140);
    pdf.text(`Extra Withholding: $${formData.taxStatus.extraWithholding || "0"}`, 20, 150);
    
    // Add signature if present
    if (formData.signature) {
      pdf.addImage(formData.signature, "PNG", 20, 170, 50, 20);
    }
    
    // Save the PDF
    pdf.save("w4-form.pdf");
  };

  const handleSubmit = async () => {
    generatePDF();
    toast({
      title: "Success!",
      description: "Your W-4 form has been generated and is downloading now.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container">
        <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-white/80 shadow-xl">
          <div className="p-6">
            <h1 className="text-3xl font-bold bg-gradient-fresh text-transparent bg-clip-text mb-2">
              W-4 Form Assistant
            </h1>
            <p className="text-gray-600 mb-6">Complete your tax withholding certificate with ease</p>
            
            <Tabs value={`step-${currentStep}`} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-secondary">
                <TabsTrigger value="step-1" className="data-[state=active]:bg-gradient-fresh data-[state=active]:text-white">
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="step-2" className="data-[state=active]:bg-gradient-fresh data-[state=active]:text-white">
                  Tax Status
                </TabsTrigger>
                <TabsTrigger value="step-3" className="data-[state=active]:bg-gradient-fresh data-[state=active]:text-white">
                  Deductions
                </TabsTrigger>
                <TabsTrigger value="step-4" className="data-[state=active]:bg-gradient-fresh data-[state=active]:text-white">
                  Sign & Submit
                </TabsTrigger>
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