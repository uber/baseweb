#!/bin/bash

set -e

yarn global add now@16.5.2

# deploy to now the versioned docs site
FORCE_EXTRACT_REACT_TYPES=true yarn documentation:build
now --scope=uber-ui-platform --token=$ZEIT_NOW_TOKEN --public --no-clipboard deploy ./public > deployment.txt
deployment=`cat deployment.txt`
version=$(echo $BUILDKITE_MESSAGE | cut -d' ' -f 2)
cname="${version//./-}"
echo $deployment
curl -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CF_API_KEY" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"$cname.baseweb.design\",\"content\":\"cname.vercel-dns.com\",\"ttl\":1,\"priority\":10,\"proxied\":false}"
now --scope=uber-ui-platform --token=$ZEIT_NOW_TOKEN alias $deployment "$cname.baseweb.design"

