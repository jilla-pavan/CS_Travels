# Fonts — drop-in location

The site's `@font-face` rules (`src/styles/fonts.css`) already point at this folder.
Drop the files in and they activate on the next dev-server reload. No code changes.

## Aeonik (primary — commercially licensed, not in this repo)

Licensed from [CoType Foundry](https://cotypefoundry.com/aeonik). It cannot be committed
to source control, which is why it isn't here.

```
public/fonts/Aeonik-Regular.woff2    weight 400
public/fonts/Aeonik-Medium.woff2     weight 500
```

Two weights only. A third is another ~18KB over the wire and the design doesn't need one.
If you receive OTF/TTF files, convert them to WOFF2 first — WOFF2 is roughly 40% smaller
and is the only format the `@font-face` rules reference.

## Satoshi (fallback — free for commercial use)

From [Fontshare](https://fontshare.com/fonts/satoshi). Metrically close to Aeonik, so the
design holds its proportions until the licensed files arrive.

```
public/fonts/Satoshi-Regular.woff2   weight 400
public/fonts/Satoshi-Medium.woff2    weight 500
```

## What happens with neither

The stack falls through to `Aeonik Fallback` — a `local()` face wrapping the system
grotesque (SF Pro / Segoe UI / Roboto) with `size-adjust`, `ascent-override` and
`descent-override` tuned to Aeonik's metrics.

That override is the reason swapping in the real font causes **no layout shift**: the
fallback already occupies the same space. It is also why the current build renders in the
system font rather than something obviously wrong.

`vite build` prints a benign warning for each missing file
(`/fonts/Aeonik-Regular.woff2 ... didn't resolve at build time`). The URLs resolve at
runtime; the warnings disappear once the files are present.
