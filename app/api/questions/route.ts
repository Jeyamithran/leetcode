import { NextResponse } from 'next/server';
import { questions } from '@/data/questions';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    let filteredQuestions = questions;

    if (difficulty) {
        filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }

    if (tag) {
        filteredQuestions = filteredQuestions.filter(q => q.tags.includes(tag));
    }

    if (search) {
        const searchLower = search.toLowerCase();
        filteredQuestions = filteredQuestions.filter(q =>
            q.title.toLowerCase().includes(searchLower)
        );
    }

    // Return only summary fields for the list view to save bandwidth
    const summaryQuestions = filteredQuestions.map(({ id, title, difficulty, tags, timeComplexity, spaceComplexity }) => ({
        id,
        title,
        difficulty,
        tags,
        timeComplexity,
        spaceComplexity,
    }));

    return NextResponse.json(summaryQuestions);
}
