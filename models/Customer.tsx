export interface Customer {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  contact_number_verified_at: Date | null | undefined;
  birth_date: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  zip_code: string;
  street_address: string;
}
