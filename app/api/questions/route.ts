import { NextResponse } from 'next/server';
import { getQuestions } from '@/lib/questionLoader';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    let filteredQuestions = getQuestions();

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

    const total = filteredQuestions.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedQuestions = filteredQuestions.slice(start, end);

    // Return only summary fields for the list view to save bandwidth
    const summaryQuestions = paginatedQuestions.map(({ id, title, difficulty, tags, timeComplexity, spaceComplexity }) => ({
        id,
        title,
        difficulty,
        tags,
        timeComplexity,
        spaceComplexity,
    }));

    return NextResponse.json({
        data: summaryQuestions,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    });
}
