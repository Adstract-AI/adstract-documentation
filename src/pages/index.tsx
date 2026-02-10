import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Choose Documentation" description="Choose SDK documentation">
      <main className={styles.page}>
        <section className={styles.chooser}>
          <p className={styles.eyebrow}>Adstract Documentation</p>
          <h1 className={styles.title}>Choose Your Documentation</h1>
          <p className={styles.subtitle}>Select SDK documentation.</p>

          <div className={styles.cardGrid}>
            <Link className={styles.card} to="/overview">
              <span className={styles.cardLabel}>SDK</span>
              <strong className={styles.cardTitle}>SDK Documentation</strong>
              <span className={styles.cardCopy}>Get started with the client, requests, metadata, and errors.</span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
