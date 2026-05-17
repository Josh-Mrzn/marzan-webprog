import Button from '../../components/Button';

import main from '../../assets/images/main.png';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';
import image7 from '../../assets/images/image7.png';
import image9 from '../../assets/images/image9.png';
import image10 from '../../assets/images/image10.png';

const AboutPage = () => {
  const visualImages = [image7, image9, image10, image4];

  const featureCards = [
    {
      icon: '◇',
      title: 'Our Vision',
      description: 'A society where the safe and compassionate co-existence of humans, cats and dogs thrives in harmony.',
    },
    {
      icon: '◈',
      title: 'Our Mission',
      description: 'To foster a safer community by advocating and raising public awareness on accessible sterilization, veterinary care, rehabilitation, and rehoming services for stray cats and dogs.',
    },
    {
      icon: '◆',
      title: 'Our Goals',
      description: 'Promote Catch-Neuter-Vaccinate-Return programs in barangays, villages, and commercial establishments across the Philippines.',
    },
    {
      icon: '◉',
      title: 'Important Note',
      description: 'As we operate with limited funds and rely on volunteers, our capacity depends on resources and community participation. We deeply appreciate your understanding and respect.',
    },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-amber-200 blur-3xl" />
          <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-rose-200 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-rose-300/40 to-amber-300/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 p-3 shadow-2xl backdrop-blur">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <img
                    src={main}
                    alt="Rescue animals in care"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-amber-600" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-700">
                  Our Story
                </p>
              </div>
              <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl">
                Compassion in <span className="italic font-serif text-amber-700">action</span>, every single day.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-700 sm:text-lg">
                PetAdoptHub is a website for dog and cat lovers willing to adopt and care for rescue pets &mdash; bridging the gap between forgotten animals and the families who&apos;ll cherish them.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600">
                Founded in 2025 by a dedicated group of animal lovers, we are a non-profit, non-government organization that receives no government funding. Every life we save is made possible by private donations and volunteer hearts.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button to="/" variant="primary">Back Home</Button>
                <Button to="/articles" variant="secondary">Read Articles</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
              Our Impact
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
              A movement built on love
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">
              Numbers tell only part of the story &mdash; behind each is a life rescued, a family completed, and a heart healed.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Years of Service', value: '01' },
              { label: 'Active Projects', value: '04' },
              { label: 'Partner Clinics', value: '03' },
              { label: 'Focus Areas', value: '06' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-amber-100/50 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
                <p className="relative text-5xl font-black tracking-tighter text-zinc-900">
                  {stat.value}
                </p>
                <p className="relative mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="bg-zinc-50 px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
              What we stand for
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
              Core principles guiding our work
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              {featureCards.map((card, index) => (
                <article
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 text-2xl text-amber-800">
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-amber-50/50 p-7 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-700">
                Lives in our care
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
                Moments that matter
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item, index) => (
                  <div
                    key={item}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-200"
                  >
                    <img
                      src={visualImages[index]}
                      alt={`Rescue moment ${item}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button to="/articles" variant="primary">Explore More</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-zinc-900 px-6 py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-rose-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300">
            Join the mission
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Together, we can rewrite their stories.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
            Whether you adopt, donate, or volunteer &mdash; your support shapes the future for animals who deserve nothing less than a loving home.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/" variant="secondary">Meet Our Pets</Button>
            <Button to="/articles" variant="secondary">Read Stories</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
