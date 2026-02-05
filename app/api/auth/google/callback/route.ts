import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/google/callback`
)

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
        return NextResponse.json({ error: `OAuth error: ${error}` }, { status: 400 })
    }

    if (!code) {
        return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 })
    }

    try {
        // Exchange authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code)

        // Return the tokens (especially refresh_token)
        return new NextResponse(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>OAuth Success</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        background: #1a1a2e; 
                        color: white; 
                        padding: 40px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    h1 { color: #4ade80; }
                    .token-box {
                        background: #16213e;
                        padding: 20px;
                        border-radius: 8px;
                        margin: 20px 0;
                        word-break: break-all;
                    }
                    .label { color: #94a3b8; margin-bottom: 8px; }
                    .value { 
                        background: #0f3460; 
                        padding: 10px; 
                        border-radius: 4px;
                        font-family: monospace;
                        font-size: 12px;
                    }
                    .warning { 
                        background: #7c2d12; 
                        padding: 15px; 
                        border-radius: 8px;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>✅ OAuth Authorization Successful!</h1>
                
                <div class="token-box">
                    <div class="label">Access Token:</div>
                    <div class="value">${tokens.access_token || 'N/A'}</div>
                </div>
                
                <div class="token-box">
                    <div class="label">Refresh Token (SAVE THIS!):</div>
                    <div class="value">${tokens.refresh_token || 'No refresh token - you may already have one'}</div>
                </div>
                
                <div class="token-box">
                    <div class="label">Token Type:</div>
                    <div class="value">${tokens.token_type || 'N/A'}</div>
                </div>
                
                <div class="token-box">
                    <div class="label">Expiry Date:</div>
                    <div class="value">${tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : 'N/A'}</div>
                </div>
                
                <div class="warning">
                    <strong>⚠️ Important:</strong> Copy the <strong>Refresh Token</strong> above and add it to your Vercel Environment Variables as <code>GOOGLE_OAUTH_REFRESH_TOKEN</code>. Then redeploy your app.
                </div>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' }
        })

    } catch (err: any) {
        console.error('Token exchange error:', err)
        return NextResponse.json(
            { error: 'Failed to exchange code for tokens', details: err?.message },
            { status: 500 }
        )
    }
}
