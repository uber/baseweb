# Stable Version

Run

```
npm version major
npm version minor
npm version patch
```

commit and merge into `main`. The CI will publish the new version to npm automatically if `package.json` version is higher than the one in the registry.

# Next Version

Every `main` branch commit gets automatically published to npm with `next` tag and `0.0.0-next-df279c1e7` version where `df279c1e7` is the short commit hash.
