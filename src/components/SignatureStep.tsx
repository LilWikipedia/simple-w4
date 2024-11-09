import { useRef } from "react";
import SignaturePad from "react-signature-canvas";
import { Button } from "@/components/ui/button";

interface Props {
  signature: string | null;
  onChange: (signature: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const SignatureStep = ({ signature, onChange, onSubmit, onBack }: Props) => {
  const signaturePadRef = useRef<SignaturePad>(null);

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      onChange("");
    }
  };

  const handleSave = () => {
    if (signaturePadRef.current) {
      const dataUrl = signaturePadRef.current.toDataURL();
      onChange(dataUrl);
    }
  };

  return (
    <div className="form-step">
      <div className="space-y-6">
        <div className="form-group">
          <h3 className="text-lg font-medium">Sign Your W-4 Form</h3>
          <p className="form-helper">
            Under penalties of perjury, I declare that this certificate, to the best of my knowledge and belief, is true,
            correct, and complete.
          </p>
        </div>

        <div className="signature-pad-container">
          <SignaturePad
            ref={signaturePadRef}
            canvasProps={{
              className: "signature-pad",
            }}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={handleClear}>Clear</Button>
          <Button onClick={handleSave}>Save Signature</Button>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onSubmit}>Complete Form</Button>
        </div>
      </div>
    </div>
  );
};

export default SignatureStep;