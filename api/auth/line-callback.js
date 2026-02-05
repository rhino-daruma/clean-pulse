export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error || !code) {
    return res.json({ status: 'error', message: 'no code', query: req.query });
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
      return res.json({ status: 'token_error', tokenData, env_check: { has_id: !!process.env.LINE_CHANNEL_ID, has_secret: !!process.env.LINE_CHANNEL_SECRET } });
    }

    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: { Authorization: 'Bearer ' + tokenData.access_token },
    });

    const profile = await profileResponse.json();

    return res.json({ status: 'success', profile });

  } catch (err) {
    return res.json({ status: 'catch_error', error: err.message });
  }
}
