import NewsEditor from "../editor";
import { saveNews } from "../actions";

export const metadata = { title: "New post" };

export default function NewNewsPage() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-pink-200/60 rounded-2xl shadow-xl shadow-pink-100/50 p-6">
      <h1 className="text-xl font-bold mb-4">New post</h1>
      <NewsEditor action={saveNews} />
    </div>
  );
}
