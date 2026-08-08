import { Link, useParams } from "react-router-dom";
import { NavArrowLeft } from "iconoir-react";
import { useConfig } from "../ConfigContext";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking";

const BLOG_LEAD_SOURCE = "blog_article";

export const BlogPost = ({ openContactModal }) => {
  const config = useConfig();
  const { slug } = useParams();
  const { trackButtonClick } = useLeadTracking();

  const blog = config.blog || {};
  const posts = blog.posts || [];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="bg-white px-5 md:px-[7.5rem] pt-32 md:pt-40 pb-24 text-center">
        <h1 className="font-display text-3xl md:text-4xl text-gray-900">
          Article not found
        </h1>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-1.5 font-detail text-sm font-semibold uppercase tracking-wider text-magenta hover:gap-3 transition-all duration-300"
        >
          <NavArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </section>
    );
  }

  const poster = post.poster || blog.poster || config.hero_image;
  const paragraphs = Array.isArray(post.content)
    ? post.content
    : post.content
    ? [post.content]
    : [];

  return (
    <article className="bg-white pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 font-detail text-sm font-semibold uppercase tracking-wider text-magenta hover:gap-3 transition-all duration-300"
        >
          <NavArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {post.category && (
            <span className="font-detail font-semibold uppercase tracking-wider text-magenta">
              {post.category}
            </span>
          )}
          <span className="text-gray-400">
            {[post.date, post.read_time].filter(Boolean).join(" · ")}
          </span>
        </div>

        <h1 className="mt-4 font-display font-medium text-4xl md:text-5xl text-gray-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-5 font-body text-lg md:text-xl text-gray-500 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <img
          src={poster}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="mt-8 w-full h-64 md:h-[440px] object-cover rounded-2xl shadow-card"
        />

        <div className="mt-10 font-body text-base md:text-lg text-gray-700 leading-relaxed space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Lead CTA */}
        <div className="mt-14 rounded-2xl bg-PrestigeGrey p-8 md:p-10 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-medium text-gray-900">
            Interested in {config.project_name}?
          </h3>
          <p className="mt-2 font-body text-gray-500">
            Get pricing, floor plans and availability before the public launch.
          </p>
          <button
            type="button"
            onClick={() => {
              trackButtonClick(BLOG_LEAD_SOURCE, "enquire_now", "Blog Article CTA");
              openContactModal(BLOG_LEAD_SOURCE);
            }}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-magenta px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-magentaDark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
};
