import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface TaxStatusData {
  filingStatus: string;
  multipleJobs: boolean;
  claimDependents: boolean;
  otherIncome: string;
  deductions: string;
  extraWithholding: string;
}

interface Props {
  data: TaxStatusData;
  onChange: (data: TaxStatusData) => void;
  onNext: () => void;
  onBack: () => void;
}

const TaxStatus = ({ data, onChange, onNext, onBack }: Props) => {
  return (
    <div className="form-step">
      <div className="space-y-6">
        <div className="form-group">
          <Label>Filing Status</Label>
          <RadioGroup
            value={data.filingStatus}
            onValueChange={(value) => onChange({ ...data, filingStatus: value })}
            className="grid grid-cols-1 gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single or Married filing separately</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="married" id="married" />
              <Label htmlFor="married">Married filing jointly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="head" id="head" />
              <Label htmlFor="head">Head of household</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="form-group">
          <div className="flex items-center justify-between">
            <Label htmlFor="multipleJobs">Multiple Jobs or Spouse Works</Label>
            <Switch
              id="multipleJobs"
              checked={data.multipleJobs}
              onCheckedChange={(checked) => onChange({ ...data, multipleJobs: checked })}
            />
          </div>
          <p className="form-helper">Check this if you have more than one job or your spouse works</p>
        </div>

        <div className="form-group">
          <div className="flex items-center justify-between">
            <Label htmlFor="claimDependents">Claim Dependents</Label>
            <Switch
              id="claimDependents"
              checked={data.claimDependents}
              onCheckedChange={(checked) => onChange({ ...data, claimDependents: checked })}
            />
          </div>
          <p className="form-helper">Check this if you have qualifying children or other dependents</p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button onClick={onNext}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default TaxStatus;