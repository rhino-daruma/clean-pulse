export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error || !code) {
    return res.redirect('/?auth=error&message=' + encodeURIComponent('LINEログインがキャンセルされました'));
  }

  try {
    const baseUrl = 'https://clean-pulse.vercel.app';

    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: baseUrl + '/api/auth/line-callback',
        client_id: process.env.LINE_CHANNEL_ID,
        client_secret: process.env.LINE_CHANNEL_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.redirect('/?auth=error&message=' + encodeURIComponent('トークン取得に失敗しました'));
    }

    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: { Authorization: 'Bearer ' + tokenData.access_token },
    });

    const profile = await profileResponse.json();

    if (!profile.userId) {
      return res.redirect('/?auth=error&message=' + encodeURIComponent('プロフィール取得に失敗しました'));
    }

    const params = new URLSearchParams({
      auth: 'success',
      line_id: profile.userId,
      line_name: profile.displayName,
      line_picture: profile.pictureUrl || '',
    });

    res.redirect('/?' + params.toString());

  } catch (err) {
    res.redirect('/?auth=error&message=' + encodeURIComponent('認証処理中にエラーが発生しました'));
  }
}
