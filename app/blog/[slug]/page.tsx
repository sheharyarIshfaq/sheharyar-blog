import Navbar from "@/components/Navbar";
import { BlogDetail } from "@/lib/interface";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

export const revalidate = 30; // Revalidate every 30 seconds

async function getBlogDetails(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}']{
  title,
  coverImage,
    content
}[0]`;

  const data = await client.fetch(query);

  return data;
}

const BlogDetailPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const blog: BlogDetail = await getBlogDetails(params.slug);
  return (
    <div>
      <Navbar />
      <div className="container max-w-3xl py-8">
        <h3 className="text-blue-500 font-semibold text-xl text-center tracking-wide uppercase">
          Sheharyar Ishfaq - Blog
        </h3>
        <h1 className="text-3xl font-bold mt-3 text-center tracking-tight leading-8 sm:text-4xl">
          {blog.title}
        </h1>
        <Image
          src={urlFor(blog.coverImage).url()}
          alt={blog.title}
          width={800}
          height={800}
          className="rounded-lg my-8 border border-slate-200 mx-auto"
          priority
        />
        <div className="prose prose-blue dark:prose-invert prose-li:marker:text-blue-500">
          <PortableText value={blog.content} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
