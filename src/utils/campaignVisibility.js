export const HIDDEN_SLUGS = ["tpf-expesnses-454f4b"];

export const isCampaignVisible = (campaign) => {
  const slug = campaign.slug || campaign.campaignSlug;

  if (!slug) return false;
  if (HIDDEN_SLUGS.includes(slug)) return false;

  return true;
};