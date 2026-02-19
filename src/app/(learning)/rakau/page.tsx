import type { Metadata } from 'next'
import { RakauArrangement } from '@/components/rakau/RakauArrangement'
import { RakauSandbox } from '@/components/rakau/RakauSandbox'
import { ALL_ROD_COLOURS, getRodHex, getRodMaoriName } from '@/lib/rakau'
import type { RakauConfiguration } from '@/types/rakau'

export const metadata: Metadata = {
  title: 'Rākau',
}

// Example arrangements for the sandbox demo
const DEMO_CONFIGS: RakauConfiguration[] = [
  {
    id: 'demo-single',
    rods: [
      { id: 'r1', colour: 'karaka', orientation: 'horizontal', position: { x: 1, y: 2 } },
    ],
    matSize: { width: 14, height: 6 },
    description: 'He rākau karaka',
    descriptionEnglish: 'An orange rod',
  },
  {
    id: 'demo-comparison',
    rods: [
      { id: 'r1', colour: 'ma', orientation: 'horizontal', position: { x: 1, y: 1 } },
      { id: 'r2', colour: 'whero', orientation: 'horizontal', position: { x: 1, y: 3 } },
      { id: 'r3', colour: 'kakariki', orientation: 'horizontal', position: { x: 1, y: 5 } },
      { id: 'r4', colour: 'kowhai', orientation: 'horizontal', position: { x: 1, y: 7 } },
      { id: 'r5', colour: 'karaka', orientation: 'horizontal', position: { x: 1, y: 9 } },
    ],
    matSize: { width: 16, height: 12 },
    description: 'He rākau mā, whero, kākāriki, kōwhai, karaka',
    descriptionEnglish: 'White, red, light green, yellow, orange rods',
  },
  {
    id: 'demo-vertical',
    rods: [
      { id: 'r1', colour: 'whero', orientation: 'vertical', position: { x: 1, y: 1 } },
      { id: 'r2', colour: 'kakariki', orientation: 'vertical', position: { x: 4, y: 1 } },
      { id: 'r3', colour: 'wateri', orientation: 'vertical', position: { x: 7, y: 1 } },
    ],
    matSize: { width: 14, height: 10 },
    description: 'E toru ngā rākau tū',
    descriptionEnglish: 'Three vertical rods',
  },
]

export default function RakauPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Page title — Māori only */}
      <section aria-labelledby="rakau-heading">
        <h1
          id="rakau-heading"
          className="text-heading-1 font-semibold text-text-primary mb-2"
          lang="mi"
        >
          Rākau
        </h1>
        <p className="text-text-secondary" lang="mi">
          Ko ngā rākau tāruarua o Te Ataarangi — mātakitakihia.
        </p>
      </section>

      {/* Interactive sandbox */}
      <section aria-labelledby="sandbox-heading">
        <h2
          id="sandbox-heading"
          className="text-heading-3 font-semibold text-text-secondary mb-4 uppercase tracking-wide text-sm"
          lang="mi"
        >
          Tākaro Rākau
        </h2>
        <RakauSandbox />
      </section>

      {/* Colour legend — all 10 rods */}
      <section aria-labelledby="tae-heading">
        <h2
          id="tae-heading"
          className="text-heading-3 font-semibold text-text-secondary mb-4 uppercase tracking-wide text-sm"
          lang="mi"
        >
          Ngā Tae o ngā Rākau
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {ALL_ROD_COLOURS.map((colour) => {
            const hex = getRodHex(colour)
            const name = getRodMaoriName(colour)
            const isLight = colour === 'ma' || colour === 'kowhai'

            return (
              <div
                key={colour}
                className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border"
              >
                {/* Miniature rod swatch */}
                <div
                  aria-hidden="true"
                  style={{
                    backgroundColor: hex,
                    width: 12,
                    height: 40,
                    borderRadius: 3,
                    flexShrink: 0,
                    border: isLight ? '1px solid #C8C0B0' : '1px solid rgba(0,0,0,0.15)',
                    boxShadow: '1px 2px 4px rgba(0,0,0,0.2)',
                  }}
                />
                <span className="text-sm font-medium text-text-primary" lang="mi">
                  {name}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Demo arrangements */}
      <section aria-labelledby="tauira-heading" className="space-y-8">
        <h2
          id="tauira-heading"
          className="text-heading-3 font-semibold text-text-secondary mb-4 uppercase tracking-wide text-sm"
          lang="mi"
        >
          Ngā Tauira
        </h2>

        {DEMO_CONFIGS.map((config, i) => (
          <div key={config.id} className="space-y-2">
            <p className="text-sm text-text-muted" lang="mi">
              {i + 1}. {config.description}
            </p>
            <RakauArrangement config={config} />
          </div>
        ))}
      </section>

      {/* Proportions demonstration */}
      <section aria-labelledby="rahi-heading">
        <h2
          id="rahi-heading"
          className="text-heading-3 font-semibold text-text-secondary mb-4 uppercase tracking-wide text-sm"
          lang="mi"
        >
          Ngā Rahi — Ko te Rākau Karaka 10× ake i te Rākau Mā
        </h2>

        <RakauArrangement
          config={{
            id: 'all-rods',
            rods: ALL_ROD_COLOURS.map((colour, i) => ({
              id: `rod-${colour}`,
              colour,
              orientation: 'horizontal' as const,
              position: { x: 0.5, y: 0.5 + i * 2 },
            })),
            matSize: { width: 22, height: 22 },
            description: 'Ngā rākau katoa — i roto i te rahi tika',
            descriptionEnglish: 'All rods at correct proportions',
          }}
        />
      </section>
    </div>
  )
}
