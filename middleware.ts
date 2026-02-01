import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Lấy mã quốc gia từ header của Vercel
  // Nếu chạy Localhost thì sẽ null, nên fallback về 'VN' (hoặc 'Local') để test
  const country = request.headers.get('x-vercel-ip-country');

  // 2. Gắn header này vào request để gửi xuống Page/API
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-country', country);

  // 3. Tiếp tục xử lý
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Chạy trên mọi trang (trừ file tĩnh)
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};