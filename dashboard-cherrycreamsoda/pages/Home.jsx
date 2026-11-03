import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="welcomePage">
      <h1>Welcome!</h1>
      <p>
        Go to <Link to="/admin">/admin</Link> for the dashboard.
      </p>
    </main>
  );
}
