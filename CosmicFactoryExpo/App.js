import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Platform, AppState } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState, useRef, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import gameHtml from './assets/gameHtml';

const SAVE_KEY = 'cosmicFactory_v5';

// ═══════════════ EXPO GO KONTROLÜ ═══════════════
const isExpoGo = Constants.appOwnership === 'expo';

// Reklamlar sadece gerçek build'de yüklenir (Expo Go'da çalışmaz)
let InterstitialAd, RewardedAd, AdEventType, RewardedAdEventType, TestIds, mobileAds;
if (!isExpoGo) {
  try {
    const adMod = require('react-native-google-mobile-ads');
    InterstitialAd = adMod.InterstitialAd;
    RewardedAd = adMod.RewardedAd;
    AdEventType = adMod.AdEventType;
    RewardedAdEventType = adMod.RewardedAdEventType;
    TestIds = adMod.TestIds;
    mobileAds = adMod.default || adMod.mobileAds;
  } catch (e) {
    console.log('AdMob modülü yüklenemedi:', e.message);
  }
}

// ═══════════════ REKLAM ID'LERİ ═══════════════
const USE_TEST_ADS = false; // ✅ Gerçek reklamlar aktif!

const INTERSTITIAL_ID = (!isExpoGo && TestIds)
  ? ((__DEV__ || USE_TEST_ADS)
    ? TestIds.INTERSTITIAL
    : Platform.select({
        ios: 'ca-app-pub-9379572221128283/1124529616',
        android: 'ca-app-pub-9379572221128283/7166359635',
      }))
  : null;

const REWARDED_ID = (!isExpoGo && TestIds)
  ? ((__DEV__ || USE_TEST_ADS)
    ? TestIds.REWARDED
    : Platform.select({
        ios: 'ca-app-pub-9379572221128283/6185284607',
        android: 'ca-app-pub-9379572221128283/4926733749',
      }))
  : null;

// ═══════════════ REKLAM NESNELERİ ═══════════════
const interstitial = (!isExpoGo && InterstitialAd && INTERSTITIAL_ID)
  ? InterstitialAd.createForAdRequest(INTERSTITIAL_ID)
  : null;

const rewarded = (!isExpoGo && RewardedAd && REWARDED_ID)
  ? RewardedAd.createForAdRequest(REWARDED_ID)
  : null;

export default function App() {
  const [loading, setLoading] = useState(true);
  const webviewRef = useRef(null);

  // ═══════════════ SDK BAŞLATMA ═══════════════
  const [adsInitialized, setAdsInitialized] = useState(false);

  useEffect(() => {
    if (!mobileAds) return;

    mobileAds()
      .initialize()
      .then((adapterStatuses) => {
        console.log('AdMob SDK başlatıldı:', JSON.stringify(adapterStatuses));
        setAdsInitialized(true);
      })
      .catch((err) => {
        console.log('AdMob SDK başlatma hatası:', err);
        setAdsInitialized(true); // Yine de devam et
      });
  }, []);

  // ═══════════════ INTERSTITIAL ═══════════════
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  useEffect(() => {
    if (!interstitial || !adsInitialized) return;

    const unsubLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setInterstitialLoaded(true);
    });
    const unsubClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setInterstitialLoaded(false);
      interstitial.load();
      sendToWebView({ type: 'adClosed', adType: 'interstitial' });
    });
    const unsubError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('Interstitial error:', error);
      setInterstitialLoaded(false);
      setTimeout(() => interstitial.load(), 30000);
    });

    interstitial.load();

    return () => {
      unsubLoaded();
      unsubClosed();
      unsubError();
    };
  }, [adsInitialized]);

  // ═══════════════ REWARDED VIDEO ═══════════════
  const [rewardedLoaded, setRewardedLoaded] = useState(false);

  useEffect(() => {
    if (!rewarded || !adsInitialized) return;

    const unsubLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setRewardedLoaded(true);
    });
    const unsubEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        sendToWebView({
          type: 'rewardEarned',
          reward: { type: reward.type, amount: reward.amount },
        });
      }
    );
    const unsubClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      setRewardedLoaded(false);
      rewarded.load();
      sendToWebView({ type: 'adClosed', adType: 'rewarded' });
    });
    const unsubError = rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('Rewarded error:', error);
      setRewardedLoaded(false);
      setTimeout(() => rewarded.load(), 30000);
      sendToWebView({ type: 'adError', adType: 'rewarded' });
    });

    rewarded.load();

    return () => {
      unsubLoaded();
      unsubEarned();
      unsubClosed();
      unsubError();
    };
  }, [adsInitialized]);

  // ═══════════════ ARKA PLAN YÖNETİMİ ═══════════════
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        if (webviewRef.current) {
          webviewRef.current.injectJavaScript(`
            if (typeof saveGame === 'function') { saveGame(); }
            true;
          `);
        }
      }
      if (nextAppState === 'active') {
        if (webviewRef.current) {
          webviewRef.current.injectJavaScript(`
            if (typeof handleAppResume === 'function') { handleAppResume(); }
            true;
          `);
        }
      }
    });

    return () => subscription.remove();
  }, []);

  // ═══════════════ WEBVIEW İLETİŞİM ═══════════════
  const sendToWebView = useCallback((data) => {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(`
        window.dispatchEvent(new CustomEvent('nativeMessage', {
          detail: ${JSON.stringify(data)}
        }));
        true;
      `);
    }
  }, []);

  const showInterstitial = useCallback(() => {
    if (interstitialLoaded && interstitial) {
      interstitial.show();
    } else {
      sendToWebView({ type: 'adNotReady', adType: 'interstitial' });
    }
  }, [interstitialLoaded, sendToWebView]);

  const showRewarded = useCallback(() => {
    if (rewardedLoaded && rewarded) {
      rewarded.show();
    } else {
      sendToWebView({ type: 'adNotReady', adType: 'rewarded' });
    }
  }, [rewardedLoaded, sendToWebView]);

  // ═══════════════ SAVE/LOAD KÖPRÜSÜs ═══════════════
  const handleSave = useCallback(async (saveData) => {
    try {
      await AsyncStorage.setItem(SAVE_KEY, saveData);
    } catch (e) {
      console.log('Save hatası:', e);
    }
  }, []);

  const handleLoad = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVE_KEY);
      sendToWebView({ type: 'loadResult', data: raw });
    } catch (e) {
      console.log('Load hatası:', e);
      sendToWebView({ type: 'loadResult', data: null });
    }
  }, [sendToWebView]);

  const onMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      switch (data.type) {
        case 'showInterstitial':
          showInterstitial();
          break;
        case 'showRewarded':
          showRewarded();
          break;
        case 'checkAdStatus':
          sendToWebView({
            type: 'adStatus',
            interstitialReady: interstitialLoaded,
            rewardedReady: rewardedLoaded,
          });
          break;
        case 'saveGame':
          handleSave(data.payload);
          break;
        case 'loadGame':
          handleLoad();
          break;
        default:
          break;
      }
    } catch (e) {
      // JSON parse hatası
    }
  }, [showInterstitial, showRewarded, sendToWebView, interstitialLoaded, rewardedLoaded, handleSave, handleLoad]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0a0a1a" />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#a78bfa" />
        </View>
      )}
      <WebView
        ref={webviewRef}
        style={styles.webview}
        source={{ html: gameHtml, baseUrl: '' }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        mixedContentMode="always"
        cacheEnabled={true}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        onLoadEnd={() => setLoading(false)}
        onMessage={onMessage}
        onError={(e) => console.log('WebView error:', e.nativeEvent)}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        setBuiltInZoomControls={false}
        scalesPageToFit={false}
        contentMode="mobile"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={false}
        renderLoading={() => null}
        androidLayerType="hardware"
        injectedJavaScript={`
          document.body.style.overflow = 'hidden';
          document.body.style.height = '100%';
          document.documentElement.style.overflow = 'hidden';
          document.documentElement.style.height = '100%';
          // Metin seçimi ve uzun basma menüsünü engelle
          document.body.style.webkitUserSelect = 'none';
          document.body.style.userSelect = 'none';
          document.body.style.webkitTouchCallout = 'none';
          document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
          var app = document.querySelector('.app');
          if(app){
            app.style.height = '100%';
            app.style.overflowY = 'auto';
            app.style.webkitOverflowScrolling = 'touch';
            app.style.overscrollBehavior = 'none';
          }
          true;
        `}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  loader: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a1a',
    zIndex: 10,
  },
});
