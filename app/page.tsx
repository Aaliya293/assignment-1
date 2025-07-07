"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import quotesData from '@/lib/quotes.json';

export default function QuoteGenerator() {
  const [topic, setTopic] = useState('');
  const [quotes, setQuotes] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundTopic = quotesData.find(item => item.topic.toLowerCase() === topic.toLowerCase());
    
    if (foundTopic) {
      setQuotes(foundTopic.quotes);
      setError('');
    } else {
      setQuotes([]);
      setError('No quotes found for this topic. Try "motivation", "success", or "life".');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Quote Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g., motivation)"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Get Quotes
            </Button>
          </form>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

          {quotes.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-lg font-semibold text-center">Quotes about {topic}:</h2>
              <ul className="space-y-3">
                {quotes.map((quote, index) => (
                  <li key={index} className="p-3 bg-gray-50 rounded-md">
                    {quote}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}