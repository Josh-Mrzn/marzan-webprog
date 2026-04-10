import Button from '../components/Button';


import main from '../assets/images/main.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import image6 from '../assets/images/image6.png';
import image7 from '../assets/images/image7.png';
import image8 from '../assets/images/image8.png';

const HomePage = () => {
  const featureCards = [
    {
      image: image1,
      title: "EL-GATO",
      description: "meow meow meow meow meowmeow meow meow meow meowmeow meowmeow meowmeow meowmeow meowmeow meowmeow meow meowmeow meow."
    },
    {
      image: image2,
      title: "KING CHARLES",
      description: "A 3 years old alpha Dog and the ruler of the yard. He has Strong personality,He will bite who ever bully you."
    },
    {
      image: image3,
      title: "Giacumino, Guardiano Delle Galaxsie de Destroyer",
      description: "A 3Months old with aplha personality but verry kind cat."
    },
    {
      image: image6,
      title: "Whitey",
      description: "A rescue dog who always love to smile."
    },
    {
      image: image7,
      title: "Megatron",
      description: "A 1 year old cat who will stare you forever."
    },
    {
      image: image8,
      title: "Cupcake",
      description: "A 1 year old Dog Playful and sweet to every people but might have a problem with other dogs."
    },

  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Petadopt
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Welcome to PetAdoptHub
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              These are some of the pets currently in our care. They are looking for their forever homes.
One of them (or two) might be the perfect addition to your family.
ALL  cats and dogs for adoption are dewormed, neutered/spayed and rabies vaccinated.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">Learn More</Button>
            </div>
          </div>

    
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-64 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src={main}
                alt="main"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Arf Arf Arf
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Pets for Adoption</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card, index) => (
            <article 
              key={index} 
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {card.description}
              </p>
              <Button className="mt-4" variant="primary">Adopt</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;