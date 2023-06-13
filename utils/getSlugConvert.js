export default function slugConvert(link) {
  const slug_with_query = link.replace("https://www.90min.com/posts/", "");
  return slug_with_query.replace("?utm_source=RSS", "");
}
