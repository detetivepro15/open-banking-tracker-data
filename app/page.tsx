import { getProviders } from "@/lib/data"
import { StatsHeader } from "@/components/stats-header"
import { ProviderExplorer } from "@/components/provider-explorer"

export default function Home() {
  const providers = getProviders()

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          Open Banking Tracker
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
          Explora el estado de Open Banking y PSD2 en instituciones financieras de todo el mundo.
          APIs, sandboxes, cumplimiento normativo y mas.
        </p>
      </header>

      <section className="mb-8" aria-label="Estadisticas generales">
        <StatsHeader providers={providers} />
      </section>

      <section aria-label="Explorador de proveedores">
        <ProviderExplorer providers={providers} />
      </section>
    </main>
  )
}
