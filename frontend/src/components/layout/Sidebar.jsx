import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Upload,
  MessageSquare,
  ListVideo,
  History,
  User,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/authStore';

const mainLinks = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Upload, label: 'Upload', path: '/upload' },
  { icon: MessageSquare, label: 'Tweets', path: '/tweets' },
  { icon: ListVideo, label: 'Playlists', path: '/playlists' },
];

const userLinks = [
  { icon: History, label: 'History', path: '/history' },
];

const mobileLinks = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Upload, label: 'Upload', path: '/upload' },
  { icon: MessageSquare, label: 'Tweets', path: '/tweets' },
  { icon: ListVideo, label: 'Playlists', path: '/playlists' },
  { icon: History, label: 'History', path: '/history' },
];

export const Sidebar = () => {
  const { user } = useAuthStore();

  return (
    <>
      <aside className="w-64 fixed left-0 top-16 bottom-0 glass border-r border-white/5 hidden lg:block overflow-y-auto z-30">
        <div className="py-4">
          <nav className="flex flex-col gap-1 px-3">
            {mainLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium',
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-textMuted hover:bg-white/5 hover:text-white'
                  )
                }
              >
                <item.icon size={22} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="h-px bg-white/10 my-4 mx-4" />

          <nav className="flex flex-col gap-1 px-3">
            <h3 className="px-4 text-base font-semibold text-white mb-2">You</h3>
            {userLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium',
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-textMuted hover:bg-white/5 hover:text-white'
                  )
                }
              >
                <item.icon size={22} />
                {item.label}
              </NavLink>
            ))}
            {user?.username && (
              <NavLink
                to={`/channel/${user.username}`}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium',
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-textMuted hover:bg-white/5 hover:text-white'
                  )
                }
              >
                <User size={22} />
                Your Channel
              </NavLink>
            )}
          </nav>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around gap-1 border-t border-white/10 bg-[#0f172a]/90 backdrop-blur-xl px-2 py-2 lg:hidden">
        {mobileLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center justify-center rounded-xl px-1 py-2 text-[10px] font-medium transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-textMuted hover:text-white '
              )
            }
          >
            <item.icon size={18} />
            <span className="mt-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};
