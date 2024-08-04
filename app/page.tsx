import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogCard } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div>
      <Navbar />
      <div className="container py-6">
        {blogs?.length === 0 && (
          <p className="text-lg text-slate-400">No blogs found</p>
        )}
        {blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {blogs.map((blog, index) => (
              <Card key={index}>
                <Image
                  src={urlFor(blog.coverImage).url()}
                  alt={blog.title}
                  width={500}
                  height={500}
                  className="rounded-t-lg h-[200px] w-full object-cover"
                />
                <CardContent className="mt-5">
                  <h2 className="text-xl font-bold line-clamp-2 text-blue-500">
                    {blog.title}
                  </h2>
                  <p className="text-slate-400 line-clamp-3 mt-1">
                    {blog.shortDescription}
                  </p>
                  <Button size="sm" className="w-full mt-3" asChild>
                    <Link href={`/blog/${blog.currentSlug}`}>Read more</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
