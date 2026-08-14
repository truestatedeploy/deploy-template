import { Link, useParams } from "react-router-dom";
import { useConfig } from "../ConfigContext";
import { useLeadTracking } from "../hooks/useLeadTracking";

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
      <section className="bg-surface px-6 pt-32 pb-24 text-center">
        <h1 className="text-3xl md:text-4xl text-ink font-display">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
          ← Back to Blog
        </Link>
      </section>
    );
  }

  const poster = post.poster || blog.poster || config.hero_image;
  const paragraphs = Array.isArray(post.content) ? post.content : post.content ? [post.content] : [];

  return (
    <article className="bg-surface pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
          ← Back to Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {post.category && <span className="font-semibold uppercase tracking-wider text-primary">{post.category}</span>}
          <span className="text-ink/40">{[post.date, post.read_time].filter(Boolean).join(" · ")}</span>
        </div>

        <h1 className="mt-4 text-3xl md:text-5xl text-ink tracking-tight leading-tight font-display">{post.title}</h1>

        {post.excerpt && <p className="mt-5 text-lg md:text-xl text-ink/60 leading-relaxed">{post.excerpt}</p>}

        {poster && (
          <img
            src={poster}
            alt={post.title}
            loading="lazy"
            className="mt-8 w-full h-64 md:h-[440px] object-cover rounded-2xl"
          />
        )}

        <div className="mt-10 text-base md:text-lg text-ink/70 leading-relaxed space-y-5">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-surfaceSoft p-8 md:p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-ink font-display">
            Interested in {config.project_name}?
          </h3>
          <p className="mt-2 text-ink/60">Get pricing, floor plans and availability before the public launch.</p>
          <button
            type="button"
            onClick={() => {
              trackButtonClick(BLOG_LEAD_SOURCE, "enquire_now", "Blog Article CTA");
              openContactModal(BLOG_LEAD_SOURCE);
            }}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
};
