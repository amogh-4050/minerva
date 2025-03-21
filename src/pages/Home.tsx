import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Users, Award } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-12">

      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Minerva Journalism Club Hackathon
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join us in revolutionizing campus journalism through technology. This hackathon brings together creative minds to develop innovative solutions for modern journalism challenges.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
            <Newspaper className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Digital Journalism</h3>
          <p className="text-gray-600 text-center">
            Explore new ways to tell stories using cutting-edge technology and digital platforms.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Community Impact</h3>
          <p className="text-gray-600 text-center">
            Create solutions that strengthen the connection between journalists and their audience.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 mx-auto">
            <Award className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Innovation</h3>
          <p className="text-gray-600 text-center">
            Push boundaries and develop groundbreaking tools for the future of journalism.
          </p>
        </div>
      </div>

      <div className="text-center mt-16">
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Access Resources
          <Award className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}