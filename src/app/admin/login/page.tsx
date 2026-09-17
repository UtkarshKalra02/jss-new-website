import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  adminConfigured,
  passwordMatches,
  sessionTokenFor,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** Only ever send the owner somewhere on this site after login. */
function safeNext(next: string | undefined) {
  return next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin/leads";
}

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? ""));
  if (!(await passwordMatches(password))) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, await sessionTokenFor(process.env.ADMIN_PASSWORD!), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect(next);
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  const configured = adminConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <form action={login} className="w-full max-w-sm">
        <Image src="/images/brand/logo.png" alt="" width={132} height={40} className="h-9 w-auto" />
        <p className="mt-8 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
          Owner access
        </p>
        <h1 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight">
          Leads dashboard
        </h1>

        {!configured && (
          <p className="mt-6 rounded-sm border border-danger-500/40 bg-danger-050 px-4 py-3 text-[14px] leading-relaxed text-ink-800">
            <code className="font-mono">ADMIN_PASSWORD</code> is not set in the environment, so
            nobody can log in yet. See <code className="font-mono">docs/leads-dashboard.md</code>.
          </p>
        )}

        <input type="hidden" name="next" value={safeNext(next)} />
        <label htmlFor="password" className="mt-8 block text-[14px] font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "login-error" : undefined}
          className="mt-2 w-full rounded-sm border border-ink-900/25 bg-paper-50 px-4 py-3 text-[16px] outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/25"
        />
        {error && (
          <p id="login-error" role="alert" className="mt-2 text-[14px] text-danger-600">
            That password is not right.
          </p>
        )}
        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-accent-500 px-6 py-4 text-[15px] font-medium text-white transition-colors hover:bg-accent-600"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
