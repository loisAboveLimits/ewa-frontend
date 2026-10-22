import Image from "next/image";

/** Row of partner / sponsor logos: 3 per row on phones, all in one row from tablets up. */
export default function LogoStrip({ logos, alt }: { logos: number[]; alt: string }) {
  const cols = logos.length >= 6 ? "md:grid-cols-6" : "md:grid-cols-5";
  return (
    <div className={`grid grid-cols-3 ${cols} items-center gap-2 px-2 md:gap-4 md:px-4`}>
      {logos.map((n) => (
        <div key={n} className="p-2 md:p-4">
          <Image src={`/imgs/partners/partner${n}.svg`} alt={alt} width={150} height={60} className="h-auto w-full" />
        </div>
      ))}
    </div>
  );
}
