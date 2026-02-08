import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './api.module.css';

export default function ApiDocsSoonPage() {
  return (
    <Layout title="API Documentation" description="API docs are coming soon">
      <main className={styles.page}>
        <section className={styles.panel}>
          <p className={styles.kicker}>Adstract API</p>
          <h1 className={styles.title}>Coming Really Soon...</h1>
          <p className={styles.copy}>
            We are currently building the API docs. Check back shortly for endpoints, authentication,
            request schemas, and examples.
          </p>
          <Link className={styles.link} to="/">
            Back to Documentation Chooser
          </Link>
        </section>
      </main>
    </Layout>
  );
}
