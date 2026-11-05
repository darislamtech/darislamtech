import { cn } from "@/lib/cn";

// Dar mark, traced from the owner's logo image: a house-shaped arch whose strokes spell «دار», with a gold door.
// The left half is a lighter green than the right half; app/icon.svg and the PWA icons use the same paths.
export const logoPaths = {
  light:
    "M622 251C618 253 578 281 529 315C487 344 420 392 381 419C353 438 345 444 337 452C319 470 308 490 302 515C300 525 299 581 299 730L299 861 304 860C314 860 333 852 345 844C367 829 381 810 385 790C387 781 388 701 386 621C385 564 386 556 394 540C402 523 406 519 441 493C491 456 520 436 590 387C613 371 620 366 624 359L627 355 627 302C627 273 627 249 626 249C626 249 624 250 622 251M616 448C576 474 562 488 553 510C547 525 547 522 546 641C546 768 546 772 537 798C510 877 434 922 323 925L299 926 298 958L298 990 382 990C475 989 474 989 498 982C564 964 614 912 630 845C636 819 636 824 636 620L636 434 616 448Z",
  deep: "M627 302C627 348 627 354 629 357C631 362 640 371 648 376C715 423 735 437 764 459C783 472 808 490 819 498C844 516 853 525 859 538C868 555 867 547 867 682C867 808 867 809 872 822C876 835 882 843 896 858C912 874 915 880 913 895L913 901 832 901C747 901 743 901 729 897C704 888 686 870 675 841L673 835 673 872C674 906 674 909 676 917C684 949 708 973 742 984C759 990 763 990 863 990L955 990 955 761C954 592 954 530 953 524C948 492 933 465 909 445C905 441 893 433 883 425C847 401 811 375 780 353C682 284 631 249 628 249C627 249 627 259 627 302Z",
  door: "M706 695C706 830 706 831 708 837C712 849 720 857 733 862C738 864 740 864 770 865L801 865 801 755C800 646 800 645 798 638C791 610 767 586 733 570C725 566 709 560 706 560C706 560 706 621 706 695Z",
};

export const logoViewBox = "298 249 657 741";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox={logoViewBox} aria-hidden="true" className={cn("h-9 w-auto", className)}>
      <path className="fill-logo" d={logoPaths.light} />
      <path className="fill-logo-deep" d={logoPaths.deep} />
      <path className="fill-logo-accent" d={logoPaths.door} />
    </svg>
  );
}

/** Mark + two-line lockup of the full name: «دار» over «الإسلام والتقنية» (Dar / Islam & Technology). */
export function Logo({ name, descriptor, className }: { name: string; descriptor: string; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-bold text-ink ltr:tracking-tight">{name}</span>
        <span className="mt-1 text-[12px] font-semibold whitespace-nowrap text-ink-2 ltr:font-mono ltr:text-[9px] ltr:font-medium ltr:tracking-[0.14em] ltr:text-muted ltr:uppercase ltr:max-sm:tracking-[0.08em]">
          {descriptor}
        </span>
      </span>
    </span>
  );
}
