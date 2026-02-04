export default async function handler(req, res) {
  const { code, state, error } = req.query;

  // LINEからエラーが返された場合
  if (error) {
    return res.redirect('/?auth=error&message=' + encodeURIComponent('LINEログインがキャンセルされました'));
  }

  if (!code) {
    return res.redirect('/?auth=error&message=' + encodeURIComponent('認証コードが見つかりません'));
  }

  try {
    // 1. 認証コードをアクセストークンに交換
    const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${baseUrl}/api/auth/line-callback`,
        client_id: process.env.LINE_CHANNEL_ID,
        client_secret: process.env.LINE_CHANNEL_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error('Token exchange failed:', tokenData);
      return res.redirect('/?auth=error&message=' + encodeURIComponent('トークン取得に失敗しました'));
    }

    // 2. LINEプロフィール取得
    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileResponse.json();

    if (!profile.userId) {
      console.error('Profile fetch failed:', profile);
      return res.redirect('/?auth=error&message=' + encodeURIComponent('プロフィール取得に失敗しました'));
    }

    // 3. フロントエンドにリダイレクト（プロフィール情報付き）
    const params = new URLSearchParams({
      auth: 'success',
      line_id: profile.userId,
      line_name: profile.displayName,
      line_picture: profile.pictureUrl || '',
    });

    res.redirect(`/?${params.toString()}`);

  } catch (err) {
    console.error('LINE auth error:', err);
    res.redirect('/?auth=error&message=' + encodeURIComponent('認証処理中にエラーが発生しました'));
  }
}
