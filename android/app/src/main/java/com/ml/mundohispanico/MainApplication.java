package com.ml.mundohispanico;

import android.app.Application;

import com.PTR.IDFA.IDFAPackage;
import com.brentvatne.react.BuildConfig;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.sbugert.rnadmob.RNAdMobPackage;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNCWebViewPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            //new AdvancedWebViewPackage(),
            new IDFAPackage(),
            new RNFirebasePackage(),
            new RNExitAppPackage(),
            new RNAdMobPackage(),
           // new RNCWebViewPackage(),
           // new ReactVideoPackage(),
            //new VectorIconsPackage(),
           // new AdvancedWebViewPackage(),
//            new IDFAPackage(),
//            new RNFirebasePackage(),
//            new RNExitAppPackage(),
//            new RNAdMobPackage(),
//            new RNCWebViewPackage(),
//            new ReactVideoPackage(),
//            new VectorIconsPackage(),
           // new AdvancedWebViewPackage(),
//            new IDFAPackage(),
//            new RNFirebasePackage(),
//            new RNExitAppPackage(),
//            new RNAdMobPackage(),
//            new RNCWebViewPackage(),
//            new ReactVideoPackage(),
//            new VectorIconsPackage(),
//            new IDFAPackage(),
//            new RNFirebasePackage(),
//            new RNExitAppPackage(),
//            new RNAdMobPackage(),

            new RNFirebaseNotificationsPackage(), // <-- Add this line
            new RNFirebaseMessagingPackage(), // <-- Add this line
            new RNFirebaseAdMobPackage(), // <-- Add this line
            new RNFirebaseRemoteConfigPackage() // <-- Add this line
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
