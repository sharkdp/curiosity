# curiositY

Play it here: [https://shark.fish/curiosity](https://shark.fish/curiosity)

## Build and publish

Run `bash build.sh` to generate the static site in `dist/`. The per-level
`post-build.sh` scripts remove source-only files from the generated output.

Production hosting is managed by [pink-nixos](https://github.com/sharkdp/pink-nixos).
After committing and pushing source changes, update the `curiosity` flake input
in that checkout, review and commit `flake.lock`, then run `./deploy.sh`.
Caddy supplies the custom 404 page and does not enable directory browsing.
