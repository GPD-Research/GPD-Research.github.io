// Renders the part of the BMI README between <!-- site:start --> and <!-- site:end -->, read live
// from the repository, so the page follows the theory without a site edit.
(function () {
  const REPO = "https://github.com/GPD-Research/BMI-Synthesis-Lab";
  const RAW = "https://raw.githubusercontent.com/GPD-Research/BMI-Synthesis-Lab/main/README.md";
  const host = document.getElementById("bmi-status");

  function render(md) {
    const math = [];
    const stash = (tex, display) => "@@MATH" + (math.push({ tex, display }) - 1) + "@@";
    md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => stash(t, true))
           .replace(/\$([^$\n]+?)\$/g, (_, t) => stash(t, false));
    let html = window.marked.parse(md);
    html = html.replace(/@@MATH(\d+)@@/g, (_, i) => {
      const m = math[+i];
      return window.katex
        ? window.katex.renderToString(m.tex, { displayMode: m.display, throwOnError: false })
        : m.tex;
    });
    const box = document.createElement("div");
    box.innerHTML = html;
    for (const a of box.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href");
      if (!/^(https?:|mailto:|#)/.test(href)) a.href = `${REPO}/blob/main/${href.replace(/^\.\//, "")}`;
      a.href = a.href.replace("https://gpd-research.com/BMI-Synthesis-Lab/", "/BMI-Synthesis-Lab/");
    }
    host.replaceChildren(...box.childNodes);
  }

  fetch(RAW, { cache: "no-cache" })
    .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
    .then((text) => {
      const m = text.match(/<!-- site:start -->([\s\S]*?)<!-- site:end -->/);
      if (!m) throw new Error("no site section");
      render(m[1]);
    })
    .catch(() => {
      host.innerHTML = `<p class="note">The current status could not be loaded. Read it in the
        <a href="${REPO}#readme">repository README</a>.</p>`;
    });
})();
