import type { Language } from '../i18n/translations';

export interface Project {
  id: string;
  title: {
    en: string;
    el: string;
  };
  description: {
    en: string;
    el: string;
  };
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface AboutData {
  bio: string;
  fiveYearGoal: string;
  interviewHighlight: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonicalURL?: string;
  lang?: Language;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
