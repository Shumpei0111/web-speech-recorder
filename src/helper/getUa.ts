export function getUserAgent() {
  const ua = window.navigator.userAgent.toLowerCase();

  if (
    ua.indexOf("ipad") !== -1 ||
    (ua.indexOf("macintosh") !== -1 && "ontouchend" in document)
  )
    return "ipad";

  if (ua.indexOf("iphone") !== -1) return "iphone";

  if (ua.indexOf("android") !== -1 && ua.indexOf("mobile") !== -1)
    return "android";

  if (ua.indexOf("mise") !== -1 || ua.indexOf("trident") !== -1) return "ie";

  if (ua.indexOf("edge") !== -1 || ua.indexOf("edg") !== -1) return "edge";

  if (ua.indexOf("opera") !== -1 || ua.indexOf("opr") !== -1) return "opera";

  if (ua.indexOf("chrome") !== -1) return "chrome";

  if (ua.indexOf("crios") !== -1) return "chrome";

  if (ua.indexOf("safari") !== -1) return "safari";

  if (ua.indexOf("firefox") !== -1) return "firefox";

  return "unknown";
}
