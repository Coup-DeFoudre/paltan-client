import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { searchQuery, searchSuggestionsQuery, searchCountQuery, debugSearchQuery } from '@/lib/queries';

// Cache for search results (5 minutes)
const searchCache = new Map<string, { data: Record<string, unknown>; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Debounce tracking
const debounceMap = new Map<string, NodeJS.Timeout>();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const suggestions = searchParams.get('suggestions') === 'true';

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ 
        results: [], 
        totalCount: 0, 
        suggestions: [],
        message: 'Please enter at least 2 characters to search' 
      });
    }

    const searchTerm = query.trim().toLowerCase();
    const cacheKey = `${searchTerm}-${type}-${page}-${limit}-${suggestions}`;

    // Debug: Log search parameters
    console.log('Search API called with:', { query, searchTerm, type, page, limit, suggestions });

    // Check cache first
    const cached = searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Returning cached results');
      return NextResponse.json(cached.data);
    }

    // Debounce rapid requests
    if (debounceMap.has(searchTerm)) {
      clearTimeout(debounceMap.get(searchTerm)!);
    }

    return new Promise((resolve) => {
      const timeoutId = setTimeout(async () => {
        try {
          const start = (page - 1) * limit;
          const end = start + limit - 1;

          console.log('Executing search with params:', { searchTerm, start, end, type });

          // First, let's try a debug query to see what content exists
          const debugResults = await client.fetch(debugSearchQuery);
          console.log('Debug - All available content:', debugResults);

          // Execute queries in parallel
          const [results, totalCount, suggestionResults] = await Promise.all([
            client.fetch(searchQuery, { 
              searchTerm, 
              start, 
              end 
            }            ) as Promise<Record<string, unknown>[]>,
            client.fetch(searchCountQuery, { searchTerm }) as Promise<number>,
            suggestions ? client.fetch(searchSuggestionsQuery, { searchTerm }) as Promise<Record<string, unknown>[]> : Promise.resolve([])
          ]);

          console.log('Search results:', { results, totalCount, suggestionResults });

          // Filter by content type if specified
          const filteredResults = type === 'all' 
            ? results 
            : results.filter((item: Record<string, unknown>) => item._type === type);

          console.log('Filtered results:', filteredResults);

          const responseData = {
            results: filteredResults,
            totalCount,
            suggestions: suggestionResults || [],
            page,
            totalPages: Math.ceil(totalCount / limit),
            hasMore: page * limit < totalCount,
            searchTerm: query,
            type
          };

          // Cache the results
          searchCache.set(cacheKey, {
            data: responseData,
            timestamp: Date.now()
          });

          // Clean old cache entries (keep only last 100)
          if (searchCache.size > 100) {
            const oldestKey = searchCache.keys().next().value;
            if (oldestKey) {
              searchCache.delete(oldestKey);
            }
          }

          resolve(NextResponse.json(responseData));
        } catch (error) {
          console.error('Search API error:', error);
          resolve(NextResponse.json({ 
            error: 'Search failed', 
            results: [], 
            totalCount: 0,
            suggestions: []
          }, { status: 500 }));
        } finally {
          debounceMap.delete(searchTerm);
        }
      }, 300); // 300ms debounce

      debounceMap.set(searchTerm, timeoutId);
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ 
      error: 'Search failed', 
      results: [], 
      totalCount: 0,
      suggestions: []
    }, { status: 500 });
  }
}

// Track search analytics
export async function POST(request: NextRequest) {
  try {
    const { searchTerm } = await request.json();
    
    if (!searchTerm || searchTerm.trim().length < 2) {
      return NextResponse.json({ success: false });
    }

    // In a real implementation, you'd save this to Sanity
    // For now, we'll just log it
    console.log('Search tracked:', searchTerm);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Search tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
