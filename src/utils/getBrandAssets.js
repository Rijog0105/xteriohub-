import { assets } from '../data/assets';

export function getBrandAssets(brandId) {
  const bId = (brandId || '').toLowerCase();
  
  const heroList = assets.heroImages.filter(img => 
    img.toLowerCase().includes(`/brands/${bId}/hero/`)
  );
  
  const heroImages = heroList.length > 0 ? heroList : [
    `/assets/Hero/hero-${bId}.webp`
  ];

  const projectImages = assets.projects.filter(img => 
    img.toLowerCase().includes(`/brands/${bId}/projects/`)
  );

  const collectionImages = assets.collections.filter(img => 
    img.toLowerCase().includes(`/brands/${bId}/collections/`)
  );

  const logo = assets.logos.find(l => l.toLowerCase().includes(bId)) || `/assets/logo/${bId}.webp`;
  const documentCover = `/assets/Brands/${bId}/documents/catalogue-cover.png`;

  return {
    heroImages,
    projectImages,
    collectionImages,
    documentCover,
    logo
  };
}

export function getUniqueFeatureImages(brandId, count = 6) {
  const bId = (brandId || '').toLowerCase();
  
  const allBrandImages = [
    ...assets.projects.filter(img => img.toLowerCase().includes(`/brands/${bId}/projects/`)),
    ...assets.collections.filter(img => img.toLowerCase().includes(`/brands/${bId}/collections/`)),
    ...assets.heroImages.filter(img => img.toLowerCase().includes(`/brands/${bId}/hero/`))
  ];

  // Remove exact duplicates
  const uniqueList = Array.from(new Set(allBrandImages));

  if (uniqueList.length >= count) {
    return uniqueList.slice(0, count);
  }

  // Fallback if brand has fewer total images than count
  while (uniqueList.length < count) {
    uniqueList.push(uniqueList[uniqueList.length % Math.max(1, uniqueList.length)]);
  }

  return uniqueList.slice(0, count);
}
