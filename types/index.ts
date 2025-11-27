export interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  timeComplexity: string;
  spaceComplexity: string;
  javaSolution: string;
  solutionExplanation: string[];
}

export interface Comment {
  id: string;
  questionId: string;
  username: string;
  text: string;
  timestamp: number;
}
