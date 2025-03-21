import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Resource } from '../types';
import { Download, FileText, Calendar, Link as LinkIcon } from 'lucide-react';

export function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setResources(data || []);
      } catch (err) {
        setError('Failed to load resources. Please try again later.');
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading resources...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-lg shadow-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hackathon Resources</h1>
        <p className="text-xl text-gray-600">
          Access all the materials and tools you need for the hackathon
        </p>
      </div>
      
      {resources.length === 0 ? (
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No resources available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {resource.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-lg">{resource.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Added on {new Date(resource.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      <a href={resource.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        View Source
                      </a>
                    </div>
                  </div>
                </div>
                <a
                  href={resource.url}
                  download
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md ml-6"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}