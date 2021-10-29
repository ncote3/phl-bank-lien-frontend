import Fuse from "fuse.js";

export default function fuzzyMatchProperties(
  term: string,
  data: any,
  result_length: number
): any {
  const options = {
    includeScore: true,
  };
  const fuse = new Fuse(data, options);
  let result = fuse.search(term);
  if (result.length > result_length) {
    result = result.slice(0, result_length);
  }
  return result;
}
