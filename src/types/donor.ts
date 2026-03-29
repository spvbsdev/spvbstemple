/** Sanity `donor` document fields used on the site */
export interface DonorRecord {
  _id: string;
  name: string;
  amount?: number;
  cause?: string;
  donationDate?: string;
  message?: string;
  isAnonymous: boolean;
}
