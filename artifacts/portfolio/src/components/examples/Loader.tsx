import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Loader from '../Loader'

export default function LoaderExample() {
  const [showLoader, setShowLoader] = useState(false)

  return (
    <div className="p-8">
      <Button onClick={() => setShowLoader(true)}>
        Show Loader
      </Button>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
    </div>
  )
}
