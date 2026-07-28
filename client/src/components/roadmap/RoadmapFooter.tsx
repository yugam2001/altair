export default function RoadmapFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto w-[90%] max-w-[1400px] border-t border-blue-400/12 py-12 sm:py-14">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight text-white">ALTAIR</p>
          <p className="mt-1.5 text-sm text-blue-200/55">Find your way forward.</p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-blue-100/55"
        >
          <a href="#" className="transition-colors hover:text-white">
            Responsible AI
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-white">
            GitHub
          </a>
          <span className="text-blue-300/40">v0.1.0</span>
        </nav>
      </div>

      <p className="mt-10 text-xs text-blue-200/40">
        &copy; {year} ALTAIR. All rights reserved.
      </p>
    </footer>
  )
}
