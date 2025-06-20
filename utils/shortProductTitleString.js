export default function getShortTitleString(productDetails, maxLength = 50) {
    if (!Array.isArray(productDetails)) return '';
  
    const titles = productDetails.map(p => p.title).join(', ');
  
    return titles.length > maxLength
      ? titles.slice(0, maxLength) + '...'
      : titles;
  }
  