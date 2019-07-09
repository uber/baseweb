#!/bin/bash

set -e

apt-get update
apt-get install -y jq

this_commit=$(echo $BUILDKITE_COMMIT | tr -d '"')
tags=$(curl https://api.github.com/repos/uber-web/baseui/git/refs/tags?access_token=${GITHUB_AUTH_TOKEN})
latest_tagged_commit=$(echo $tags | jq '.[-1].object.sha' | tr -d '"')

echo this commit: $this_commit
echo latest tagged commit: $latest_tagged_commit

if [ "$this_commit" = "$latest_tagged_commit" ]; then
  echo current commit matches latest tagged commit
  echo deploying to now

  $deployment=`cat deployment.txt`
  cname="${deployment//./-}"
  now --scope=uber-ui-platform --token=$ZEIT_NOW_TOKEN --public --no-clipboard deploy ./public > deployment.txt
  now --scope=uber-ui-platform --token=$ZEIT_NOW_TOKEN alias $deployment "$latest_tagged_commit.baseweb.design"
  curl -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
     -H "X-Auth-Email: $CF_AUTH_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data "{\"type\":\"CNAME\",\"name\":\"$latest_tagged_commit.baseweb.design\",\"content\":\"alias.zeit.co\",\"ttl\":1,\"priority\":10,\"proxied\":false}"
else
  echo current commit does not match latest tagged commit
  echo exited without deploying to now
fi
