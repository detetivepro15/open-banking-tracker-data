import fs from "fs"
import path from "path"

export interface Provider {
  id: string
  type: string[]
  bankType?: string[]
  name: string
  legalName?: string | null
  description?: string
  verified: boolean
  icon: string
  websiteUrl: string
  countryHQ: string
  countries: string[]
  stateOwned: boolean
  ownership: { shareholderName: string; percentage?: number }[]
  compliance: { regulation: string; status: string }[] | null
  sandbox?: { status: string; sourceUrl?: string | null }
  developerPortalUrl: string | null
  apiProducts: {
    label: string
    type: string
    categories: string[]
    description: string | null
    documentationUrl: string | null
    apiReferenceUrl: string | null
    premium: boolean
    stage: string
  }[] | null
  apiStandards: string[]
  apiAggregators?: string[]
  webApplication: boolean
  mobileApps: { operatingSystem: string; storeUrl: string }[]
  stockSymbol: string
  twitter?: string
  ipoStatus?: string
}

export function getProviders(): Provider[] {
  const dataDir = path.join(process.cwd(), "data", "account-providers")
  
  if (!fs.existsSync(dataDir)) {
    return []
  }

  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"))
  const providers: Provider[] = []

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataDir, file), "utf-8")
      const data = JSON.parse(content)
      providers.push(data)
    } catch {
      // skip malformed files
    }
  }

  return providers.sort((a, b) => a.name.localeCompare(b.name))
}

export function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    NL: "Paises Bajos", BE: "Belgica", GB: "Reino Unido", DE: "Alemania",
    FR: "Francia", ES: "Espana", IT: "Italia", PT: "Portugal",
    US: "Estados Unidos", CA: "Canada", AU: "Australia", SE: "Suecia",
    NO: "Noruega", DK: "Dinamarca", FI: "Finlandia", PL: "Polonia",
    IE: "Irlanda", AT: "Austria", CH: "Suiza", LU: "Luxemburgo",
    GR: "Grecia", CZ: "Rep. Checa", RO: "Rumania", BG: "Bulgaria",
    HR: "Croacia", HU: "Hungria", SK: "Eslovaquia", SI: "Eslovenia",
    EE: "Estonia", LV: "Letonia", LT: "Lituania", MT: "Malta",
    CY: "Chipre", TR: "Turquia", RU: "Rusia", UA: "Ucrania",
    IN: "India", JP: "Japon", CN: "China", KR: "Corea del Sur",
    SG: "Singapur", HK: "Hong Kong", MX: "Mexico", BR: "Brasil",
    CO: "Colombia", AR: "Argentina", CL: "Chile", JO: "Jordania",
    AE: "EAU", SA: "Arabia Saudi", MM: "Myanmar", VN: "Vietnam",
    LI: "Liechtenstein", IS: "Islandia", NG: "Nigeria",
  }
  return countries[code] || code
}
