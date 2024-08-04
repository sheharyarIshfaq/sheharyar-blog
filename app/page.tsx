import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { BlogCard } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

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

export default async function Home() {
  const blogs: BlogCard[] = await getBlogs();
  console.log(blogs);
  return (
    <div>
      <Navbar />
      <div className="container py-6">
        {blogs?.length !== 0 && (
          <p className="text-lg text-slate-400">No blogs found</p>
        )}
        {blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {blogs.map((blog, index) => (
              <Card key={index}>
                <Image
                  src={urlFor(blog.coverImage).url()}
                  alt={blog.title}
                  width={100}
                  height={100}
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
