import Layout from '@theme/Layout';

import styles from './api.module.css';

export default function ApiDocsPage() {
  return (
    <Layout title="API Documentation" description="API documentation">
      <main className={styles.page}>
        <section className={styles.panel}>
          <p className={styles.kicker}>Adstract API</p>
          <h1 className={styles.title}>API Documentation</h1>
          <p className={styles.copy}>
            Use the SDK documentation sections to integrate Adstract in your application.
          </p>
        </section>
      </main>
    </Layout>
  );
}
