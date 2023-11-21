echo "Preparing new version"
git add .
git commit -m "Auto-commit: $1 "
echo "Next step after this script should be deploying to Prod or Stage"
cd source
sh ../deploy_update_date.sh
yarn version --patch
git push origin main --tags
echo ""
echo "🚀"
echo ""
