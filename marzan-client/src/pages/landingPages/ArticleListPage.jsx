import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import seedArticles from '../../assets/article-content.js';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const { data } = await fetchArticles();
        const live = (data?.articles || [])
          .filter((a) => (a.status || 'active') === 'active')
          .map((a) => ({
            name: a.slug,
            title: a.title,
            imageUrl: a.imageUrl || seedArticles.find((s) => s.name === a.slug)?.imageUrl,
            content:
              Array.isArray(a.paragraphs) && a.paragraphs.length > 0
                ? a.paragraphs
                : [a.preview || ''],
          }));

        if (!cancelled) {
          if (live.length > 0) {
            setArticles(live);
            setUsingFallback(false);
          } else {
            setArticles(seedArticles);
            setUsingFallback(true);
          }
        }
      } catch {
        if (!cancelled) {
          setArticles(seedArticles);
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const [featured, ...rest] = useMemo(() => articles, [articles]);

  return (
    <div className="flex w-full flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-rose-50">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-amber-200 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-rose-200 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center lg:px-8 lg:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-amber-600" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-700">
              Pet Adoption Knowledge
            </p>
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
            Professional guidance for every{' '}
            <span className="italic font-serif text-amber-700">rescue</span> journey.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
            Explore expert advice on adoption readiness, pet care, and building a loving home for
            your next companion &mdash; written by people who&apos;ve walked the path.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/" variant="primary">Return Home</Button>
            <Button to="/about" variant="secondary">Our Story</Button>
          </div>

          {usingFallback && !loading && (
            <p className="mt-6 inline-block rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
              Showing curated examples · live feed unavailable
            </p>
          )}
        </div>
      </section>

      {loading && (
        <section className="bg-white px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Loading articles…
          </p>
        </section>
      )}

      {!loading && featured && (
        <section className="bg-white px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
                  Editor&apos;s Pick
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
                  Featured this week
                </h2>
              </div>
              <p className="text-sm text-zinc-500">Hand-selected by our editorial team.</p>
            </div>

            <Link
              to={`/articles/${featured.name}`}
              className="group grid overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-2"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 lg:aspect-auto">
                {featured.imageUrl ? (
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100 text-3xl font-black text-amber-900">
                    {featured.title?.[0] ?? '·'}
                  </div>
                )}
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-700">
                    Featured
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-800">
                  Adoption Guide
                </span>
                <h3 className="mt-5 text-3xl font-black leading-tight tracking-tight text-zinc-900 sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-zinc-600">
                  {featured.content?.[0]}
                </p>
                <div className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-900">
                  <span>Read full article</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {!loading && rest.length > 0 && (
        <section className="bg-zinc-50 px-6 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-zinc-200 pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
                  All Articles
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
                  Your adoption guide starts here
                </h2>
              </div>
              <p className="max-w-sm text-sm text-zinc-500">
                Practical tips for finding, adopting, and caring for your rescue pet &mdash; from
                first thought to forever home.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <Link
                  key={article.name}
                  to={`/articles/${article.name}`}
                  className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-zinc-100">
                    {article.imageUrl ? (
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100 text-4xl font-black text-amber-900">
                        {article.title?.[0] ?? '·'}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="flex flex-col p-7">
                    <span className="inline-flex w-fit rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-800">
                      Adoption Guide
                    </span>
                    <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-zinc-900 transition-colors group-hover:text-amber-800">
                      {article.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                      {article.content?.[0]}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-900">
                      <span>Read Article</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-zinc-900 px-6 py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-rose-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300">
            Stay informed
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            More stories. More guidance.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
            From first-time adoption tips to behavior insights &mdash; we publish what truly helps
            you and your future companion thrive.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/" variant="secondary">Browse Pets</Button>
            <Button to="/about" variant="secondary">About Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;
