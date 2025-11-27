import { NextResponse } from 'next/server';
import { getQuestions } from '@/lib/questionLoader';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const questions = getQuestions();
    const question = questions.find(q => q.id === id);

    if (!question) {
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json(question);
}
