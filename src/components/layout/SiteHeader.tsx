import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Logo } from "@/components/ui/Logo";
import { MobileNavigation } from "./MobileNavigation";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <header className="relative z-30">
      <Container className="flex h-20 items-center justify-between gap-6 lg:grid lg:h-24 lg:grid-cols-[1fr_auto_1fr]">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks />
        </nav>
        <div className="flex items-center justify-end gap-3">
          <LinkButton href="/contact#callback" className="hidden lg:inline-flex">
            Request a callback
          </LinkButton>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
