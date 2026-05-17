import Button from '../../components/Button';

import main from '../../assets/images/main.png';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image6 from '../../assets/images/image6.png';
import image7 from '../../assets/images/image7.png';
import image8 from '../../assets/images/image8.png';

const HomePage = () => {
  const featureCards = [
    {
      image: image1,
      title: "EL-GATO",
      age: "2 yrs",
      tag: "Cat",
      description: "A playful and affectionate feline who loves cozy naps and gentle company. EL-GATO is the perfect lap cat for quiet evenings at home.",
    },
    {
      image: image2,
      title: "KING CHARLES",
      age: "3 yrs",
      tag: "Dog",
      description: "A 3-year-old alpha dog and ruler of the yard. A loyal protector with a strong personality who guards those he loves with unwavering devotion.",
    },
    {
      image: image3,
      title: "Giacumino",
      age: "3 mos",
      tag: "Cat",
      description: "A spirited 3-month-old kitten with an alpha personality and the gentlest heart. Always curious, always loving, ready for endless adventures.",
    },
    {
      image: image6,
      title: "Whitey",
      age: "4 yrs",
      tag: "Dog",
      description: "A rescue dog who carries a permanent smile. Whitey radiates joy and gratitude in every moment, a true reminder of resilience and warmth.",
    },
    {
      image: image7,
      title: "Megatron",
      age: "1 yr",
      tag: "Cat",
      description: "A 1-year-old cat who masters the art of the long, soulful stare. Mysterious, elegant, and full of personality waiting to bond with you.",
    },
    {
      image: image8,
      title: "Cupcake",
      age: "1 yr",
      tag: "Dog",
      description: "A 1-year-old playful and sweet companion who adores humans of all ages. A pure heart looking for an active, loving forever family.",
    },
  ];

  const stats = [
    { value: '250+', label: 'Pets Rescued' },
    { value: '180+', label: 'Forever Homes' },
    { value: '50+', label: 'Volunteers' },
    { value: '100%', label: 'Love Guaranteed' },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-amber-200 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-rose-200 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-700">
                  Adoptions Open
                </p>
              </div>
              <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
                Find your <span className="italic font-serif text-amber-700">forever</span> friend.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-700 sm:text-lg">
                Every pet at PetAdoptHub is dewormed, neutered, and vaccinated &mdash; ready to bring love, loyalty, and joy into your home. Discover the companion who&apos;ll change your life.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button to="/about" variant="primary">Learn More</Button>
                <Button to="/articles" variant="secondary">Read Stories</Button>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black text-zinc-900">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-amber-300/40 to-rose-300/40 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 p-3 shadow-2xl backdrop-blur">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <img
                    src={main}
                    alt="A beloved rescue pet"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/60 bg-white/85 px-5 py-4 shadow-xl backdrop-blur">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-700">
                    Featured rescue
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    Waiting for the right family &mdash; could it be yours?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pets Section */}
      <section className="relative bg-zinc-50 px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
                Meet the family
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
                Pets ready for adoption
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
                Each of these rescues has a story, a personality, and a heart full of love &mdash; just waiting for the right human to come along.
              </p>
            </div>
            <Button to="/articles" variant="secondary">View All</Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card, index) => (
              <article
                key={index}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-zinc-300 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-700">
                      {card.tag} &middot; {card.age}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
                    {card.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                      Available now
                    </span>
                    <Button variant="primary">Adopt</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-zinc-900 px-6 py-20 lg:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-rose-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300">
            Make a difference
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Open your heart, change a life.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
            Every adoption gives a rescued animal a second chance &mdash; and gives you a loyal companion for life. Take the first step today.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/about" variant="secondary">About PetAdoptHub</Button>
            <Button to="/articles" variant="secondary">Read Our Stories</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
