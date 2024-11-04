function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="4" ry="4" fill="black" />

      <text
        x="50%"
        y="50%"
        fill="white"
        fontSize="20"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        P
      </text>
    </svg>
  );
}

export default Logo;
