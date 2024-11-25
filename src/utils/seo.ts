export const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JW-GPT",
      "url": "https://jwgpt.org",
      "description": "AI-powered spiritual assistant for Jehovah's Witnesses",
      "applicationCategory": "Spiritual Assistance",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
  };
  
  export const injectStructuredData = () => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(generateStructuredData());
    document.head.appendChild(script);
  };