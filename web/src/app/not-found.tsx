import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </Container>
  );
}
