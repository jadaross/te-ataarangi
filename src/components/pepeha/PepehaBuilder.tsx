'use client'

import { useState } from 'react'

interface PepehaField {
  key: keyof PepehaValues
  label: string
  labelEnglish: string
  placeholder: string
  help: string
  template: (v: string) => string
}

interface PepehaValues {
  maunga: string
  awa: string
  waka: string
  iwi: string
  hapu: string
  marae: string
  tupuna: string
  ingoa: string
}

const FIELDS: PepehaField[] = [
  {
    key: 'maunga',
    label: 'Maunga',
    labelEnglish: 'Mountain',
    placeholder: 'e.g. Taranaki, Ruapehu, Kaikōura',
    help: 'The mountain that your ancestors lived near and looked up to. If you are not Māori or unsure, you can use the mountain or significant hill nearest to where you grew up.',
    template: (v) => `Ko ${v} tōku maunga`,
  },
  {
    key: 'awa',
    label: 'Awa',
    labelEnglish: 'River',
    placeholder: 'e.g. Waikato, Manawatū, Thames',
    help: 'The river connected to your ancestors\' land. If you are new to this, use the river nearest to where you grew up or where you live.',
    template: (v) => `Ko ${v} tōku awa`,
  },
  {
    key: 'waka',
    label: 'Waka',
    labelEnglish: 'Canoe / Vessel',
    placeholder: 'e.g. Tainui, Aotea, Te Arawa',
    help: 'The ancestral waka your iwi arrived on. If you are not Māori, this is sometimes left out or replaced with the vessel your ancestors arrived on (ship name or country of origin).',
    template: (v) => `Ko ${v} tōku waka`,
  },
  {
    key: 'iwi',
    label: 'Iwi',
    labelEnglish: 'Tribe',
    placeholder: 'e.g. Ngāti Porou, Ngāpuhi, Tainui',
    help: 'Your iwi is your extended tribal group. If you are not Māori, some people use their nationality or a broader group they identify with.',
    template: (v) => `Ko ${v} tōku iwi`,
  },
  {
    key: 'hapu',
    label: 'Hapū',
    labelEnglish: 'Sub-tribe',
    placeholder: 'e.g. Ngāti Kahu, Ngāti Tūwharetoa',
    help: 'Your hapū is a smaller grouping within your iwi. If unknown, you can leave this field empty.',
    template: (v) => `Ko ${v} tōku hapū`,
  },
  {
    key: 'marae',
    label: 'Marae',
    labelEnglish: 'Marae',
    placeholder: 'e.g. Ōrākei, Tūrangawaewae',
    help: 'The marae that represents your people. For non-Māori, this may not apply — some leave it out or note it is not part of their heritage.',
    template: (v) => `Ko ${v} tōku marae`,
  },
  {
    key: 'tupuna',
    label: 'Tūpuna',
    labelEnglish: 'Ancestor',
    placeholder: 'e.g. Māui, Tūhoe, a grandparent\'s name',
    help: 'An important ancestor who represents your lineage. For non-Māori this might be a significant grandparent or founding ancestor of your family.',
    template: (v) => `Ko ${v} tōku tūpuna`,
  },
  {
    key: 'ingoa',
    label: 'Ingoa',
    labelEnglish: 'Name',
    placeholder: 'Your name',
    help: 'Your own name. In Māori pronunciation, many names work — say your name as it sounds.',
    template: (v) => `Ko ${v} tōku ingoa`,
  },
]

const EMPTY: PepehaValues = {
  maunga: '',
  awa: '',
  waka: '',
  iwi: '',
  hapu: '',
  marae: '',
  tupuna: '',
  ingoa: '',
}

export function PepehaBuilder() {
  const [values, setValues] = useState<PepehaValues>(EMPTY)
  const [activeField, setActiveField] = useState<keyof PepehaValues | null>(null)
  const [copied, setCopied] = useState(false)

  function setValue(key: keyof PepehaValues, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const pepehaLines = FIELDS.filter((f) => values[f.key]).map((f) => f.template(values[f.key]))
  const pepehaText = pepehaLines.join('\n')
  const hasAny = pepehaLines.length > 0

  async function handleCopy() {
    if (!hasAny) return
    try {
      await navigator.clipboard.writeText(pepehaText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Form */}
      <div className="space-y-4">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`field-${field.key}`}
              className="block text-sm font-medium text-text-primary mb-1"
            >
              <span lang="mi">{field.label}</span>
              <span className="text-text-muted font-normal ml-2">— {field.labelEnglish}</span>
            </label>
            <input
              id={`field-${field.key}`}
              type="text"
              value={values[field.key]}
              placeholder={field.placeholder}
              onFocus={() => setActiveField(field.key)}
              onBlur={() => setActiveField(null)}
              onChange={(e) => setValue(field.key, e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
            />
            {activeField === field.key && (
              <p className="mt-1.5 text-xs text-text-muted">{field.help}</p>
            )}
          </div>
        ))}
      </div>

      {/* Live preview */}
      <div className="lg:sticky lg:top-20">
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="bg-surface px-5 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-primary" lang="mi">
              Tōu Pepeha
            </h3>
            {hasAny && (
              <button
                onClick={handleCopy}
                className="text-xs text-accent hover:text-accent/80 transition-colors px-2 py-1 rounded"
                aria-label="Copy pepeha to clipboard"
              >
                {copied ? 'Kua kope ✓' : 'Kope'}
              </button>
            )}
          </div>

          <div className="px-5 py-6 min-h-48">
            {hasAny ? (
              <div className="space-y-1.5" lang="mi">
                {FIELDS.map((field) => {
                  const val = values[field.key]
                  return (
                    <p
                      key={field.key}
                      className={`text-sm transition-all duration-200 ${
                        val
                          ? activeField === field.key
                            ? 'text-accent font-medium'
                            : 'text-text-primary'
                          : 'hidden'
                      }`}
                    >
                      {val ? field.template(val) : ''}
                    </p>
                  )
                })}
              </div>
            ) : (
              <p className="text-text-muted text-sm italic text-center mt-8">
                Fill in the fields to see your pepeha take shape
              </p>
            )}
          </div>
        </div>

        {hasAny && (
          <p className="text-xs text-text-muted mt-3 text-center">
            Fields left blank are omitted from the pepeha
          </p>
        )}
      </div>
    </div>
  )
}
