# install deps
npm ci --legacy-peer-deps

# build
npm run build

# ensure clean + tested
npm test

# bump version
#npm version patch
#npm version minor
npm version major

# create a git commit + tag
git push origin main --follow-tags