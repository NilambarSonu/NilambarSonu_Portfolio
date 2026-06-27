import CustomCursor from '../CustomCursor'
import { Button } from '@/components/ui/button'

export default function CustomCursorExample() {
  return (
    <div className="p-8 space-y-4">
      <p className="text-muted-foreground">Move your mouse to see the custom cursor. Click to see particle effects.</p>
      <div className="flex gap-4">
        <Button>Hover Me</Button>
        <Button variant="outline">Click Me</Button>
      </div>
      <CustomCursor />
    </div>
  )
}
