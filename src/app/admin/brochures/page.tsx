"use client";

import { useState } from "react";

export default function BrochureUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState<string>(""); 
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setUrl("");
    if (!file) { setError("Please select a PDF file."); return; }
    const fd = new FormData();
    fd.append("file", file);
    if (slug) fd.append("slug", slug);
    setLoading(true);
    try {
      const res = await fetch("/api/upload-brochure", { method: "POST", body: fd });
      const data = await res.json();
      if (data.ok) {
        setUrl(data.url);
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl rounded-2xl border bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold">Upload brochure (PDF)</h1>
        <p className="mt-1 text-sm text-slate-600">
          After upload, copy the URL and paste it into <code>lib/institutes.ts</code> as <code>brochureUrl</code>.
        </p>

        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Institute slug (optional)</label>
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. gachon-kli"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">PDF file</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-slate-900 px-4 py-2 text-white"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

        {url && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium">Public URL</p>
            <pre className="mt-1 overflow-x-auto rounded bg-white p-2 text-xs">{url}</pre>

            <p className="mt-3 text-sm font-medium">Snippet for lib/institutes.ts</p>
            <pre className="mt-1 overflow-x-auto rounded bg-white p-2 text-xs">{`brochureUrl: "${url}"`}</pre>
          </div>
        )}
      </div>
    </main>
  );
}

