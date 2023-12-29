export type createEventDto = {
  address: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  targetValue: number;
  currency: string;
  image: File | null;
};

export type allEventDto = {
  displayId: string;
  description: string;
  title: string;
  startDate: number;
  endDate: number;
  targetValue: number;
  currentValue: number;
  currency: string;
  image: File | null;
};
