# gpd-research.com

The GPD Research website, served by GitHub Pages from the root of `main`. Plain HTML and CSS; edit the pages directly.

Because this is the organization site with the custom domain, every other GPD-Research repo with Pages turned on is served under it too, e.g. https://gpd-research.com/Lambda_CDM/viewer/ (Aeon Horizon), https://gpd-research.com/KKLT_String_Cosmology/src/UI/string_scope.html (StringScope) and https://gpd-research.com/Ptolemaic_model/viewer/ (Geocentric Simulator).

**Cache-busting:** every local script, stylesheet and image an HTML page loads carries `?v=<hash of the file>`, so visitors get changes at once instead of mixing new and cached files. After editing one, run `python tools/stamp_assets.py`; CI fails (`--check`) if a tag is stale.
