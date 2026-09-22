import { assets } from '../data/assets';

const FRONTEK_SHARED_DIMENSION = '/assets/Brands/frontek/collections/wooden facade panels/wood/dimension/dimension.webp';

export const prettify = (value = '') => 
  value
    .replace(/\.[^/.]+$/, '')
    .replace(/^temp-/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

export const isGenericName = name => /^(tail|bag|custom|brickpic|persona|cer)\s*\d+$/i.test(name);

export function getCategoryName(path, brandId) {
  const parts = path.split('/');
  const collectionIndex = parts.findIndex(part => part.toLowerCase() === 'collections');
  const category = parts[collectionIndex + 1] || 'Collection';
  if (brandId === 'steni' && category.toLowerCase() === 'tile collection') {
    return prettify(parts[collectionIndex + 2] || category);
  }
  if (brandId === 'techlam' && parts.length === collectionIndex + 2) {
    return 'Porcelain Facade Finishes';
  }
  return prettify(category);
}

export function getDimensionImage(images, category, brandId) {
  if (brandId === 'frontek') return FRONTEK_SHARED_DIMENSION;
  const categorySlug = category.toLowerCase().replace(/\s+/g, ' ');
  return images.find(image => 
    image.toLowerCase().includes('dimension') && image.toLowerCase().includes(categorySlug)
  ) || null;
}

export function makeCategories(images, brandId) {
  const grouped = new Map();
  images
    .filter(image => !/\/(?:dimension|dimensions|main|front image|largeversion of each cateogry tiles)\//i.test(image))
    .forEach(image => {
      const category = getCategoryName(image, brandId);
      const name = prettify(image.split('/').pop());
      const key = `${category}:${name.toLowerCase()}`;
      const existing = grouped.get(category)?.find(item => item.key === key);
      if (existing) {
        if (image.includes('/temp-')) existing.image = image;
        return;
      }
      if (!grouped.has(category)) grouped.set(category, []);
      grouped.get(category).push({ key, image, name });
    });
  return [...grouped.entries()].map(([name, items]) => ({
    name,
    items,
    dimensionImage: getDimensionImage(images, name, brandId)
  }));
}
