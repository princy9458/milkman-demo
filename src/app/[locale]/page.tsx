import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, LayoutDashboard, UserCircle } from "lucide-react";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main className="app-shell-main">
      <div className="app-header">
        <div>
          <div className="eyebrow">{t("landing.eyebrow")}</div>
          <div className="title">{t("landing.title")}</div>
          <div className="subtitle" style={{ marginTop: 6 }}>
            {t("landing.description")}
          </div>
        </div>
      </div>

      <div className="split-2 mt-3">
        <Link href={`/${locale}/login?role=customer`} className="card">
          <div className="card-row">
            <div className="thumb">
              <UserCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="card-title">{t("landing.customerView")}</div>
              <div className="card-sub">{t("nav.dashboard")} · {t("nav.calendar")}</div>
            </div>
            <ArrowRight
              className="h-5 w-5"
              style={{ color: "var(--ink-400)" }}
              aria-hidden="true"
            />
          </div>
        </Link>

        <Link href={`/${locale}/login?role=admin`} className="card">
          <div className="card-row">
            <div className="thumb sun">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="card-title">{t("landing.openAdmin")}</div>
              <div className="card-sub">
                {t("nav.customers")} · {t("nav.deliveries")} · {t("nav.reports")}
              </div>
            </div>
            <ArrowRight
              className="h-5 w-5"
              style={{ color: "var(--ink-400)" }}
              aria-hidden="true"
            />
          </div>
        </Link>
      </div>
    </main>
  );
}
