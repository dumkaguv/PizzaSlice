"use client";

import { Api } from "@/shared/services/api-client";
import { IStory } from "@/shared/services/stories";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import Image from "next/image";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  React.useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [open]);

  const onClickStory = (story: IStory, index: number) => {
    if (index > 0) {
      toast.error("Доступен только первый сторис");
    }

    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  const onOutsideCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "my-10 mt-0 grid min-h-[250px] grid-cols-6 items-center justify-between gap-2 max-xl:my-5 max-xl:mb-10 overflow-x-auto overflow-y-hidden max-xl:flex",
          className,
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-full w-full min-h-[250px] min-w-[200px] animate-pulse rounded-md bg-gray-200"
            />
          ))}

        {stories.map((story, index) => (
          <Image
            key={story.id}
            onClick={() => onClickStory(story, index)}
            onKeyDown={(event) =>
              event.key === "Enter" && onClickStory(story, index)
            }
            className="shrink-0 cursor-pointer rounded-md duration-200 hover:scale-[1.025]"
            height={250}
            width={200}
            src={story.previewImageUrl}
            alt=""
            tabIndex={0}
          />
        ))}

        {open && (
          <div
            onClick={(event) => onOutsideCloseClick(event)}
            className="fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center bg-black/80"
          >
            <div className="relative !w-[520px]">
              <button
                className="absolute -top-5 -right-10 z-30"
                onClick={() => setOpen(false)}
                onKeyDown={(event) => event.key === "Enter" && setOpen(false)}
                tabIndex={0}
              >
                <X className="fixed top-0 right-0 h-8 w-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
