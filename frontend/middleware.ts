import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token || !token.value) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/app/:path*'],
};
