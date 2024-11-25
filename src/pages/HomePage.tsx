import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const HomePage: React.FC = () => {
    useSEO(
        'JW-GPT | AI Spiritual Assistant', 
        'An AI-powered spiritual companion providing Bible-based guidance, scriptural insights, and support for Jehovah\'s Witnesses.'
      );
      
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-purple-600 dark:text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Biblical Insights",
      description: "Get deep, scripturally-based answers to your spiritual questions."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-purple-600 dark:text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Comprehensive Search",
      description: "Explore resources from jw.org with intelligent search capabilities."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-purple-600 dark:text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Spiritual Guidance",
      description: "Receive compassionate, faith-strengthening support."
    }
  ];

  const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-md hover:shadow-lg transition-all group">
      <div className="mb-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-dark-background dark:to-dark-surface text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-purple-600 dark:text-purple-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.192a3 3 0 01-4.243 0 3 3 0 014.243 0z" />
              </svg>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                JW-GPT | Your Spiritual Companion
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Discover Spiritual Insights <br />Powered by Bible
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              An AI-powered assistant dedicated to providing scriptural guidance, 
              helping you draw closer to Jehovah and understand His word.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleStartChat}
                className="bg-purple-600 dark:bg-purple-700 text-white px-6 py-3 rounded-full 
                hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.192a3 3 0 01-4.243 0 3 3 0 014.243 0z" />
                </svg>
                <span>Start Chatting</span>
              </button>
              <button
                onClick={handleLearnMore}
                className="border border-purple-600 dark:border-purple-400 
                text-purple-600 dark:text-purple-400 px-6 py-3 
                rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 
                transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="hidden lg:block">
            <div className="bg-purple-100 dark:bg-dark-surface/30 rounded-xl p-8 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-lg">
                <div className="flex space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 lg:mt-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Choose JW-GPT?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;