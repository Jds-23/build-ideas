import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { WalletProvider } from "../../state/wallet/WalletProvider";
import Header from "../Header";
import styles from '../../styles/Home.module.css'
// import toast, { Toaster } from "react-hot-toast";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <WalletProvider>
        <>
          <Head>
            <title>Plutus</title>
          </Head>

          <Header />
          <div className="pt-[72px] min-h-screen">
            {/* <Toaster /> */}
            {children}
          </div>
          <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
        </>
      </WalletProvider>
    </>
  );
}