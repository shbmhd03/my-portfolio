// Shared SVG Icon Components
export const NetworkIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9C7.9 1 7 1.9 7 3V9C7 11.2 8.8 13 11 13V15L12.5 13.5C13.3 13.8 14.2 14 15 14H19C20.1 14 21 13.1 21 12V9ZM11 11C10.4 11 10 10.6 10 10S10.4 9 11 9 12 9.4 12 10 11.6 11 11 11ZM15 11C14.4 11 14 10.6 14 10S14.4 9 15 9 16 9.4 16 10 15.6 11 15 11Z"/>
  </svg>
);

export const CloudIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z"/>
  </svg>
);

export const CodeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z"/>
  </svg>
);

export const SecurityIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9 10.2,10V11H13.8V10C13.8,9 12.8,8.2 12,8.2Z"/>
  </svg>
);

export const EmailIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
  </svg>
);

export const WebsiteIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
  </svg>
);

export const LinkedInIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/>
  </svg>
);

export const GitHubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
  </svg>
);

export const RocketIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.81,14.12L5.64,11.29L8.17,10.79C11.39,6.41 17.55,4.22 19.78,4.22C19.78,6.45 17.59,12.61 13.21,15.83L12.71,18.36L9.88,21.19L9.28,17.17L6.83,14.72L2.81,14.12M9.54,11.45C8.76,12.23 8.76,13.5 9.54,14.27C10.31,15.05 11.58,15.05 12.36,14.27C13.14,13.5 13.14,12.23 12.36,11.45C11.58,10.68 10.31,10.68 9.54,11.45M12.31,18.45L14.27,18.45L14.27,20.41L12.31,18.45M5.55,14.72L5.55,12.76L3.59,14.72L5.55,14.72Z"/>
  </svg>
);

export const AnalyticsIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2,2H4V20H22V22H2V2M7,10H17L15.5,7.5L13.5,9.5L9.5,5.5L7,10M20,4V16H6V4H20M21,2H5A1,1 0 0,0 4,3V17A1,1 0 0,0 5,18H21A1,1 0 0,0 22,17V3A1,1 0 0,0 21,2Z"/>
  </svg>
);

export const BriefcaseIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M10 2L8 4V6H5C3.89 6 3 6.89 3 8V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V8C21 6.89 20.1 6 19 6H16V4L14 2H10M10 4H14V6H10V4Z"/>
  </svg>
);

export const HandshakeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 12C9.53 12 10.04 12.21 10.41 12.58L14.17 16.34C15.72 17.89 18.18 17.89 19.73 16.34C21.28 14.79 21.28 12.33 19.73 10.78L14.83 5.88C13.28 4.33 10.82 4.33 9.27 5.88C7.72 7.43 7.72 9.89 9.27 11.44L10.41 12.58C10.78 12.21 11.29 12 11.82 12H12.18C11.64 11.46 11.64 10.54 12.18 10L13.59 8.59C14.37 7.81 15.63 7.81 16.41 8.59C17.19 9.37 17.19 10.63 16.41 11.41L12.65 15.17C12.28 15.54 11.77 15.75 11.24 15.75C10.71 15.75 10.2 15.54 9.83 15.17L8.42 13.76C7.64 12.98 7.64 11.72 8.42 10.94C9.2 10.16 10.46 10.16 11.24 10.94L12.18 11.88C12.72 11.34 12.72 10.46 12.18 9.92L11.24 8.98C9.69 7.43 7.23 7.43 5.68 8.98C4.13 10.53 4.13 12.99 5.68 14.54L7.09 15.95C7.46 16.32 7.97 16.53 8.5 16.53C9.03 16.53 9.54 16.32 9.91 15.95L13.67 12.19C14.45 11.41 15.71 11.41 16.49 12.19C17.27 12.97 17.27 14.23 16.49 15.01L12.73 18.77C11.18 20.32 8.72 20.32 7.17 18.77C5.62 17.22 5.62 14.76 7.17 13.21L8.58 11.8C8.21 11.43 7.7 11.22 7.17 11.22C6.64 11.22 6.13 11.43 5.76 11.8L4.35 13.21C2.8 14.76 2.8 17.22 4.35 18.77C5.9 20.32 8.36 20.32 9.91 18.77L13.67 15.01C14.45 14.23 14.45 12.97 13.67 12.19C12.89 11.41 11.63 11.41 10.85 12.19L7.09 15.95C6.72 16.32 6.21 16.53 5.68 16.53C5.15 16.53 4.64 16.32 4.27 15.95L2.86 14.54C1.31 12.99 1.31 10.53 2.86 8.98C4.41 7.43 6.87 7.43 8.42 8.98L9.36 9.92C9.9 10.46 9.9 11.34 9.36 11.88L8.42 12.82C7.64 13.6 7.64 14.86 8.42 15.64C9.2 16.42 10.46 16.42 11.24 15.64L12.65 14.23C13.02 13.86 13.53 13.65 14.06 13.65C14.59 13.65 15.1 13.86 15.47 14.23L16.88 15.64C17.66 16.42 18.92 16.42 19.7 15.64C20.48 14.86 20.48 13.6 19.7 12.82L16.41 9.53C15.63 8.75 14.37 8.75 13.59 9.53L12.18 10.94C11.64 11.48 11.64 12.36 12.18 12.9L13.12 13.84C13.66 14.38 14.54 14.38 15.08 13.84C15.62 13.3 15.62 12.42 15.08 11.88L14.14 10.94C13.6 10.4 12.72 10.4 12.18 10.94C11.64 11.48 11.64 12.36 12.18 12.9L13.12 13.84C13.66 14.38 14.54 14.38 15.08 13.84C15.62 13.3 15.62 12.42 15.08 11.88L14.14 10.94C13.6 10.4 12.72 10.4 12.18 10.94C11.64 11.48 11.64 12.36 12.18 12.9L13.12 13.84C13.66 14.38 14.54 14.38 15.08 13.84C15.62 13.3 15.62 12.42 15.08 11.88L14.14 10.94C13.6 10.4 12.72 10.4 12.18 10.94Z"/>
  </svg>
);

// Admin Panel Icons
export const PlusIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
  </svg>
);

export const EditIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z"/>
  </svg>
);

export const DeleteIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19Z"/>
  </svg>
);

export const SaveIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15 9H5V5H15M12 19C10.3 19 9 17.7 9 16S10.3 13 12 13 15 14.3 15 16 13.7 19 12 19M17 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3Z"/>
  </svg>
);

export const CancelIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
  </svg>
);

export const DashboardIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 3V9H21V3M13 21H21V11H13M3 21H11V15H3M3 13H11V3H3V13Z"/>
  </svg>
);

export const ProjectIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 19H5V8H19M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M16.53 11.06L15.47 10L10.59 14.88L8.47 12.76L7.41 13.82L10.59 17L16.53 11.06Z"/>
  </svg>
);

export const BlogIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14 17H7V15H14M17 13H7V11H17M17 9H7V7H17M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"/>
  </svg>
);

export const SkillIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H10V2H8V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L12.11 17.11L12.87 15.07Z"/>
  </svg>
);

export const ContactIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9C7.9 1 7 1.9 7 3V9C7 11.2 8.8 13 11 13V15L12.5 13.5C13.3 13.8 14.2 14 15 14H19C20.1 14 21 13.1 21 12V9ZM11 11C10.4 11 10 10.6 10 10S10.4 9 11 9 12 9.4 12 10 11.6 11 11 11ZM15 11C14.4 11 14 10.6 14 10S14.4 9 15 9 16 9.4 16 10 15.6 11 15 11Z"/>
  </svg>
);

export const SettingsIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 15.5C10.07 15.5 8.5 13.93 8.5 12S10.07 8.5 12 8.5S15.5 10.07 15.5 12S13.93 15.5 12 15.5M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.5 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.95C7.96 18.35 8.52 18.68 9.13 18.93L9.5 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.5 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.27 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"/>
  </svg>
);

export const BrainIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.33 12.91C21.42 14.46 20.71 15.95 19.44 16.86L20.21 18.35C20.44 18.8 20.47 19.33 20.27 19.8C20.08 20.27 19.69 20.64 19.21 20.8L18.42 21.05C18.25 21.11 18.06 21.14 17.88 21.14C17.37 21.14 16.89 20.91 16.56 20.5L14.44 18L13.55 19.65C13.22 20.24 12.64 20.64 12 20.64S10.78 20.24 10.45 19.65L9.56 18L7.44 20.5C7.11 20.91 6.63 21.14 6.12 21.14C5.94 21.14 5.75 21.11 5.58 21.05L4.79 20.8C4.31 20.64 3.92 20.27 3.73 19.8C3.53 19.33 3.56 18.8 3.79 18.35L4.56 16.86C3.29 15.95 2.58 14.46 2.67 12.91L2.67 12.9C2.29 12.85 2 12.53 2 12.14V8.86C2 8.47 2.29 8.15 2.67 8.1C2.58 6.55 3.29 5.06 4.56 4.15L3.79 2.66C3.56 2.21 3.53 1.68 3.73 1.21C3.92 0.74 4.31 0.37 4.79 0.21L5.58 -0.04C5.75 -0.1 5.94 -0.13 6.12 -0.13C6.63 -0.13 7.11 0.1 7.44 0.51L9.56 3.01L10.45 1.36C10.78 0.77 11.36 0.37 12 0.37S13.22 0.77 13.55 1.36L14.44 3.01L16.56 0.51C16.89 0.1 17.37 -0.13 17.88 -0.13C18.06 -0.13 18.25 -0.1 18.42 -0.04L19.21 0.21C19.69 0.37 20.08 0.74 20.27 1.21C20.47 1.68 20.44 2.21 20.21 2.66L19.44 4.15C20.71 5.06 21.42 6.55 21.33 8.1C21.71 8.15 22 8.47 22 8.86V12.14C22 12.53 21.71 12.85 21.33 12.9L21.33 12.91M12 3C9.79 3 8 4.79 8 7S9.79 11 12 11 16 9.21 16 7 14.21 3 12 3Z"/>
  </svg>
);

// Missing Contact Form Icons
export const LightbulbIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 21C9 22.1 9.9 23 11 23H13C14.1 23 15 22.1 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2Z"/>
  </svg>
);

export const QuestionMarkIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11 17H13V19H11V17ZM12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8S14 8.9 14 10C14 10.88 13.5 11.87 12.97 12.75C12.5 13.5 12 14.5 12 16H14C14 15.12 14.5 14.13 15.03 13.25C15.5 12.5 16 11.5 16 10C16 7.79 14.21 6 12 6Z"/>
  </svg>
);

export const TargetIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16ZM12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10Z"/>
  </svg>
);

// Missing Blog Section Icons
export const BookOpenIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20.2 6.5 20.2C8.45 20.2 10.55 20.6 12 21.5C13.35 20.65 15.8 20.2 17.5 20.2C19.15 20.2 20.85 20.4 22.25 21.1C22.35 21.15 22.4 21.15 22.5 21.15C22.75 21.15 23 20.9 23 20.65V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.45 12 19.3V8C13.35 7.15 15.8 6.7 17.5 6.7C18.7 6.7 19.9 6.85 21 7.2V18.5Z"/>
  </svg>
);

export const NewsletterIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 6L9 17L4 12L5.41 10.59L9 14.17L18.59 4.59L20 6ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V7H19V19Z"/>
  </svg>
);

export const TrendingUpIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"/>
  </svg>
);

// AI Bot Icon - Modern Robot with Neural Network Design
export const RobotIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <defs>
      <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="50%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    {/* Robot head */}
    <rect x="7" y="4" width="10" height="8" rx="2" fill="url(#robotGradient)" opacity="0.9"/>
    {/* Antenna */}
    <circle cx="12" cy="2" r="1" fill="url(#robotGradient)"/>
    <line x1="12" y1="3" x2="12" y2="4" stroke="url(#robotGradient)" strokeWidth="2"/>
    {/* Eyes with glow effect */}
    <circle cx="10" cy="7" r="1.5" fill="#00f5ff" opacity="0.9"/>
    <circle cx="14" cy="7" r="1.5" fill="#00f5ff" opacity="0.9"/>
    <circle cx="10" cy="7" r="0.8" fill="#ffffff"/>
    <circle cx="14" cy="7" r="0.8" fill="#ffffff"/>
    {/* Neural network pattern in head */}
    <path d="M8 9 L10 10 L12 9 L14 10 L16 9" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" fill="none"/>
    <path d="M9 10 L11 11 L13 10 L15 11" stroke="#ffffff" strokeWidth="0.5" opacity="0.4" fill="none"/>
    {/* Body */}
    <rect x="8" y="12" width="8" height="6" rx="1" fill="url(#robotGradient)" opacity="0.8"/>
    {/* Body details */}
    <circle cx="10" cy="15" r="0.8" fill="#00f5ff" opacity="0.7"/>
    <circle cx="14" cy="15" r="0.8" fill="#00f5ff" opacity="0.7"/>
    <rect x="11" y="16" width="2" height="1" fill="#ffffff" opacity="0.6"/>
    {/* Arms */}
    <rect x="5" y="13" width="2" height="4" rx="1" fill="url(#robotGradient)" opacity="0.7"/>
    <rect x="17" y="13" width="2" height="4" rx="1" fill="url(#robotGradient)" opacity="0.7"/>
    {/* Legs */}
    <rect x="9" y="18" width="2" height="3" rx="1" fill="url(#robotGradient)" opacity="0.7"/>
    <rect x="13" y="18" width="2" height="3" rx="1" fill="url(#robotGradient)" opacity="0.7"/>
    {/* Energy pattern around robot */}
    <circle cx="12" cy="12" r="11" fill="none" stroke="url(#robotGradient)" strokeWidth="0.5" opacity="0.2" strokeDasharray="2,3"/>
  </svg>
);

export const ChatBotIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.5 12C17.5 16.69 13.64 20.5 8.83 20.5C4.18 20.5 0.5 16.69 0.5 12C0.5 7.31 4.18 3.5 8.83 3.5C13.64 3.5 17.5 7.31 17.5 12ZM8.83 5C5.24 5 2.5 7.86 2.5 12C2.5 16.14 5.24 19 8.83 19C12.58 19 15.5 16.14 15.5 12C15.5 7.86 12.58 5 8.83 5ZM7 10.5C7 11.33 6.33 12 5.5 12C4.67 12 4 11.33 4 10.5C4 9.67 4.67 9 5.5 9C6.33 9 7 9.67 7 10.5ZM14 10.5C14 11.33 13.33 12 12.5 12C11.67 12 11 11.33 11 10.5C11 9.67 11.67 9 12.5 9C13.33 9 14 9.67 14 10.5ZM12 15.5C12 14.12 10.88 13 9.5 13C8.12 13 7 14.12 7 15.5H12ZM22 12C22 17.5 17.5 22 12 22C10.73 22 9.5 21.77 8.36 21.34C8.07 21.22 7.73 21.31 7.55 21.56L6 23.5C5.45 24.16 4.5 24.38 3.72 24C3.33 23.84 3 23.5 3 23C3 22.45 3.45 22 4 22H6C6.55 22 7 21.55 7 21C7 20.45 6.55 20 6 20C4.9 20 4 19.1 4 18V15.5C4 14.4 4.9 13.5 6 13.5C6.55 13.5 7 13.05 7 12.5C7 11.95 6.55 11.5 6 11.5C4.9 11.5 4 10.6 4 9.5V7C4 5.9 4.9 5 6 5H18C19.1 5 20 5.9 20 7V17C20 18.1 19.1 19 18 19H16C15.45 19 15 19.45 15 20C15 20.55 15.45 21 16 21H18C20.21 21 22 19.21 22 17V12Z"/>
  </svg>
);

export const AIAssistantIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.1 7 14 7.9 14 9C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9C10 7.9 10.9 7 12 7ZM12 15C9.79 15 8 13.21 8 11H9C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11H16C16 13.21 14.21 15 12 15Z"/>
  </svg>
);

export const UserIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <defs>
      <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    {/* User head/face */}
    <circle cx="12" cy="8" r="4" fill="url(#userGradient)" opacity="0.9"/>
    {/* Eyes */}
    <circle cx="10.5" cy="7.5" r="0.8" fill="#ffffff"/>
    <circle cx="13.5" cy="7.5" r="0.8" fill="#ffffff"/>
    <circle cx="10.5" cy="7.5" r="0.4" fill="#1f2937"/>
    <circle cx="13.5" cy="7.5" r="0.4" fill="#1f2937"/>
    {/* Smile */}
    <path d="M10 9.5 Q12 11 14 9.5" stroke="#ffffff" strokeWidth="1" fill="none" strokeLinecap="round"/>
    {/* Body */}
    <path d="M6 20 C6 16 8.5 14 12 14 C15.5 14 18 16 18 20 Z" fill="url(#userGradient)" opacity="0.8"/>
    {/* Aura effect */}
    <circle cx="12" cy="12" r="10" fill="none" stroke="url(#userGradient)" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,4"/>
  </svg>
);

// Additional Admin Panel Icons
export const UsersIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 4A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"/>
  </svg>
);

export const LockIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
  </svg>
);

export const TrashIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
  </svg>
);

export const CheckIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
  </svg>
);

export const CloseIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
  </svg>
);

export const KeyIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 14A3 3 0 0 0 10 17A3 3 0 0 0 13 14A3 3 0 0 0 10 11A3 3 0 0 0 7 14M12.65 10A5.5 5.5 0 0 1 15.5 14A5.5 5.5 0 0 1 10 19.5A5.5 5.5 0 0 1 4.5 14A5.5 5.5 0 0 1 10 8.5A5.5 5.5 0 0 1 12.65 10M14 6V8H19V9L22 7L19 5V6H14Z"/>
  </svg>
);

export const SendIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
  </svg>
);

// Theme Toggle Icons
export const SunIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z"/>
  </svg>
);

export const MoonIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z"/>
  </svg>
);
