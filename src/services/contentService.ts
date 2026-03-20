import { getCollection, getEntry } from 'astro:content';

/**
 * ContentService acts as an abstraction layer between the UI and the data source.
 * Currently it uses Astro Content Collections (Markdown), but can be swapped for a CMS API.
 */
export const ContentService = {
  async getPrograms() {
    return await getCollection('programs');
  },

  async getProgramBySlug(slug: string) {
    const programs = await getCollection('programs');
    return programs.find(p => (p.data.slug || p.id) === slug);
  },

  async getBlogPosts() {
    return await getCollection('blog');
  },

  async getBlogPostsByCategory(category: string) {
    const posts = await getCollection('blog');
    return posts.filter(p => p.data.category === category);
  },

  async getRessourcen() {
    return await getCollection('ressourcen');
  },

  async getResources() {
    return await getCollection('resources');
  },

  async getResourcesByType(type: string) {
    const resources = await getCollection('resources');
    return resources.filter(r => r.data.type === type);
  },

  async getResearchReports() {
    return await getCollection('research');
  }
};
