export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  image?: string; // Base64 string
  timestamp: number;
}

export interface SolvingState {
  isSolving: boolean;
  error: string | null;
}

// Enums used for UI state
export enum ViewMode {
  Split = 'SPLIT',
  Focus = 'FOCUS'
}
