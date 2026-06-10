"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { NewsPost } from "@/db/schema";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function NewsEditor({
  post,
  action,
}: {
  post?: NewsPost;
  action: (formData: FormData) => Promise<void>;
}) {
  const [content, setContent] = useState(post?.contentMd ?? "");

  return (
    <form action={action} className="flex flex-col gap-4" data-color-mode="light">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="contentMd" value={content} />

      <div className="flex flex-wrap gap-3 items-end">
        <label className="form-control flex-1 min-w-60">
          <span className="label-text text-xs mb-1">Title</span>
          <input
            name="title"
            type="text"
            required
            defaultValue={post?.title}
            className="input input-sm input-bordered w-full"
          />
        </label>
        <label className="label cursor-pointer gap-2">
          <input type="checkbox" name="pinned" defaultChecked={post?.pinned} className="toggle toggle-sm toggle-primary" />
          <span className="label-text text-sm">Pinned</span>
        </label>
      </div>

      <label className="form-control">
        <span className="label-text text-xs mb-1">Summary (shown in cards and Discord)</span>
        <textarea
          name="summary"
          rows={2}
          defaultValue={post?.summary}
          className="textarea textarea-sm textarea-bordered w-full"
        />
      </label>

      <div className="flex flex-wrap gap-3 items-end">
        <label className="form-control flex-1 min-w-60">
          <span className="label-text text-xs mb-1">Cover image URL</span>
          <input
            name="coverUrl"
            type="text"
            defaultValue={post?.coverUrl ?? ""}
            placeholder="https://… or upload below"
            className="input input-sm input-bordered w-full"
          />
        </label>
        <label className="form-control">
          <span className="label-text text-xs mb-1">Upload cover</span>
          <input name="cover" type="file" accept="image/*" className="file-input file-input-sm file-input-bordered" />
        </label>
      </div>

      <MDEditor value={content} onChange={(v) => setContent(v ?? "")} height={420} />

      <div className="flex justify-end">
        <button type="submit" className="btn bg-linear-to-r from-pink-500 to-sky-500 border-none text-white">
          Save
        </button>
      </div>
    </form>
  );
}
