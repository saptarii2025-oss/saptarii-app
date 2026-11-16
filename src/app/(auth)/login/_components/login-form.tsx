import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

import { DiscordIcon } from "./discord-icon";

export const LoginForm = () => {
  return (
    <div className="bg-background flex h-full w-full flex-1 flex-col items-center justify-center p-4 font-sans">
      <div className="bg-card border-border w-full max-w-md space-y-8 rounded-2xl border p-8 shadow-2xl shadow-black/5 sm:p-10">
        <div className="text-center">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Bine ai venit!
          </h1>
          <p className="text-muted-foreground mt-2">
            Alătură-te comunității noastre pentru a accesa toate funcțiile.
          </p>
        </div>

        <div className="space-y-4">
          <form
            className="flex gap-2"
            action={async () => {
              "use server";
              await signIn("discord", { redirectTo: "/" });
            }}
          >
            <Button className="w-full">
              <DiscordIcon />
              Alătură-te cu Discord
            </Button>
          </form>
        </div>

        <p className="text-muted-foreground text-center text-xs">
          Prin alăturare, ești de acord cu Termenii și Condițiile de Utilizare.
        </p>
      </div>
    </div>
  );
};
