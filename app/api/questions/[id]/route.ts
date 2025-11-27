import { NextResponse } from 'next/server';
import { questions } from '@/data/questions';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const question = questions.find(q => q.id === id);

    if (!question) {
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json(question);
}
