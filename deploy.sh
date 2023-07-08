echo "Switching to branch master"
git checkout master

echo "Pulling updates"
git pull origin master

echo "Building production version"
npm run build

echo "Deploying on server"
scp -rpO -P 9011 dist/* wil1i@45.156.184.209:/var/www/RepairProject-BackEnd