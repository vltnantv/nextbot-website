/** Navigation link used in header and footer */
export interface NavLink {
  /** Display text for the link */
  label: string;
  /** Target URL or anchor */
  href: string;
  /** Whether this link opens in a new tab */
  external?: boolean;
}

/** Feature card displayed on the homepage */
export interface Feature {
  /** Lucide/Heroicons icon name or React node */
  icon: string;
  /** Feature headline */
  title: string;
  /** Short description of the feature */
  description: string;
  /** Optional link to a detail page */
  href?: string;
}

/** Statistic displayed in social-proof sections */
export interface Stat {
  /** Formatted display value (e.g. "22h", "94%") */
  value: string;
  /** Human-readable label */
  label: string;
  /** Optional longer explanation */
  description?: string;
}

/** Pricing tier for the pricing section */
export interface PricingTier {
  /** Tier name (e.g. "Starter", "Pro") */
  name: string;
  /** Price in smallest currency unit or formatted string */
  price: number;
  /** Currency label (e.g. "лв") */
  currency?: string;
  /** Billing period label */
  period?: string;
  /** List of included features */
  features: string[];
  /** Whether this tier is visually highlighted */
  highlighted?: boolean;
}

/** Customer testimonial */
export interface Testimonial {
  /** Customer full name */
  name: string;
  /** Job title */
  role: string;
  /** Company name */
  company: string;
  /** Testimonial body text */
  content: string;
  /** URL to avatar image */
  avatar?: string;
}

/** Social media link */
export interface SocialLink {
  /** Platform name */
  platform: string;
  /** Profile URL */
  href: string;
  /** Accessible label */
  ariaLabel: string;
}
