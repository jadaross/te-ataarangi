import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWhiti, getAllWhiti } from '@/lib/content'
import { LessonFlow } from '@/components/lesson/LessonFlow'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const numId = parseInt(id, 10)
  if (isNaN(numId)) return {}
  try {
    const whiti = await getWhiti(numId)
    return { title: whiti.title }
  } catch {
    return {}
  }
}

/**
 * Generate static params for known lesson IDs at build time.
 */
export async function generateStaticParams() {
  const whiti = await getAllWhiti()
  return whiti.map((w) => ({ id: String(w.id) }))
}

/**
 * Individual lesson page — renders the LessonFlow client component.
 * Learning route: Māori only.
 */
export default async function WhitiPage({ params }: PageProps) {
  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) {
    notFound()
  }

  let whiti
  try {
    whiti = await getWhiti(numId)
  } catch {
    notFound()
  }

  return (
    <div>
      {/* Lesson title */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <h1 className="text-heading-2 font-semibold text-text-primary" lang="mi">
          {whiti.title}
        </h1>
      </div>

      {/* Interactive lesson flow (client component) */}
      <LessonFlow whiti={whiti} />
    </div>
  )
}
