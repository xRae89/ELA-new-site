import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { OpenChatButton } from "@/components/chat/open-chat-button";
import { IntakeForm } from "@/components/intake-form";
import { Marquee, Parallax, Reveal } from "@/components/motion";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { CtaBand, FaqSection, Office, PracticeList, Promises, ServiceAreas, Steps } from "@/components/sections";
import { ArrowLink, CallButton, ReviewButton, SectionHeading } from "@/components/ui";
import { featuredFaqs } from "@/lib/faq";
import { reviews } from "@/lib/people";
import { site } from "@/lib/site";

const ticker = [
  "No win, no fee",
  "Wrongful termination",
  "Free consultation",
  "Retaliation",
  "Available 24/7",
  "Discrimination",
  "Hablamos español",
  "Harassment",
  "Missed meal and rest breaks",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={ticker} className="bg-signal py-4 font-wide text-lg font-bold text-ink md:py-5 md:text-xl" />
      <Guarantee />
      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              title="What we handle."
              intro="If your employer crossed a legal line and it cost you your job, your pay, or your peace of mind, you may have options."
            />
            <ArrowLink href="/practice-areas" className="shrink-0">
              All practice areas
            </ArrowLink>
          </Reveal>
          <PracticeList className="mt-12" />
          <p className="mt-8 text-slate">
            We also take overtime, final paycheck, and misclassification claims.{" "}
            <Link href="/faq#wage-hour" className="font-semibold text-ink underline underline-offset-4">
              Read about wage and hour rights
            </Link>
          </p>
        </div>
      </section>
      <Founder />
      <section className="bg-paper">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading title="Clients on working with us." className="mb-12" />
          </Reveal>
          <Reveal delay={120}>
            <ReviewsCarousel reviews={reviews} />
          </Reveal>
        </div>
      </section>
      <Steps />
      <ServiceAreas />
      <Office />
      <FaqSection items={featuredFaqs} />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper lg:min-h-[clamp(40rem,calc(100svh-6.75rem),60rem)]">
      <div className="container-page relative z-10 pb-10 pt-10 lg:flex lg:min-h-[inherit] lg:flex-col lg:pb-16 lg:pt-[clamp(2.5rem,7vh,5rem)]">
        <p className="flex animate-rise items-center gap-2 text-[0.95rem] font-medium text-slate">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-palm/60" />
            <span className="relative size-2 rounded-full bg-palm" />
          </span>
          California employment lawyers, Woodland Hills
        </p>
        <h1 className="display mt-4 text-[clamp(2.6rem,6.6vw,6.75rem)]">
          <span className="block animate-rise [animation-delay:80ms]">Your employer</span>
          <span className="block animate-rise [animation-delay:160ms]">has lawyers.</span>
          <span className="block animate-rise [animation-delay:240ms]">
            Now you{" "}
            <span className="relative inline-block">
              do too.
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-[0.06em] -z-10 h-[0.28em] origin-left animate-[grow_0.9s_var(--ease-out-quint)_0.7s_both] rounded-sm bg-signal"
              />
            </span>
          </span>
        </h1>
        <div className="lg:mt-auto lg:max-w-[min(30rem,40%)] lg:pt-10">
          <p className="mt-6 animate-rise text-lg text-ink/80 [animation-delay:320ms] md:text-xl lg:mt-0">
            We represent workers who were fired, harassed, discriminated against, retaliated against, or shorted on
            pay. You pay nothing unless we win.
          </p>
          <div className="mt-8 flex animate-rise flex-wrap items-center gap-3 [animation-delay:420ms]">
            <ReviewButton className="transition-transform hover:-translate-y-0.5" />
            <CallButton />
          </div>
        </div>
      </div>

      <div className="relative -z-10 aspect-[4/5] sm:aspect-[16/11] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[56%]">
        <div className="absolute inset-0 overflow-hidden lg:rounded-bl-[2.5rem]">
          <Parallax className="absolute -inset-y-[8%] inset-x-0">
            <Image
              src="/images/office-portrait.jpg"
              alt="The Employment Law Assist, APC building on Ventura Boulevard in Woodland Hills, with palm trees at the entrance"
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="animate-settle object-cover object-[50%_62%] sm:max-lg:hidden"
            />
            <Image
              src="/images/office-wide.jpg"
              alt=""
              fill
              sizes="100vw"
              className="hidden object-cover object-[50%_60%] sm:max-lg:block"
            />
          </Parallax>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-paper to-transparent lg:h-[58%] lg:from-paper lg:from-15% lg:via-paper/80 lg:via-45%"
        />
        <a
          href="#office"
          className="absolute bottom-4 left-4 flex animate-float items-center gap-2 rounded-full bg-ink/85 px-4 py-2.5 text-sm text-paper backdrop-blur-md transition-colors hover:bg-ink lg:bottom-8 lg:left-8"
        >
          <MapPin aria-hidden className="size-4 text-signal" />
          <span>
            Our office, <span className="font-semibold">{site.address.street.replace(", Suite 205", "")}</span>
          </span>
        </a>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 -z-10 size-[36rem] animate-drift rounded-full bg-signal/20 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 right-0 -z-10 size-[30rem] animate-drift rounded-full bg-palm/40 blur-3xl [animation-delay:-7s]"
      />
      <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <Reveal>
          <h2 className="display text-[clamp(2.5rem,6vw,5.25rem)]">
            <span className="text-signal">$0</span> unless
            <br />
            we win.
          </h2>
          <div className="mt-8 max-w-xl space-y-4 text-lg text-dusk">
            <p>
              We take cases on contingency. Our fee comes out of what we recover for you, and we cover the costs of
              building your case as it goes.
            </p>
            <p>If your case doesn&rsquo;t succeed, you don&rsquo;t owe us anything. We guarantee it.</p>
          </div>
          <div className="mt-10 max-w-lg">
            <Promises tone="dark" />
          </div>
          <OpenChatButton className="mt-10 text-paper">Not sure you have a case? Ask our AI assistant</OpenChatButton>
        </Reveal>
        <Reveal delay={150}>
          <IntakeForm />
        </Reveal>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="bg-white">
      <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] bg-palm pt-10 lg:max-w-none">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/3 size-72 -translate-x-1/2 animate-drift rounded-full bg-signal/30 blur-3xl"
          />
          <Image
            src="/images/kasim-cutout.png"
            alt="Kasim Idrees, founder of Employment Law Assist"
            width={686}
            height={959}
            sizes="(min-width: 1024px) 36vw, 90vw"
            className="relative mx-auto w-[82%]"
          />
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading title="A founder who answers his own phone." />
          <div className="mt-8 max-w-2xl space-y-5 text-lg text-slate">
            <p>
              Kasim Idrees started Employment Law Assist so employees could get the kind of attention companies get
              from their lawyers. Every client gets his personal cell number.
            </p>
            <p>
              Before representing workers, Kasim, a JD/MBA, represented businesses in commercial litigation, private
              equity, banking, startups, and restaurant franchising. He knows how companies build a defense because he
              used to help build them. He also runs a firm of more than 100 employees and holds it to the same standard
              he holds every other employer to.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ArrowLink href="/about">About the firm</ArrowLink>
            <ArrowLink href="/our-team">Meet the team</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
