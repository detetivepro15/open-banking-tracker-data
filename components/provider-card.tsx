import type { Provider } from "@/lib/data"
import { getCountryName } from "@/lib/data"
import {
  Globe,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Smartphone,
} from "lucide-react"

interface ProviderCardProps {
  provider: Provider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const complianceStatus = provider.compliance?.find(
    (c) => c.regulation === "PSD2"
  )
  const apiCount = provider.apiProducts?.length ?? 0
  const sandboxAvailable = provider.sandbox?.status === "available"

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={provider.icon}
            alt={provider.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-lg object-cover"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-foreground">
              {provider.name}
            </h3>
            {provider.verified && (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
            )}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {getCountryName(provider.countryHQ)}
            {provider.countries.length > 1 &&
              ` + ${provider.countries.length - 1} mas`}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 px-5 pb-4">
        {complianceStatus && (
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
              complianceStatus.status === "ready"
                ? "bg-emerald-50 text-emerald-700"
                : complianceStatus.status === "inProgress"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            PSD2:{" "}
            {complianceStatus.status === "ready"
              ? "Listo"
              : complianceStatus.status === "inProgress"
                ? "En progreso"
                : complianceStatus.status}
          </span>
        )}
        {sandboxAvailable && (
          <span className="inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
            Sandbox
          </span>
        )}
        {apiCount > 0 && (
          <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {apiCount} API{apiCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {provider.apiProducts && provider.apiProducts.length > 0 && (
        <div className="border-t border-border px-5 py-3">
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">
            Productos API
          </p>
          <div className="flex flex-wrap gap-1">
            {provider.apiProducts.slice(0, 3).map((product) => (
              <span
                key={product.label}
                className="inline-flex items-center rounded px-1.5 py-0.5 text-xs text-muted-foreground"
              >
                {product.label}
              </span>
            ))}
            {provider.apiProducts.length > 3 && (
              <span className="inline-flex items-center rounded px-1.5 py-0.5 text-xs text-muted-foreground">
                +{provider.apiProducts.length - 3} mas
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center gap-3 border-t border-border px-5 py-3">
        {provider.websiteUrl && (
          <a
            href={provider.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
            aria-label={`Sitio web de ${provider.name}`}
          >
            <Globe className="h-3.5 w-3.5" />
            Web
          </a>
        )}
        {provider.developerPortalUrl && (
          <a
            href={provider.developerPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
            aria-label={`Portal de desarrolladores de ${provider.name}`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Dev Portal
          </a>
        )}
        {provider.mobileApps?.length > 0 && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Smartphone className="h-3.5 w-3.5" />
            {provider.mobileApps
              .map((a) => (a.operatingSystem === "ios" ? "iOS" : "Android"))
              .join(", ")}
          </span>
        )}
      </div>
    </div>
  )
}
