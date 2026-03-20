import { defineCollection, z } from 'astro:content';

const programSchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  category: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string().max(160),
  publishDate: z.date(),
  ctaType: z.enum(['primary', 'secondary']),
  ctaLabel: z.string(),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  modules: z.array(z.string()).optional(),
  proofModuleType: z.string(),
});

const blogSchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  category: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string().max(160),
  publishDate: z.date(),
  ctaType: z.enum(['primary', 'secondary']).optional(),
  ctaLabel: z.string().optional(),
  author: z.string(),
  image: z.string().optional(),
});

const ressourcenSchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  category: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string().max(160),
  publishDate: z.date(),
  ctaType: z.enum(['primary', 'secondary']),
  ctaLabel: z.string(),
});

const resourceSchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  category: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string().max(160),
  publishDate: z.date(),
  ctaType: z.enum(['primary', 'secondary']),
  ctaLabel: z.string(),
  type: z.enum(['whitepaper', 'checklist', 'guide', 'webinar']),
});

export const collections = {
  'programs': defineCollection({ schema: programSchema }),
  'blog': defineCollection({ schema: blogSchema }),
  'ressourcen': defineCollection({ schema: ressourcenSchema }),
  'resources': defineCollection({ schema: resourceSchema }),
};
