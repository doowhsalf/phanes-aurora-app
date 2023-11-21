# cp stuff to Ios resourse projects 
here=`pwd`
cd ../../
root=`pwd`
source=$root'/jupiter/src'
images=$root'/jupiter/src/images'
ios_splash=$root'/jupiter/ios/Jupiter/Images.xcassets/LaunchScreen.imageset'
ios_icons=$root'/jupiter/ios/Jupiter/Images.xcassets/AppIcon.appiconset'
echo 'root: '$root
echo "here: $here"
echo "source: $source"
echo "images: $images"
cd $here
pwd
cd $source
pwd
ls -l
cd $images
cd images

ls -l

echo 'Copy to image folder'
cd $images
cp -a $here/resources/*.png .

echo 'Copy to ios splash-screen'
cp -a $here/resources/splashes/splash-2000x3000.png $ios_splash

echo 'Copy to ios icons'
cp -a $here/resources/icons/*.png $ios_icons

# cp -af ./resources/icons/android_xxxhdpi.png android_res/mipmap-xxxhdpi/ic_launcher.png

# cp -af ./resources/icons/android_xxhdpi.png android_res/mipmap-xxhdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_xxhdpi.png android_res/mipmap-xxhdpi/ic_launcher.png

# cp -af ./resources/icons/android_xhdpi.png android_res/mipmap-xhdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_xhdpi.png android_res/mipmap-xhdpi/ic_launcher.png

# cp -af ./resources/icons/android_mdpi.png android_res/mipmap-mdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_mdpi.png android_res/mipmap-mdpi/ic_launcher.png

# cp -af ./resources/icons/android_hdpi.png android_res/mipmap-hdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_hdpi.png android_res/mipmap-hdpi/ic_launcher.png
echo 'Done'
# scripts/assets-img-generator/resources/splashes
# /Users/doowwood/codestuff/tri.jupiter/applications/jupiter_app/jupiter/ios/Jupiter/Images.xcassets/LaunchScreen.imageset jupiter/ios/Jupiter/Images.xcassets/AppIcon.appiconset
