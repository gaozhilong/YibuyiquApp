# Cordova Android Status Bar disabler

> Plugin that simply disable status bar on Android device

## Using
Clone the plugin

    $ git clone https://github.com/bazzooka/android-status-bar-disabler.git

    
Install the plugin

    $ cd <your project directory>
    $ cordova plugin add ../android-status-bar-disabler


Configure your project

    Update your AndroidManifest.xml with : 
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    

Install Android platform

    phonegap add ../android-status-bar-disabler
    phonegap build android
    phonegap run android
    

## More Info

For more information on setting up Cordova see [the documentation](http://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html#The%20Command-Line%20Interface)

For more info on plugins see the [Plugin Development Guide](http://cordova.apache.org/docs/en/4.0.0/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide)
