import Avatar from '../ui/Avatar';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface TopBarProps {
  breadcrumbs?: Breadcrumb[];
  userName?: string;
  userAvatar?: string;
}

export default function TopBar({
  breadcrumbs = [],
  userName = 'Expert',
  userAvatar,
}: TopBarProps) {
  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-border bg-surface-0">
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-text-muted">/</span>}
            {crumb.href ? (
              <a href={crumb.href} className="text-text-secondary hover:text-text-primary transition-colors">
                {crumb.label}
              </a>
            ) : (
              <span className="text-text-primary font-medium">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Avatar name={userName} src={userAvatar} size="sm" />
        <span className="text-sm text-text-secondary hidden sm:block">{userName}</span>
      </div>
    </header>
  );
}
