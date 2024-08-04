import Navbar from "@/components/Navbar";
import React from "react";

const BlogDetailPage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  return (
    <div>
      <Navbar />
      <div className="">
        <h1>{params.slug}</h1>
      </div>
    </div>
  );
};

export default BlogDetailPage;
