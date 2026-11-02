/**
 * Language version of a file in public/imgs/assets:
 *   localizedAsset("box-leaf-bg.svg", "ar") → "/imgs/assets/box-leaf-bg-ar.svg"
 *   localizedAsset("footer-bg.png", "en")   → "/imgs/assets/footer-bg-en.png"
 * Every asset needs one file per language: name-en.ext and name-ar.ext.
 */
export const localizedAsset = (file: string, locale: string) =>
  `/imgs/assets/${file.replace(/(\.[a-z0-9]+)$/i, `-${locale}$1`)}`;

/** Same, ready for a `style={{ backgroundImage }}` */
export const assetBg = (file: string, locale: string) => `url('${localizedAsset(file, locale)}')`;
