import type { Provider } from "@/lib/data"

interface StatsHeaderProps {
  providers: Provider[]
}

export function StatsHeader({ providers }: StatsHeaderProps) {
  const totalProviders = providers.length
  const withSandbox = providers.filter(
    (p) => p.sandbox?.status === "available"
  ).length
  const withApis = providers.filter(
    (p) => p.apiProducts && p.apiProducts.length > 0
  ).length
  const countries = new Set(providers.map((p) => p.countryHQ)).size

  const stats = [
    { label: "Proveedores", value: totalProviders },
    { label: "Con Sandbox", value: withSandbox },
    { label: "Con APIs", value: withApis },
    { label: "Paises", value: countries },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center rounded-xl border border-border bg-card p-5"
        >
          <span className="text-3xl font-bold text-foreground">
            {stat.value}
          </span>
          <span className="mt-1 text-sm text-muted-foreground">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
