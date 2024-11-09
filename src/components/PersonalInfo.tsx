import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface Props {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
  onNext: () => void;
}

const PersonalInfo = ({ data, onChange, onNext }: Props) => {
  const handleChange = (field: keyof PersonalInfoData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className="form-step">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={handleChange("firstName")}
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={handleChange("lastName")}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="form-group">
          <Label htmlFor="ssn">Social Security Number</Label>
          <Input
            id="ssn"
            value={data.ssn}
            onChange={handleChange("ssn")}
            placeholder="XXX-XX-XXXX"
            type="password"
          />
          <p className="form-helper">Your SSN is encrypted and secure</p>
        </div>

        <div className="form-group">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            value={data.address}
            onChange={handleChange("address")}
            placeholder="Enter your street address"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={data.city}
              onChange={handleChange("city")}
              placeholder="City"
            />
          </div>
          <div className="form-group">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={data.state}
              onChange={handleChange("state")}
              placeholder="State"
            />
          </div>
          <div className="form-group">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              value={data.zip}
              onChange={handleChange("zip")}
              placeholder="ZIP"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;