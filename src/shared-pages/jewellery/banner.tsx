import Image from "next/image";

export const Jewellery = () => {
    return (
      <section className="bg-black relative flex items-center justify-center h-[640px] -mt-[100px] p-0">
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <Image
              src="/assets/img/jewellery-cards/banner.png"
              layout="fill"
              objectFit="cover"
              alt="Banner"
            />
          </div>
          <div className="relative z-10 text-center text-white px-4 md:px-0 pt-[150px]">
            <h1 className="text-[40px] font-bold leading-tight md:leading-[40px] mb-4 capitalize">
              Customize your card
            </h1>
            <p className="text-[18px] md:text-[25px] font-light leading-relaxed mt-4">
            Convert your plastic card into a luxurious metal.
            </p>
          </div>
        </section>
    );
  };
  