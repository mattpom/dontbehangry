# Don't Be Hangry Affiliate Monetization Audit — September 2026

## Verified baseline
- Amazon Associates tag observed in repository: `dontbehangry-20`.
- Existing Amazon links generally use `rel="noopener sponsored nofollow"`.
- `affiliate-tracking.js` emits Amazon outbound click events.
- Monetization already appears in the Shop and selected editorial articles.

## Corrections and implementation rules
1. Preserve the food-journalism-first identity. Do not add product grids to every editorial article.
2. Use contextual monetization only when a tool, ingredient, cookbook, or experience is a natural next action.
3. Prefer exact Amazon product detail links over search-result links when the exact verified product destination is available.
4. Do not invent ASINs or substitute unverified product destinations.
5. Replace stale displayed prices with neutral language such as “Check current price.”
6. Keep affiliate disclosure clear and adjacent to monetized modules.
7. Normalize analytics to one canonical `affiliate_click` event with merchant, placement, product/destination, page path, and URL; avoid double counting with legacy Amazon event listeners.
8. Maintain `rel="sponsored nofollow noopener"` for merchant links.
9. Keep Deeper Dive articles editorial. A compact contextual “Go Deeper” or related-gear module is preferred to a large storefront block.
10. Do not monetize claims that imply sponsorship, personal use, or testing unless those statements are true and supportable.

## Specific issue discovered
`shop.html` contains Amazon search URLs whose `data-product` and placement labels appear mismatched with the surrounding product copy. These links must be audited individually before production changes. Do not infer the intended ASIN from the current metadata.

## Priority pages
1. Shop
2. High-intent technique/ingredient articles with existing commerce modules
3. USDA beef grades / cooking-equipment context
4. Dashi and ceviche articles with existing product modules
5. Other editorial pages only where reader intent supports a natural commercial next step

## Completion gate
- Verified destinations and tag retained
- No mismatched product metadata/CTA destinations
- No stale price claims
- One measurable affiliate event model
- Disclosure present before/adjacent to monetized modules
- Mobile QA complete
- Editorial identity preserved
