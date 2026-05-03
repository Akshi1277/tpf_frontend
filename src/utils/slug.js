export const toSlug = (title, id) => {
  const titleSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/[\s_]+/g, '-')    // spaces to dashes
    .replace(/-+/g, '-');       // collapse multiple dashes
  
  return `${titleSlug}--${id}`;
};

export const slugToId = (slug) => {
  const parts = slug.split('--');
  return parts[parts.length - 1]; // extract the ID after last --
};