/* Tools Box — адаптер для Telegram Mini App.
 * Подключается после telegram-web-app.js. Вне Telegram ничего не делает.
 * Что делает в Telegram:
 *  - разворачивает окно и красит шапку в цвет Tools Box;
 *  - window.toolsOpen(url) — открывает ссылку во внешнем браузере (сайты приложений, скачивание APK);
 *  - window.toolsShare(id, title) — поделиться приложением в чате (ссылка ведёт в бота, см. BOT);
 *  - window.TOOLS_START — id приложения из ссылки t.me/<бот>?startapp=<id>.
 */
(function () {
  const BOT = ''; // юзернейм бота без @, например 'toolsbox_app'. Пусто — делимся ссылкой на сайт.
  const SITE = 'https://z0rd4n0v1ch.github.io/tools-box/';
  const BG = '#16181B';
  const W = window.Telegram && window.Telegram.WebApp;
  const inTG = !!(W && W.initData);
  const at = (v) => inTG && W.isVersionAtLeast && W.isVersionAtLeast(v);

  window.TOOLS_TG = inTG ? W : null;
  window.TOOLS_START = null;

  window.toolsOpen = function (url) {
    if (inTG) { try { W.openLink(url); return; } catch (e) {} }
    window.open(url, '_blank', 'noopener');
  };

  window.toolsShare = function (id, title) {
    const link = BOT ? 'https://t.me/' + BOT + '?startapp=' + encodeURIComponent(id) : SITE + '#' + encodeURIComponent(id);
    const text = title + ' — в Tools Box';
    if (inTG) {
      try { W.openTelegramLink('https://t.me/share/url?url=' + encodeURIComponent(link) + '&text=' + encodeURIComponent(text)); return; } catch (e) {}
    }
    if (navigator.share) { navigator.share({ title: title, text: text, url: link }).catch(() => {}); return; }
    try { navigator.clipboard.writeText(link); alert('Ссылка скопирована:\n' + link); } catch (e) { prompt('Ссылка:', link); }
  };

  if (!inTG) return;
  document.documentElement.classList.add('in-tg');
  try { W.ready(); W.expand(); } catch (e) {}
  try { if (at('6.1')) { W.setHeaderColor(BG); W.setBackgroundColor(BG); W.BackButton.hide(); } } catch (e) {}
  try { if (at('7.10')) W.setBottomBarColor(BG); } catch (e) {}
  try { window.TOOLS_START = (W.initDataUnsafe && W.initDataUnsafe.start_param) || null; } catch (e) {}
})();
