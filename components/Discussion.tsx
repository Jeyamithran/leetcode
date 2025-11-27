'use client';

import { useState, useEffect } from 'react';
import { Comment } from '@/types';

interface DiscussionProps {
    questionId: string;
}

export default function Discussion({ questionId }: DiscussionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comments?questionId=\${questionId}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [questionId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !text.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questionId, username, text }),
            });

            if (res.ok) {
                setText('');
                fetchComments(); // Refresh list
            }
        } catch (error) {
            console.error('Failed to post comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Discussion</h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="username"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea
                        id="comment"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {submitting ? 'Posting...' : 'Post Comment'}
                </button>
            </form>

            {/* Comment List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-sm">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start">
                                <span className="font-medium text-gray-900">{comment.username}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="mt-1 text-gray-700 text-sm whitespace-pre-wrap">{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
