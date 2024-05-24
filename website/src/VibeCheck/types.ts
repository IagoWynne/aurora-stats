export interface VibeCheckPerson {
  id: number;
  firstName: string;
  lastName: string;
  isSelected: boolean;
  score?: number | null;
}

export interface VibeCheck {
  date: string;
  scores: VibeCheckScore[];
  averageScore: number;
}

export interface VibeCheckScore {
  person: {
    id: number;
  };
  score: number;
}
