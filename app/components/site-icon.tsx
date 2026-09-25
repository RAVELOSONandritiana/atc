interface SiteIconProps {
  /** Contenu SVG (paths) au viewBox 24x24, en stroke. */
  markup: string;
  className?: string;
}

export function SiteIcon({ markup, className }: SiteIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
