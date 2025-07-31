import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
      <div>
        <Header />

        <main className="bg-slate-900 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
          <div className="max-w-5xl mx-auto mt-10">
            <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
              <h1 className="text-6xl font-black">
                Todas tus{" "}
                <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">
                  Redes Sociales
                </span>{" "}
                en un solo enlace
                <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent ">
                  .
                </span>
              </h1>

              <p className="text-xl">
                {" "}
                Únete a más de 200 mil developers compartiendo sus redes
                sociales, comparte tu perfil de Tiktok, Facebook, Instagram,
                Youtube, Github y más
              </p>

              <SearchForm />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
