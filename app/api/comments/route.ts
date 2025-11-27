import { NextResponse } from 'next/server';
import { comments } from '@/data/comments';
import { Comment } from '@/types';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
        return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
    }

    const questionComments = comments
        .filter(c => c.questionId === questionId)
        .sort((a, b) => b.timestamp - a.timestamp);

    return NextResponse.json(questionComments);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { questionId, username, text } = body;

        if (!questionId || !username || !text) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newComment: Comment = {
            id: Date.now().toString(),
            questionId,
            username,
            text,
            timestamp: Date.now(),
        };

        comments.push(newComment);

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
