export interface ICourse {
  _id: number;
  name: string;
  duration: number;
  date: Date;
  topRated: boolean;
  description: string;
  $key?: string;
}
