import { Metadata } from "next";

import { HousesList } from "./_components/houses-list";

export const metadata: Metadata = {
    title: "Case din joc - Saptarii Roleplay",
    description: "Vezi toate casele disponibile în joc",
};

export default function HousesPage() {
    return (
        <div className="relative z-10 container mx-auto px-6">
            <div className="mx-auto max-w-8xl py-12">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white [text-shadow:2px_3px_6px_rgba(0,0,0,0.5)]">
                        Case din joc
                    </h1>
                    <p className="text-lg text-white/90 [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
                        Explorează toate casele disponibile în joc și găsește-ți locuința perfectă
                    </p>
                </div>

                <HousesList />
            </div>
        </div>
    );
}