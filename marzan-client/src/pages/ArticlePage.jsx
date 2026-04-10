import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    const { name } = useParams();
    const article = articles.find(article => article.name === name);

    if (!article) return <NotFoundPage />;

    return (
        <div className="mx-auto max-w-5xl px-6 py-12 lg:py-20">
            <div className="mb-10 flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-end md:justify-between">
                <Link 
                    to="/articles" 
                    className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 transition hover:text-zinc-900"
                >
                    <span className="transition-transform group-hover:-translate-x-1">←</span>
                    Back to Articles
                </Link>
                <div className="space-y-1 text-right">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Adoption Guide</p>
                    <p className="text-sm text-zinc-500">5 min read · Pet adoption tips</p>
                </div>
            </div>

            <div className="mb-12 overflow-hidden rounded-[2rem] border border-zinc-200 shadow-[0_20px_60px_-30px_rgba(24,24,27,0.45)]">
                <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="aspect-video w-full object-cover"
                />
            </div>

            <article className="space-y-12">
                <div className="space-y-6">
                    <span className="inline-flex rounded-full bg-zinc-100 px-4 py-1 text-xs uppercase tracking-[0.32em] text-zinc-500">
                        Pet Adoption Advice
                    </span>
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
                        {article.title}
                    </h1>
                </div>

                <div className="space-y-8 text-zinc-600">
                    {article.content.map((paragraph, i) => (
                        <p key={i} className="text-lg leading-8">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>

            <div className="mt-20 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-10 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Need extra support?</p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-900">Create a welcoming home for your new companion.</h3>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                    Explore practical checklists, adoption readiness tips, and pet care resources designed for families welcoming a rescue dog or cat.
                </p>
                <div className="mt-8 flex justify-center">
                    <Button to="/articles">View all articles</Button>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;