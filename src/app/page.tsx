import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <div className="z-10 container mx-auto px-6">
        <section className="hero-bg flex flex-col items-center justify-center py-12 text-center">
          <h1 className="font-rye mb-8 text-6xl text-white [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)] md:text-8xl">
            Legenda Șăptarilor
          </h1>

          <p className="mx-auto mb-6 max-w-full text-lg text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)] md:text-xl 2xl:max-w-[60vw]">
            În negura Vestului Sălbatic, unde stelele ardeau ca scântei
            înghețate pe cer și praful mirosea a moarte și trădare, șapte
            călăreți au apărut ca o furtună și au schimbat pentru totdeauna
            soarta frontierelor. Le spuneau{" "}
            <span className="font-semibold text-yellow-500">Șăptarii</span>.
            Numele lor era rostit în șoaptă, ca o rugăciune blestemată, chiar și
            cei mai înverșunați șerifi își pierdeau curajul când le zăreau
            umbrele în depărtare. Fiecare purta povara unei vieți trăite între
            păcat și sânge: un pistolar cu inima de gheață, un lunetist cu ochi
            de fiară, un demolator care râdea la bubuitul exploziei, un jucător
            capabil să citească minciuna într-un oftat, un fost cavalerist
            biciuit de războaie, un medic alunecat în nebunie și un predicator
            căzut, care își căuta iertarea la capătul țevii. Împreună erau mai
            mult decât o bandă: erau o legendă vie, un blestem care nu putea fi
            oprit.
          </p>

          <p className="mx-auto mb-6 max-w-full text-lg text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)] md:text-xl 2xl:max-w-[60vw]">
            Orașele de margine le deveneau scenă, iar fiecare apariție a lor era
            ca un spectacol al fricii. Ușile saloanelor se izbeau de pereți,
            paharele se vărsau pe podele, iar pianul se oprea ca o inimă
            înțepenită de groază. Diligențele, băncile și casele de amanet nu
            erau decât cutii goale în care răsuna ecoul ploii de monede vărsate
            în grabă. Intrau fără promisiuni și plecau fără scuze, ca niște
            umbre ce nu puteau fi oprite. Dincolo de fumul țevilor, rămâneau
            panici, zvonuri și o liniște apăsătoare, o tăcere care se așeza
            peste oameni și le înțepenea respirația până trecea noaptea. Oriunde
            pășeau, lăsau în urmă legenda unui blestem viu.
          </p>

          <p className="mx-auto mb-6 max-w-full text-lg text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)] md:text-xl 2xl:max-w-[60vw]">
            Dar nu era doar prada care îi făcea temuți, ci și poveștile ce se
            înălțau în jurul lor ca un fum greu. Oamenii jurau că acolo unde
            treceau caii lor, pământul se crăpa și păsările amuțeau zile
            întregi. În satele izolate, bătrânii îi numeau demoni ai pieirii,
            iar copiii erau speriați cu numele lor ca să adoarmă. Legenda îi
            făcea mai mari decât viața însăși, iar chiar și cei mai aprigi
            vânători de recompense se întorceau din drum, spunând că în ochii
            Șăptarilor ardea un foc pe care nici moartea nu-l putea stinge.
          </p>

          <p className="mx-auto mb-6 max-w-full text-lg text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)] md:text-xl 2xl:max-w-[60vw]">
            Dar adevărul despre{" "}
            <span className="font-semibold text-yellow-500">Șăptari</span> nu
            stătea în aur sau în comorile furate, ci în legătura de fier dintre
            ei. Erau șapte, dar luptau ca unul singur. Niciun glonț, nicio
            promisiune de aur și nici măcar moartea nu putea să-i despartă.
            Frăția lor era scrisă în sânge, iar atunci când primul foc de armă
            rupea liniștea, cei șapte se ridicau ca o furtună, cu inimile bătând
            în același ritm. Împreună erau de neoprit, o umbră unică întinsă
            peste tot Vestul.
          </p>

          <p className="mx-auto mb-6 max-w-full text-lg text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)] md:text-xl 2xl:max-w-[60vw]">
            În saloane,{" "}
            <span className="font-semibold text-yellow-500">Șăptarii</span>{" "}
            intrau mereu împreună, iar simpla lor prezență schimba aerul dintr-o
            clipă. Pianul amuțea, râsetele se frângeau, iar toate privirile se
            întorceau spre ei. Domnițele cu rochii grele de catifea îi priveau
            cu un amestec de dorință și teamă, știind că nopțile alături de ei
            erau scurte, dar mistuitoare. Sub lumina palidă a lumânărilor,
            păcatele lor se ascundeau în îmbrățișări grăbite, iar odată cu
            ivirea zorilor rămâneau doar urme de pași, parfum stins și scrum pe
            mesele de joc.
          </p>

          <p className="mx-auto mb-6 max-w-full text-lg text-white [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)] md:text-xl 2xl:max-w-[60vw]">
            Dincolo de lumina saloanelor îi aștepta mereu adevărata lor casă:
            șaua, drumul și legea nemiloasă a Vestului Sălbatic.
          </p>

          <p className="mx-auto mb-8 max-w-md text-lg font-semibold text-yellow-400 [text-shadow:1px_1px_4px_rgba(0,0,0,0.9)] md:text-xl">
            Șapte umbre. O singură legendă.
          </p>

          <Button asChild size="lg" className="text-lg font-semibold shadow-lg">
            <Link href="/subscriptions">Povestea continuă...</Link>
          </Button>
        </section>
      </div>
      <div className="pointer-events-none fixed bottom-0 left-0 hidden 2xl:block">
        <Image
          src="/home-1.png"
          alt="Home 1"
          width={450}
          height={900}
          className="object-contain object-bottom"
        />
      </div>
      <div className="pointer-events-none fixed right-0 bottom-0 hidden 2xl:block">
        <Image
          src="/home-2.png"
          alt="Home 2"
          width={625}
          height={1250}
          className="-scale-x-100 object-contain object-bottom"
        />
      </div>
    </>
  );
}
