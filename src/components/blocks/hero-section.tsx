"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { MarketingNav } from "@/components/layout/marketing-nav";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const integrations = [
  "Notion",
  "Google Drive",
  "SharePoint",
  "Confluence",
  "Slack",
  "Dropbox",
];

interface HeroSectionProps {
  showDemoFade?: boolean;
}

export function HeroSection({ showDemoFade = false }: HeroSectionProps) {
  return (
    <>
      <MarketingNav />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/night-background.jpg"
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                width="3276"
                height="4095"
              />
            </AnimatedGroup>
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <div className="mx-auto flex flex-wrap items-center justify-center gap-2 mb-8">
                    {integrations.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center rounded-full border bg-muted/60 px-3 py-1 text-sm font-medium text-foreground shadow-sm"
                      >
                        {name}
                      </span>
                    ))}
                    <span className="inline-flex items-center rounded-full border border-dashed bg-background px-3 py-1 text-sm text-muted-foreground">
                      + more
                    </span>
                  </div>

                  <h1 className="mt-4 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-8 xl:text-[5.25rem]">
                    Connect Everything. Find Anything.
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                    DatatoRAG connects to the tools your team already uses and
                    turns scattered knowledge into instant, accurate answers —
                    with zero hallucinations and full source citations. Built for
                    growing teams, not enterprise sales cycles.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-3 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[14px] border p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base"
                    >
                      <Link href="/demo">
                        <span className="text-nowrap">
                          Try Interactive Demo
                        </span>
                      </Link>
                    </Button>
                  </div>
                  <div key={2}>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-xl px-5 text-base"
                    >
                      <Link
                        href="https://tally.so/r/wa8p9q"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-nowrap">Join Waitlist</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative mt-8 overflow-hidden px-4 sm:mt-12 md:mt-20">
                {showDemoFade && (
                  <div
                    aria-hidden
                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                  />
                )}
                <div className="relative mx-auto max-w-6xl">
                  <div className="rounded-xl border shadow-2xl overflow-hidden bg-background">
                    <iframe
                      src="/demo"
                      className="w-full h-[600px] md:h-[700px]"
                      title="DatatoRAG Interactive Demo"
                    />
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  );
}
