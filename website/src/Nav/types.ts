export interface LinkWithChildren {
  to?: string;
  label: string;
  children?: LabelledLink[];
}

export interface LabelledLink {
  to: string;
  label: string;
}
