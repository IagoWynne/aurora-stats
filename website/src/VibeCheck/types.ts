export interface VibeCheckDTO {
  date: string;
  scores: VibeCheckScore[];
  averageScore: number;
}

export interface VibeCheckPerson {
  id: number;
  firstName: string;
  lastName: string;
  isSelected: boolean;
  score?: number | null;
}

export interface VibeCheck {
  date: Date;
  scores: VibeCheckScore[];
  averageScore: number;
}

export interface VibeCheckScore {
  person: {
    id: number;
  };
  score: number;
}

export interface VibeCheckWeek {
  weekStart: Date;
  vibeChecks: VibeCheck[];
  weekAverage: number;
}
