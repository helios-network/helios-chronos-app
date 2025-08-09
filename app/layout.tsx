import { APP_THEME_COLOR } from "@/config/app";
import "@/styles/globals.scss";
import ContextProvider from "@/context";
import { headers } from "next/headers";
import { Metadata } from "next";
import { Header } from "./(components)/header";
import { GlobalProgressBar } from "@/components/global-progress-bar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Chronos - Automated Task Scheduler | Helios",
  description:
    "Manage and monitor your automated tasks (crons) on the Helios blockchain. Schedule smart contract executions, track performance, and optimize your DeFi strategies.",
  keywords: [
    "Helios",
    "blockchain",
    "automation",
    "cron",
    "smart contracts",
    "DeFi",
  ],
  authors: [{ name: "Chronos Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: APP_THEME_COLOR,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");

  return (
    <html lang="en" dir="ltr">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Initial loading screen - shows before React mounts */
            #initial-loading {
              position: fixed;
              top: 60px;
              left: 0;
              right: 0;
              bottom: 0;
              background: var(--background-secondary, #E2EBFF);
              display: none;
              align-items: center;
              justify-content: center;
              z-index: 10000;
            }
            
            #initial-loading.show {
              display: flex;
            }
            
            .initial-loading-content {
              text-align: center;
              color: #5C6584;
            }
            
            .initial-loading-spinner {
              width: 40px;
              height: 40px;
              border: 3px solid rgba(0, 45, 203, 0.2);
              border-top: 3px solid #002DCB;
              border-radius: 50%;
              animation: initial-spin 1s linear infinite;
              margin: 0 auto 1rem;
            }
            
            .initial-loading-text {
              font-size: 0.875rem;
              font-weight: 500;
              margin: 0;
              opacity: 0.8;
              font-family: system-ui, -apple-system, sans-serif;
            }
            
            @keyframes initial-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            /* Initial progress bar */
            #initial-progress {
              position: fixed;
              top: 60px;
              left: 0;
              right: 0;
              height: 3px;
              background: rgba(0, 0, 0, 0.1);
              z-index: 10001;
              overflow: hidden;
              display: none;
            }
            
            #initial-progress.show {
              display: block;
            }
            
            .initial-progress-bar {
              height: 100%;
              background: linear-gradient(90deg, #002DCB, #001ba3, #1a47d4);
              background-size: 200% 100%;
              animation: initial-progress-shine 1s ease-in-out infinite;
              transition: width 0.3s ease;
              box-shadow: 0 0 10px rgba(0, 45, 203, 0.5);
              width: 0%;
            }
            
            @keyframes initial-progress-shine {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Show initial loading if we're reloading home page
            (function() {
              if (typeof window !== 'undefined' && sessionStorage.getItem('navigatedFromHome')) {
                // Show loading screen immediately
                document.addEventListener('DOMContentLoaded', function() {
                  const loadingScreen = document.getElementById('initial-loading');
                  const progressBar = document.getElementById('initial-progress');
                  const progressBarInner = document.querySelector('.initial-progress-bar');
                  
                  if (loadingScreen && progressBar && progressBarInner) {
                    loadingScreen.classList.add('show');
                    progressBar.classList.add('show');
                    
                    // Animate progress
                    let progress = 0;
                    const interval = setInterval(() => {
                      progress += Math.random() * 15;
                      if (progress >= 95) progress = 95;
                      progressBarInner.style.width = progress + '%';
                    }, 50);
                    
                    // Hide after React takes over
                    setTimeout(() => {
                      progressBarInner.style.width = '100%';
                      setTimeout(() => {
                        loadingScreen.classList.remove('show');
                        progressBar.classList.remove('show');
                        clearInterval(interval);
                      }, 200);
                    }, 800);
                  }
                });
              }
            })();
          `,
          }}
        />
      </head>
      <body style={{ paddingTop: 60 }}>
        {/* Initial loading screen - shows before React mounts */}
        <div id="initial-loading">
          <div className="initial-loading-content">
            <div className="initial-loading-spinner"></div>
            <p className="initial-loading-text">Refreshing...</p>
          </div>
        </div>
        <div id="initial-progress">
          <div className="initial-progress-bar"></div>
        </div>

        <ContextProvider cookies={cookies}>
          <Header />
          <GlobalProgressBar />
          <main style={{ padding: "24px" }}>{children}</main>
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme="dark"
          />
        </ContextProvider>
      </body>
    </html>
  );
}
