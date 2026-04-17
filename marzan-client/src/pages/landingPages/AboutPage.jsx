import Button from '../components/Button';

import main from '../assets/images/main.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import image4 from '../assets/images/image4.png';
import image7 from '../assets/images/image7.png';
import image9 from '../assets/images/image9.png';
import image10 from '../assets/images/image10.png';
const AboutPage = () => {
  const visualImages = [image7, image9, image10, image4];

  const featureCards = [
    {
      image: image1,
      title: "VISSION",
      description: "A society where the safe and compassionate co-existence of humans, cats and dogs thrives."
    },
    {
      image: image2,
      title: "MISSION",
      description: "To foster a safe community for humans by advocating and raising public awareness on the need for accessible sterilization, veterinary care, rehabilitation and rehoming services for stray cats and dogs."
    },
    {
      image: image3,
      title: "GOALS",
      description: "-To promote Catch-Neuter-Vaccinate-Return in barangays, villages and commercial establishments."
    },

    {
      image: image4,
      title: "IMPORTANT NOTE:",
      description: "As we operate with limited funds and rely on volunteer availability, our capacity to fulfill requests depends on our resources and your willingness to participate. We receive numerous rescue requests weekly, and while we strive to help, we simply cannot assist every animal in need. We ask for your respect and understanding as we are volunteers.."
    }
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src={main}
                alt="main"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A PetAdoptHub is a website for Dog And Cat lovers who willing to Adopt and care a rescue pets .
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              PetAdoptHub was formed in the year 2025 by a dedicated group of animal lovers determined to help the plight of animals in the Philippines. We are a non-profit, non-government organization that receives no government funding; we rely solely on private donations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick summary blocks</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Years', value: '01' },
            { label: 'Projects', value: '4' },
            { label: 'Clients', value: '3' },
            { label: 'Focus Areas', value: 'wala' },
          ].map((stat, i) => (
            <div key={i} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Section Flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Core Features</h2>
            <div className="mt-6 space-y-4">
              {featureCards.map((card, index) => (
                <article key={index} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                  <h3 className="text-lg font-semibold text-zinc-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Visual Grid
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item, index) => (
                <div 
                  key={item} 
                  className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden"
                >
                  <img
                    src={visualImages[index]}
                    alt={`Visual ${item}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;