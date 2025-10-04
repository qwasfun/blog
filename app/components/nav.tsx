import Link from 'next/link'

const navItems = {
  '/': {
    name: 'Home',
  },
  '/blog': {
    name: 'Blog',
  },
  '/reader': {
    name: 'Reader',
  },
  '/excalidraws': {
    name: 'Excalidraw',
  },
  '/settings': {
    name: 'Settings',
  },
  '/changelog': {
    name: 'Changelog',
  },
}

export function Navbar() {
  return (
    <div className="max-w-2xl md:mx-auto pt-8 pb-2 tracking-tight sticky top-0 bg-white dark:bg-black z-10">
      <div className="md:-ml-[8px]">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
