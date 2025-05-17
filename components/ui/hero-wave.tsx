export function HeroWave({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 96L48 112C96 128 192 160 288 165.3C384 171 480 149 576 149.3C672 149 768 171 864 176C960 181 1056 171 1152 149.3C1248 128 1344 96 1392 80L1440 64V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V96Z"
        fill="url(#paint0_linear)"
        fillOpacity="0.2"
      />
      <path
        d="M0 64L48 80C96 96 192 128 288 133.3C384 139 480 117 576 117.3C672 117 768 139 864 144C960 149 1056 139 1152 117.3C1248 96 1344 64 1392 48L1440 32V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V64Z"
        fill="url(#paint1_linear)"
        fillOpacity="0.4"
      />
      <defs>
        <linearGradient id="paint0_linear" x1="720" y1="0" x2="720" y2="176" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" />
          <stop offset="1" stopColor="#10B981" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="720" y1="0" x2="720" y2="144" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" />
          <stop offset="1" stopColor="#10B981" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  )
}
