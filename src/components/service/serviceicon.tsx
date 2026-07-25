"use client";

import React from "react";
import { ServiceIconProps } from "./service";

const icons: Record<string, React.ReactNode>={
  "custom-software":(
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" strokeWidth="1.5" fill="none"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5" strokeWidth="1.5" fill="none"/>
      <rect x="3" y="13" width="8" height="8" rx="1.5" strokeWidth="1.5" fill="none"/>
      <path d="M13 17h8M17 13v8" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5.5 7l2 2 3.5-3.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </> 
    
  ),
  "web-app":(
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.5" fill="none"/>
      <path d="M2 9h20" strokeWidth="1.5"/>
      <circle cx="5.5" cy="6.5" r="0.9" fill="currentColor"/>
      <circle cx="8.5" cy="6.5" r="0.9" fill="currentColor"/>
      <circle cx="11.5" cy="6.5" r="0.9" fill="currentColor"/>
      <path d="M7 14l2.5 2.5L7 19M12 19h5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  "mobile-app":(
    <>
      <rect x="7" y="2" width="10" height="20" rx="2.5" strokeWidth="1.5" fill="none"/>
      <path d="M7 6h10M7 18h10" strokeWidth="1.5"/>
      <circle cx="12" cy="20.5" r="0.8" fill="currentColor"/>
      <rect x="10" y="9.5" width="4" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="10" y="12.5" width="4" height="1.5" rx="0.75" fill="currentColor"/>
    </>
  ),
  api:(
    <>
      <path d="M4 7h4M4 12h4M4 17h4" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 7l3.5 5-3.5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M16 7h4M16 12h4M16 17h4" strokeWidth="1.5" strokeLinecap="round"/>
    </>
  ),
  cloud:(
    <>
      <path d="M17.5 10.5h-1A6.5 6.5 0 1 0 9 19h8.5a4.5 4.5 0 0 0 0-9z" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M12 12.5v4M10.5 15l1.5 1.5 1.5-1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  design:(
    <>
      <circle cx="12" cy="12" r="3.5" strokeWidth="1.5" fill="none" />
      <path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.4 5.4l1.8 1.8M16.8 16.8l1.8 1.8M5.4 18.6l1.8-1.8M16.8 7.2l1.8-1.8" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  ecommerce:(
    <>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M3 6h18" strokeWidth="1.5" />
      <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </>
  ),
  saas:(
    <>
      <ellipse cx="12" cy="5.5" rx="8.5" ry="3" strokeWidth="1.5" fill="none"/>
      <path d="M20.5 12c0 1.66-3.8 3-8.5 3s-8.5-1.34-8.5-3" strokeWidth="1.5" fill="none"/>
      <path d="M3.5 5.5v13c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3v-13" strokeWidth="1.5" fill="none"/>
    </>
  ),
  support: (
    <>
      <path d="M12 21s8-4 8-10V5.5l-8-3-8 3V11c0 6 8 10 8 10z" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M9.5 12l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};
export const ServiceIcon: React.FC<ServiceIconProps> = ({name,className = ""}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {icons[name] ?? <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>}
  </svg>
);
export default ServiceIcon;