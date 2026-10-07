export interface ReviewItem {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  verified: boolean;
}

// Initial empty state as per prompt requirements: "show an empty state only, real reviews will be added later"
export const reviews: ReviewItem[] = [];

export const emptyReviewState = {
  title: 'No Client Reflections Yet',
  subtitle: 'Be the first to share your experience with H&A Luxury.',
  description:
    'Our inaugural collection has just been released to private patrons. We invite you to experience our creations and leave your impressions for future connoisseurs.',
  ctaText: 'Write the First Reflection',
};
