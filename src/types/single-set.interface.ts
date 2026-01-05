export interface SingleSet {
  id: number;
  description: string;
  date: Date;
  distractions: number;
  duration: string;
  comments: string;
}


export interface GroupedSet {
  description: string;
  count: number;
}
