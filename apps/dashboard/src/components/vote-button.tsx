"use client";

import { voteAction } from "@/actions/vote-action";
import { Button } from "@midday/ui/button";
import { ChevronUp } from "lucide-react";
import { useOptimisticAction } from "next-safe-action/hook";

export function VoteButton({ count, id }) {
  const { execute, optimisticData } = useOptimisticAction(
    voteAction,
    count,
    (prevCount) => {
      return +prevCount + 1;
    }
  );

  return (
    <Button
      variant="outline"
      className="p-6 flex-col w-14 h-16"
      onClick={() => execute({ revalidatePath: "/apps", id })}
    >
      <div className="flex space-x-2 items-center flex-col">
        <ChevronUp size={16} />
        {optimisticData}
      </div>
    </Button>
  );
}
