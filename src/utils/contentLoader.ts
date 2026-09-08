/// <reference types="vite/client" />
import { Article, AsciiArtItem, PhotoItem, PaintingItem, AboutInfo } from '../types';
import { articles as staticArticles } from '../data/articles';
import { asciiArts as staticAscii } from '../data/ascii';
import { photos as staticPhotos } from '../data/photos';
import { paintings as staticPaintings } from '../data/paintings';
import { aboutData as staticAbout } from '../data/about';

// Vite Glob Loaders for public content directories
const rawArticleFiles = import.meta.glob('/public/articles/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const rawAsciiFiles = import.meta.glob('/public/asciiart/*.{txt,art,ansi}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const rawPhotoTextFiles = import.meta.glob('/public/photos/*.{txt,json}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const rawPaintingTextFiles = import.meta.glob('/public/paintings/*.{txt,json}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const rawAboutFiles = import.meta.glob('/public/about.{html,txt,json}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Helper: Extract filename without path and extension
function getFileName(filePath: string): string {
  const parts = filePath.split('/');
  const fullName = parts[parts.length - 1] || '';
  return fullName.replace(/\.[^/.]+$/, '');
}

// Helper: Parse Key-Value Metadata from Text/Comment headers
function parseKeyValHeaders(text: string): { headers: Record<string, string>; body: string } {
  const lines = text.split('\n');
  const headers: Record<string, string> = {};
  let bodyStartIndex = 0;
  let inHeader = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '---' || line === '===') {
      bodyStartIndex = i + 1;
      inHeader = false;
      break;
    }

    const colonIdx = line.indexOf(':');
    if (inHeader && colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim().toLowerCase();
      const val = line.slice(colonIdx + 1).trim();
      headers[key] = val;
    } else if (inHeader && line === '') {
      // blank line might separate header or be part of art
      continue;
    } else {
      // Found non-header line without explicit delimiter
      if (Object.keys(headers).length > 0) {
        bodyStartIndex = i;
        inHeader = false;
        break;
      } else {
        inHeader = false;
        bodyStartIndex = 0;
        break;
      }
    }
  }

  const body = inHeader ? '' : lines.slice(bodyStartIndex).join('\n');
  return { headers, body };
}

// Helper: Parse HTML metadata and body
function parseHtmlArticle(htmlString: string, filePath: string, index: number): Article {
  const id = getFileName(filePath) || `art-${index + 1}`;
  let title = '';
  let englishTitle = '';
  let date = '2026/08/18';
  let excerpt = '';
  let tags: string[] = [];
  let readTime = '۴ دقیقه';
  let featured = false;
  let bodyContent = htmlString;

  // Title tag
  const titleMatch = htmlString.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const rawTitle = titleMatch[1].trim();
    if (rawTitle.includes('|')) {
      const [p, e] = rawTitle.split('|');
      title = p.trim();
      englishTitle = e.trim();
    } else {
      title = rawTitle;
    }
  }

  // Meta tags
  const metaRegex = /<meta\s+name=["']([^"']+)["']\s+content=["']([^"']*)["'][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = metaRegex.exec(htmlString)) !== null) {
    const name = m[1].toLowerCase();
    const val = m[2].trim();
    if (name === 'english-title' || name === 'englishtitle') englishTitle = val;
    if (name === 'date') date = val;
    if (name === 'excerpt' || name === 'description') excerpt = val;
    if (name === 'tags') tags = val.split(',').map((t) => t.trim()).filter(Boolean);
    if (name === 'read-time' || name === 'readtime') readTime = val;
    if (name === 'featured') featured = val === 'true';
  }

  // Body content extraction
  const bodyMatch = htmlString.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1].trim();
  }

  // Fallback title from <h1> or filename
  if (!title) {
    const h1Match = htmlString.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match) {
      title = h1Match[1].replace(/<[^>]+>/g, '').trim();
    } else {
      title = getFileName(filePath).replace(/^[0-9]+[-_]?/, '').replace(/[-_]/g, ' ');
    }
  }

  // Fallback excerpt from first <p>
  if (!excerpt) {
    const pMatch = bodyContent.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      excerpt = pMatch[1].replace(/<[^>]+>/g, '').trim();
    } else {
      excerpt = title;
    }
  }

  return {
    id,
    title,
    englishTitle: englishTitle || undefined,
    date,
    excerpt,
    htmlContent: bodyContent,
    content: bodyContent.replace(/<[^>]+>/g, ' '),
    tags: tags.length > 0 ? tags : ['مقاله', 'متن'],
    readTime,
    featured,
    filePath,
  };
}

/**
 * Load all articles dynamically from public/articles/ or fallback to static list
 */
export function getAllArticles(): Article[] {
  const dynamicArticles: Article[] = [];

  const fileEntries = Object.entries(rawArticleFiles);
  fileEntries.sort(([a], [b]) => a.localeCompare(b));

  fileEntries.forEach(([filePath, content], idx) => {
    if (typeof content === 'string' && content.trim()) {
      dynamicArticles.push(parseHtmlArticle(content, filePath, idx));
    }
  });

  if (dynamicArticles.length > 0) {
    return dynamicArticles;
  }

  return staticArticles;
}

/**
 * Load all ASCII art items from public/asciiart/
 */
export function getAllAsciiArts(): AsciiArtItem[] {
  const dynamicList: AsciiArtItem[] = [];
  const entries = Object.entries(rawAsciiFiles);
  entries.sort(([a], [b]) => a.localeCompare(b));

  entries.forEach(([filePath, rawText], idx) => {
    if (typeof rawText !== 'string' || !rawText.trim()) return;

    const fileName = getFileName(filePath);
    const { headers, body } = parseKeyValHeaders(rawText);

    const artContent = body.trim() || rawText.trim();
    const isAnsi = headers.isansi === 'true' || headers.is_ansi === 'true' || artContent.includes('\x1b[');

    dynamicList.push({
      id: fileName || `ascii-${idx + 1}`,
      title: headers.title || fileName.replace(/^[0-9]+[-_]?/, '').replace(/[-_]/g, ' '),
      englishTitle: headers.englishtitle || headers.english_title || undefined,
      date: headers.date || '2026/08/18',
      category: headers.category || (isAnsi ? 'ANSI ART' : 'ASCII ART'),
      isAnsi,
      description: headers.description || undefined,
      featured: headers.featured === 'true',
      art: artContent,
      filePath,
    });
  });

  if (dynamicList.length > 0) {
    return dynamicList;
  }

  return staticAscii;
}

/**
 * Load all photos from public/photos/
 */
export function getAllPhotos(): PhotoItem[] {
  const dynamicList: PhotoItem[] = [];
  const entries = Object.entries(rawPhotoTextFiles);
  entries.sort(([a], [b]) => a.localeCompare(b));

  entries.forEach(([filePath, rawText], idx) => {
    if (typeof rawText !== 'string' || !rawText.trim()) return;

    const baseName = getFileName(filePath);
    const { headers, body } = parseKeyValHeaders(rawText);

    const localImageUrl = `/photos/${baseName}.jpg`;
    const finalImageUrl = headers.imageurl || headers.image_url || localImageUrl;

    dynamicList.push({
      id: baseName || `photo-${idx + 1}`,
      title: headers.title || baseName.replace(/^[0-9]+[-_]?/, '').replace(/[-_]/g, ' '),
      englishTitle: headers.englishtitle || headers.english_title || undefined,
      date: headers.date || '2026/08/18',
      location: headers.location || undefined,
      camera: headers.camera || undefined,
      imageUrl: finalImageUrl,
      description: headers.description || body.trim() || undefined,
      featured: headers.featured === 'true',
      filePath,
    });
  });

  if (dynamicList.length > 0) {
    return dynamicList;
  }

  return staticPhotos;
}

/**
 * Load all paintings from public/paintings/
 */
export function getAllPaintings(): PaintingItem[] {
  const dynamicList: PaintingItem[] = [];
  const entries = Object.entries(rawPaintingTextFiles);
  entries.sort(([a], [b]) => a.localeCompare(b));

  entries.forEach(([filePath, rawText], idx) => {
    if (typeof rawText !== 'string' || !rawText.trim()) return;

    const baseName = getFileName(filePath);
    const { headers, body } = parseKeyValHeaders(rawText);

    const localImageUrl = `/paintings/${baseName}.jpg`;
    const finalImageUrl = headers.imageurl || headers.image_url || localImageUrl;

    dynamicList.push({
      id: baseName || `paint-${idx + 1}`,
      title: headers.title || baseName.replace(/^[0-9]+[-_]?/, '').replace(/[-_]/g, ' '),
      englishTitle: headers.englishtitle || headers.english_title || undefined,
      date: headers.date || '2026/08/18',
      medium: headers.medium || 'رنگ روغن روی بوم',
      dimensions: headers.dimensions || undefined,
      imageUrl: finalImageUrl,
      description: headers.description || body.trim() || undefined,
      featured: headers.featured === 'true',
      filePath,
    });
  });

  if (dynamicList.length > 0) {
    return dynamicList;
  }

  return staticPaintings;
}

/**
 * Load About information from public/about.html or public/about.json
 */
export function getAboutInfo(): AboutInfo {
  const aboutEntries = Object.entries(rawAboutFiles);
  if (aboutEntries.length > 0) {
    const [, content] = aboutEntries[0];
    if (typeof content === 'string') {
      // If it is JSON
      if (content.trim().startsWith('{')) {
        try {
          return JSON.parse(content) as AboutInfo;
        } catch {
          // ignore
        }
      }

      // If it is HTML
      let name = 'امین';
      let subtitle = 'نویسنده، عکاس آنالوگ و طراح هنر اسکی و بصری';
      let phone = '+98 912 000 0000';
      let email = 'amin13900412@gmail.com';
      let telegram = '@amin_channel';
      let instagram = '@amin.visuals';
      let github = 'https://github.com/amin';
      let youtube = '@amin_art';
      let xTwitter = '@amin_thoughts';
      let location = 'ایران / تهران';
      let skillsOrInterests = [
        'تایپوگرافی و هنر اسکی (ASCII & ANSI Art)',
        'عکاسی سیاه و سفید و آنالوگ ۳۵ میلی‌متری',
        'نقاشی رنگ روغن و اکریلیک روی بوم',
        'نویسندگی و وبلاگ‌نویسی مینیمال',
      ];

      const metaRegex = /<meta\s+name=["']([^"']+)["']\s+content=["']([^"']*)["'][^>]*>/gi;
      let m: RegExpExecArray | null;
      while ((m = metaRegex.exec(content)) !== null) {
        const key = m[1].toLowerCase();
        const val = m[2].trim();
        if (key === 'subtitle') subtitle = val;
        if (key === 'phone') phone = val;
        if (key === 'email') email = val;
        if (key === 'telegram') telegram = val;
        if (key === 'instagram') instagram = val;
        if (key === 'github') github = val;
        if (key === 'youtube') youtube = val;
        if (key === 'twitter' || key === 'xtwitter') xTwitter = val;
        if (key === 'location') location = val;
        if (key === 'skills' || key === 'interests') {
          skillsOrInterests = val.split(',').map((s) => s.trim()).filter(Boolean);
        }
      }

      const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const htmlBody = bodyMatch ? bodyMatch[1].trim() : content;
      const bioText = htmlBody.replace(/<[^>]+>/g, '\n').replace(/\n+/g, '\n').trim();

      const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (titleMatch) {
        name = titleMatch[1].split('|')[0].trim() || name;
      }

      return {
        name,
        subtitle,
        bio: bioText || staticAbout.bio,
        phone,
        email,
        telegram,
        instagram,
        github,
        youtube,
        xTwitter,
        location,
        skillsOrInterests,
        htmlContent: htmlBody,
      };
    }
  }

  return staticAbout;
}
