import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from '@/pages/Contact'

// Mock toast
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
}

vi.mock('sonner', () => ({
  toast: mockToast,
}))

// Mock i18n
vi.mock('@/hooks/useI18n', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'contact.workTogether': 'Let\'s Work Together',
        'contact.subtitle': 'Have a project in mind?',
        'contact.sendMessage': 'Send a message',
        'contact.name': 'Name',
        'contact.namePlaceholder': 'Your full name',
        'contact.email': 'Email',
        'contact.emailPlaceholder': 'your.email@example.com',
        'contact.message': 'Message',
        'contact.messagePlaceholder': 'Tell me about your project...',
        'contact.send': 'Send Message',
        'contact.sending': 'Sending...',
        'contact.success': 'Message sent!',
        'contact.successDescription': 'I\'ll contact you soon',
        'contact.error': 'Please correct the form errors',
        'contact.validation.name.min': 'Name must be at least 2 characters',
        'contact.validation.email.invalid': 'Please enter a valid email',
        'contact.validation.message.min': 'Message must be at least 10 characters',
        'contact.info': 'Contact information',
        'contact.followMe': 'Follow me',
        'contact.quickResponse': 'Quick response',
        'contact.responseTime': 'I typically respond within 24 hours',
        'contact.whatsappDirect': 'WhatsApp Direct',
        'contact.sendEmail': 'Send Email',
        'contact.faq': 'Frequently Asked Questions',
        'contact.faq.remote.q': 'Do you work on remote projects?',
        'contact.faq.remote.a': 'Yes, I work remotely.',
        'contact.faq.availability.q': 'What is your availability?',
        'contact.faq.availability.a': 'I\'m currently available.',
        'contact.faq.projects.q': 'What type of projects do you prefer?',
        'contact.faq.projects.a': 'I specialize in full-stack applications.',
        'contact.faq.consulting.q': 'Do you offer consulting?',
        'contact.faq.consulting.a': 'Yes, I offer consulting services.',
      }
      return translations[key] || key
    },
  }),
}))

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    fromTo: vi.fn(),
    context: vi.fn((callback) => {
      callback()
      return { revert: vi.fn() }
    }),
  },
}))

// Mock BG component
vi.mock('@/components/BG', () => ({
  BG: () => <div data-testid="bg-component">Background</div>,
}))

// Mock utils
vi.mock('@/lib/utils', () => ({
  getReducedMotionPreference: vi.fn(() => false),
}))

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders contact form', () => {
    render(<Contact />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders all form fields with placeholders', () => {
    render(<Contact />)

    const nameInput = screen.getByPlaceholderText('Your full name')
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    const messageInput = screen.getByPlaceholderText('Tell me about your project...')

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(messageInput).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Try to submit empty form
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('Please correct the form errors')
    })
  })

  it('validates name minimum length', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByPlaceholderText('Your full name')
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Enter too short name
    await user.type(nameInput, 'J')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Enter invalid email
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
    })
  })

  it('validates message minimum length', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const messageInput = screen.getByPlaceholderText('Tell me about your project...')
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Enter too short message
    await user.type(messageInput, 'Short')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByPlaceholderText('Your full name')
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    const messageInput = screen.getByPlaceholderText('Tell me about your project...')
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Fill form with valid data
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message with enough characters')

    await user.click(submitButton)

    // Check loading state
    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument()
    })

    // Check success message
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('Message sent!', {
        description: 'I\'ll contact you soon',
      })
    }, { timeout: 2000 })
  })

  it('clears form after successful submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByPlaceholderText('Your full name') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('your.email@example.com') as HTMLInputElement
    const messageInput = screen.getByPlaceholderText('Tell me about your project...') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Fill and submit form
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message with enough characters')
    await user.click(submitButton)

    // Wait for submission
    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(messageInput.value).toBe('')
    }, { timeout: 2000 })
  })

  it('clears error when user starts typing', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByPlaceholderText('Your full name')
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Trigger validation error
    await user.type(nameInput, 'J')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument()
    })

    // Start typing again
    await user.type(nameInput, 'ohn')

    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument()
    })
  })

  it('renders contact information section', () => {
    render(<Contact />)

    expect(screen.getByText('Contact information')).toBeInTheDocument()
    expect(screen.getByText('jagzao@gmail.com')).toBeInTheDocument()
  })

  it('renders social links section', () => {
    render(<Contact />)

    expect(screen.getByText('Follow me')).toBeInTheDocument()
  })

  it('renders FAQ section', () => {
    render(<Contact />)

    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
    expect(screen.getByText('Do you work on remote projects?')).toBeInTheDocument()
  })

  it('has accessible form labels', () => {
    render(<Contact />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('submit button is disabled while sending', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByPlaceholderText('Your full name')
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    const messageInput = screen.getByPlaceholderText('Tell me about your project...')
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Fill form
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message with enough characters')
    await user.click(submitButton)

    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })
})
