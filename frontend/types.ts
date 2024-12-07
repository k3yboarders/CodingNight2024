export interface Quote {
    id: string;
    content: string;
    author: string;
}

export interface SleepData {
    hours: number;
    expectedSleepTime: number;
}

export interface SleepAnalysis {
    id: string; // Unique identifier for the record
    userId: string; // User's unique identifier
    from: string; // Start date-time in ISO format
    to: string; // End date-time in ISO format
    createdAt: string; // Record creation timestamp in ISO format
    updatedAt: string; // Record last updated timestamp in ISO format
    generatedAnalysis: string; // Analysis or recommendations for sleep
  }
  