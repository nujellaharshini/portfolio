# Hash's portfolio

Plain HTML, CSS and JavaScript. No installs, no build step.

## Files

- `index.html`: all the words on the site. Search for `[` to find every placeholder.
- `style.css`: colors, fonts and layout. Colors are at the top in `:root`.
- `main.js`: the phone menu and the sprout animation trigger.
- `resume.pdf`: add your resume here with exactly this name.

## See it on your computer

Double-click `index.html` and it opens in your browser. After editing, save and refresh.

(Optional, nicer: in VS Code install the "Live Server" extension, right-click
`index.html` → "Open with Live Server". It refreshes automatically when you save.)

## Common edits

- **Add a project:** in `index.html`, copy one `<article class="card">…</article>` block in
  the "Research & projects" section and change the text.
- **Move a project from "Currently building" to the harvest:** cut its card from the
  `#now` section, paste it into `#work`, and add the tag/date row like the other cards.
- **Change the accent green:** edit `--leaf` and `--leaf-dark` in `style.css`.
- **Add your Spline scene:** see the comment inside `<div class="hero-scene">` in `index.html`.

## Put it online (GitHub Pages, free)

1. Create a new public repo on GitHub named **`<your-username>.github.io`**.
2. Upload these files (drag and drop on the repo page works), then commit.
3. Go to the repo's **Settings → Pages**. Under "Build and deployment", pick
   **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. In a minute or two the site is live at `https://<your-username>.github.io`.

Every time you push a change, the site updates on its own.

## Use your own domain (optional)

1. Buy or claim a domain (see the note in our chat about the free student one).
2. In the repo: **Settings → Pages → Custom domain**, type your domain
   (e.g. `www.hashnujella.dev`) and save.
3. At your domain registrar, open the DNS settings and add:
   - a **CNAME** record: name `www`, value `<your-username>.github.io`
   - four **A** records for the bare domain (name `@`), pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Wait for DNS to update (minutes to a few hours), then tick **Enforce HTTPS** in
   Settings → Pages. (`.dev` domains only work over HTTPS, so this step matters.)

GitHub's own guide, if anything looks different:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
