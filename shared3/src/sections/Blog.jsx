import { Link } from "react-router-dom";
import { useConfig } from "../ConfigContext";

function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const Blog = () => {
  const config = useConfig();
  const blog = config.blog || {};
  const posts = blog.posts || [];

  if (!posts.length) return null;

  return (
    <section id="insights" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-gray-400">Research</div>
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-ink">Investment Insights</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-card-hover transition-shadow"
            >
              <Link to={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-gray-200">
                {(post.poster || blog.poster) && (
                  <img
                    src={post.poster || blog.poster}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </Link>
              <div className="p-6">
                {post.category && (
                  <div className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mb-4 bg-surfaceSoft text-primary">
                    {post.category}
                  </div>
                )}
                <h3 className="font-semibold leading-snug mb-3 text-ink">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && <p className="text-sm leading-relaxed mb-5 text-gray-500">{post.excerpt}</p>}
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-sm font-semibold flex items-center gap-1 text-primary hover:opacity-70 transition-opacity"
                >
                  Read More <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
