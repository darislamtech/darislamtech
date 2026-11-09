import Image from "next/image";
import { YouTubeIcon } from "@/components/icons";

type ChannelCardProps = { url: string; name: string; avatar: string | null };

/** A recommended YouTube channel, laid out like YouTube's own channel list: a round picture and the name. Opens YouTube. */
export function ChannelCard({ url, name, avatar }: ChannelCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-random-pick="highlight"
      className="flex h-full flex-col items-center gap-3 rounded-2xl p-3 text-center transition-colors hover:bg-paper-2"
    >
      {avatar ? (
        <Image
          src={avatar}
          alt=""
          width={128}
          height={128}
          className="size-24 rounded-full border border-line object-cover sm:size-32"
        />
      ) : (
        <span className="grid size-24 place-items-center rounded-full bg-paper-2 text-tone-rose sm:size-32">
          <YouTubeIcon className="size-10" />
        </span>
      )}
      {/* Channel names can be in any language, so each one takes its own direction. */}
      <h3 dir="auto" className="line-clamp-2 font-semibold text-ink">
        {name}
      </h3>
    </a>
  );
}
