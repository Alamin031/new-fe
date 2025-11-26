import type { Metadata } from "next"
import { Briefcase, MapPin, Clock, DollarSign, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { generateSEO } from "../../lib/seo"
import { CareersForm } from "./careers-form"

export const metadata: Metadata = generateSEO({
  title: "Careers at TechStore | Join Our Team",
  description: "Explore exciting career opportunities at TechStore. Join our dynamic team and be part of Bangladesh's leading electronics retailer. View open positions and apply now.",
  url: "/careers",
  keywords: ["careers", "jobs", "hiring", "employment", "team", "opportunity"],
})

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Technology",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "3-5 years",
    salary: "৳80,000 - ৳120,000",
    description: "We're looking for an experienced software engineer to lead our backend development team. You'll work on scalable systems that serve millions of customers.",
    responsibilities: [
      "Design and develop robust backend systems using modern technologies",
      "Lead code reviews and mentor junior developers",
      "Collaborate with product teams to deliver features",
      "Optimize database performance and system architecture",
    ],
    requirements: [
      "3-5 years of professional software development experience",
      "Strong knowledge of backend technologies (Node.js, Python, or Java)",
      "Experience with databases and APIs",
      "Excellent problem-solving skills",
      "BSc in Computer Science or related field",
    ],
  },
  {
    id: 2,
    title: "Customer Success Manager",
    department: "Customer Service",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "1-3 years",
    salary: "৳40,000 - ৳60,000",
    description: "Join our customer success team and help hundreds of customers find the perfect technology for their needs. You'll be the face of TechStore's customer service.",
    responsibilities: [
      "Handle customer inquiries via phone, email, and chat",
      "Resolve complaints and issues efficiently",
      "Process orders and handle returns",
      "Build relationships with customers",
      "Provide product recommendations",
    ],
    requirements: [
      "1-3 years of customer service experience",
      "Excellent communication skills",
      "Product knowledge or willingness to learn",
      "Problem-solving abilities",
      "Patience and empathy",
    ],
  },
  {
    id: 3,
    title: "Marketing Executive",
    department: "Marketing",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "2-4 years",
    salary: "৳50,000 - ৳80,000",
    description: "Create engaging marketing campaigns that drive customer acquisition and brand awareness. Work with modern marketing tools and strategies.",
    responsibilities: [
      "Develop and execute marketing campaigns across channels",
      "Manage social media presence",
      "Analyze campaign performance and optimize",
      "Collaborate with sales and product teams",
      "Create engaging content for various platforms",
    ],
    requirements: [
      "2-4 years of digital marketing experience",
      "Knowledge of marketing tools and platforms",
      "Creative thinking and strong writing skills",
      "Data analysis and reporting ability",
      "Understanding of e-commerce marketing",
    ],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    department: "Design",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "2-3 years",
    salary: "৳50,000 - ৳75,000",
    description: "Design beautiful and intuitive user experiences for our e-commerce platform. Collaborate with developers and product managers to create amazing interfaces.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes and prototypes",
      "Maintain design systems and guidelines",
      "Collaborate with cross-functional teams",
    ],
    requirements: [
      "2-3 years of UI/UX design experience",
      "Proficiency in design tools (Figma, Adobe XD, or similar)",
      "Understanding of user-centered design principles",
      "Strong portfolio showcasing design work",
      "Communication and collaboration skills",
    ],
  },
  {
    id: 5,
    title: "Logistics Coordinator",
    department: "Operations",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "1-2 years",
    salary: "৳35,000 - ৳50,000",
    description: "Manage our logistics operations and ensure timely delivery of products. Work with courier partners and coordinate shipments.",
    responsibilities: [
      "Coordinate with couriers and delivery partners",
      "Track shipments and manage inventory",
      "Resolve delivery issues",
      "Maintain delivery records and documentation",
      "Optimize logistics processes",
    ],
    requirements: [
      "1-2 years of logistics experience",
      "Excellent organizational skills",
      "Knowledge of inventory management",
      "Problem-solving abilities",
      "Attention to detail",
    ],
  },
  {
    id: 6,
    title: "Product Manager",
    department: "Product",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    experience: "3-5 years",
    salary: "৳80,000 - ৳120,000",
    description: "Lead product strategy and roadmap. Define requirements, prioritize features, and drive product excellence.",
    responsibilities: [
      "Define product vision and strategy",
      "Gather customer feedback and market insights",
      "Prioritize features and improvements",
      "Collaborate with engineering and design teams",
      "Track product metrics and KPIs",
    ],
    requirements: [
      "3-5 years of product management experience",
      "Strong analytical and communication skills",
      "Experience with e-commerce or tech products",
      "Data-driven decision making",
      "Leadership and collaboration abilities",
    ],
  },
]

const benefits = [
  {
    title: "Competitive Salary",
    description: "We offer market-competitive salaries with annual increments based on performance.",
  },
  {
    title: "Health Insurance",
    description: "Comprehensive health and medical insurance coverage for you and your family.",
  },
  {
    title: "Professional Growth",
    description: "Training programs and opportunities for career development and skill enhancement.",
  },
  {
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options for eligible positions.",
  },
  {
    title: "Performance Bonus",
    description: "Annual performance bonuses and incentives based on company and personal goals.",
  },
  {
    title: "Team Culture",
    description: "Collaborative and inclusive work environment with regular team activities.",
  },
]

export default function CareersPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Join Our Team</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Build your career with TechStore. We're looking for talented individuals to join our growing team and help us revolutionize e-commerce in Bangladesh.
        </p>
      </section>

      {/* Why Join Section */}
      <section>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Why Join TechStore?</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Positions Section */}
      <section>
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Open Positions</h2>
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <p className="mt-2 text-sm text-primary font-medium">{job.department}</p>
                  </div>
                  <a href={`#apply-${job.id}`} className="md:self-center">
                    <Button variant="outline" size="sm" className="w-full md:w-auto">
                      Apply Now
                    </Button>
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {job.experience}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                <details className="group">
                  <summary className="cursor-pointer font-medium text-primary hover:underline">
                    View details
                  </summary>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Responsibilities</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Application Form Section */}
      <section className="rounded-2xl bg-muted/50 p-8 md:p-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Apply Now</h2>
            <p className="mt-2 text-muted-foreground">
              Submit your application along with your resume and cover letter
            </p>
          </div>
          <CareersForm />
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">Questions?</h2>
        <p className="mt-4 text-muted-foreground">
          If you don't see a position that fits your skills, feel free to reach out to us.
        </p>
        <a href="/contact-us" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline font-medium">
          <Send className="h-4 w-4" />
          Contact Us
        </a>
      </section>
    </div>
  )
}
