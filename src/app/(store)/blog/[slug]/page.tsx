import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { generateSEO } from "../../lib/seo"
import { notFound } from "next/navigation"

// Blog posts data with slugs
const blogPosts = [
  {
    id: 1,
    slug: "top-10-smartphones-2024",
    title: "Top 10 Smartphones of 2024: Our Expert Recommendations",
    excerpt: "Discover the best smartphones that dominated the market this year. We've tested and reviewed the top 10 models to help you make the right choice.",
    content: `This comprehensive guide covers the top smartphones of 2024, including detailed specifications, performance analysis, and value for money assessment.

With the rapid advancement of smartphone technology, choosing the right device has become more challenging than ever. Our team has extensively tested and reviewed the top 10 smartphones of 2024 to bring you an in-depth analysis of each device.

## 1. Flagship Performance Leaders

The flagship smartphones of 2024 have brought revolutionary improvements in processing power, camera capabilities, and battery efficiency. These devices represent the pinnacle of what smartphone manufacturers can achieve.

### Key Features:
- Ultra-fast processors with improved efficiency
- Advanced computational photography
- Enhanced thermal management
- Improved battery longevity

## 2. Budget-Friendly Options

You don't need to spend a fortune to get a great smartphone. Many mid-range devices offer excellent value for money with impressive features and reliable performance.

## 3. Camera Excellence

Photography enthusiasts will appreciate the advancements made in smartphone cameras this year. With improved sensors and AI-driven processing, these phones capture stunning photos in various lighting conditions.

## Conclusion

Whether you're looking for flagship performance, budget-friendly options, or camera excellence, 2024 offers something for everyone. Choose based on your specific needs and budget.`,
    author: "Sarah Tech",
    date: "2024-01-15",
    category: "Smartphones",
    image: "/placeholder.svg",
    readTime: "8 min read",
  },
  {
    id: 2,
    slug: "laptop-buying-guide",
    title: "Laptop Buying Guide: Everything You Need to Know",
    excerpt: "Confused about which laptop to buy? Our guide covers processors, RAM, storage, and everything else you need to consider.",
    content: `Whether you're a student, professional, or creative, this guide helps you understand the key specs and choose the perfect laptop.

Buying a laptop is a significant investment, and it's important to make an informed decision. This comprehensive guide walks you through all the essential factors you should consider before making your purchase.

## Understanding Processor Types

Modern laptops come with various processor options, each suited for different use cases. From Intel's latest chips to AMD's Ryzen processors, understanding these differences is crucial.

### Intel vs AMD
- Intel processors are known for single-thread performance
- AMD processors offer better multi-threading capabilities
- Consider your specific workload when choosing

## RAM Requirements

The amount of RAM significantly impacts your laptop's multitasking capabilities and overall performance. Here's what you should know:

- 8GB: Basic browsing and office work
- 16GB: Content creation and multitasking
- 32GB+: Professional workstations

## Storage Options

Fast storage is essential for system responsiveness. SSD technology has become the standard, offering superior speed compared to traditional HDDs.

## Conclusion

Take time to assess your needs and priorities before purchasing. A well-chosen laptop can serve you for many years.`,
    author: "John Davis",
    date: "2024-01-12",
    category: "Laptops",
    image: "/placeholder.svg",
    readTime: "10 min read",
  },
  {
    id: 3,
    slug: "5g-technology-explained",
    title: "5G Technology: What It Means for You",
    excerpt: "5G is here! Learn about 5G technology, its benefits, and how it will change mobile communication in Bangladesh.",
    content: `5G is the next generation of mobile network technology. In this article, we explore how 5G works, its benefits, and when you can expect it in Bangladesh.

The rollout of 5G networks represents a significant milestone in telecommunications history. This revolutionary technology promises to transform how we communicate, work, and entertain ourselves.

## What is 5G?

5G is the fifth generation of mobile network technology, succeeding 4G LTE. It offers significantly faster data speeds and lower latency.

### Key Advantages:
- Ultra-fast download and upload speeds
- Lower latency for real-time applications
- Increased network capacity
- Better energy efficiency

## Impact on Daily Life

5G will enable new applications and services that weren't previously possible:

- Virtual and augmented reality experiences
- Real-time cloud gaming
- Autonomous vehicles
- Smart cities and IoT

## Deployment Timeline

While 5G rollout is already happening in many countries, full coverage in all regions will take time. Expect gradual expansion over the next few years.

## Conclusion

5G technology is reshaping the digital landscape. Stay informed about its development and potential benefits for your region.`,
    author: "Mike Chen",
    date: "2024-01-10",
    category: "Technology",
    image: "/placeholder.svg",
    readTime: "6 min read",
  },
  {
    id: 4,
    slug: "tablet-vs-laptop",
    title: "Tablet vs Laptop: Which Should You Buy?",
    excerpt: "Trying to decide between a tablet and laptop? We compare both to help you make the right choice for your needs.",
    content: `Tablets and laptops serve different purposes. Let's explore the pros and cons of each to help you decide which is right for you.

The decision between a tablet and a laptop depends on your specific use case, budget, and lifestyle. Both have their strengths and weaknesses.

## Tablets: Portability and Simplicity

Tablets excel in portability, offering lightweight computing for casual use and consumption.

### Pros:
- Extremely portable and lightweight
- Great for reading and media consumption
- Intuitive touch interface
- Long battery life

### Cons:
- Limited productivity features
- Smaller screens can be restrictive
- Less storage capacity

## Laptops: Power and Productivity

Laptops offer superior processing power and are better suited for work and creation.

### Pros:
- Full operating systems with all features
- Better for content creation
- More storage and RAM options
- Traditional input methods

### Cons:
- Heavier and less portable
- More expensive
- Require charging more frequently

## The Hybrid Option

2-in-1 laptops and tablet-laptop hybrids offer a middle ground, combining aspects of both.

## Making Your Choice

Consider your primary use case, budget constraints, and lifestyle needs before making a decision.`,
    author: "Emma Wilson",
    date: "2024-01-08",
    category: "Comparison",
    image: "/placeholder.svg",
    readTime: "7 min read",
  },
  {
    id: 5,
    slug: "gaming-laptops-explained",
    title: "Gaming Laptops Explained: Power Meets Portability",
    excerpt: "Looking for a gaming laptop? Our guide breaks down the key specs you need for smooth gameplay and stunning graphics.",
    content: `Gaming laptops require specific specifications to deliver great performance. Learn about GPUs, refresh rates, cooling, and more.

Gaming laptops are engineered specifically for performance-demanding applications. Whether you're a casual gamer or a professional esports player, understanding gaming laptop specifications is essential.

## Graphics Processing Unit (GPU)

The GPU is the most critical component for gaming performance.

### Popular Gaming GPUs:
- NVIDIA GeForce RTX series
- AMD Radeon RX series
- Intel Arc series

Choose based on the games you want to play and target resolution/framerate.

## Refresh Rate and Panel Quality

A higher refresh rate panel provides smoother visuals, especially in fast-paced games.

- 60Hz: Standard for casual gaming
- 144Hz: Sweet spot for competitive gaming
- 240Hz+: Professional esports players

## Cooling Systems

Gaming generates significant heat. Quality cooling systems are essential for sustained performance and component longevity.

## Keyboard and Build Quality

A responsive keyboard and durable construction enhance the gaming experience and provide long-term value.

## Power Supply

Gaming laptops require robust power supplies to handle peak power draws during intense gaming sessions.

## Conclusion

Balance performance, cooling, and durability when choosing a gaming laptop. Your gaming style and budget will ultimately guide your decision.`,
    author: "Alex Kumar",
    date: "2024-01-05",
    category: "Gaming",
    image: "/placeholder.svg",
    readTime: "9 min read",
  },
  {
    id: 6,
    slug: "budget-smartphones-under-30000",
    title: "Budget Smartphones Under ৳30,000: Best Options",
    excerpt: "Great phones don't have to be expensive. Check our top picks for the best budget smartphones under ৳30,000.",
    content: `If you're on a budget, there are still plenty of great smartphone options. Here are our top recommendations for phones under ৳30,000.

Budget smartphones have come a long way. Today, you can find devices with impressive specifications, reliable performance, and quality cameras without breaking the bank.

## What to Look For

When shopping for budget smartphones, prioritize these features:

### Essential Features:
- Capable processor for daily tasks
- Sufficient RAM (4GB minimum, 6GB preferred)
- Large display for content consumption
- Decent battery capacity
- Reliable software support

## Top Budget Picks

Our team has tested numerous budget smartphones and selected the best options in this price range. These devices offer the best combination of features and value.

## Performance Expectations

Budget smartphones handle everyday tasks competently:

- Web browsing
- Social media
- Photography and video
- Gaming (casual)
- Document editing

## Battery Life

Many budget phones offer impressive battery longevity, lasting a full day or more with moderate use.

## Camera Capabilities

Modern budget phones feature capable camera systems with computational photography enhancements.

## Conclusion

You don't need to spend a fortune for a capable, reliable smartphone. These budget options prove that quality doesn't always require premium pricing.`,
    author: "Lisa Anderson",
    date: "2024-01-02",
    category: "Smartphones",
    image: "/placeholder.svg",
    readTime: "5 min read",
  },
  {
    id: 7,
    slug: "understanding-warranty",
    title: "Understanding Warranty: What's Covered and What's Not",
    excerpt: "Confused about warranty coverage? We explain what manufacturer warranty covers and when you might need extended protection.",
    content: `Product warranties can be confusing. Let's break down what's typically covered, what's not, and whether extended warranty is worth it.

Understanding warranty coverage is crucial for protecting your electronics investment. Different manufacturers offer varying levels of protection, and extended warranties can provide additional peace of mind.

## Manufacturer Warranty Basics

Most electronics come with a standard manufacturer warranty covering hardware defects.

### Typical Coverage:
- Manufacturing defects
- Component failures
- Factory-related issues
- Repair or replacement

### Not Covered:
- Accidental damage
- Water damage
- Normal wear and tear
- Software issues
- User-caused damage

## Warranty Duration

Warranty periods vary by manufacturer and product:

- Standard: 1 year
- Premium: 2-3 years
- Extended warranties: 3-5+ years

## Extended Warranties: Worth It?

Extended warranties offer additional protection but come at a cost. Consider:

- Device cost and replacement cost
- Your usage patterns
- Your ability to replace the device
- Manufacturer reputation

## Claim Process

Understanding how to claim warranty coverage:

1. Document the issue with photos/videos
2. Contact the manufacturer or authorized service center
3. Provide proof of purchase
4. Follow their warranty claim procedures

## Conclusion

Carefully review warranty terms before purchasing. Extended warranties may be worthwhile for expensive devices or if you tend to have accidents.`,
    author: "Tom Brooks",
    date: "2023-12-30",
    category: "Tips",
    image: "/placeholder.svg",
    readTime: "6 min read",
  },
  {
    id: 8,
    slug: "ai-in-smartphones",
    title: "The Rise of AI in Smartphones: What to Expect",
    excerpt: "AI is revolutionizing smartphones. Discover how AI-powered features are making phones smarter and more capable.",
    content: `Artificial intelligence is becoming a core part of smartphone technology. In this article, we explore how AI enhances phone capabilities.

Artificial intelligence has moved from research labs to mainstream smartphones, transforming how we interact with our devices and process information.

## AI-Powered Photography

Modern smartphones use AI for advanced photo processing:

- Scene recognition and optimization
- Real-time portrait mode enhancement
- Night mode improvements
- Quality video stabilization

## Voice and Language Processing

AI enables sophisticated voice features:

- Voice assistants with context awareness
- Real-time language translation
- Dictation with higher accuracy
- Voice command understanding

## Smart Performance Management

AI optimizes device performance:

- Predictive app loading
- Battery optimization
- Thermal management
- Network selection

## Privacy Considerations

Many AI features now run on-device for improved privacy:

- On-device processing reduces data transmission
- Local AI models protect personal information
- Privacy-first approach to AI features

## Future AI Capabilities

Expect these developments:

- More sophisticated AI assistants
- Real-time 3D rendering
- Advanced predictive features
- Personalized user experiences

## Conclusion

AI is reshaping smartphone capabilities, making devices more intelligent and responsive to user needs. This trend will continue to evolve.`,
    author: "Sarah Tech",
    date: "2023-12-28",
    category: "Technology",
    image: "/placeholder.svg",
    readTime: "8 min read",
  },
  {
    id: 9,
    slug: "electronics-maintenance-tips",
    title: "How to Take Care of Your Electronics: Maintenance Tips",
    excerpt: "Extend the life of your devices with these essential maintenance tips. Learn how to properly care for your electronics.",
    content: `Regular maintenance can significantly extend the life of your devices. Here are expert tips on how to care for your smartphones, laptops, and tablets.

Proper maintenance of your electronics ensures longevity, optimal performance, and prevents costly repairs or replacements. These practical tips help protect your devices.

## Smartphone Maintenance

### Battery Care:
- Avoid extreme temperatures
- Keep battery percentage between 20-80% when possible
- Use original or certified chargers
- Disable features you don't need

### Physical Care:
- Use protective cases and screen protectors
- Clean screen with microfiber cloth
- Avoid liquid exposure
- Keep ports clean and dry

### Software Maintenance:
- Keep OS and apps updated
- Clear cache regularly
- Uninstall unused apps
- Run security scans

## Laptop Maintenance

### Hardware Care:
- Clean vents and keyboard regularly
- Use cooling pads for extended use
- Avoid eating near your laptop
- Handle with care to prevent drops

### Storage Management:
- Maintain 10-15% free space
- Regular backups
- Organize files properly
- Use cloud storage for important files

### Performance Optimization:
- Update drivers and firmware
- Remove unnecessary startup programs
- Regular disk cleanup
- Monitor system temperature

## Tablet Maintenance

Similar principles apply to tablets as smartphones and laptops, with emphasis on screen care and regular charging habits.

## General Tips

- Use devices in appropriate temperature ranges
- Keep devices away from moisture
- Use quality peripherals
- Invest in protection

## Conclusion

Regular maintenance extends device lifespan and maintains optimal performance. Small preventive measures save money long-term.`,
    author: "Mike Chen",
    date: "2023-12-25",
    category: "Tips",
    image: "/placeholder.svg",
    readTime: "7 min read",
  },
  {
    id: 10,
    slug: "refurbished-electronics",
    title: "Refurbished Electronics: Quality vs. Cost",
    excerpt: "Are refurbished devices worth buying? We analyze the pros and cons to help you decide if refurbished is right for you.",
    content: `Refurbished electronics can offer great value. Let's explore the benefits and risks of buying refurbished vs. brand new devices.

The refurbished electronics market has grown significantly, offering consumers options to save money while purchasing quality devices. Understanding what refurbished means and the associated trade-offs is essential.

## What Does "Refurbished" Mean?

Refurbished devices have been previously owned but have undergone inspection, repair, and testing.

### Common Refurbishment Reasons:
- Customer returns
- Display units from retailers
- Minor cosmetic damage
- Previous owner didn't want device

## Benefits of Refurbished

### Cost Savings:
- 30-50% discount vs. new devices
- Significant savings on high-end products
- Better specifications per dollar

### Environmental Benefits:
- Reduces electronic waste
- Less manufacturing impact
- Sustainable choice

### Warranty:
Many refurbished devices come with warranties, offering some protection.

## Risks and Considerations

### Potential Issues:
- May have cosmetic damage
- Uncertain usage history
- Potentially shorter lifespan
- Limited color/configuration options

## Quality Verification

Choose refurbished devices from reputable sellers:

- Authorized refurbishers
- Certified refurbished programs
- Return policies and warranty
- Reputation and reviews

## When to Buy Refurbished

Refurbished is ideal when:
- Budget is a primary concern
- You need a previous-generation device
- You don't mind cosmetic imperfections
- You can verify seller reliability

## Conclusion

Refurbished electronics offer legitimate value, especially from trusted sources. Carefully evaluate your priorities and risk tolerance before purchasing.`,
    author: "Emma Wilson",
    date: "2023-12-20",
    category: "Comparison",
    image: "/placeholder.svg",
    readTime: "6 min read",
  },
]

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The article you are looking for does not exist",
    }
  }

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    keywords: [post.category.toLowerCase(), "blog", "article", ...post.title.split(" ").slice(0, 5)],
    type: "article",
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Get related posts from same category (excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="space-y-8">
          {/* Title and Meta */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-primary">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: `/blog/${post.slug}`,
                    })
                  }
                }}
                className="ml-auto text-primary hover:underline"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="space-y-6 text-base leading-relaxed">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace(/^##\s*/, "")}
                    </h2>
                  )
                }
                if (paragraph.startsWith("###")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-6 mb-2">
                      {paragraph.replace(/^###\s*/, "")}
                    </h3>
                  )
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                      {paragraph.split("\n").map((item, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {item.replace(/^-\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 my-12" />

          {/* Author Bio */}
          <div className="rounded-lg bg-muted/50 p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tech writer and product reviewer with over 5 years of experience in the tech industry.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 my-12" />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col justify-between pt-6 flex-1">
                      <div>
                        <p className="text-xs font-medium text-primary">{relatedPost.category}</p>
                        <h3 className="mt-2 text-lg font-semibold line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="mt-4 inline-block text-primary hover:underline font-medium text-sm"
                      >
                        Read Article →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}
