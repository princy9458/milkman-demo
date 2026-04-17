import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
