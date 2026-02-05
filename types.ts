
export type CommercialElement = 
  | 'PAHT' 
  | 'PVHT' 
  | 'PVTTC' 
  | 'TMarge' 
  | 'TMarque' 
  | 'MB' 
  | 'K' 
  | 'TVA_MT';

export interface CommercialData {
  PAHT: number;
  PVHT: number;
  PVTTC: number;
  TMarge: number; // as percentage
  TMarque: number; // as percentage
  MB: number;
  K: number;
  TVA_MT: number;
  TVA_Rate: number; // 0.055 or 0.20
}

export interface Challenge {
  knowns: Partial<CommercialData>;
  givenKeys: CommercialElement[];
  tvaRate: number;
  solution: CommercialData;
}

export interface Step {
  formula: string;
  calculation: string;
  result: string;
  description: string;
}
