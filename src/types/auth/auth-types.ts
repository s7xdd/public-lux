export interface registerFormProps {
  username: string;
  first_name: string;
  billing: BillingInfo;
}

interface BillingInfo {
  country: string;
  phone: string;
}

export interface loginFormProps {
  email: string;
  password: string;
}
