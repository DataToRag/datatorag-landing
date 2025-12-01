"use client";

import { useState, useEffect } from "react";
import { MOCK_USERS, DEMO_CONVERSATIONS } from "@/lib/demo-data";
import { CheckCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccuracyComparisonPanel() {
  const [showComparison, setShowComparison] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const question = "How many days of bereavement leave do I get?";
  const answer = DEMO_CONVERSATIONS.accuracy_bereavement[1].content;

  useEffect(() => {
    if (showComparison && animationStep < 4) {
      const timer = setTimeout(() => {
        setAnimationStep((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showComparison, animationStep]);

  const handleStartDemo = () => {
    setShowComparison(true);
    setAnimationStep(0);
  };

  const handleReset = () => {
    setShowComparison(false);
    setAnimationStep(0);
  };

  if (!showComparison) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">
            Same Question = Same Answer
          </h3>
          <p className="text-muted-foreground mb-6">
            Watch 3 different employees ask the same question and receive
            <strong className="text-foreground">
              {" "}
              identical, accurate answers
            </strong>{" "}
            every time. This is what sets DatatoRAG apart from ChatGPT.
          </p>
          <Button onClick={handleStartDemo} size="lg">
            Start Accuracy Demo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Guaranteed Accuracy Test</h3>
        <p className="text-sm text-muted-foreground">
          All 3 employees ask the same question simultaneously
        </p>
      </div>

      {/* Question display */}
      <div className="bg-muted rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">Question:</p>
        <p className="font-medium">{question}</p>
      </div>

      {/* Three columns - one for each user */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_USERS.map((user, index) => {
          const shouldShowQuestion = animationStep >= 1;
          const shouldShowAnswer = animationStep >= 2 + index * 0.3;
          const shouldShowCheckmark = animationStep >= 3;

          return (
            <div
              key={user.id}
              className="border rounded-lg p-4 space-y-3 transition-all duration-300 hover:shadow-lg"
              style={{
                opacity: shouldShowQuestion ? 1 : 0.5,
                transform: shouldShowQuestion ? "scale(1)" : "scale(0.95)",
              }}
            >
              {/* User avatar and info */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-white font-semibold text-sm`}
                >
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* Question bubble */}
              {shouldShowQuestion && (
                <div className="bg-blue-500/10 rounded-lg p-3 text-sm animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs">{question}</p>
                  </div>
                </div>
              )}

              {/* Answer bubble */}
              {shouldShowAnswer && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-xs leading-relaxed">
                    {answer.split("\n\n")[0]}
                  </p>
                  {shouldShowCheckmark && (
                    <div className="mt-2 pt-2 border-t border-blue-500/20 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs font-medium">
                        Identical response
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Consistency indicator */}
      {animationStep >= 3 && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-2">
            <CheckCircle className="h-5 w-5" />
            <p className="font-semibold">100% Consistency Verified</p>
          </div>
          <p className="text-sm text-muted-foreground">
            All 3 employees received the exact same answer. With ChatGPT, these
            could be different every time.
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" onClick={handleReset}>
          Reset Demo
        </Button>
      </div>
    </div>
  );
}
