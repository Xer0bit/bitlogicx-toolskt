export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">What are cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit our website.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">How we use cookies</h2>
          <p>We use cookies for essential functions including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Authentication and security (CSRF protection)</li>
            <li>Remembering your preferences</li>
            <li>Analyzing site usage to improve our service</li>
          </ul>
        </section>
      </div>
    </div>
  );
}