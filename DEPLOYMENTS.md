# Doc site deployments

As of today, we maintain a few deploy targets for the doc site. This document should serve as a source of truth for them.

## For versions before v8

Before the v8 major version, we didn't deploy a doc site for all the minor and patch versions. Because of that, we only maintain the doc site of the latest version of each major version, pre v8.

These documentation sites are hosted from Netlify, and they don't need to be updated, as we don't backport and fixes to these old versions.

## For versions v8 and after

Starting v8, we started to deploy a doc site for all version of the Base Web library published to npm. On the high level, it works like this:

1. We deploy the doc site to Vercel
2. We create a DNS CNAME record for the versioned doc site on Cloudflare
3. We create an alias in Vercel to the Cloudflare CNAME record

This flow is implemented in [this deploy script](https://github.com/uber/baseweb/blob/master/deploy-versioned-docs.sh). This script is only triggered, when a new version is published to npm.

## Latest

Whenever a new commit lands on master, we deploy the doc site to https://baseweb.design. Because of this, there may be times when a new feature is already shown on the doc site, but it's not available in the latest npm package. Usually, we cut releases every day, so it shouldn't be a big issue.

The configuration for this [lives here](https://github.com/uber/baseweb/blob/master/now.json).
