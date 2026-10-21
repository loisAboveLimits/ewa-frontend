"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import type { NewsItem } from "@/lib/news";

import "swiper/css";
import "swiper/css/effect-fade";

export default function FeaturedNewsSlider({ items }: { items: NewsItem[] }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);
  const multiple = items.length > 1;

  return (
    <div className="flex h-full flex-col">
      <div
        className={
          "relative isolate overflow-hidden " +
          "rounded-tl-[56px] rounded-br-[56px] md:rounded-tl-[90px] md:rounded-br-[90px] " +
          "shadow-[0_12px_30px_rgba(19,153,156,0.18)]"
        }
      >
        <Swiper
          modules={[EffectFade, Autoplay, A11y, Keyboard]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={900}
          loop={multiple}
          allowTouchMove={multiple}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={multiple ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.realIndex)}
          a11y={{ containerMessage: "Featured news" }}
          className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[17/10]"
        >
          {items.map((item, i) => (
            <SwiperSlide key={item.id} className="h-full">
              <FeaturedSlide item={item} priority={i === 0} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* pagination */}
      {multiple && (
        <div role="tablist" aria-label="Choose featured story" className="mt-6 md:mt-8 flex justify-center gap-2">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show story ${i + 1}: ${item.title}`}
                onClick={() => swiper?.slideToLoop(i)}
                className={
                  "h-[13px] w-[22px] md:h-[15px] md:w-[25px] rounded-[50%] cursor-pointer " +
                  "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7A52] focus-visible:ring-offset-2 " +
                  (isActive ? "bg-[#13999C]" : "bg-[#DDDDDD] hover:bg-[#B9DFDE]")
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function FeaturedSlide({ item, priority }: { item: NewsItem; priority: boolean }) {
  return (
    <article className="group relative h-full w-full">
      <Image
        src={item.image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover"
      />

      {/* teal gradient: bottom-up on phones, left-to-right from tablet */}
      <div
        aria-hidden
        className={
          "absolute inset-0 bg-linear-to-t from-[#0F8E91] via-[#13999C]/85 via-45% to-[#13999C]/10 " +
          "sm:bg-linear-to-r sm:from-[#13999C] sm:via-[#13999C]/80 sm:via-50% sm:to-transparent"
        }
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8 sm:justify-center sm:p-8 md:p-10 lg:pl-9 lg:pt-20">
        <div className="max-w-90 md:max-w-[380px] text-white">
          <p className="text-base md:text-lg">{item.category}</p>
          <h3 className="mt-1 text-2xl md:text-[28px] lg:text-[26px] xl:text-[30px] font-bold leading-tight">
            <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:underline decoration-[#EE7A52] underline-offset-4">
              {item.title}
            </Link>
          </h3>
          {item.excerpt && (
            <p className="mt-4 text-sm leading-snug text-white/95 line-clamp-4 sm:text-justify">{item.excerpt}</p>
          )}

          <div className="spacer-20"></div>
           <div className="flex sm:flex-row md:flex-row justify-center">
            
              <div className="md:w-[100%]">
                <div className="flex justify-start mt-auto">
                    <Link href="" className="btn btn-transparent font-bold text-[15px]! remPad">
                      Read More
                      <Image
                        src="/imgs/icons/icon-send-orange.png"
                        alt="EWA"
                        width={30}
                        height={30}
                        className="mar-left-5"
                      />
                    </Link>
                  </div>                       
              </div>
            </div> 
        </div>
      </div>
    </article>
  );
}
