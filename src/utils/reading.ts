/**
 * 粗略阅读时长：中文 400 字/分钟，西文 220 词/分钟。
 * 先把标点、符号、空白全部剔除，否则中文标点会被当成英文单词计数。
 */
export function readingTime(body: string): number {
  const cjk = (body.match(/[\u4e00-\u9fa5]/g) ?? []).length;

  const words = body
    // 去掉汉字、标点、符号、空白后，剩下的才是西文单词
    .replace(/[\u4e00-\u9fa5]/g, ' ')
    .replace(/[\p{P}\p{S}]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  return Math.max(1, Math.round(cjk / 400 + words / 220));
}
