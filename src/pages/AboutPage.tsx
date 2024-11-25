import React from 'react';
import { Link } from 'react-router-dom';

// TeamMember Component
const TeamMember: React.FC<{
  name: string;
  role: string;
  description: string;
}> = ({ name, role, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-purple-600 font-medium">{role}</p>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

// AboutPage Component
const AboutPage: React.FC = () => {
  // Features Array
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-purple-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Scriptural Accuracy",
      description: "Our AI is meticulously trained to provide answers aligned with Biblical principles and Jehovah's Witnesses' teachings."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-purple-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Continuous Learning",
      description: "Our AI evolves with each interaction, providing more accurate and nuanced spiritual guidance over time."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-purple-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Spiritual Support",
      description: "More than just answers, we provide compassionate, faith-strengthening guidance."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-purple-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      ),
      title: "Community-Driven",
      description: "A collaborative effort to spread spiritual knowledge and support fellow believers."
    }
  ];

  // Team Members Array
  const teamMembers = [
    {
      name: "AI Development Team",
      role: "Spiritual Technology Innovators",
      description: "A dedicated brother committed to bridging technology and spiritual understanding."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Scriptural Motivation Section */}
        <section className="bg-white shadow-lg rounded-xl p-10 mb-16 text-center">
          <blockquote className="text-2xl italic text-gray-800 mb-6">
            "Each one must give as he has decided in his heart, not grudgingly or under compulsion, for God loves a cheerful giver."
            <br />
            <span className="text-purple-600 font-bold">- 2 Corinthians 9:7</span>
          </blockquote>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Inspired by this scripture, JW-GPT was created as an act of love and service. 
            It's not about technological prowess, but about using our skills to support 
            spiritual growth, research, and understanding of Jehovah's wonderful teachings.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Mission: Draw Close To Jehovah
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            JW-GPT is dedicated to providing AI-powered spiritual guidance from the bible, 
            helping us and those interested in Biblical truth 
            to learn, explore, understand, and apply scriptural principles in our daily lives.
          </p>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why JW-GPT?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Volunteers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={index}
                name={member.name}
                role={member.role}
                description={member.description}
              />
            ))}
          </div>
        </section>

        {/* Contact and Volunteer Section */}
        <section className="bg-white shadow-lg rounded-xl p-10 mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Get Involved and Support the Ministry
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold text-purple-600 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <strong>Phone:</strong> 
                  <a href="tel:+971566053401" className="ml-2 hover:text-purple-600">
                    +971 56 605 3401
                  </a>
                </div>
                <div>
                  <strong>Email:</strong>
                  <a 
                    href="mailto:support@jwgpt.org" 
                    className="ml-2 hover:text-purple-600"
                  >
                    support@jwgpt.org
                  </a>
                </div>
              </div>
            </div>

            {/* Volunteer and Support Section */}
            <div>
              <h3 className="text-2xl font-semibold text-purple-600 mb-4">
                Ways to Support
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Volunteer Technical Support
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Financial Support
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Provide Feedback and Suggestions
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
            Your support would be used to enhance this digital assistant tool, to make JW-GPT more accurate and reliable!
            </p>
            <a 
              href="https://paypal.me/Gladyreigh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-6 py-3 rounded-full 
              hover:bg-purple-700 transition-colors inline-flex items-center"
            >
              Support via PayPal
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Explore Spiritual Insights?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your spiritual journey with JW-GPT today.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/chat"
              className="bg-purple-600 text-white px-6 py-3 rounded-full 
              hover:bg-purple-700 transition-colors inline-flex items-center"
            >
              Start Chatting
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/"
              className="border border-purple-600 text-purple-600 px-6 py-3 
              rounded-full hover:bg-purple-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;