"use client"

import { useState, useMemo } from "react"
import type { Provider } from "@/lib/data"
import { getCountryName } from "@/lib/data"
import { ProviderCard } from "./provider-card"
import { Search, Filter, X } from "lucide-react"

interface ProviderExplorerProps {
  providers: Provider[]
}

export function ProviderExplorer({ providers }: ProviderExplorerProps) {
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [sandboxFilter, setSandboxFilter] = useState<"all" | "available" | "unavailable">("all")
  const [apiFilter, setApiFilter] = useState<"all" | "hasApis" | "noApis">("all")

  const countries = useMemo(() => {
    const countrySet = new Set(providers.map((p) => p.countryHQ))
    return Array.from(countrySet)
      .map((code) => ({ code, name: getCountryName(code) }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [providers])

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (search) {
        const q = search.toLowerCase()
        const matchName = p.name.toLowerCase().includes(q)
        const matchCountry = getCountryName(p.countryHQ).toLowerCase().includes(q)
        const matchId = p.id.toLowerCase().includes(q)
        if (!matchName && !matchCountry && !matchId) return false
      }
      if (selectedCountry && p.countryHQ !== selectedCountry) return false
      if (sandboxFilter === "available" && p.sandbox?.status !== "available") return false
      if (sandboxFilter === "unavailable" && p.sandbox?.status === "available") return false
      if (apiFilter === "hasApis" && (!p.apiProducts || p.apiProducts.length === 0)) return false
      if (apiFilter === "noApis" && p.apiProducts && p.apiProducts.length > 0) return false
      return true
    })
  }, [providers, search, selectedCountry, sandboxFilter, apiFilter])

  const hasActiveFilters = selectedCountry || sandboxFilter !== "all" || apiFilter !== "all"

  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar proveedor por nombre, pais o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filtros:</span>
          </div>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="">Todos los paises</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>

          <select
            value={sandboxFilter}
            onChange={(e) => setSandboxFilter(e.target.value as "all" | "available" | "unavailable")}
            className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="all">Sandbox: Todos</option>
            <option value="available">Con Sandbox</option>
            <option value="unavailable">Sin Sandbox</option>
          </select>

          <select
            value={apiFilter}
            onChange={(e) => setApiFilter(e.target.value as "all" | "hasApis" | "noApis")}
            className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="all">APIs: Todos</option>
            <option value="hasApis">Con APIs</option>
            <option value="noApis">Sin APIs</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSelectedCountry("")
                setSandboxFilter("all")
                setApiFilter("all")
              }}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Mostrando{" "}
        <span className="font-medium text-foreground">{filtered.length}</span>{" "}
        de {providers.length} proveedores
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
          <p className="text-lg font-medium text-foreground">
            Sin resultados
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Intenta ajustar los filtros o el termino de busqueda.
          </p>
        </div>
      )}
    </div>
  )
}
