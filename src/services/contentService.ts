import { getCollection, getEntry } from 'astro:content';

/**
 * ContentService acts as an abstraction layer between the UI and the data source.
 * Currently it uses Astro Content Collections (Markdown), but can be swapped for a CMS API.
 */
export const ContentService = {
  async getPrograms() {
    return [
      {
        id: "versicherungsvermittler-vbv",
        data: {
          title: "Versicherungsvermittler VBV",
          slug: "versicherungsvermittler-vbv",
          category: "Basisausbildung",
          seoTitle: "Versicherungsvermittler VBV Zertifizierung | Kathiago",
          metaDescription: "Werden Sie zertifizierter Versicherungsvermittler VBV. Praxisnahe Vorbereitung auf die eidgenössische Prüfung.",
          publishDate: new Date("2024-01-01"),
          ctaType: "primary" as const,
          ctaLabel: "Jetzt anmelden",
          hero: {
            title: "Versicherungsvermittler VBV",
            subtitle: "Der Goldstandard für den Einstieg in die Schweizer Versicherungswelt."
          },
          modules: [
            "Grundlagen der Versicherung",
            "Personenversicherungen",
            "Sach- und Vermögensversicherungen",
            "Rechtliche Grundlagen",
            "Kundenberatung & Verkauf"
          ],
          proofModuleType: "Prüfungsstruktur & Themenlandkarte"
        }
      },
      {
        id: "zert-vermoegensberater-kt",
        data: {
          title: "Vermögensberater KT",
          slug: "zert-vermoegensberater-kt",
          category: "Wealth Management",
          seoTitle: "Zert. Vermögensberater KT | Kathiago",
          metaDescription: "Kompakte Anlagekompetenz im FIDLEG-Kontext – praxisnah, strukturiert und direkt anwendbar.",
          publishDate: new Date("2024-01-01"),
          ctaType: "primary" as const,
          ctaLabel: "Teilnahme anfragen",
          hero: {
            title: "Zert. Vermögensberater KT",
            subtitle: "Kompakte Anlagekompetenz im FIDLEG-Kontext."
          },
          modules: [
            "Anlageprozess & Portfoliotheorie",
            "Finanzanalyse & Asset Allocation",
            "FIDLEG-Verhaltenspflichten",
            "Kundenprofilierung & Risikoanalyse"
          ],
          proofModuleType: "Lernpfad Flow"
        }
      },
      {
        id: "fidleg-verhaltensregeln",
        data: {
          title: "Fidleg Verhaltensregeln",
          slug: "fidleg-verhaltensregeln",
          category: "Compliance",
          seoTitle: "FIDLEG Verhaltensregeln Kurs | Compliance für Berater",
          metaDescription: "Erfüllen Sie die gesetzlichen Anforderungen nach FIDLEG. Praxisnaher Kurs für Kundenberater.",
          publishDate: new Date("2024-01-01"),
          ctaType: "secondary" as const,
          ctaLabel: "Kurs buchen",
          hero: {
            title: "FIDLEG Verhaltensregeln",
            subtitle: "Rechtssicher beraten im neuen regulatorischen Umfeld."
          },
          modules: [
            "Informationspflichten",
            "Angemessenheit & Eignung",
            "Dokumentation & Rechenschaft",
            "Transparenz bei Retrozessionen"
          ],
          proofModuleType: "Compliance Quick-Scan"
        }
      },
      {
        id: "finanzberater-iaf",
        data: {
          title: "Finanzberater IAF",
          slug: "finanzberater-iaf",
          category: "Professional",
          seoTitle: "Finanzberater IAF Ausbildung | Kathiago",
          metaDescription: "Ganzheitliche Finanzberatung lernen. Bereiten Sie sich auf das IAF-Zertifikat vor.",
          publishDate: new Date("2024-01-01"),
          ctaType: "primary" as const,
          ctaLabel: "Lehrgang starten",
          hero: {
            title: "Finanzberater IAF",
            subtitle: "Ganzheitliche Beratungskompetenz für anspruchsvolle Privatkunden."
          },
          modules: [
            "Vorsorge & Versicherung",
            "Vermögensbildung",
            "Immobilien & Finanzierung",
            "Steuern & Recht"
          ],
          proofModuleType: "Lernpfad Flow"
        }
      },
      {
        id: "eidg-finanzplaner",
        data: {
          title: "Eidg. Finanzplaner",
          slug: "eidg-finanzplaner",
          category: "Expert",
          seoTitle: "Eidg. Finanzplaner/in mit Fachausweis | Kathiago",
          metaDescription: "Die Premium-Ausbildung für komplexe Lebenszyklusplanung und anspruchsvolle Mandate.",
          publishDate: new Date("2024-01-01"),
          ctaType: "primary" as const,
          ctaLabel: "Aufnahme prüfen",
          hero: {
            title: "Eidg. Finanzplaner",
            subtitle: "Ganzheitliche Finanzplanung auf höchstem Niveau."
          },
          modules: [
            "Ganzheitliche Finanzplanung",
            "Lebenszyklusplanung",
            "Unternehmer-Beratung",
            "Nachfolge & Erbrecht"
          ],
          proofModuleType: "Lernpfad Flow"
        }
      }
    ];
  },

  async getProgramBySlug(slug: string) {
    const programs = await this.getPrograms();
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
