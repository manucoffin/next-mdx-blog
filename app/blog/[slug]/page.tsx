import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost } from "./_queries/get-post";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const Content = post.content;

  return (
    <article className="mx-auto mb-20 max-w-screen-md">
      <header className="text-center">
        <p className="mb-8 text-sm text-muted-foreground">
          {new Date(post.publishDate).toLocaleDateString([], {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h1 className="text-4xl">{post.title}</h1>
        <p className="mb-4 text-lg text-muted-foreground">
          {post.excerpt ||
            "Explore tips, stories, and insights to enhance your Camino de Santiago experience."}
        </p>

        {post.featuredImage && (
          <div className="relative mb-8 h-64 w-full md:h-[500px]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>
        )}
      </header>

      <section className={"proseClasses"}>
        <Content />
      </section>
    </article>
  );
}
