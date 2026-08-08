import { Link } from "react-router-dom";
import { NavArrowRight } from "iconoir-react";
import { useConfig } from "../ConfigContext";

export const Blog = () => {
  const config = useConfig();
  const blog = config.blog || {};
  const posts = blog.posts || [];
  const fallbackPoster = blog.poster || config.hero_image;

  return (
    <section
      id="Blog"
      className="bg-white px-5 md:px-[7.5rem] pt-28 md:pt-36 pb-20 md:pb-28"
    >
      <p className="font-detail text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-magenta">
        {blog.eyebrow || "Insights"}
      </p>
      <h1 className="mt-3 font-display font-medium text-5xl md:text-6xl text-gray-900 tracking-tight leading-[1.05]">
        {config.blog_title || blog.heading || "From the Blog"}
      </h1>
      {blog.subtext && (
        <p className="mt-5 max-w-2xl font-body text-base md:text-xl text-gray-500 leading-relaxed">
          {blog.subtext}
        </p>
      )}

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300"
          >
            <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
              <img
                src={post.poster || fallbackPoster}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-56 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm">
                {post.category && (
                  <span className="font-detail font-semibold uppercase tracking-wider text-magenta">
                    {post.category}
                  </span>
                )}
                <span className="text-gray-400">
                  {[post.date, post.read_time].filter(Boolean).join(" · ")}
                </span>
              </div>

              <h2 className="mt-3 font-display text-xl md:text-2xl font-medium text-gray-900 leading-snug">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:text-magenta transition-colors duration-300"
                >
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="mt-3 font-body text-sm md:text-base text-gray-500 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <Link
                to={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 font-detail text-sm font-semibold uppercase tracking-wider text-magenta transition-all duration-300 hover:gap-3"
              >
                Read article
                <NavArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
