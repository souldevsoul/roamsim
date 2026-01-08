import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { BookOpen, Clock, ArrowRight, Globe } from 'lucide-react'

export const metadata = {
  title: 'Blog - RoamSIM',
  description: 'Travel tips, eSIM guides, and destination insights from RoamSIM',
}

const featuredPost = {
  title: 'The Complete Guide to Traveling with eSIM in 2026',
  excerpt: 'Everything you need to know about using eSIM technology for seamless connectivity while traveling abroad. From installation to troubleshooting.',
  date: 'January 5, 2026',
  readTime: '8 min read',
  category: 'Guides',
  image: '/blog/esim-guide.jpg',
}

const posts = [
  {
    title: 'Top 10 Destinations for Digital Nomads in 2026',
    excerpt: 'Discover the best places to work remotely with reliable internet and great quality of life.',
    date: 'January 3, 2026',
    readTime: '6 min read',
    category: 'Travel',
  },
  {
    title: 'How to Save Money on International Data While Traveling',
    excerpt: 'Compare roaming options, local SIMs, and eSIMs to find the most cost-effective solution.',
    date: 'December 28, 2025',
    readTime: '5 min read',
    category: 'Tips',
  },
  {
    title: 'eSIM vs Physical SIM: Which is Right for You?',
    excerpt: 'A comprehensive comparison of eSIM and traditional SIM cards for travelers.',
    date: 'December 20, 2025',
    readTime: '4 min read',
    category: 'Technology',
  },
  {
    title: 'Staying Connected in Japan: A Complete Guide',
    excerpt: 'Everything you need to know about mobile data options in Japan, including eSIM recommendations.',
    date: 'December 15, 2025',
    readTime: '7 min read',
    category: 'Destinations',
  },
  {
    title: '5 Common eSIM Mistakes and How to Avoid Them',
    excerpt: 'Learn from others\' mistakes to ensure a smooth eSIM experience on your next trip.',
    date: 'December 10, 2025',
    readTime: '5 min read',
    category: 'Tips',
  },
  {
    title: 'The Future of Travel Connectivity: What to Expect',
    excerpt: 'Explore emerging technologies that will shape how we stay connected while traveling.',
    date: 'December 5, 2025',
    readTime: '6 min read',
    category: 'Technology',
  },
]

const categories = ['All', 'Guides', 'Travel', 'Tips', 'Technology', 'Destinations']

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 via-transparent to-[#a855f7]/10" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                RoamSIM <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-xl text-slate-400">
                Travel tips, eSIM guides, and destination insights to help you
                stay connected wherever you go.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    i === 0
                      ? 'bg-[#00f0ff] text-black font-medium'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="glass p-8 md:p-12">
                <span className="inline-block px-3 py-1 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] text-sm font-medium mb-4">
                  Featured
                </span>
                <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-slate-400 mb-6 text-lg">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <button className="btn-primary">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <article key={i} className="glass p-6 group cursor-pointer hover:border-[#00f0ff]/30 transition-all">
                    <span className="inline-block px-2 py-1 rounded-full bg-white/5 text-slate-400 text-xs mb-4">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#00f0ff] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="btn-secondary">
                  Load More Articles
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Connected?</h2>
              <p className="text-slate-400 mb-8">
                Browse our destinations and find the perfect eSIM for your next trip.
              </p>
              <Link href="/destinations" className="btn-primary">
                <Globe className="w-5 h-5" />
                Browse Destinations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
