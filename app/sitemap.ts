import { BlogCard } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getBlogs() {
    const query = `
        *[_type == 'blog'] | order(_createdAt desc) {
        title,
        shortDescription,
        'currentSlug': slug.current,
        coverImage
      }`;

    const data = await client.fetch(query);

    return data;
  }

  const blogs = await getBlogs();

  const blogUrls = blogs.map((blog: BlogCard) => ({
    url: `https://sheharyar-blog.vercel.app/blog/${blog.currentSlug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://sheharyar-blog.vercel.app",
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
