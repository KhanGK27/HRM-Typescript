import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const isAdmin = router.pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
