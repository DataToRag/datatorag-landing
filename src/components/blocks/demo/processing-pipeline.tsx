"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Scissors,
  Sparkles,
  Database,
  Check,
  FileText,
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Stage = "idle" | "upload" | "chunk" | "embed" | "index" | "complete";

interface ChunkData {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export function ProcessingPipeline() {
  const [stage, setStage] = useState<Stage>("idle");
  const [chunks, setChunks] = useState<ChunkData[]>([]);
  const [chunkCount, setChunkCount] = useState(0);
  const [embeddedCount, setEmbeddedCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalChunks = 24;

  // Generate chunk positions
  useEffect(() => {
    const newChunks: ChunkData[] = [];
    for (let i = 0; i < totalChunks; i++) {
      newChunks.push({
        id: i,
        x: (i % 6) * 40,
        y: Math.floor(i / 6) * 30,
        delay: i * 0.05,
      });
    }
    setChunks(newChunks);
  }, []);

  const startDemo = async () => {
    setIsPlaying(true);
    setChunkCount(0);
    setEmbeddedCount(0);

    // Stage 1: Upload
    setStage("upload");
    await sleep(1500);

    // Stage 2: Chunking
    setStage("chunk");
    for (let i = 0; i <= totalChunks; i++) {
      setChunkCount(i);
      await sleep(80);
    }
    await sleep(500);

    // Stage 3: Embedding
    setStage("embed");
    for (let i = 0; i <= totalChunks; i++) {
      setEmbeddedCount(i);
      await sleep(100);
    }
    await sleep(500);

    // Stage 4: Indexing
    setStage("index");
    await sleep(1500);

    // Complete
    setStage("complete");
    setIsPlaying(false);
  };

  const reset = () => {
    setStage("idle");
    setChunkCount(0);
    setEmbeddedCount(0);
    setIsPlaying(false);
  };

  const stages = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "chunk", label: "Chunk", icon: Scissors },
    { id: "embed", label: "Embed", icon: Sparkles },
    { id: "index", label: "Index", icon: Database },
  ];

  const getStageStatus = (stageId: string) => {
    const stageOrder = ["upload", "chunk", "embed", "index", "complete"];
    const currentIndex = stageOrder.indexOf(stage);
    const stageIndex = stageOrder.indexOf(stageId);

    if (currentIndex > stageIndex) return "complete";
    if (currentIndex === stageIndex) return "active";
    return "pending";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Document Processing Pipeline
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Watch how documents are processed with Gemma 3 embeddings
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={startDemo}
            disabled={isPlaying}
            variant={isPlaying ? "outline" : "default"}
          >
            <Play className="h-4 w-4 mr-2" />
            {isPlaying ? "Processing..." : "Start Demo"}
          </Button>
          <Button onClick={reset} variant="outline" disabled={isPlaying}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stage Progress */}
      <div className="flex items-center justify-between">
        {stages.map((s, index) => {
          const status = getStageStatus(s.id);
          const Icon = s.icon;

          return (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    status === "complete" &&
                      "bg-green-500/20 text-green-600 dark:text-green-400",
                    status === "active" && "bg-primary/20 text-primary",
                    status === "pending" && "bg-muted text-muted-foreground"
                  )}
                  animate={
                    status === "active" ? { scale: [1, 1.1, 1] } : { scale: 1 }
                  }
                  transition={{
                    repeat: status === "active" ? Infinity : 0,
                    duration: 1,
                  }}
                >
                  {status === "complete" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </motion.div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium",
                    status === "active"
                      ? "text-primary"
                      : status === "complete"
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {index < stages.length - 1 && (
                <div
                  className={cn(
                    "w-24 h-0.5 mx-4",
                    getStageStatus(stages[index + 1].id) !== "pending"
                      ? "bg-green-500/50"
                      : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Visualization Area */}
      <div className="relative bg-muted/50 rounded-xl border h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Idle State */}
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>
                  Click &quot;Start Demo&quot; to see the processing pipeline
                </p>
              </div>
            </motion.div>
          )}

          {/* Upload Stage */}
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="w-24 h-32 bg-background rounded-lg border-2 border-primary shadow-lg flex flex-col items-center justify-center">
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <span className="text-xs font-medium">PDF</span>
                </div>
                <div className="mt-4 text-sm font-medium text-primary">
                  Uploading document...
                </div>
                <div className="text-xs text-muted-foreground">2.4 MB</div>
              </motion.div>
            </motion.div>
          )}

          {/* Chunking Stage */}
          {stage === "chunk" && (
            <motion.div
              key="chunk"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-8"
            >
              <div className="flex items-start gap-8 h-full">
                {/* Document breaking apart */}
                <div className="relative w-24">
                  <motion.div
                    className="w-24 h-32 bg-background rounded-lg border shadow-sm flex flex-col items-center justify-center"
                    animate={{ opacity: [1, 0.5] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <Scissors className="h-8 w-8 text-primary" />
                  </motion.div>
                </div>

                {/* Arrow */}
                <div className="flex items-center h-32">
                  <motion.div
                    className="text-primary"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    →
                  </motion.div>
                </div>

                {/* Chunks grid */}
                <div className="relative flex-1 h-full">
                  <div className="grid grid-cols-6 gap-2">
                    {chunks.map((chunk) => (
                      <motion.div
                        key={chunk.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: chunk.id < chunkCount ? 1 : 0,
                          scale: chunk.id < chunkCount ? 1 : 0,
                        }}
                        transition={{ delay: chunk.delay, duration: 0.2 }}
                        className="w-8 h-6 bg-primary/20 rounded border border-primary/30 flex items-center justify-center"
                      >
                        <span className="text-[8px] text-primary font-mono">
                          {chunk.id + 1}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 text-sm font-medium text-primary">
                    Creating chunk {chunkCount} of {totalChunks}...
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Embedding Stage */}
          {stage === "embed" && (
            <motion.div
              key="embed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-8"
            >
              <div className="flex items-center justify-center h-full gap-8">
                {/* Chunks with glow effect */}
                <div className="grid grid-cols-6 gap-2">
                  {chunks.map((chunk) => (
                    <motion.div
                      key={chunk.id}
                      className={cn(
                        "w-8 h-6 rounded border flex items-center justify-center transition-colors",
                        chunk.id < embeddedCount
                          ? "bg-purple-500/30 border-purple-500/50"
                          : "bg-primary/20 border-primary/30"
                      )}
                      animate={
                        chunk.id < embeddedCount
                          ? {
                              boxShadow: [
                                "0 0 0 0 rgba(168, 85, 247, 0.4)",
                                "0 0 0 4px rgba(168, 85, 247, 0)",
                                "0 0 0 0 rgba(168, 85, 247, 0)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <span
                        className={cn(
                          "text-[8px] font-mono",
                          chunk.id < embeddedCount
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-primary"
                        )}
                      >
                        {chunk.id + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Gemma 3 badge */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="h-8 w-8 text-purple-500" />
                  </motion.div>
                  <div className="mt-2 text-xs font-medium text-purple-600 dark:text-purple-400">
                    Gemma 3
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {embeddedCount}/{totalChunks} embedded
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Indexing Stage */}
          {stage === "index" && (
            <motion.div
              key="index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex items-center gap-8">
                {/* Chunks flowing into database */}
                <div className="relative">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-6 h-4 bg-purple-500/30 rounded border border-purple-500/50"
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: 120, opacity: 0 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: i * 0.2,
                        ease: "easeIn",
                      }}
                      style={{ top: i * 12 }}
                    />
                  ))}
                </div>

                {/* Database icon */}
                <motion.div
                  className="w-20 h-20 rounded-xl bg-teal-500/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <Database className="h-10 w-10 text-teal-500" />
                </motion.div>

                <div className="text-sm font-medium text-teal-600 dark:text-teal-400">
                  Adding to vector database...
                </div>
              </div>
            </motion.div>
          )}

          {/* Complete Stage */}
          {stage === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <Check className="h-10 w-10 text-green-500" />
                </motion.div>
                <h4 className="text-lg font-semibold text-green-600 dark:text-green-400">
                  Processing Complete!
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalChunks} chunks indexed and ready for queries
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary">2.4 MB</div>
          <div className="text-xs text-muted-foreground">File Size</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary">{chunkCount}</div>
          <div className="text-xs text-muted-foreground">Chunks Created</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {embeddedCount}
          </div>
          <div className="text-xs text-muted-foreground">Embeddings</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            {stage === "complete" ? "768" : "—"}
          </div>
          <div className="text-xs text-muted-foreground">Vector Dims</div>
        </div>
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
