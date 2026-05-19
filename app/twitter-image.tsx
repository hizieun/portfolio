// Twitter cards use the same image as Open Graph.
// Next.js requires file-convention exports (runtime, size, contentType, alt)
// to be declared statically — they can't be re-exported from another module.
import OG from "./opengraph-image";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "강지은 · AI Engineer Portfolio";

export default OG;
