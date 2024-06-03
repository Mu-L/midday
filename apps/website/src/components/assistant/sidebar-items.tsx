import type { Chat } from "@/actions/ai/types";
import { useAIState } from "ai/rsc";
import { useEffect, useState } from "react";
import { SidebarItem } from "./sidebar-item";

interface SidebarItemsProps {
  onSelect: (id: string) => void;
  chatId?: string;
}

const formatRange = (key: string) => {
  switch (key) {
    case "1d":
      return "Today";
    case "2d":
      return "Yesterday";
    case "7d":
      return "Last 7 days";
    case "30d":
      return "Last 30 days";
    default:
      return null;
  }
};

export function SidebarItems({ onSelect, chatId }: SidebarItemsProps) {
  const [items, setItems] = useState<Chat[]>([]);
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="overflow-auto relative h-[410px] mt-16 scrollbar-hide p-4 pt-0 pb-[50px] flex flex-col space-y-6">
      {!Object.keys(items).length && (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col items-center -mt-12 text-xs space-y-1">
            <span className="text-[#878787]">History</span>
            <span>No results found</span>
          </div>
        </div>
      )}

      {Object.keys(items).map((key) => {
        const section = items[key];

        return (
          <div key={key}>
            {section?.length > 0 && (
              <div className="sticky top-0 z-20 w-full bg-background dark:bg-[#131313] pb-1">
                <span className="font-mono text-xs">{formatRange(key)}</span>
              </div>
            )}

            <div className="mt-1">
              {section?.map((chat) => {
                return (
                  <SidebarItem
                    key={chat.id}
                    chat={chat}
                    onSelect={onSelect}
                    chatId={chatId}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
