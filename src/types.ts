export type PageType = 'home' | 'articles' | 'ascii' | 'paintings' | 'photos' | 'about';

export type ContentBlock =
  | { type: 'markdown'; content: string }
  | { type: 'math'; latex: string; caption?: string }
  | { type: 'code'; code: string; language?: string; filename?: string; caption?: string }
  | { type: 'writing'; content: string; caption?: string; title?: string }
  | { type: 'image'; url: string; caption?: string; align?: 'center' | 'left' | 'right'; alt?: string }
  | { type: 'ascii'; content: string; caption?: string; align?: 'center' | 'left' | 'right'; title?: string }
  | { type: 'ansi'; content: string; caption?: string; align?: 'center' | 'left' | 'right'; title?: string };

export interface Article {
  id: string;
  title: string;
  englishTitle?: string;
  date: string;
  excerpt: string;
  content?: string;
  htmlContent?: string;
  filePath?: string;
  blocks?: ContentBlock[];
  tags?: string[];
  readTime?: string;
  featured?: boolean;
}

export interface AsciiArtItem {
  id: string;
  title: string;
  englishTitle?: string;
  date: string;
  category: string;
  art: string;
  filePath?: string;
  isAnsi?: boolean;
  description?: string;
  featured?: boolean;
}

export interface PaintingItem {
  id: string;
  title: string;
  englishTitle?: string;
  date: string;
  medium: string;
  dimensions?: string;
  imageUrl: string;
  filePath?: string;
  description?: string;
  featured?: boolean;
}

export interface PhotoItem {
  id: string;
  title: string;
  englishTitle?: string;
  date: string;
  location?: string;
  camera?: string;
  imageUrl: string;
  filePath?: string;
  description?: string;
  featured?: boolean;
}

export interface AboutInfo {
  name: string;
  subtitle: string;
  bio: string;
  phone: string;
  email: string;
  telegram?: string;
  instagram?: string;
  github?: string;
  youtube?: string;
  xTwitter?: string;
  location?: string;
  skillsOrInterests?: string[];
  htmlContent?: string;
}

