import { useState, useEffect } from 'react';
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
      breed: "Domestic Shorthair",
      gender: "Male",
      weight: "4.2 kg",
      color: "Tabby Orange",
      personality: ["Affectionate", "Calm", "Cuddly", "Curious"],
      goodWith: ["Children", "Other Cats", "Apartments"],
      healthStatus: ["Neutered", "Vaccinated", "Dewormed", "Microchipped"],
      story: "EL-GATO was found in a quiet alley as a young kitten and has since grown into the gentlest of feline friends. He thrives on quiet evenings, soft blankets, and the company of his chosen human.",
      description: "A playful and affectionate feline who loves cozy naps and gentle company. EL-GATO is the perfect lap cat for quiet evenings at home.",
    },
    {
      image: image2,
      title: "KING CHARLES",
      age: "3 yrs",
      tag: "Dog",
      breed: "Belgian Malinois Mix",
      gender: "Male",
      weight: "28 kg",
      color: "Sable",
      personality: ["Loyal", "Protective", "Confident", "Trainable"],
      goodWith: ["Experienced Owners", "Active Families", "Large Yards"],
      healthStatus: ["Neutered", "Vaccinated", "Dewormed", "Microchipped"],
      story: "Rescued from a closed kennel, King Charles quickly proved himself to be the leader of every pack. He's been through obedience training and now seeks a confident owner who can match his strength and devotion.",
      description: "A 3-year-old alpha dog and ruler of the yard. A loyal protector with a strong personality who guards those he loves with unwavering devotion.",
    },
    {
      image: image3,
      title: "Giacumino",
      age: "3 mos",
      tag: "Cat",
      breed: "Domestic Shorthair",
      gender: "Male",
      weight: "1.1 kg",
      color: "White & Grey",
      personality: ["Energetic", "Playful", "Brave", "Cuddly"],
      goodWith: ["Children", "Other Pets", "First-Time Owners"],
      healthStatus: ["Vaccinated", "Dewormed", "Microchipped"],
      story: "Found tucked inside an empty box during a rainstorm, Giacumino has the spirit of a lion and the heart of a teddy bear. He's ready for a family that can keep up with his boundless energy.",
      description: "A spirited 3-month-old kitten with an alpha personality and the gentlest heart. Always curious, always loving, ready for endless adventures.",
    },
    {
      image: image6,
      title: "Whitey",
      age: "4 yrs",
      tag: "Dog",
      breed: "Aspin (Asong Pinoy)",
      gender: "Female",
      weight: "15 kg",
      color: "Cream White",
      personality: ["Joyful", "Gentle", "Grateful", "Sociable"],
      goodWith: ["Children", "Seniors", "Other Dogs"],
      healthStatus: ["Spayed", "Vaccinated", "Dewormed", "Microchipped"],
      story: "Whitey was found roaming the streets with a broken leg, yet she never lost her smile. After months of recovery, she's the embodiment of resilience and now lives to share her joy with anyone willing to receive it.",
      description: "A rescue dog who carries a permanent smile. Whitey radiates joy and gratitude in every moment, a true reminder of resilience and warmth.",
    },
    {
      image: image7,
      title: "Megatron",
      age: "1 yr",
      tag: "Cat",
      breed: "Domestic Longhair",
      gender: "Male",
      weight: "3.6 kg",
      color: "Black & White",
      personality: ["Mysterious", "Elegant", "Observant", "Independent"],
      goodWith: ["Quiet Homes", "Adults", "Solo Pet"],
      healthStatus: ["Neutered", "Vaccinated", "Dewormed", "Microchipped"],
      story: "Megatron came to us after being surrendered by an owner who could no longer care for him. He spent weeks watching the world from a high perch before deciding to trust again. Now he's ready for a calm, patient companion.",
      description: "A 1-year-old cat who masters the art of the long, soulful stare. Mysterious, elegant, and full of personality waiting to bond with you.",
    },
    {
      image: image8,
      title: "Cupcake",
      age: "1 yr",
      tag: "Dog",
      breed: "Shih Tzu Mix",
      gender: "Female",
      weight: "6 kg",
      color: "Golden Brown",
      personality: ["Sweet", "Playful", "Affectionate", "Adaptable"],
      goodWith: ["Children", "Families", "Apartments"],
      healthStatus: ["Spayed", "Vaccinated", "Dewormed", "Microchipped"],
      story: "Cupcake was rescued from a backyard breeder and has since blossomed into the friendliest little dog you'll ever meet. She greets every guest like an old friend and lives for tummy rubs.",
      description: "A 1-year-old playful and sweet companion who adores humans of all ages. A pure heart looking for an active, loving forever family.",
    },
  ];

  const stats = [
    { value: '250+', label: 'Pets Rescued' },
    { value: '180+', label: 'Forever Homes' },
    { value: '50+', label: 'Volunteers' },
    { value: '100%', label: 'Love Guaranteed' },
  ];

  const [selectedPet, setSelectedPet] = useState(null);
  const [view, setView] = useState('details'); // 'details' | 'success'

  const openPet = (pet) => {
    setSelectedPet(pet);
    setView('details');
  };

  const closeModal = () => {
    setSelectedPet(null);
    setView('details');
  };

  useEffect(() => {
    if (!selectedPet) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedPet]);

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
                    <Button variant="primary" onClick={() => openPet(card)}>
                      Adopt
                    </Button>
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

      {/* Adoption Modal */}
      {selectedPet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-900/70 px-4 py-8 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-md backdrop-blur transition hover:bg-white hover:text-zinc-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {view === 'details' && (
              <div className="grid md:grid-cols-2">
                <div className="relative h-72 md:h-auto">
                  <img
                    src={selectedPet.image}
                    alt={selectedPet.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-700">
                      {selectedPet.tag} &middot; {selectedPet.age}
                    </span>
                  </div>
                </div>

                <div className="max-h-[80vh] overflow-y-auto p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
                    Meet your new friend
                  </p>
                  <h3 className="mt-2 text-3xl font-black tracking-tight text-zinc-900">
                    {selectedPet.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {selectedPet.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-zinc-50 p-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Breed</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">{selectedPet.breed}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Gender</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">{selectedPet.gender}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Age</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">{selectedPet.age}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Weight</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">{selectedPet.weight}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Color</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">{selectedPet.color}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Species</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">{selectedPet.tag}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Personality</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedPet.personality.map((trait) => (
                        <span
                          key={trait}
                          className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-800"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Good With</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedPet.goodWith.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-800"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Health Status</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedPet.healthStatus.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold text-sky-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-8 8a1 1 0 01-1.42 0l-4-4a1 1 0 011.42-1.42L8 12.586l7.29-7.296a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-zinc-200 p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-700">Their Story</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-700">{selectedPet.story}</p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500 transition hover:text-zinc-900"
                    >
                      Maybe later
                    </button>
                    <Button variant="primary" onClick={() => setView('success')}>
                      Confirm Adoption
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {view === 'success' && (
              <div className="p-8 sm:p-12">
                <div className="mx-auto max-w-xl text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald-700">
                    Adoption Successful
                  </p>
                  <h3 className="mt-3 text-3xl font-black tracking-tight text-zinc-900">
                    Congratulations!
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                    You&apos;ve successfully adopted <span className="font-semibold text-zinc-900">{selectedPet.title}</span>! A PetAdoptHub team member will email you shortly with next steps to bring your new family member home. Thank you for opening your heart and home.
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-4 rounded-2xl bg-emerald-50 p-5">
                    <img
                      src={selectedPet.image}
                      alt={selectedPet.title}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="text-left">
                      <p className="text-sm font-bold text-zinc-900">{selectedPet.title}</p>
                      <p className="text-xs text-zinc-600">{selectedPet.breed} &middot; {selectedPet.age}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button variant="primary" onClick={closeModal}>
                      Back to Home
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
