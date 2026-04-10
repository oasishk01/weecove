import Image from "next/image";
import Link from "next/link";

export function Logo({
  size = "default",
  linked = true,
}: {
  size?: "small" | "default" | "large";
  linked?: boolean;
}) {
  const sizeMap = {
    small: { img: 24, text: "text-base", gap: "gap-1" },
    default: { img: 34, text: "text-lg", gap: "gap-1.5" },
    large: { img: 48, text: "text-2xl", gap: "gap-2" },
  };
  const s = sizeMap[size];

  const content = (
    <span className={`inline-flex items-center ${s.gap}`}>
      <Image
        src="/otter-head.png"
        alt=""
        width={s.img}
        height={s.img}
        className="h-auto"
        style={{ width: s.img }}
      />
      <span
        className={`${s.text} font-extrabold tracking-tight select-none`}
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.08)" }}
      >
        <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          Wee
        </span>
        <span className="text-zinc-800">Cove</span>
      </span>
    </span>
  );

  if (!linked) return content;

  return (
    <Link href="/" className="hover:opacity-90 transition-opacity">
      {content}
    </Link>
  );
}
