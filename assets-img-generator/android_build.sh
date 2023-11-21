# Generate android icon structure
here=`pwd`
cd ../../
root=`pwd`
source=$root'/jupiter/src'
resources=$root'/jupiter/android/app/src/main/res'
cd $here

cp -af ./resources/icons/android_xxxhdpi.png $resources/mipmap-xxxhdpi/ic_launcher_round.png
cp -af ./resources/icons/android_xxxhdpi.png $resources/mipmap-xxxhdpi/ic_launcher.png

cp -af ./resources/icons/android_xxhdpi.png $resources/mipmap-xxhdpi/ic_launcher_round.png
cp -af ./resources/icons/android_xxhdpi.png $resources/mipmap-xxhdpi/ic_launcher.png

cp -af ./resources/icons/android_xhdpi.png $resources/mipmap-xhdpi/ic_launcher_round.png
cp -af ./resources/icons/android_xhdpi.png $resources/mipmap-xhdpi/ic_launcher.png

cp -af ./resources/icons/android_mdpi.png $resources/mipmap-mdpi/ic_launcher_round.png
cp -af ./resources/icons/android_mdpi.png $resources/mipmap-mdpi/ic_launcher.png

cp -af ./resources/icons/android_hdpi.png $resources/mipmap-hdpi/ic_launcher_round.png
cp -af ./resources/icons/android_hdpi.png $resources/mipmap-hdpi/ic_launcher.png




# mkdir -p android_res/mipmap-xxxhdpi
# mkdir -p android_res/mipmap-xxhdpi
# mkdir -p android_res/mipmap-xhdpi
# mkdir -p android_res/mipmap-mdpi
# mkdir -p android_res/mipmap-hdpi

# cp -af ./resources/icons/android_xxxhdpi.png android_res/mipmap-xxxhdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_xxxhdpi.png android_res/mipmap-xxxhdpi/ic_launcher.png

# cp -af ./resources/icons/android_xxhdpi.png android_res/mipmap-xxhdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_xxhdpi.png android_res/mipmap-xxhdpi/ic_launcher.png

# cp -af ./resources/icons/android_xhdpi.png android_res/mipmap-xhdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_xhdpi.png android_res/mipmap-xhdpi/ic_launcher.png

# cp -af ./resources/icons/android_mdpi.png android_res/mipmap-mdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_mdpi.png android_res/mipmap-mdpi/ic_launcher.png

# cp -af ./resources/icons/android_hdpi.png android_res/mipmap-hdpi/ic_launcher_round.png
# cp -af ./resources/icons/android_hdpi.png android_res/mipmap-hdpi/ic_launcher.png



# mipmap-xxxhdpi
# ic_launcher_round.png
# ic_launcher.png
# mipmap-xxhdpi
# ic_launcher_round.png
# ic_launcher.png
# mipmap-xhdpi
# ic_launcher_round.png
# ic_launcher.png
# mipmap-mdpi
# ic_launcher_round.png
# ic_launcher.png
# mipmap-hdpi
# ic_launcher_round.png
# ic_launcher.png