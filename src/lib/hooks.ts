import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { SiteSettings } from '@/types/schema';

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const result = await client.fetch<SiteSettings>(`*[_type == "siteSettings"][0]`);
        setSettings(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch settings'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, isLoading, error };
} 