/**
 * Terms of Service Page
 *
 * Terms and conditions for using the portfolio website.
 */

import { useTranslation } from '@/hooks/useI18n'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function Terms() {
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
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: November 7, 2025
        </p>

        {/* Content */}
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this portfolio website, you accept and agree
              to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Use License
            </h2>
            <p className="mb-4">
              Permission is granted to temporarily view the materials (information
              or software) on this website for personal, non-commercial viewing only.
            </p>
            <p className="mb-4">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Intellectual Property
            </h2>
            <p>
              All content on this website, including but not limited to text,
              graphics, logos, images, code, and software, is the property of Juan
              German Zambrano Ortega and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Project Showcases
            </h2>
            <p className="mb-4">
              The projects showcased on this portfolio are for demonstration
              purposes. Some may be:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proprietary work done for clients (with permission to display)</li>
              <li>Personal projects and experiments</li>
              <li>Open-source contributions</li>
            </ul>
            <p className="mt-4">
              Unless otherwise stated, the code and implementation details remain
              the intellectual property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Contact Form
            </h2>
            <p>
              By submitting the contact form, you agree that your information may
              be used to respond to your inquiry. We do not share your information
              with third parties except as required by our contact form service
              provider (Formspree).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. External Links
            </h2>
            <p>
              This website contains links to external sites (GitHub, LinkedIn,
              project demos). I am not responsible for the content or privacy
              practices of these external sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Disclaimer
            </h2>
            <p className="mb-4">
              The materials on this website are provided on an 'as is' basis. I
              make no warranties, expressed or implied, and hereby disclaim all
              other warranties including, without limitation, implied warranties
              or conditions of merchantability, fitness for a particular purpose.
            </p>
            <p>
              I do not warrant that the website will be uninterrupted, error-free,
              or that defects will be corrected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Limitations
            </h2>
            <p>
              In no event shall Juan German Zambrano Ortega or its suppliers be
              liable for any damages (including, without limitation, damages for
              loss of data or profit) arising out of the use or inability to use
              this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              9. Accuracy of Materials
            </h2>
            <p>
              The materials appearing on this website could include technical,
              typographical, or photographic errors. I do not warrant that any of
              the materials are accurate, complete or current. I may make changes
              to the materials at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              10. Modifications
            </h2>
            <p>
              I may revise these terms of service at any time without notice. By
              using this website, you are agreeing to be bound by the then-current
              version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              11. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws of Mexico, and you irrevocably submit to
              the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              12. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact me at:{' '}
              <a
                href="mailto:jagzao@gmail.com"
                className="text-primary hover:underline"
              >
                jagzao@gmail.com
              </a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            These terms of service are effective as of November 7, 2025
          </p>
        </div>
      </div>
    </div>
  )
}
