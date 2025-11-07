/**
 * Privacy Policy Page
 *
 * GDPR-compliant privacy policy for the portfolio site.
 * Explains data collection, usage, and user rights.
 */

import { useTranslation } from '@/hooks/useI18n'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Privacy() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.back') || 'Back to Home'}
        </Link>

        {/* Header */}
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: November 7, 2025
        </p>

        {/* Content */}
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              This portfolio website collects minimal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Analytics Data:</strong> We use Cloudflare Web Analytics
                (privacy-first, no cookies) to collect anonymous usage statistics.
              </li>
              <li>
                <strong>Contact Form:</strong> When you submit the contact form,
                we collect your name, email, and message through Formspree.
              </li>
              <li>
                <strong>No Cookies:</strong> This website does not use tracking
                cookies or personal identifiers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Contact form data is used solely to respond to your inquiries.
              </li>
              <li>
                Analytics data helps us understand how visitors use the site to
                improve the user experience.
              </li>
              <li>We never sell or share your personal information with third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Third-Party Services
            </h2>
            <p className="mb-4">This website uses the following services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Cloudflare Pages:</strong> Hosting provider (
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
              <li>
                <strong>Cloudflare Web Analytics:</strong> Privacy-first analytics (
                <a
                  href="https://www.cloudflare.com/web-analytics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Learn More
                </a>
                )
              </li>
              <li>
                <strong>Formspree:</strong> Contact form service (
                <a
                  href="https://formspree.io/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </a>
                )
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Data Retention
            </h2>
            <p>
              Contact form submissions are retained by Formspree and can be
              exported or deleted upon request. Analytics data is anonymized and
              cannot be traced back to individual users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Your Rights
            </h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Request access to your personal data</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt-out of analytics (though we don't track individuals)</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. GDPR Compliance
            </h2>
            <p>
              This website is fully compliant with the EU General Data Protection
              Regulation (GDPR). We collect minimal data, process it lawfully,
              and protect your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Contact
            </h2>
            <p>
              For questions about this privacy policy or to exercise your rights,
              contact me at:{' '}
              <a
                href="mailto:jagzao@gmail.com"
                className="text-primary hover:underline"
              >
                jagzao@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Changes to This Policy
            </h2>
            <p>
              I may update this privacy policy from time to time. Changes will be
              posted on this page with an updated revision date.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            This privacy policy is effective as of November 7, 2025
          </p>
        </div>
      </div>
    </div>
  )
}
