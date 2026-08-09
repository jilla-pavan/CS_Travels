import { useMemo } from "react";
import { useParams } from "react-router-dom";
import PackageDetails from "../components/PackageDetails";
import NotFound from "./NotFound";
import { getPackageBySlug } from "../data/tourPackages";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { schemaForPackage } from "../lib/schema";

/**
 * Package detail page.
 *
 * The slug comes from the route rather than being parsed out of the hash. An
 * unknown slug renders the 404 page — the old build returned `null`, leaving a
 * blank strip between the nav and the footer with no indication anything had
 * gone wrong.
 */
export default function PackageDetail() {
  const { slug } = useParams();
  const pkg = getPackageBySlug(slug);

  const schema = useMemo(() => schemaForPackage(pkg), [pkg]);

  useDocumentMeta({
    title: pkg
      ? `${pkg.title} — ${pkg.subtitle} | CS Travels Tirupati`
      : "Package not found | CS Travels Tirupati",
    description: pkg?.description,
    schema,
  });

  if (!pkg) return <NotFound />;

  return <PackageDetails pkg={pkg} />;
}
