'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Badge from '@/components/Badge';
import Discussion from '@/components/Discussion';
import { Question } from '@/types';

export default function QuestionDetail() {
    const params = useParams();
    const id = params?.id as string;

    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [userSolution, setUserSolution] = useState('');
    const [showJavaSolution, setShowJavaSolution] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchQuestion = async () => {
            try {
                const res = await fetch(`/api/questions/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setQuestion(data);
                } else {
                    setQuestion(null);
                }
            } catch (error) {
                console.error('Failed to fetch question:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();

        // Load user solution from localStorage
        const savedSolution = localStorage.getItem(`leetcode-solution-${id}`);
        if (savedSolution) {
            setUserSolution(savedSolution);
        }
    }, [id]);

    const handleUserSolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setUserSolution(newValue);
        localStorage.setItem(`leetcode-solution-${id}`, newValue);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'success';
            case 'Medium': return 'warning';
            case 'Hard': return 'danger';
            default: return 'default';
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-500">Loading problem...</p>
            </div>
        );
    }

    if (!question) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Question not found</h2>
                <Link href="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
                    &larr; Back to problems
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                &larr; Back to problems
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Problem Description */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-2xl font-bold text-gray-900">{question.id}. {question.title}</h1>
                            <Badge variant={getDifficultyColor(question.difficulty) as any}>
                                {question.difficulty}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {question.tags.map(tag => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
                        {question.description}
                    </div>

                    <div className="space-y-4">
                        {question.examples.map((example, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="font-semibold text-sm text-gray-900 mb-2">Example {index + 1}:</p>
                                <div className="space-y-1 text-sm font-mono">
                                    <p><span className="font-medium text-gray-700">Input:</span> {example.input}</p>
                                    <p><span className="font-medium text-gray-700">Output:</span> {example.output}</p>
                                    {example.explanation && (
                                        <p><span className="font-medium text-gray-700">Explanation:</span> {example.explanation}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Solution & Discussion */}
                <div className="space-y-6">
                    {/* User Solution */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">Your Solution</h3>
                            <span className="text-xs text-gray-500">Auto-saved</span>
                        </div>
                        <div className="p-0">
                            <textarea
                                value={userSolution}
                                onChange={handleUserSolutionChange}
                                placeholder="// Write your solution here..."
                                className="w-full h-64 p-4 font-mono text-sm border-0 focus:ring-0 resize-y"
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    {/* Official Solution */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => setShowJavaSolution(!showJavaSolution)}
                            className="w-full px-4 py-3 bg-indigo-50 hover:bg-indigo-100 border-b border-gray-200 flex justify-between items-center transition-colors"
                        >
                            <h3 className="text-lg font-medium text-indigo-900">Official Java Solution</h3>
                            <span className="text-indigo-600">
                                {showJavaSolution ? 'Hide' : 'Show'}
                            </span>
                        </button>

                        {showJavaSolution && (
                            <div className="p-4 bg-white">
                                <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-gray-50 p-2 rounded">
                                        <span className="font-medium text-gray-700">Time Complexity:</span>
                                        <p className="text-gray-900">{question.timeComplexity}</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded">
                                        <span className="font-medium text-gray-700">Space Complexity:</span>
                                        <p className="text-gray-900">{question.spaceComplexity}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Explanation:</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                                        {question.solutionExplanation.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-gray-100 font-mono text-sm">
                                        <code>{question.javaSolution}</code>
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Discussion */}
                    <Discussion questionId={question.id} />
                </div>
            </div>
        </div>
    );
}
