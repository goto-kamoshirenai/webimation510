import { animations } from "../animations";
import { GalleryGrid } from "../components/GalleryGrid";

export default function Home() {
  return (
    <div className="mt-24-slate-100">
      <GalleryGrid animations={animations} />
    </div>
  );
}
