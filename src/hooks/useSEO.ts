import { useEffect } from 'react';
import { injectStructuredData } from '../utils/seo';

export const useSEO = (title: string, description?: string) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description if provided
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Inject structured data
    injectStructuredData();

    // Optional: scroll to top
    window.scrollTo(0, 0);
  }, [title, description]);
};