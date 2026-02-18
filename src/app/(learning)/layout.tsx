import { Header } from '@/components/layout/Header'
import { ImmersionBanner } from '@/components/layout/ImmersionBanner'

/**
 * Learning layout — wraps all (learning)/ routes.
 * Māori-only: no English text appears in this layout.
 */
export default function LearningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ImmersionBanner />
      <Header variant="learning" />
      <main lang="mi">{children}</main>
    </>
  )
}
