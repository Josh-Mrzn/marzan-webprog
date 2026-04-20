import Button from '../../components/Button';

import image4 from '../../assets/images/image4.png';
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image11 from '../../assets/images/image11.png';

const ArticlePage = () => {
 
  const articles = [
    {
      image: image11,
      category: "Article #01",
       title: "Find Your Perfect Pet",
      description: "Browse a variety of adorable pets looking for a loving home. Easily search and discover animals that match your lifestyle and preferences."
    },
    {
      image: image1,
      category: "Article #02",
      title: "Adoption Process",
      description: "Learn how to adopt a pet بسهولة and responsibly. Our step-by-step guide ensures a smooth and safe adoption experience for everyone.."
    },
    {
      image: image2,
      category: "Article #03",
      title: "Pet Care Tips",
      description: "Get helpful tips on feeding, grooming, and caring for your pets. Ensure your new companion lives a happy and healthy life."
    },
    {
      image: image3,
      category: "Article #04",
      title: "Success Stories",
      description: "Read heartwarming stories of rescued pets who found their forever homes. Be inspired and see the impact of adoption."
    }
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 text-center">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="mx-auto max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
         A PetAdoptHub is a website for Dog And Cat lovers who willing to Adopt and care a rescue pets .
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
        We aim to promote responsible pet ownership by providing reliable information, clear adoption processes, and guidance to ensure every pet finds the right match. Beyond adoption, PwrAdoption also raises awareness about animal welfare, encouraging people to choose adoption over buying. By using technology to bridge the gap between pets and people, PwrAdoption strives to create a community where every animal is given the love, care, and forever home they truly deserve.”
        </p>
        <div className="mt-6 flex justify-center">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article, index) => (
            <article 
              key={index} 
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
            >
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {article.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {article.description}
              </p>
              <Button className="mt-4">Read More</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;