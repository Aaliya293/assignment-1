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
    searchQuotes(topic);
  };

  const searchQuotes = (searchTerm: string) => {
    const foundTopic = quotesData.find(item => 
      item.topic.toLowerCase() === searchTerm.toLowerCase()
    );
    
    if (foundTopic) {
      setQuotes(foundTopic.quotes);
      setError('');
      setTopic(searchTerm); // Update input field with correct casing
    } else {
      setQuotes([]);
      setError(`No quotes found for "${searchTerm}". Try ${quotesData.map(t => t.topic).join(', ')}.`);
    }
  };

  const handleSurpriseMe = () => {
    const randomTopic = quotesData[Math.floor(Math.random() * quotesData.length)].topic;
    searchQuotes(randomTopic);
  };

  const handleShare = (quote: string) => {
    navigator.clipboard.writeText(quote);
    alert('Quote copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Quote Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g., motivation)"
                className="flex-1"
                required
              />
              <Button type="submit">
                Search
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2 my-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSurpriseMe}
            >
              Surprise Me
            </Button>
            {quotesData.map((category) => (
              <Button
                key={category.topic}
                variant="outline"
                size="sm"
                onClick={() => searchQuotes(category.topic)}
                className="capitalize"
              >
                {category.topic}
              </Button>
            ))}
          </div>

          {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}

          {quotes.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-lg font-semibold text-center text-gray-700">
                {quotes.length} {quotes.length === 1 ? 'Quote' : 'Quotes'} about {topic}
              </h2>
              <ul className="space-y-3">
                {quotes.map((quote, index) => (
                  <li key={index} className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
                    <p className="text-gray-800">"{quote.split(' - ')[0]}"</p>
                    <p className="text-sm text-gray-600 mt-1">— {quote.split(' - ')[1]}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-xs"
                      onClick={() => handleShare(quote)}
                    >
                      📋 Share
                    </Button>
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