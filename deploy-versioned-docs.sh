#!/bin/bash

set -e

# deploy to now the versioned docs site
now --scope=uber-ui-platform --token=$ZEIT_NOW_TOKEN --public --no-clipboard deploy ./public > deployment.txt
deployment=`cat deployment.txt`
cname="${BUILDKITE_TAG//./-}"
curl -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CF_API_KEY" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"$cname.baseweb.design\",\"content\":\"alias.zeit.co\",\"ttl\":1,\"priority\":10,\"proxied\":false}"
now --scope=uber-ui-platform --token=$ZEIT_NOW_TOKEN alias $deployment "$cname.baseweb.design"

