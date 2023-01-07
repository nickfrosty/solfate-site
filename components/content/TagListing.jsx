/*
  Quick formatter for displaying a single each of the tag items
*/
export default function TagListing({ tags, maxTagCount = 3 }) {
  // split string `tags` into an array
  if (tags && typeof tags === "string")
    tags = tags.split(",").map((tag) => tag.trim());

  // do nothing when no actual tags are found
  if (!tags?.length) return;

  // construct a reusable function to compute the `href` for tag links
  // const computeHref = (tag) => {
  //   return parseTemplate(config.tagHrefTemplate, {
  //     baseHref: config.baseHref,
  //     tag: generateSlug(tag),
  //   });
  // };

  return (
    <div className="flex">
      {tags?.slice(0, maxTagCount)?.map((tag) => {
        return (
          <span className="tag" key={tag}>
            {tag}
          </span>
        );
        // this site is not ready to handle episode `tag` based routing routing (one day...)
        // return (
        //   <Link href={computeHref(tag)} key={tag}>
        //     <a className="inline-code-link">{tag}</a>
        //   </Link>
        // );
      })}
    </div>
  );
}