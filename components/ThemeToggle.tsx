'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as Switch from '@radix-ui/react-switch';
import * as Tooltip from '@radix-ui/react-tooltip';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="flex items-center space-x-2">
            <Sun className={`w-4 h-4 transition-colors ${isDark ? 'text-gray-400' : 'text-yellow-500'}`} />
            <Switch.Root
              checked={isDark}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform data-[state=checked]:translate-x-5 translate-x-0.5 will-change-transform" />
            </Switch.Root>
            <Moon className={`w-4 h-4 transition-colors ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg"
            sideOffset={5}
          >
            {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
