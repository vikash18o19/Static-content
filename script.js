async function loadMarkdown() {
  const contentEl = document.getElementById('content');
  const titleEl = document.getElementById('page-title');
  const updatedEl = document.getElementById('last-updated');

  try {
    const res = await fetch('content.md', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status} while fetching content.md`);
    const md = await res.text();

    // Extract first H1 as page title, if present
    const h1Match = md.match(/^#\s+(.+)$/m);
    if (h1Match) {
      titleEl.textContent = h1Match[1].trim();
    }

    // Convert markdown to HTML, then sanitize
    const rawHtml = marked.parse(md, { headerIds: true, mangle: false });
    const safeHtml = DOMPurify.sanitize(rawHtml, { USE_PROFILES: { html: true } });
    contentEl.innerHTML = safeHtml;

    // Show last updated timestamp for content.md if available
    // (This will work locally if the server sends Last-Modified; otherwise we just show now.)
    const lastModified = res.headers.get('Last-Modified');
    const dt = lastModified ? new Date(lastModified) : new Date();
    updatedEl.textContent = `Updated: ${dt.toLocaleString()}`;
  } catch (err) {
    console.error(err);
    contentEl.innerHTML = `<div class="callout"><strong>Oops!</strong> I couldn't load <code>content.md</code>.
    Make sure the file exists at the project root. Error: ${err.message}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', loadMarkdown);
