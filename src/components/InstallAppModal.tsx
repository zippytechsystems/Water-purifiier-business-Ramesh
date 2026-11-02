import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Download, 
  Smartphone, 
  Share2, 
  PlusSquare, 
  X, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isTelugu, t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if running as installed standalone PWA
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(checkStandalone);

    // Detect iOS (iPhone / iPad)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 shadow-lg flex items-center justify-center">
            <img 
              src="/images/brand/business-logo.png" 
              alt="Priya's AquaFresh App Icon" 
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base sm:text-lg">
              {t("Install Priya's AquaFresh App", "ప్రియాస్ ఆక్వాఫ్రెష్ యాప్ ఇన్‌స్టాల్")}
            </h3>
            <p className="text-xs text-cyan-400 font-medium">
              {t("Instant 1-Tap Access on Mobile & PC", "మొబైల్ & కంప్యూటర్ లో వేగవంతమైన యాక్సెస్")}
            </p>
          </div>
        </div>

        {/* Status: Already Installed */}
        {isStandalone || isInstalled ? (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h4 className="font-bold text-white text-sm">
              {t("App Already Installed!", "యాప్ ఇప్పటికే ఇన్‌స్టాల్ చేయబడింది!")}
            </h4>
            <p className="text-xs text-emerald-300 mt-1">
              {t("You are using the official standalone application.", "మీరు అధికారిక మొబైల్ యాప్ వెర్షన్ వాడుతున్నారు.")}
            </p>
          </div>
        ) : isIOS ? (
          /* iOS Instructions (iPhone / iPad) */
          <div className="space-y-4 mb-6">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <span className="font-bold text-white block mb-1">
                {t("Apple iPhone / iPad Installation:", "ఐఫోన్ / ఐపాడ్ లో ఇన్‌స్టాల్ చేసుకునే విధానం:")}
              </span>
              {t(
                "Follow these 2 simple steps in Safari to add Priya's AquaFresh to your iPhone Home Screen:",
                "సఫారి బ్రౌజర్ లో ఈ 2 సాధారణ స్టెప్స్ పాటించండి:"
              )}
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Share2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">
                  {t("Step 1: Tap the Share button", "స్టెప్ 1: Share బటన్ పై క్లిక్ చేయండి")}
                </p>
                <p className="text-slate-400 mt-0.5">
                  {t("Located at the bottom bar of Safari.", "సఫారి బ్రౌజర్ కింద ఉండే షేర్ బటన్ నొక్కండి.")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <PlusSquare className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">
                  {t("Step 2: Tap 'Add to Home Screen'", "స్టెప్ 2: 'Add to Home Screen' ఎంచుకోండి")}
                </p>
                <p className="text-slate-400 mt-0.5">
                  {t("Scroll down and tap 'Add to Home Screen', then tap 'Add'.", "క్రిందికి స్క్రోల్ చేసి 'Add to Home Screen' ఎంచుకొని 'Add' నొక్కండి.")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Android & Desktop Chrome/Edge Native Install */
          <div className="space-y-4 mb-6">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(
                "Install Priya's AquaFresh on your phone or desktop for instant access without opening your browser. Enjoy fast service booking and offline catalogues.",
                "మీ ఫోన్ లేదా కంప్యూటర్‌లో ప్రియాస్ ఆక్వాఫ్రెష్ యాప్‌ను ఇన్‌స్టాల్ చేసుకోండి. తక్షణ సర్వీస్ బుకింగ్ మరియు వాటర్ ప్యూరిఫైయర్ల సమాచారం వెంటనే పొందండి."
              )}
            </p>

            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{t("Instant 1-Tap Open", "తక్షణ ఓపెన్")}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t("Zero Phone Storage", "తక్కువ మెమరీ")}</span>
              </div>
            </div>

            {deferredPrompt ? (
              <button
                onClick={handleNativeInstall}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t("Click Here to Install Now", "ఇప్పుడే ఇన్‌స్టాల్ చేయండి")}</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-300">
                <p className="font-bold mb-1">
                  {t("Desktop / Android Browser Installation:", "ఇన్‌స్టాలేషన్ సూచన:")}
                </p>
                <p className="text-slate-400">
                  {t(
                    "Click the install icon in your browser address bar (or Menu → 'Install App / Add to Home screen').",
                    "బ్రౌజర్ అడ్రస్ బార్ లోని 'Install' ఐకాన్ లేదా మెనూ లో 'Install app' ఎంచుకోండి."
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Priya's AquaFresh PWA v1.2</span>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {t("Close", "మూసివేయి")}
          </button>
        </div>
      </div>
    </div>
  );
};
