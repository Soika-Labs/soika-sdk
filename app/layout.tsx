import { getLocaleOnServer } from '@/i18n/server'
import ClientHydrationFix from '@/app/components/client-hydration-fix'

import './styles/globals.css'
import './styles/markdown.scss'

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  return (
    <html lang={locale ?? 'en'} className="h-full">
      <body className="h-full" suppressHydrationWarning={true}>
        <ClientHydrationFix />
        <div className="overflow-x-auto" suppressHydrationWarning={true}>
          <div className="w-screen h-screen min-w-[300px]" suppressHydrationWarning={true}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
