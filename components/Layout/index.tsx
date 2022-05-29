import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { WalletProvider } from "../../state/wallet/WalletProvider";
import Header from "../Header";
import styles from "../../styles/Home.module.css";
import toast, { Toaster } from "react-hot-toast";
import { ModalProvider } from "../../state/ModalProvider";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WalletProvider>
        <ModalProvider>
          <>
            <Head>
              <title>Build Ideas</title>
            </Head>

            <Header />
            <div className="pt-[72px] min-h-screen">
              <Toaster position="bottom-right" />
              {children}
            </div>
            <footer className={styles.footer}>
              <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered by{" "}
                <span className={styles.logo}>
                  <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    width={72}
                    height={16}
                  />
                </span>
              </a>
            </footer>
          </>
        </ModalProvider>
      </WalletProvider>
    </>
  );
}
