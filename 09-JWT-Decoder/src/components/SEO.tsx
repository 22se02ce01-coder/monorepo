import React from 'react';
import { KeyRound, ShieldAlert, ChevronDown, Info } from 'lucide-react';

interface GuideBlock {
  h3?: string;
  p?: string[];
  ul?: string[];
  ol?: string[];
}

interface GuideSection {
  h2: string;
  blocks: GuideBlock[];
}

interface Faq {
  q: string;
  a: string;
}

const steps = [
  {
    step: '01',
    title: 'Paste Your Token',
    desc: 'Drop any JWT (JSON Web Token) into the input box. It is read directly in your browser — never sent anywhere.',
  },
  {
    step: '02',
    title: 'Read the Decoded Data',
    desc: 'The header and payload are base64url-decoded into formatted JSON, with standard claims translated into readable labels and dates.',
  },
  {
    step: '03',
    title: 'Inspect Claims & Status',
    desc: 'See the algorithm, issuer, audience, expiration and issued-at times, and whether the token has expired or is not yet valid.',
  },
];

const guide: GuideSection[] = [
  {
    h2: 'A Practical Guide to Reading JSON Web Tokens',
    blocks: [
      {
        h3: 'What a JWT is',
        p: [
          'A JSON Web Token, defined in RFC 7519, is a compact way of passing a set of statements, called claims, between two parties. Login systems, single sign-on providers and APIs use JWTs as access tokens and ID tokens: after you sign in, the server hands your browser or app a token, and every later request carries that token, usually in an Authorization: Bearer header, so the API knows who you are and what you are allowed to do.',
          'A signed JWT looks like three blocks of letters and digits separated by dots. The first block is the header, the second is the payload and the third is the signature. The header and payload are JSON objects that have been base64url-encoded, which is a URL-friendly variant of Base64. That encoding makes the token safe to put in headers and URLs, but it does not hide anything: anyone who has the token can read its contents.',
        ],
      },
      {
        h3: 'How this decoder works',
        p: [
          'When you paste a token, the tool splits it on the dots and checks that there are exactly three parts. It then base64url-decodes the header and payload, interprets the bytes as UTF-8 text and parses each one as JSON. The results are shown as formatted JSON that you can copy, and the payload is also listed in a table where standard claims get readable labels.',
          'Time-based claims such as exp, nbf, iat, auth_time and updated_at are stored as Unix timestamps, the number of seconds since 1 January 1970 UTC. The decoder converts these into dates in your local time zone and compares exp and nbf with your device clock to tell you whether the token is currently valid, already expired, not yet valid, or has no expiry at all. The signature is displayed exactly as it appears in the token.',
        ],
      },
    ],
  },
  {
    h2: 'Understanding the Common Claims',
    blocks: [
      {
        ul: [
          'alg and typ (header): the signing algorithm, such as HS256, RS256 or ES256, and the token type, usually JWT. A kid value, if present, tells the server which key was used.',
          'iss (issuer): who created the token, typically the URL of your identity provider.',
          'sub (subject): the user or entity the token is about, often a user ID.',
          'aud (audience): which application or API the token is intended for. A server should reject tokens meant for someone else.',
          'exp, nbf and iat: when the token expires, when it starts being valid, and when it was issued.',
          'jti (JWT ID): a unique identifier that servers can use to detect replayed tokens.',
          'scope, roles or custom claims: application-specific data such as permissions, email address or tenant.',
        ],
      },
    ],
  },
  {
    h2: 'Practical Use Cases',
    blocks: [
      {
        ul: [
          'Debugging a 401 or 403 response by checking whether the token has expired, has the wrong audience, or is missing a required scope or role.',
          'Confirming what your identity provider actually puts into ID and access tokens while integrating OAuth 2.0 or OpenID Connect.',
          'Checking token lifetimes by comparing iat and exp after changing session settings.',
          'Spotting clock problems: a token reported as not yet valid often means the server and client clocks disagree.',
          'Teaching or learning how token-based authentication works using the built-in example token.',
        ],
      },
    ],
  },
  {
    h2: 'Tips, Common Mistakes and Troubleshooting',
    blocks: [
      {
        ol: [
          'Paste only the token itself. If you copy a whole header value such as "Bearer eyJ...", remove the word Bearer and the space first, otherwise the header segment will not decode.',
          'Make sure the token is complete. Tokens are long and are easily cut off when copied from logs or terminals; a missing segment produces a message about the number of parts.',
          'A token with five parts is an encrypted JWE, not a signed JWT. Its payload is encrypted and cannot be decoded without the recipient key, so this tool does not support it.',
          'Remember the expiry status uses your device clock. If your computer time is wrong, the valid or expired label will be wrong too.',
          'Do not put secrets in a JWT payload. Because the payload is only encoded, passwords, API keys or sensitive personal data placed there can be read by anyone who obtains the token.',
        ],
      },
    ],
  },
  {
    h2: 'Limitations and Security Notes',
    blocks: [
      {
        p: [
          'This tool decodes; it does not verify. Checking a signature requires the shared secret (for HMAC algorithms) or the issuer public key (for RSA and ECDSA algorithms), and that check belongs on your server using a well-maintained JWT library. A decoded token that looks correct may still have been forged or modified, so never make access decisions based on what a decoder shows. Servers should also reject tokens that use the "none" algorithm unless they are explicitly expected.',
          'Real tokens are effectively passwords for as long as they are valid. This decoder runs entirely in your browser and never sends the token anywhere, but it is still good practice to prefer test tokens, or tokens that have already expired, when debugging.',
        ],
      },
    ],
  },
];

const faqs: Faq[] = [
  {
    q: 'What are the three parts of a JWT?',
    a: 'A signed JSON Web Token has three dot-separated segments: the header, which describes the signing algorithm and token type; the payload, which contains the claims; and the signature, which the issuer uses to detect tampering. This tool decodes the header and payload, which are only base64url-encoded, not encrypted.',
  },
  {
    q: 'Does decoding a JWT verify that it is valid or trustworthy?',
    a: 'No. Decoding only reveals the contents of the header and payload. It does not check the signature, so it cannot prove the token was issued by a trusted party or that it has not been altered. Signature verification requires the issuer secret or public key and should be done on your backend.',
  },
  {
    q: 'Is my token sent to a server?',
    a: 'No. All base64url decoding and claim parsing happens locally in your browser using native JavaScript. Your token is never uploaded or stored.',
  },
  {
    q: 'Why does the payload show numbers for exp and iat?',
    a: 'Time-based claims such as exp (expiration), nbf (not before) and iat (issued at) are stored as Unix timestamps, the number of seconds since 1 January 1970 UTC. The decoder converts them into readable dates and times in your local time zone.',
  },
  {
    q: 'How does the tool decide whether a token is expired?',
    a: 'It compares the exp and nbf claims with the current time on your device. If nbf is in the future the token is shown as not yet valid, if exp has passed it is shown as expired, and if there is no exp claim it is shown as having no expiration. An incorrect device clock will give an incorrect result.',
  },
  {
    q: 'Can anyone read the data inside a JWT?',
    a: 'Yes. The header and payload of a signed JWT are only encoded, so anyone who has the token can decode them. Never put passwords, API keys or other secrets in a JWT payload.',
  },
  {
    q: 'Why do I get an error saying the token must have 3 parts?',
    a: 'A signed JWT always has exactly three segments separated by dots. The error usually means the token was cut off while copying, contains extra text, or is an encrypted JWE token, which has five parts and cannot be decoded without a key.',
  },
  {
    q: 'Should I include the word Bearer when pasting a token?',
    a: 'No. Paste only the token itself. If you copied the full Authorization header value, remove the word Bearer and the following space before pasting.',
  },
  {
    q: 'What is the difference between HS256 and RS256?',
    a: 'HS256 signs the token with HMAC using one shared secret that both the issuer and the verifier must know. RS256 signs with an RSA private key held by the issuer, and anyone can verify it with the matching public key. The alg value in the header shows which one a token uses.',
  },
];
// end faqs

export const SEO: React.FC = () => {
  return (
    <section className="mt-16 space-y-16 border-t border-slate-200/80 pt-16">
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-3 border border-brand-100">
            <KeyRound className="h-3.5 w-3.5" /> Inspect JSON Web Tokens Instantly
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How to Decode a JWT Online
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Paste a token to reveal its header, payload and claims in a readable format — all in your browser.
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

      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="rounded-xl bg-amber-100 p-2 text-amber-700 shrink-0">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div className="text-sm text-amber-900 space-y-1">
          <h4 className="font-bold text-base text-amber-950">Decoding Is Not Verification</h4>
          <p>
            This decoder shows you what is inside a token, but it does not validate the signature. Never trust a
            token&rsquo;s contents for authentication decisions without verifying its signature on a secure server using the
            issuer&rsquo;s key.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700 shrink-0">
          <Info className="h-6 w-6" />
        </div>
        <div className="text-sm text-blue-900 space-y-1">
          <h4 className="font-bold text-base text-blue-950">Local Processing Guarantee</h4>
          <p>
            Your JWT is decoded entirely in browser memory. No part of the token — header, payload or signature — is
            uploaded to MicroFree or any third-party service.
          </p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-12">
        {guide.map((sec, sIdx) => (
          <section key={sIdx}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">{sec.h2}</h2>
            <div className="space-y-6">
              {sec.blocks.map((b, bIdx) => (
                <div key={bIdx} className="space-y-3">
                  {b.h3 && <h3 className="text-lg font-semibold text-slate-900">{b.h3}</h3>}
                  {b.p?.map((text, pIdx) => (
                    <p key={pIdx} className="text-base text-slate-700 leading-relaxed">
                      {text}
                    </p>
                  ))}
                  {b.ul && (
                    <ul className="list-disc pl-6 space-y-2 text-base text-slate-700 leading-relaxed">
                      {b.ul.map((item, iIdx) => (
                        <li key={iIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {b.ol && (
                    <ol className="list-decimal pl-6 space-y-2 text-base text-slate-700 leading-relaxed">
                      {b.ol.map((item, iIdx) => (
                        <li key={iIdx}>{item}</li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </article>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm sm:text-base font-semibold text-slate-900 hover:text-brand-600 transition [&::-webkit-details-marker]:hidden">
                <h3 className="font-semibold">{faq.q}</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-brand-600" />
              </summary>
              <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
