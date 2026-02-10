import { X, Check } from "lucide-react";

const comparisons = [
  {
    problem: "Hallucinations & wrong answers",
    chatgpt: "Same question gets different answers each time",
    datatorag: "Guaranteed accuracy — same question, same answer, always",
  },
  {
    problem: "Outdated information",
    chatgpt: "Remembers old documents after deletion",
    datatorag: "Real-time sync — only current docs, proper version control",
  },
  {
    problem: "Data sources",
    chatgpt: "Pulls from the internet despite instructions",
    datatorag: "Only your approved documents, nothing else",
  },
  {
    problem: "Consistency",
    chatgpt: "Desktop vs web gives different results",
    datatorag: "10-person validation test for every answer",
  },
  {
    problem: "Privacy & security",
    chatgpt: "Data sent to third-party servers",
    datatorag:
      "Self-hosted models — your data never leaves your infrastructure",
  },
  {
    problem: "Source verification",
    chatgpt: "Can't trace where answers come from",
    datatorag: "Shows exact document, page, and section reference",
  },
];

export function ChatGPTComparisonSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Teams Are Switching from ChatGPT
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ChatGPT wasn&apos;t built for your company&apos;s internal
            knowledge. DatatoRAG was.
          </p>
        </div>

        <div className="grid gap-6 max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="hidden md:block"></div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <X className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-foreground">ChatGPT</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Check className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-foreground">DatatoRAG</span>
              </div>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisons.map((comparison, index) => (
            <div
              key={index}
              className="grid md:grid-cols-3 gap-4 items-center bg-background rounded-2xl p-6 border shadow-lg shadow-zinc-950/5 hover:shadow-xl hover:shadow-zinc-950/10 transition-all duration-300"
            >
              <div className="font-semibold text-foreground">
                {comparison.problem}
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  {comparison.chatgpt}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-sm font-medium">
                  {comparison.datatorag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            &ldquo;We switched from ChatGPT after it confidently cited a policy
            that had been updated six months ago. Three team members made
            decisions based on wrong information before we caught it.&rdquo;
          </p>
          <p className="text-foreground font-semibold mt-2">
            - Operations Lead, 200-person SaaS company
          </p>
        </div>
      </div>
    </section>
  );
}
