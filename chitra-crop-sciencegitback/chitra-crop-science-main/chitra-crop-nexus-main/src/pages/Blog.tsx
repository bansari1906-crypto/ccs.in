
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/usePublicData";

const Blog = () => {
  const { data: posts = [], isLoading } = useBlogPosts();

  return (
    <section className="container py-12 md:py-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-green-700">Knowledge Center</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold">Agriculture Blog</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground text-lg">
          Expert insights, farming tips, and crop science guides for farmers in Gujarat and Rajasthan.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
          Loading blog posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
          No articles available yet.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group"
            >
              <Card className="overflow-hidden h-full border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.published_date || post.created_at).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      <User className="w-3 h-3 mr-1" />
                      Chitra Crop Science
                    </Badge>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 text-base">
                    {post.excerpt || post.content?.substring(0, 200)}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="ghost" className="pl-0 text-green-700 hover:text-green-800 hover:bg-green-50">
                    Read Article →
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;

