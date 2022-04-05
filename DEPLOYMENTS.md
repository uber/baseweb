# Doc site deployments

As of today, we maintain a few deploy targets for the doc site. This document should serve as a source of truth for them.

Whenever a new commit lands on master, we deploy the doc site to https://baseweb.design. Because of this, there may be times when a new feature is already shown on the doc site, but it's not available in the latest npm package. Usually, we cut releases every day, so it shouldn't be a big issue.

The configuration for this [lives here](https://github.com/uber/baseweb/blob/master/now.json).

The domain and docs are hosted at Cloudflare. All deployments logs can be found [here](https://t.uber.com/baseweb-cloudflare-pages).

To setup a custom subdomain for older version of docs, you have to add the custom domain [here](https://t.uber.com/baseweb-cloudflare-page-domain) and update the DNS record to match the branch name [here](https://t.uber.com/baseweb-cloudflare-dns).
