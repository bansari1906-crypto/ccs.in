import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveAsset } from "@/lib/assetMap";
import { useBlogPosts } from "@/hooks/usePublicData";

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: posts = [], isLoading } = useBlogPosts();
  const post = useMemo(
    () => posts.find((item) => item.slug === slug) ?? null,
    [posts, slug],
  );

  if (isLoading) {
    return <div className="container py-20 text-center text-muted-foreground">Loading article...</div>;
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Article not found.</p>
        <Button asChild variant="outline" className="mt-4"><Link to="/blog">Back to blog</Link></Button>
      </div>
    );
  }

  return (
    <article className="container max-w-3xl py-12 md:py-16">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> All articles</Link>
      </Button>
      <h1 className="text-4xl leading-tight md:text-5xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {post.author}{post.published_at ? ` · ${new Date(post.published_at).toLocaleDateString()}` : ""}
      </p>
      {post.cover_image && (
        <img src={resolveAsset(post.cover_image)} alt={post.title} loading="lazy" className="mt-8 aspect-video w-full rounded-2xl object-cover shadow-soft" />
      )}
      <div className="prose prose-stone mt-8 max-w-none whitespace-pre-line text-foreground/85">
        {post.content}
      </div>
    </article>
  );
};

export default BlogDetail;
