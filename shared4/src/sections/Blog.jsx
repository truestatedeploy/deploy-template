import { Link } from "react-router-dom";
import { useConfig } from "../ConfigContext";

export const Blog = () => {
  const config = useConfig();
  const blog = config.blog || {};
  const posts = blog.posts || [];

  if (!posts.length) return null;

  // The CMS's "Blog Category" dropdown (Connectivity / Investment /
  // Neighbourhood) writes to blog.nav_tab_name, not to each post's own
  // (hardcoded) category — reuse it as this section's heading so picking a
  // category actually changes what's shown here.
  const sectionTitle = blog.nav_tab_name || blog.heading || "Project Insights";

  return (
    <section id="insights" className="py-16 md:py-24 bg-surface border-t border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-2 text-ink/60">{blog.eyebrow || "Project Insights"}</p>
          <h2 className="text-4xl md:text-5xl text-ink font-display">{sectionTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl overflow-hidden group bg-surfaceSoft border border-gray-200">
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden bg-gray-200" style={{ aspectRatio: "16/9" }}>
                {(post.poster || blog.poster) && (
                  <img
                    src={post.poster || blog.poster}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </Link>
              <div className="p-6">
                {post.category && (
                  <p className="text-xs tracking-widest uppercase mb-3 font-semibold text-primary">{post.category}</p>
                )}
                <h3 className="text-xl mb-3 leading-snug text-ink font-display">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && <p className="text-sm leading-relaxed text-ink/60">{post.excerpt}</p>}
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-sm font-medium mt-4 inline-flex items-center gap-1 text-primary hover:opacity-80 transition-opacity"
                >
                  Read Article ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
