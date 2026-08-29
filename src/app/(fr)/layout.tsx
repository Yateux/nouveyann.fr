import LocaleLayout from "@/app/[locale]/layout";

const params = Promise.resolve({ locale: "fr" });

export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return LocaleLayout({ children, params });
}
