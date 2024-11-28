import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "./_queries/get-all-posts";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="py-20 container mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-bold text-4xl">Blog</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(
          ({
            slug,
            title,
            publishDate,
            tags,
            author,
            excerpt,
            featuredImage,
          }) => (
            <Link href={`/blog/${slug}`} key={slug} className="group">
              <div className="h-full border rounded-md border-gray-500 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                {featuredImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={featuredImage}
                      alt={title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:underline">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                    {excerpt}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={publishDate}>
                      {new Date(publishDate).toLocaleDateString()}
                    </time>
                    <span>|</span>
                    <span>by {author.name}</span>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs rounded-full bg-blue-50 text-blue-900 px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </main>
  );
}
