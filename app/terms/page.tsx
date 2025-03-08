"use client"

import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <p className="text-gray-700 mb-4">
          Last Updated: <strong>February 28, 2025</strong>
        </p>

        <p className="text-gray-700 mb-4">
          Welcome to our platform! These Terms and Conditions outline the rules and regulations for the use of our services. 
          By accessing and using this website, you agree to comply with these terms. If you do not agree, please do not use our services.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing or using our website, mobile application, or services, you accept and agree to be bound by these Terms. 
          If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
        <p className="text-gray-600 mb-4">
          You agree to use our platform responsibly and follow all applicable laws. You are solely responsible for the activity that occurs 
          under your account and must keep your login credentials secure. You must not:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Use false information when creating an account.</li>
          <li>Engage in any illegal activities while using our services.</li>
          <li>Attempt to access unauthorized areas of the website.</li>
          <li>Share or distribute any malicious software or harmful content.</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold mb-2">3. Prohibited Activities</h2>
        <p className="text-gray-600 mb-4">
          You may not use our services for any purpose that is unlawful or prohibited by these Terms. This includes, but is not limited to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Harassing, abusing, or harming another person.</li>
          <li>Impersonating any individual or entity.</li>
          <li>Using automated systems (bots, scrapers) to access our data.</li>
          <li>Posting spam, misleading, or fraudulent content.</li>
        </ul>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold mb-2">4. Privacy and Data Usage</h2>
        <p className="text-gray-600 mb-4">
          We value your privacy. Our <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link> explains how we collect, store, and use your data. 
          By using our services, you agree to the terms outlined in our Privacy Policy.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
        <p className="text-gray-600 mb-4">
          All content, trademarks, logos, and intellectual property on this website are the property of our company or third-party licensors. 
          You may not copy, distribute, or use our content without permission.
        </p>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold mb-2">6. Modifications to Terms</h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to update these Terms at any time. We will notify users of significant changes via email or on our website. 
          Continued use of our services after modifications means you accept the revised Terms.
        </p>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold mb-2">7. Termination of Services</h2>
        <p className="text-gray-600 mb-4">
          We may suspend or terminate your access to our services if you violate these Terms, engage in illegal activities, 
          or disrupt our platform&apos;s operations. We reserve the right to refuse service to anyone for any reason at any time.
        </p>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold mb-2">8. Disclaimers and Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          Our services are provided &quot;as is&quot; without warranties of any kind. We are not responsible for:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Any loss or damage resulting from your use of our platform.</li>
          <li>Content posted by users or third parties.</li>
          <li>Service interruptions or security breaches.</li>
        </ul>

        {/* Section 9 */}
        <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
        <p className="text-gray-600 mb-4">
          These Terms shall be governed by and construed in accordance with the laws of [Your Country/State]. Any disputes 
          shall be resolved in the courts of [Your Jurisdiction].
        </p>

        {/* Section 10 */}
        <h2 className="text-xl font-semibold mb-2">10. Contact Information</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:atmosoft25@gmail.com" className="text-blue-600 underline">
          atmosoft25@gmail.com
          </a>
          .
        </p>

        {/* Back to Home Button */}
        <Link href="/">
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
