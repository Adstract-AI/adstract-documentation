import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './api.module.css';

export default function ApiDocsPage() {
  return (
    <Layout title="API Documentation" description="API docs entrypoint">
      <main className={styles.page}>
        <section className={styles.panel}>
          <p className={styles.kicker}>Adstract API</p>
          <h1 className={styles.title}>API Docs</h1>
          <p className={styles.copy}>
            Start with the API overview, then go to the ad injection endpoint reference,
            schema details, and error behavior.
          </p>
          <Link className={styles.link} to="/api-overview">
            Open API Overview
          </Link>
        </section>
      </main>
    </Layout>
  );
}
