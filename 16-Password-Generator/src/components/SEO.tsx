import React from 'react';
import { Zap, KeyRound, ChevronDown, ShieldCheck } from 'lucide-react';

export const SEO: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Rules',
      desc: 'Set the length and pick which character types to include: uppercase, lowercase, numbers, and symbols.',
    },
    {
      step: '02',
      title: 'Generate Instantly',
      desc: 'A new secure password is produced the moment you adjust an option, or press Generate for a fresh batch.',
    },
    {
      step: '03',
      title: 'Copy & Store Safely',
      desc: 'Copy any password with one click and save it in a trusted password manager. Never reuse passwords across sites.',
    },
  ];

  const faqs: { q: string; a: string }[] = [
    {
      "q": "How random are these passwords?",
      "a": "Every character is chosen with the browser's Web Crypto API (crypto.getRandomValues), a cryptographically secure random source, not Math.random(). The tool also uses rejection sampling so every character in your chosen pool is exactly equally likely, with no bias toward any letter, digit or symbol."
    },
    {
      "q": "What makes a password strong?",
      "a": "Strength comes from entropy, which grows with both the length of the password and the size of the character pool. Length has the biggest effect: a 20-character password using all four character types reaches about 130 bits, while a 12-character one reaches about 78 bits."
    },
    {
      "q": "How does the strength meter calculate its rating?",
      "a": "It multiplies the length by log2 of the pool size to estimate bits of entropy, then labels the result Very Weak (under 28 bits), Weak (under 50), Fair (under 80), Strong (under 120) or Very Strong (120 or more). It rates your current settings for random output and cannot judge a password you invented yourself."
    },
    {
      "q": "Are my generated passwords sent anywhere?",
      "a": "No. Generation happens entirely inside your browser tab. Passwords are never transmitted to a server, logged or stored, and closing or refreshing the page discards them, so copy the one you want before leaving."
    },
    {
      "q": "Why exclude ambiguous characters?",
      "a": "Characters such as capital O and zero, or lowercase l and the number one, are easy to confuse when a password is typed by hand or read aloud. The option removes them along with brackets, quotes and some punctuation. It shrinks the pool from 89 to 72 characters, so add a couple of extra characters of length to compensate."
    },
    {
      "q": "What does \"Include at least one of each type\" do?",
      "a": "It guarantees that the password contains at least one character from every set you enabled, which helps with websites that enforce composition rules. The guaranteed characters are shuffled into random positions with a secure shuffle so they are not predictable."
    },
    {
      "q": "How long should my password be?",
      "a": "For everyday accounts stored in a password manager, 16 to 20 characters with all character types is a sensible default. For a master password or anything protecting other secrets, use 24 characters or more. The slider allows any length from 4 to 64."
    },
    {
      "q": "Can I generate several passwords at once?",
      "a": "Yes. Choose 1, 3, 5, 10 or 20 and the tool creates that many passwords, each generated independently with the same settings. Every password has its own copy button."
    },
    {
      "q": "What should I do if a website will not accept symbols?",
      "a": "Turn symbols off and increase the length instead. Removing symbols reduces the pool from 89 to 62 characters, but adding a few extra characters more than makes up for the difference."
    },
    {
      "q": "Is a generated password enough to keep my account safe?",
      "a": "It removes the risk of guessable passwords, but you should still use a unique password for every account, store them in a reputable password manager and enable two-factor authentication. No password can protect you from malware on your device or from typing it into a phishing site."
    }
  ];

  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <Zap className="h-3.5 w-3.5" /> Cryptographically Secure Randomness
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Generate a Strong Password
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Build unguessable passwords in seconds, powered by the browser's own secure crypto engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-subtle hover:border-brand-200 hover:shadow-elevated transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-brand-600 font-mono">{s.step}</span>
                <KeyRound className="h-6 w-6 text-brand-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700 shrink-0">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="text-sm text-emerald-900 space-y-1">
          <h4 className="font-bold text-sm text-emerald-950">No Transmission, Ever</h4>
          <p>
            This generator uses <code className="rounded bg-emerald-100 px-1 py-0.5 font-mono">crypto.getRandomValues()</code> — never <code className="rounded bg-emerald-100 px-1 py-0.5 font-mono">Math.random()</code>. Passwords are created in your browser's memory and are never uploaded, logged, or shared with any server.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-4 text-base text-slate-700 leading-relaxed">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">A Practical Guide to Strong, Random Passwords</h2>
        <p>A password is only as good as the work an attacker has to do to guess it. People are poor at producing randomness: we pick words we remember, swap letters for look-alike digits, and add an exclamation mark at the end. Password-cracking software is built around exactly those habits, so a password that feels clever often sits early in a cracking program's list of guesses. A generator removes the human pattern entirely, and that is the single biggest improvement most people can make to their account security.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">How this generator works</h3>
        <p>When you change an option or press Generate, the tool builds a character pool from the sets you have enabled: 26 uppercase letters, 26 lowercase letters, 10 digits and 27 symbols. Each character of the password is then chosen with <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm">crypto.getRandomValues()</code>, the cryptographically secure random number generator built into every modern browser. It does not use <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm">Math.random()</code>, which is designed for speed rather than unpredictability.</p>
        <p>Two further details matter. First, the tool uses rejection sampling: random numbers that would make some characters slightly more likely than others are discarded and redrawn, so every character in the pool has exactly the same chance of appearing. Second, when "Include at least one of each type" is switched on, one character is taken from each selected set and the whole password is then shuffled with a secure Fisher–Yates shuffle, so the guaranteed characters do not sit in predictable positions.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Understanding entropy and the strength meter</h3>
        <p>Strength is measured in bits of entropy. Each bit doubles the number of possibilities an attacker must try. The meter estimates entropy as the password length multiplied by log2 of the pool size, and it labels the result Very Weak (under 28 bits), Weak (under 50), Fair (under 80), Strong (under 120) or Very Strong (120 and above).</p>
        <p>Some worked examples using the tool's own character sets:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>16 lowercase letters only: 16 × log2(26) ≈ 75 bits, which the meter calls Fair.</li>
          <li>12 characters using all four sets (89 characters): 12 × log2(89) ≈ 78 bits, also Fair.</li>
          <li>16 characters using all four sets: about 104 bits, rated Strong.</li>
          <li>20 characters using all four sets: about 130 bits, rated Very Strong.</li>
        </ul>
        <p>Notice that adding four characters of length did more than adding three whole character types. Length is the most powerful lever you have, so if a site rejects symbols, simply make the password longer.</p>
        <p>The meter describes the settings, not a specific password you typed. It is an estimate for truly random output; it cannot judge a password you invented yourself, and it does not subtract the tiny reduction in possibilities caused by requiring one character of each type.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Choosing sensible settings</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">Everyday website accounts:</strong> 16 to 20 characters with all four sets is a comfortable default, especially when a password manager fills it in for you.</li>
          <li><strong className="font-semibold text-slate-900">Master passwords and encryption keys:</strong> go longer, 24 characters or more, because these protect everything else.</li>
          <li><strong className="font-semibold text-slate-900">Passwords you must type by hand or read aloud:</strong> turn on "Exclude ambiguous" so characters such as O and 0 or l and 1 disappear. The option also drops brackets, quotes and punctuation that are easily misread. This shrinks the pool from 89 to 72 characters, costing roughly 0.3 bits per character, so add a couple of extra characters to compensate.</li>
          <li><strong className="font-semibold text-slate-900">Systems with restrictive rules:</strong> some older systems reject certain symbols. Turn symbols off and increase the length instead of weakening anything else.</li>
          <li><strong className="font-semibold text-slate-900">Setting up several accounts at once:</strong> the batch buttons create 1, 3, 5, 10 or 20 passwords in one go, each generated independently.</li>
        </ul>
        <p>The length slider runs from 4 to 64 characters. Very short lengths are offered only for systems such as numeric PINs that impose them; anything under about 12 characters should not protect an important account.</p>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Common mistakes to avoid</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="font-semibold text-slate-900">Reusing a strong password.</strong> Even a perfect password becomes worthless once one site leaks it, because attackers try leaked credentials on other services. Use a different password for every account.</li>
          <li><strong className="font-semibold text-slate-900">Editing the generated password to make it memorable.</strong> Replacing the random part with a word or a date reintroduces the human patterns the generator was meant to remove.</li>
          <li><strong className="font-semibold text-slate-900">Storing passwords in plain text.</strong> A note on your desktop or an unencrypted spreadsheet is easy to steal. Use a reputable password manager instead.</li>
          <li><strong className="font-semibold text-slate-900">Ignoring two-factor authentication.</strong> A strong password protects against guessing, but two-factor authentication also protects you when a password is phished or leaked.</li>
          <li><strong className="font-semibold text-slate-900">Pasting into the wrong place.</strong> Copied passwords stay on your clipboard until something else replaces them, so copy something harmless afterwards if you are on a shared computer.</li>
        </ul>
        <h3 className="pt-4 text-lg sm:text-xl font-bold text-slate-900">Privacy and limitations</h3>
        <p>Every password is generated inside your browser tab. Nothing is sent to MicroFree or any other server, nothing is logged and nothing is saved; closing or refreshing the page discards the passwords for good, so copy the one you need before you leave. Because the tool depends on the Web Crypto API, it needs a modern browser with JavaScript enabled.</p>
        <p>Keep in mind that randomness is only one part of security. A strong password cannot protect an account if your device is infected with malware that records keystrokes, or if you type it into a convincing phishing page. Pair generated passwords with a password manager, unique credentials for every service and two-factor authentication wherever it is offered.</p>
      </article>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-brand-600" />
              </summary>
              <div className="px-5 pb-4 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
