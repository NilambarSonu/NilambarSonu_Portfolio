import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ProjectModal from '../ProjectModal'

export default function ProjectModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  const sampleProject = {
    title: "Sample Project",
    description: "This is a sample project description demonstrating the modal functionality.",
    techStack: ["React", "TypeScript", "Tailwind"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/example",
    features: [
      "Feature one with great functionality",
      "Feature two with amazing performance",
      "Feature three with beautiful design"
    ],
    isPublished: true
  }

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>
        Open Project Modal
      </Button>
      {isOpen && (
        <ProjectModal project={sampleProject} onClose={() => setIsOpen(false)} />
      )}
    </div>
  )
}
