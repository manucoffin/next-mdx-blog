import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { H1 } from "@/app/_components/ui/headings";
import { Section } from "@/app/_components/ui/section";
import { CalendarIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "./_queries/get-all-posts";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Section className="">
      <div className="text-center mb-16">
        <H1 className="">Blog</H1>
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
              <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
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
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:underline">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                    {excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      <time dateTime={publishDate}>
                        {new Date(publishDate).toLocaleDateString()}
                      </time>
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="mr-1 h-4 w-4" />
                      <span>{author.name}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          )
        )}
      </div>
    </Section>
  );
}
