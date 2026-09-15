(function () {
  var SHOP_DESTINATIONS = {
    'shop-kitchen-lodge': 'https://www.amazon.com/s?k=Lodge+cast+iron+skillet&tag=dontbehangry-20',
    'shop-kitchen-thermometer': 'https://www.amazon.com/s?k=instant+read+meat+thermometer&tag=dontbehangry-20',
    'shop-kitchen-microplane': 'https://www.amazon.com/s?k=Microplane+zester&tag=dontbehangry-20',
    'shop-kitchen-oxo-scraper': 'https://www.amazon.com/s?k=OXO+bench+scraper&tag=dontbehangry-20',
    'shop-books-salt-fat-acid-heat': 'https://www.amazon.com/s?k=Salt+Fat+Acid+Heat+Samin+Nosrat&tag=dontbehangry-20',
    'shop-books-food-lab': 'https://www.amazon.com/s?k=The+Food+Lab+J+Kenji+Lopez+Alt&tag=dontbehangry-20',
    'shop-books-jerusalem': 'https://www.amazon.com/s?k=Jerusalem+Ottolenghi+cookbook&tag=dontbehangry-20',
    'shop-books-momofuku': 'https://www.amazon.com/s?k=Momofuku+David+Chang+cookbook&tag=dontbehangry-20'
  };

  // Repair the legacy Shop GA4 typo without replacing the large HTML file.
  // The page loads G-921K5JGWGR but historically configured G-921K5JhGWGR.
  if (window.location.pathname === '/shop.html' && typeof window.gtag === 'function') {
    window.gtag('config', 'G-921K5JGWGR');
  }

  // Repair legacy Shop links by their stable placement IDs. Search destinations are
  // intentionally used instead of guessing an ASIN that has not been independently verified.
  Object.keys(SHOP_DESTINATIONS).forEach(function (position) {
    var link = document.querySelector('a[data-position="' + position + '"]');
    if (link) link.href = SHOP_DESTINATIONS[position];
  });

  document.querySelectorAll('[data-retired-affiliate="true"]').forEach(function (card) {
    card.style.cursor = 'default';
    var label = card.querySelector('.product-link, .amz-link, .related-btn');
    if (label) label.textContent = 'Product link under review';
  });

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href*="amazon.com/"]');
    if (!link || typeof window.gtag !== 'function') return;

    if (link.dataset.affiliateTracked === 'true') return;
    link.dataset.affiliateTracked = 'true';

    var asinMatch = link.href.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
    window.gtag('event', 'affiliate_click', {
      affiliate_network: 'Amazon Associates',
      affiliate_tag: 'dontbehangry-20',
      link_url: link.href,
      link_text: (link.innerText || link.textContent || '').trim().substring(0, 100),
      product_asin: asinMatch ? asinMatch[1].toUpperCase() : '',
      page_path: window.location.pathname,
      link_position: link.dataset.position || link.dataset.product || '',
      transport_type: 'beacon'
    });
  });
})();
