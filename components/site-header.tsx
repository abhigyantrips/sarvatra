import Image from 'next/image';

import { siteConfig } from '@/config/site';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export function SiteHeader() {
  return (
    <header className="flex h-20 w-full flex-row items-center justify-between border-b">
      <div className="flex flex-row items-center gap-2 p-2">
        <div className="h-9 w-9">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="/institute.png"
              alt="Institute Logo"
              fill
              className="object-cover"
            />
          </AspectRatio>
        </div>
        <h1 className="block text-lg font-extrabold uppercase">
          {siteConfig.title}
        </h1>
      </div>
      <div className="gap-2 p-2">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
