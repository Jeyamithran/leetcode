import fs from 'fs';
import path from 'path';
import { Question } from '@/types';

let cachedQuestions: Question[] | null = null;

export function getQuestions(): Question[] {
    if (cachedQuestions) return cachedQuestions;

    try {
        const filePath = path.join(process.cwd(), 'data', 'leetcode_problems.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // The JSON structure is { questions: [...] } based on the head output
        const rawQuestions = data.questions || [];

        cachedQuestions = rawQuestions.map((q: any) => {
            // Parse examples from example_text
            const examples = (q.examples || []).map((ex: any) => {
                const text = ex.example_text || '';
                const inputMatch = text.match(/Input: (.*?)\n/);
                const outputMatch = text.match(/Output: (.*?)(?:\n|$)/);
                const explanationMatch = text.match(/Explanation: (.*?)(?:\n|$)/);

                return {
                    input: inputMatch ? inputMatch[1] : text,
                    output: outputMatch ? outputMatch[1] : '',
                    explanation: explanationMatch ? explanationMatch[1] : undefined,
                };
            });

            return {
                id: q.frontend_id || q.problem_id,
                title: q.title,
                difficulty: q.difficulty,
                tags: q.topics || [],
                description: q.description || '',
                examples: examples,
                timeComplexity: 'Unknown', // Not in dataset
                spaceComplexity: 'Unknown', // Not in dataset
                javaSolution: q.code_snippets?.java || '// Java solution not available',
                solutionExplanation: ['See official solution on LeetCode'],
            };
        });

        return cachedQuestions || [];
    } catch (error) {
        console.error('Failed to load questions:', error);
        return [];
    }
}
