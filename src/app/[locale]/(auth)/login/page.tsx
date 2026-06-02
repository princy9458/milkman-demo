import { Suspense } from "react";
import { LoginPage } from "@/components/auth/login-page";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleLoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  return (
    <Suspense fallback={null}>
      <LoginPage locale={locale} />
    </Suspense>
  );
}
