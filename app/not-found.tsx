import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-neon">404</p>
      <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">Page not found</h1>
      <p className="mb-8 text-sm text-white/60">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn-neon">Back to home</Link>
    </section>
  );
}
