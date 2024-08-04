export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title of the blog",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug of the blog",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "coverImage",
      title: "Cover image of the blog",
      type: "image",
    },
    {
      name: "shortDescription",
      title: "Short description of the blog",
      type: "text",
    },
    {
      name: "content",
      title: "Content of the blog",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
