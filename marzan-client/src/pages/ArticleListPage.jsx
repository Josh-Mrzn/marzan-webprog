import { Link } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-8 bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-zinc-500">
            Pet Adoption Knowledge
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-black leading-tight text-zinc-900 sm:text-5xl">
            Professional guidance for every rescue journey.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-zinc-600">
            Explore expert advice on adoption readiness, pet care, and building a loving home for your next companion.
          </p>
          <div className="mt-10 flex justify-center">
            <Button to="/">Return Home</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="mb-10 flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Featured Adoption Articles</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-900">Your adoption guide starts here</h2>
          </div>
          <p className="text-sm text-zinc-500">Practical tips for finding, adopting, and caring for your rescue pet.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link 
              key={article.name} 
              to={`/articles/${article.name}`}
              className="group block overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-64 w-full overflow-hidden bg-zinc-100">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Adoption Guide
                </span>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-zinc-900 group-hover:underline">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  {article.content[0]}
                </p>
                <div className="mt-6 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-900">
                  <span>Read Article</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArticleListPage;