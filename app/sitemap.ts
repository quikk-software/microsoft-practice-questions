import type { MetadataRoute } from "next";
import { getRepository } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const exams = await getRepository()
    .listExams()
    .catch(() => []);

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/lernen`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...exams.map(({ config }) => ({
      url: `${siteUrl}/exams/${config.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/rechtliches/impressum`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${siteUrl}/rechtliches/datenschutz`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
