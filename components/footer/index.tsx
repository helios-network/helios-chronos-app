import styles from "./footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksGrid}>
        <div className={styles.linkColumn}>
          <h4 className={styles.columnHeading}>Learn</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                How Chronos Works
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                I-PoSR Explained
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Getting Started Guide
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Developer Documentation
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Frequently Asked Questions
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.linkColumn}>
          <h4 className={styles.columnHeading}>Resources</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                API Documentation
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                GitHub Repository
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Partner Integrations
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Knowledge Base
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Tutorial Videos
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.linkColumn}>
          <h4 className={styles.columnHeading}>Network</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Ecosystem Overview
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Governance Proposals
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Validator Dashboard
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Staking Rewards
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Consensus Updates
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.linkColumn}>
          <h4 className={styles.columnHeading}>Community</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Join the Forum
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Discord Server
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Telegram Group
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Events & Webinars
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="#" className={styles.link}>
                Blog & News
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.logoAndSocial}>
          <Image
            src="/img/Chronos Logo.svg"
            alt="Chronos"
            width={150}
            height={42}
            className={styles.logo}
          />
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialLink} aria-label="Telegram">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7236 16.9297L17.2384 20.9259C18.5394 22.4058 19.191 23.1463 19.873 22.9653C20.5538 22.7853 20.788 21.8117 21.2553 19.8635L23.8464 9.05648C24.5674 6.05551 24.9273 4.5561 24.1272 3.81562C23.3271 3.07513 21.9405 3.62589 19.1672 4.72632L6.30244 9.83599C4.08423 10.7174 2.97513 11.1576 2.90466 11.9143C2.89636 11.9915 2.89636 12.0692 2.90466 12.1464C2.97296 12.9042 4.0799 13.3476 6.29593 14.2355C7.29879 14.6378 7.80076 14.8394 8.1607 15.2243C8.20118 15.2677 8.24021 15.3125 8.27779 15.3587C8.60955 15.7707 8.75049 16.3128 9.03346 17.3926L9.56361 19.4168C9.83791 20.4684 9.9756 20.9953 10.3366 21.0669C10.6977 21.1384 11.011 20.7026 11.6387 19.8298L13.7236 16.9297ZM13.7236 16.9297L13.3799 16.5719C12.9874 16.1621 12.7912 15.9583 12.7912 15.7046C12.7912 15.4509 12.9863 15.246 13.3799 14.8373L17.2536 10.7998"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Discord">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2582 18.7753C9.77623 19.4839 9.25878 20.1678 8.70786 20.8243C4.70729 20.7105 3.18945 18.1139 3.18945 18.1139C3.24575 14.4348 4.13734 10.8165 5.79687 7.53245C7.25518 6.3916 9.0321 5.73236 10.8816 5.646L11.4237 6.89821M7.36348 8.01495C8.77026 7.40121 10.2615 7.00283 11.7869 6.83321C12.4408 6.74673 13.1006 6.71229 13.7601 6.73021C14.4198 6.71588 15.0796 6.75395 15.7332 6.84405C17.2587 7.01367 18.7499 7.41205 20.1566 8.02579M16.1073 6.89284L16.6494 5.64062C18.5007 5.73166 20.2778 6.39665 21.7341 7.54334C23.3883 10.825 24.2761 14.4393 24.3307 18.114C24.3307 18.114 22.8129 20.7105 18.8123 20.8244C18.2609 20.1626 17.7435 19.4733 17.2619 18.759M20.7638 17.187C19.3123 18.0609 17.7315 18.6995 16.0802 19.0789C15.3161 19.2292 14.5388 19.3018 13.7601 19.2957C12.9814 19.3018 12.204 19.2292 11.4399 19.0789C9.78865 18.6995 8.20787 18.0609 6.75635 17.187M10.4263 12.5142C10.1632 12.5206 9.90437 12.582 9.66643 12.6943C9.42849 12.8067 9.21669 12.9676 9.04464 13.1667C8.8726 13.3658 8.74411 13.5987 8.66743 13.8505C8.59076 14.1022 8.56759 14.3672 8.59943 14.6284C8.62134 15.0926 8.81887 15.5312 9.15202 15.8553C9.48517 16.1794 9.92904 16.3648 10.3937 16.3739C10.6582 16.3678 10.9186 16.307 11.1584 16.1953C11.3982 16.0835 11.6123 15.9232 11.787 15.7245C11.9617 15.5259 12.0934 15.2931 12.1736 15.041C12.2538 14.7889 12.2809 14.5229 12.2531 14.2597C12.222 13.7931 12.0172 13.355 11.679 13.0318C11.3408 12.7087 10.8939 12.5241 10.4263 12.5142Z M17.0935 12.5142C17.3565 12.5205 17.6152 12.5819 17.8531 12.6942C18.091 12.8066 18.3028 12.9675 18.4748 13.1665C18.6468 13.3656 18.7753 13.5985 18.852 13.8502C18.9286 14.1018 18.9518 14.3668 18.92 14.6279C18.8981 15.0921 18.7006 15.5306 18.3675 15.8547C18.0344 16.1787 17.5906 16.364 17.126 16.3731C16.8615 16.3671 16.6012 16.3063 16.3614 16.1946C16.1216 16.0828 15.9076 15.9226 15.7329 15.7239C15.5582 15.5253 15.4266 15.2926 15.3464 15.0405C15.2662 14.7884 15.2391 14.5224 15.2669 14.2594C15.298 13.7928 15.5028 13.3547 15.8409 13.0317C16.179 12.7086 16.6259 12.524 17.0935 12.5142Z"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="X (Twitter)">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.02246 22.9925L12.2058 14.8092M12.2058 14.8092L4.02246 3.47754H9.44329L15.3542 11.6608M12.2058 14.8092L18.1166 22.9925H23.5375L15.3542 11.6608M23.5375 3.47754L15.3542 11.6608"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Medium">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.83725 18.1139C10.5317 18.1139 12.716 15.9297 12.716 13.2352C12.716 10.5407 10.5317 8.35645 7.83725 8.35645C5.14279 8.35645 2.9585 10.5407 2.9585 13.2352C2.9585 15.9297 5.14279 18.1139 7.83725 18.1139Z M17.5947 18.1139C19.0916 18.1139 20.3051 15.9297 20.3051 13.2352C20.3051 10.5407 19.0916 8.35645 17.5947 8.35645C16.0978 8.35645 14.8843 10.5407 14.8843 13.2352C14.8843 15.9297 16.0978 18.1139 17.5947 18.1139Z M23.5578 18.1139C24.1566 18.1139 24.642 15.9297 24.642 13.2352C24.642 10.5407 24.1566 8.35645 23.5578 8.35645C22.959 8.35645 22.4736 10.5407 22.4736 13.2352C22.4736 15.9297 22.959 18.1139 23.5578 18.1139Z"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="GitHub">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.8757 18.7786C8.30394 19.4052 9.60169 20.7409 11.3721 21.077M11.5044 24.0769C10.3899 23.8926 2.97852 21.4814 2.97852 13.336C2.97852 5.71436 9.48568 2.39355 13.8202 2.39355C18.1568 2.39355 24.6618 5.71436 24.6618 13.336C24.6618 21.4814 17.2505 23.8937 16.136 24.0769C16.136 24.0769 15.9083 20.3723 16.0416 19.737C16.1739 19.1016 15.7229 18.0804 15.7229 18.0804C16.7756 17.6857 18.3791 17.122 18.9158 15.6063C19.3332 14.4311 19.5955 12.7246 18.4279 11.12C18.4279 11.12 18.7336 8.52885 18.1568 8.42694C17.579 8.3272 15.8801 9.45365 15.8801 9.45365C15.3846 9.31271 14.2799 9.04492 13.8224 9.09262C13.3637 9.04492 12.2557 9.31271 11.7603 9.45365C11.7603 9.45365 10.0603 8.32611 9.48352 8.42694C8.90674 8.52777 9.21247 11.12 9.21247 11.12C8.04483 12.7246 8.30719 14.4311 8.7246 15.6063C9.26235 17.122 10.8647 17.6857 11.9175 18.0804C11.9175 18.0804 11.4665 19.1016 11.5987 19.737C11.731 20.3723 11.5044 24.0769 11.5044 24.0769Z"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.41943 11.0669V18.6561M12.7561 14.3194V18.6561M12.7561 14.3194C12.7561 13.8923 12.8402 13.4693 13.0037 13.0747C13.1671 12.6801 13.4067 12.3216 13.7087 12.0195C14.0108 11.7175 14.3693 11.4779 14.7639 11.3145C15.1585 11.151 15.5815 11.0669 16.0086 11.0669C16.4357 11.0669 16.8587 11.151 17.2533 11.3145C17.6479 11.4779 18.0064 11.7175 18.3085 12.0195C18.6105 12.3216 18.8501 12.6801 19.0135 13.0747C19.177 13.4693 19.2611 13.8923 19.2611 14.3194V18.6561M12.7561 14.3194V11.0669 M8.42697 7.81445H8.41797 M3.54053 13.2351C3.54053 8.38023 3.54053 5.9517 5.0486 4.44362C6.55668 2.93555 8.98413 2.93555 13.8401 2.93555C18.695 2.93555 21.1235 2.93555 22.6316 4.44362C24.1397 5.9517 24.1397 8.37915 24.1397 13.2351C24.1397 18.09 24.1397 20.5186 22.6316 22.0266C21.1235 23.5347 18.6961 23.5347 13.8401 23.5347C8.98521 23.5347 6.55668 23.5347 5.0486 22.0266C3.54053 20.5186 3.54053 18.0911 3.54053 13.2351Z"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8602 22.4504C15.8226 22.4504 17.7036 22.2563 19.4469 21.9007C21.6261 21.4562 22.7146 21.2351 23.7077 19.9579C24.7019 18.6797 24.7019 17.2128 24.7019 14.279V12.1909C24.7019 9.25718 24.7019 7.78922 23.7077 6.51207C22.7146 5.23492 21.6261 5.01267 19.4469 4.56924C17.6076 4.20058 15.7361 4.01644 13.8602 4.01957C11.8979 4.01957 10.0169 4.21364 8.27351 4.56924C6.09434 5.01375 5.00583 5.23492 4.01274 6.51207C3.01855 7.7903 3.01855 9.25718 3.01855 12.1909V14.279C3.01855 17.2128 3.01855 18.6808 4.01274 19.9579C5.00583 21.2351 6.09434 21.4573 8.27351 21.9007C10.0169 22.2563 11.8979 22.4504 13.8602 22.4504Z M18.1559 13.5741C17.9954 14.2311 17.1389 14.7017 15.427 15.646C13.5644 16.6727 12.6331 17.1855 11.8796 16.9871C11.6285 16.9222 11.3939 16.8051 11.1912 16.6434C10.6079 16.1718 10.6079 15.1928 10.6079 13.2348C10.6079 11.2768 10.6079 10.2978 11.1912 9.82617C11.3885 9.6668 11.6249 9.54863 11.8796 9.48249C12.6331 9.28409 13.5644 9.7969 15.427 10.8236C17.14 11.7668 17.9954 12.2384 18.1559 12.8954C18.2101 13.1188 18.2101 13.3508 18.1559 13.5741Z"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Reddit">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8801 24.0771C19.269 24.0771 23.6376 20.922 23.6376 17.03C23.6376 13.138 19.269 9.98291 13.8801 9.98291C8.49114 9.98291 4.12256 13.138 4.12256 17.03C4.12256 20.922 8.49114 24.0771 13.8801 24.0771Z M17.6746 18.4175C16.5936 19.271 15.2574 19.7368 13.88 19.7402C12.5027 19.7368 11.1664 19.271 10.0854 18.4175 M21.4692 6.72949C22.6666 6.72949 23.6372 5.75886 23.6372 4.56152C23.6372 3.36419 22.6666 2.39355 21.4692 2.39355C20.2719 2.39355 19.3013 3.36419 19.3013 4.56152C19.3013 5.75886 20.2719 6.72949 21.4692 6.72949Z M20.3852 11.143C20.5895 10.7892 20.8835 10.4956 21.2376 10.292C21.5917 10.0883 21.9933 9.98166 22.4018 9.98294C23.6833 9.98294 24.7219 11.0129 24.7219 12.2814C24.7219 13.1671 24.2167 13.9358 23.4751 14.3196M7.37524 11.143C7.17099 10.7892 6.87696 10.4956 6.52287 10.292C6.16878 10.0883 5.76719 9.98166 5.35869 9.98294C5.05543 9.98151 4.75486 10.0398 4.47414 10.1546C4.19342 10.2693 3.93805 10.4382 3.7226 10.6516C3.50716 10.8651 3.33587 11.1188 3.2185 11.3985C3.10113 11.6781 3.03999 11.9781 3.03857 12.2814C3.03857 13.1671 3.5438 13.9358 4.28537 14.3196 M19.3003 4.56201C16.7453 4.56201 15.4673 4.56201 14.6738 5.35549C13.8804 6.14896 13.8804 7.42698 13.8804 9.98193 M10.6362 14.3193H10.6265M17.1412 14.3193H17.1315"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg
                width="26"
                height="26"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.60059 13.2351C3.60059 8.38023 3.60059 5.9517 5.10866 4.44362C6.61674 2.93555 9.04419 2.93555 13.9002 2.93555C18.7551 2.93555 21.1836 2.93555 22.6917 4.44362C24.1997 5.9517 24.1997 8.37915 24.1997 13.2351C24.1997 18.09 24.1997 20.5186 22.6917 22.0266C21.1836 23.5347 18.7561 23.5347 13.9002 23.5347C9.04527 23.5347 6.61674 23.5347 5.10866 22.0266C3.60059 20.5186 3.60059 18.0911 3.60059 13.2351Z M18.779 13.2352C18.779 14.5291 18.265 15.77 17.35 16.685C16.4351 17.5999 15.1942 18.1139 13.9002 18.1139C12.6063 18.1139 11.3654 17.5999 10.4504 16.685C9.53549 15.77 9.02148 14.5291 9.02148 13.2352C9.02148 11.9413 9.53549 10.7003 10.4504 9.7854C11.3654 8.87046 12.6063 8.35645 13.9002 8.35645C15.1942 8.35645 16.4351 8.87046 17.35 9.7854C18.265 10.7003 18.779 11.9413 18.779 13.2352Z M19.8708 7.27197H19.8608"
                  stroke="currentColor"
                  strokeWidth="1.08267"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.disclaimer}>
          <p className={styles.disclaimerText}>
            Chronos By Helios and our logos, product and service names, and the
            look and feel of our platform are trademarks of the Helios
            Foundation and may not be copied, imitated, or used, in whole or in
            part, without our prior written permission. All other trademarks,
            registered trademarks, product names, and company names mentioned
            are the property of their respective owners.
          </p>
        </div>

        <div className={styles.copyright}>
          <p className={styles.copyrightText}>
            Helios Blockchain © 2025 - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
