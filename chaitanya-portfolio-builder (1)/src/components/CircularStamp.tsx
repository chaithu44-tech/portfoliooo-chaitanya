export function CircularStamp() {
  return (
    <div
      className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#F5F2E9] border border-[#D8D1C5] flex items-center justify-center select-none shadow-xs"
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="w-full h-full animate-slow-spin">
        <defs>
          <path
            id="stamp-circle-path"
            d="M 60, 60 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
          />
        </defs>
        <text
          fill="#5E5951"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="2.35"
          className="font-sans uppercase"
        >
          <textPath href="#stamp-circle-path" startOffset="0%">
            B.TECH AIML · JAIN UNIVERSITY · BENGALURU ·
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight px-3">
        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#BD735D]">
          2nd Year
        </span>
        <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#171717] mt-0.5">
          3rd Sem
        </span>
      </div>
    </div>
  );
}
