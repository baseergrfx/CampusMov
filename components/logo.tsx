import { ImageWithFallback } from './figma/ImageWithFallback';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 max-w-[80px]',
  md: 'h-10 max-w-[120px]',
  lg: 'h-12 max-w-[160px]',
  xl: 'h-16 max-w-[200px]',
};

export function Logo({ size = 'md', className = '' }: LogoProps) {
  // Official CampusMove logo hosted on imgbb
  const logoUrl = 'https://i.ibb.co/Y7XXBsj2/Asset-1-2x.png';
  
  return (
    <ImageWithFallback
      src={logoUrl}
      alt="CampusMove Logo"
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
    />
  );
}