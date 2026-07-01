type ProductImageProps = {
  label?: string;
  size?: 'card' | 'large';
};

export default function ProductImage({ label = 'Boot supply product', size = 'card' }: ProductImageProps) {
  const dimension = size === 'large' ? 260 : 132;

  return (
    <svg width={dimension} height={dimension} viewBox="0 0 240 240" role="img" aria-label={label}>
      <rect x="16" y="16" width="208" height="208" rx="18" fill="#eef4f2" />
      <path
        d="M80 48c27 9 43 31 50 67 4 21 13 38 29 49 12 8 27 12 45 12 8 0 13 7 10 15-6 17-22 27-47 27h-51c-31 0-57-15-75-41-7-10-5-24 4-32l31-27c9-8 13-20 10-32L75 56c-1-6 0-9 5-8z"
        fill="#0b3f47"
      />
      <path
        d="M63 151c31 24 76 37 136 37"
        fill="none"
        stroke="#8a5a24"
        strokeLinecap="round"
        strokeWidth="11"
      />
      <path
        d="M88 64c17 13 28 31 35 55"
        fill="none"
        stroke="#71a7a4"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <circle cx="174" cy="71" r="21" fill="#f1e7d4" />
      <path d="M164 71h20M174 61v20" stroke="#8a5a24" strokeLinecap="round" strokeWidth="6" />
    </svg>
  );
}
