"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LineChart,
  Lock,
  HopOff,
  DollarSign,
  Users,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Centered Glassy Navbar */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 md:w-3/4 lg:w-2/3">
        <div className="flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full shadow-lg">
          <Link href="/" className="flex items-center space-x-2 font-bold">
            <HopOff className="h-6 w-6 text-cyan-400" />
            <span>Arsev</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              href="#features"
              className="hidden md:block text-sm hover:text-cyan-400"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hidden md:block text-sm hover:text-cyan-400"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="hidden md:block text-sm hover:text-cyan-400"
            >
              FAQ
            </Link>
            <Link
              href="#contact"
              className="hidden md:block text-sm hover:text-cyan-400"
            >
              Contact
            </Link>
            <Link href="/login" className="text-sm hover:text-cyan-400">
              Login
            </Link>
            <button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 rounded-lg px-4 py-2">
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
              }}
              d="M 100 100 Q 300 0 500 100 T 900 100"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 0.5,
              }}
              d="M 0 200 Q 200 100 400 200 T 800 200"
              fill="none"
              stroke="url(#grad2)"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 1,
              }}
              d="M 100 600 Q 300 500 500 600 T 900 600"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
          </svg>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                  x: "-100%",
                  opacity: [0, 0.7, 0.7, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
                className="absolute right-0"
                style={{
                  top: `${15 + i * 10}%`,
                  height: "1px",
                  width: "100%",
                  background: `linear-gradient(90deg, transparent, ${
                    i % 2 === 0 ? "#22d3ee" : "#8b5cf6"
                  }60, transparent)`,
                }}
              />
            ))}
          </motion.div>
        </div>
        {/* Layered Animated Background Blobs */}
        <div className="absolute inset-0 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
          />
        </div>
        {/* Hero Content */}
        <div className="container relative z-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Dive into the Adventure
            </h1>
            <p className="mx-auto max-w-2xl text-gray-400 sm:text-xl">
              Experience a new era of digital finance and secure banking with Arsev.
            </p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 rounded-lg px-4 py-2"
              >
                <Link href="/">Get Started</Link>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white/10 text-lg text-white hover:bg-white/10 rounded-lg px-4 py-2"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 bg-black">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Features
            </h2>
            <p className="mt-4 text-gray-400">
              Discover what makes Arsev outstanding
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <CreditCard className="h-12 w-12 text-cyan-400" />,
                title: "Smart Cards",
                description:
                  "Virtual and physical cards with advanced controls and real-time notifications.",
              },
              {
                icon: <LineChart className="h-12 w-12 text-violet-400" />,
                title: "Smart Investments",
                description:
                  "Automated investment strategies tailored to your financial goals.",
              },
              {
                icon: <Lock className="h-12 w-12 text-cyan-400" />,
                title: "Banking Security",
                description:
                  "Enterprise-level security with end-to-end encryption and biometric authentication.",
              },
              {
                icon: <Users className="h-12 w-12 text-violet-400" />,
                title: "User Management",
                description:
                  "Seamlessly manage multiple user accounts with intuitive dashboards and analytics.",
              },
              {
                icon: <MessageSquare className="h-12 w-12 text-cyan-400" />,
                title: "Real-time Chat Support",
                description:
                  "Instant messaging support to help you with any inquiries or technical issues.",
              },
              {
                icon: <DollarSign className="h-12 w-12 text-violet-400" />,
                title: "Competitive Rates",
                description:
                  "Enjoy low fees and competitive rates that maximize your financial growth.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 bg-black">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Pricing Plans
            </h2>
            <p className="mt-4 text-gray-400">
              Choose a plan that fits your needs
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Basic",
                price: "$9/month",
                features: [
                  "Essential features",
                  "Email support",
                  "Single user",
                ],
                buttonText: "Choose Plan",
              },
              {
                title: "Pro",
                price: "$29/month",
                features: [
                  "All Basic features",
                  "Priority support",
                  "Up to 5 users",
                ],
                buttonText: "Choose Plan",
              },
              {
                title: "Enterprise",
                price: "Custom Pricing",
                features: [
                  "All Pro features",
                  "Dedicated support",
                  "Unlimited users",
                ],
                buttonText: "Contact Us",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-2xl bg-white/5 p-8 text-center backdrop-blur-sm hover:border-cyan-400/50"
              >
                <h3 className="mb-4 text-2xl font-bold">{plan.title}</h3>
                <p className="mb-4 text-gray-400 text-lg">{plan.price}</p>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-black hover:from-cyan-500 hover:to-violet-600">
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 bg-black">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-400">
              Find answers to common queries
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "What is Arsev?",
                answer:
                  "Arsev is a cutting-edge platform that revolutionizes digital finance and secure banking.",
              },
              {
                question: "How secure is the platform?",
                answer:
                  "We implement enterprise-level security with end-to-end encryption and biometric authentication.",
              },
              {
                question: "What pricing plans are available?",
                answer:
                  "We offer Basic, Pro, and Enterprise plans to suit different needs. For custom pricing, please contact us.",
              },
            ].map((item, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-lg p-4"
              >
                <summary className="cursor-pointer font-bold">
                  {item.question}
                </summary>
                <p className="mt-2 text-gray-400">{item.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 bg-black">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-gray-400">We&apos;d love to hear from you</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
                  rows={4}
                  placeholder="Your message"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 text-black hover:from-cyan-500 hover:to-violet-600"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 bg-black">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-gray-400">
              Testimonials from satisfied customers
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                testimonial:
                  "Arsev has transformed the way I manage my finances. The smart cards and investment tools are simply outstanding!",
                name: "John Doe",
                role: "Entrepreneur",
              },
              {
                testimonial:
                  "The security features give me peace of mind. I trust Arsev with all my financial transactions.",
                name: "Jane Smith",
                role: "Tech Professional",
              },
              {
                testimonial:
                  "Customer support is always available. I've never experienced such efficiency in any financial platform.",
                name: "Alex Johnson",
                role: "Freelancer",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <p className="text-gray-400 italic">&apos;{item.testimonial}&apos;</p>
                <div className="mt-4">
                  <h4 className="text-lg font-bold">{item.name}</h4>
                  <span className="text-sm text-gray-400">{item.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8">
        <div className="container flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <HopOff className="h-6 w-6 text-cyan-400" />
            <span className="font-bold">Arsev</span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Arsev. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-gray-400 hover:text-cyan-400">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-cyan-400">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-cyan-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
