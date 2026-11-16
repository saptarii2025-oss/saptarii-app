import { Metadata } from "next";
import Image from "next/image";

import { ContactCard } from "@/components/custom/contact/contact-card";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactează-ne pe Discord, CFX sau RDR2",
};

export default async function ContactPage() {
  const rdr2ServerUrl = process.env.RDR2_SERVER_URL || "#";

  const contactCards = [
    {
      title: "Discord",
      description:
        "Alătură-te serverului nostru Discord pentru a comunica cu comunitatea",
      href: "https://discord.gg/sjMWhVyT4q ",
      logo: "/discord-logo.png",
      logoAlt: "Discord Logo",
      buttonText: "Alătură-te Discord",
      buttonVariant: "outline" as const,
    },
    {
      title: "CFX",
      description:
        "Accesează serverul nostru CFX pentru experiența completă de joc",
      href: "https://forum.cfx.re/u/_a.n.u.b.i.s/messages",
      logo: "/cfx-logo.png",
      logoAlt: "CFX Logo",
      buttonText: "Vizitează CFX",
      buttonVariant: "outline" as const,
    },
    {
      title: "Server RDR2",
      description:
        "Intră pe serverul nostru Red Dead Redemption 2 pentru aventuri epice",
      href: rdr2ServerUrl,
      logo: "/redm-logo.png",
      logoAlt: "RedM Logo",
      buttonText: "Vizitează RDR2",
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <>
      <div className="z-10 flex flex-1 items-center justify-center px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)]">
              Contact
            </h1>
            <p className="text-lg text-white/90 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
              Alătură-te comunității noastre și descoperă lumea Saptarii
              Roleplay
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {contactCards.map((card, index) => (
              <ContactCard key={index} {...card} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/90 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
              Ai întrebări sau probleme? Nu ezita să ne contactezi pe Discord!
            </p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none fixed bottom-0 left-0 z-0 hidden 2xl:block">
        <Image
          src="/contact-1.png"
          alt="Contact 1"
          width={450}
          height={900}
          className="object-contain object-bottom"
        />
      </div>
      <div className="pointer-events-none fixed right-0 bottom-0 z-0 hidden 2xl:block">
        <Image
          src="/contact-2.png"
          alt="Contact 2"
          width={450}
          height={900}
          className="-scale-x-100 object-contain object-bottom"
        />
      </div>
    </>
  );
}
