export const Footer = () => {
  return (
    <footer className="bg-panelBg text-panelText py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="font-semibold">
          &copy; {new Date().getFullYear()} Șăptarii. Toate drepturile
          rezervate.
        </p>
        <p className="mt-1 text-sm opacity-70">
          Un proiect creat de și pentru comunitate.
        </p>
      </div>
    </footer>
  );
};
