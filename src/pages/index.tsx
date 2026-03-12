import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home() {
  const logoDark = useBaseUrl('/img/logo-dark-name.svg');
  const logoWhite = useBaseUrl('/img/logo-white-name.svg');
  return (
    <Layout title="Adstract AI" description="Ad network for LLM-powered products">
      <main className={styles.page}>
        <section className={styles.hero}>
          <img
            src={logoDark}
            alt="Adstract AI"
            className={`${styles.logo} ${styles.logoLight}`}
          />
          <img
            src={logoWhite}
            alt="Adstract AI"
            className={`${styles.logo} ${styles.logoDark}`}
          />
          <h1 className={styles.title}>
            Monetization that feels{' '}
            <span className={styles.highlight}>natural</span>
          </h1>
          <p className={styles.subtitle}>
            Adstract helps teams add sponsored content to LLM-powered products.
            Enhance prompts, track ad interactions, and earn — with a single SDK
            integration.
          </p>
          <Link className={styles.cta} to="/overview">
            Get Started
          </Link>
        </section>
      </main>
    </Layout>
  );
}
