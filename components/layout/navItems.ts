import type { SvgIconComponent } from '@mui/icons-material';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import MenuBookRounded from '@mui/icons-material/MenuBookRounded';
import QueryStatsRounded from '@mui/icons-material/QueryStatsRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import SpellcheckRounded from '@mui/icons-material/SpellcheckRounded';

export interface NavItem {
  label: string;
  href: string;
  icon: SvgIconComponent;
  available: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: DashboardRounded, available: true },
  { label: 'Lessons', href: '/lessons', icon: MenuBookRounded, available: true },
  { label: 'BST Playground', href: '/playground', icon: AccountTreeRounded, available: false },
  { label: 'Achievements', href: '/achievements', icon: EmojiEventsRounded, available: true },
  { label: 'Glossary', href: '/glossary', icon: SpellcheckRounded, available: true },
  { label: 'Progress', href: '/progress', icon: QueryStatsRounded, available: true },
  { label: 'Settings', href: '/settings', icon: SettingsRounded, available: true },
];
