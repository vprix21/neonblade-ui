"use client";

import { categories } from "@/lib/docs/data";
import Link from "next/link";
import Badge from "@/lib/components/ui/badges/Badge";
import { usePathname } from "next/navigation";

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden md:block shrink-0">
      <div className="sticky top-32">
        <h3 className="font-orbitron font-bold text-xl mb-6 text-white border-b border-white/10 pb-4">
          Components
        </h3>
        <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-200px)] pr-4 custom-scrollbar">
          {categories.map((category) => (
            <div key={category.slug} className="space-y-3">
              <h4 className="font-orbitron font-semibold text-sm text-[#00f3ff] tracking-wide">
                {category.name}
              </h4>
              <ul className="space-y-2 border-l border-white/10 ml-2 pl-4">
                {category.components.map((component) => {
                  const href = `/components/${category.slug}/${component.slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={component.slug} className="relative">
                      {isActive && (
                        <div className="absolute -left-[20px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff00ff] shadow-[0_0_8px_#ff00ff]" />
                      )}
                      <Link
                        href={href}
                        className={`block text-sm gap-2 flex flex-wrap items-center transition-all ${
                          isActive
                            ? "text-white font-medium translate-x-1"
                            : "text-white/75 hover:text-white hover:translate-x-1"
                        }`}
                      >
                        <span>{component.name}</span>
                        {component.is_new && (
                          <Badge color="green" size="xs" variant="solid">
                            New
                          </Badge>
                        )}
                        {component.is_updated && (
                          <Badge color="yellow" size="xs" variant="solid">
                            Updated
                          </Badge>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
