import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { StarOrnament } from "@/components/pattern";
import { ButtonLink, Container } from "@/components/ui";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <Container className="relative flex flex-col items-center overflow-hidden py-28 text-center sm:py-36">
      <StarOrnament className="absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-primary/10" />
      <p className="relative font-mono text-7xl font-medium text-primary sm:text-8xl">404</p>
      <h1 className="relative mt-6 font-display text-3xl font-bold text-ink">{dict.notFound.title}</h1>
      <p className="relative mt-3 text-lg text-muted">{dict.notFound.body}</p>
      <div className="relative mt-10">
        <ButtonLink href={localePath(locale)} size="lg">
          {dict.notFound.back}
        </ButtonLink>
      </div>
    </Container>
  );
}
