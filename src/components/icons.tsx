import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.29 7.41a4.34 4.34 0 0 1-1.42 2.15 4.34 4.34 0 0 1-3.72 0 4.34 4.34 0 0 1-1.42-2.15" />
      <path d="M20.5 10.5c0 2.2-1.8 4-4 4s-4-1.8-4-4" />
      <path d="M3.5 10.5c0 2.2 1.8 4 4 4s4-1.8 4-4" />
      <path d="M4 14.5c0-1.25 1.12-2.5 2.5-2.5" />
      <path d="M20 14.5c0-1.25-1.12-2.5-2.5-2.5" />
      <path d="m9 18 1 2" />
      <path d="m15 18-1 2" />
      <path d="M12 21V8" />
      <path d="M7 6c.5-1.5 2-2 3-2" />
      <path d="M14 6c-.5-1.5-2-2-3-2" />
      <path d="M4 18h16" />
    </svg>
  );
}
