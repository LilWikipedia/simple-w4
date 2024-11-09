import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeductionsData {
  filingStatus: string;
  multipleJobs: boolean;
  claimDependents: boolean;
  otherIncome: string;
  deductions: string;
  extraWithholding: string;
}

interface Props {
  data: DeductionsData;
  onChange: (data: DeductionsData) => void;
  onNext: () => void;
  onBack: () => void;
}

const Deductions = ({ data, onChange, onNext, onBack }: Props) => {
  const handleChange = (field: keyof Pick<DeductionsData, 'otherIncome' | 'deductions' | 'extraWithholding'>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...data, [field]: e.target.value });
    };

  return (
    <div className="form-step">
      <div className="space-y-6">
        <div className="form-group">
          <Label htmlFor="otherIncome">Other Income (optional)</Label>
          <Input
            id="otherIncome"
            value={data.otherIncome}
            onChange={handleChange("otherIncome")}
            placeholder="Enter amount"
            type="number"
            className="bg-white/50 backdrop-blur-sm"
          />
          <p className="form-helper">Enter other income you expect this year that won't have withholding</p>
        </div>

        <div className="form-group">
          <Label htmlFor="deductions">Deductions (optional)</Label>
          <Input
            id="deductions"
            value={data.deductions}
            onChange={handleChange("deductions")}
            placeholder="Enter amount"
            type="number"
            className="bg-white/50 backdrop-blur-sm"
          />
          <p className="form-helper">Enter estimated deductions other than the standard deduction</p>
        </div>

        <div className="form-group">
          <Label htmlFor="extraWithholding">Extra Withholding (optional)</Label>
          <Input
            id="extraWithholding"
            value={data.extraWithholding}
            onChange={handleChange("extraWithholding")}
            placeholder="Enter amount"
            type="number"
            className="bg-white/50 backdrop-blur-sm"
          />
          <p className="form-helper">Enter any additional tax you want withheld from each paycheck</p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="bg-white/50">Back</Button>
          <Button onClick={onNext} className="bg-gradient-fresh hover:opacity-90">Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default Deductions;