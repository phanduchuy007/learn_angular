export interface report {
  no: number;
  customerName: string;
  project: string;
  HCC_Project_Code: string;
  totalMembers: number;
  status: boolean;
}

export interface IObjectKeysInput {
  [key: string]: string;
}
