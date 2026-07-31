import jsPDF from 'jspdf'
import type { RoadmapData } from '../types/roadmap'
import { buildRoadmapExportSections } from './roadmapExportContent'
import { buildRoadmapFilename, downloadBlob } from './downloadBlob'

const PAGE_MARGIN = 18
const PAGE_BOTTOM = 282
const CONTENT_WIDTH = 174
const LINE_HEIGHT = 5.5

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage()
    return PAGE_MARGIN
  }

  return y
}

function writeLines(doc: jsPDF, lines: string[], x: number, y: number, lineHeight: number): number {
  for (const line of lines) {
    y = ensureSpace(doc, y, lineHeight)
    doc.text(line, x, y)
    y += lineHeight
  }

  return y
}

function writeWrappedParagraph(doc: jsPDF, text: string, y: number): number {
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[]
  return writeLines(doc, lines, PAGE_MARGIN, y, LINE_HEIGHT)
}

export function exportRoadmapPdf(roadmap: RoadmapData): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const sections = buildRoadmapExportSections(roadmap)
  let y = PAGE_MARGIN

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('ALTAIR Learning Roadmap', PAGE_MARGIN, y)
  y += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(80, 80, 80)
  y = writeWrappedParagraph(
    doc,
    `${roadmap.overview.title} — Generated ${new Date(roadmap.metadata.generatedAt).toLocaleDateString()}`,
    y + 2,
  )
  doc.setTextColor(0, 0, 0)
  y += 4

  for (const section of sections) {
    y = ensureSpace(doc, y, 14)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text(section.title, PAGE_MARGIN, y)
    y += 8

    for (const block of section.blocks) {
      switch (block.type) {
        case 'subheading':
          y = ensureSpace(doc, y, 10)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(11)
          y = writeWrappedParagraph(doc, block.text, y)
          y += 2
          break
        case 'paragraph':
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          y = writeWrappedParagraph(doc, block.text, y)
          y += 2
          break
        case 'keyValue':
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(10)
          y = ensureSpace(doc, y, LINE_HEIGHT)
          doc.text(`${block.label}:`, PAGE_MARGIN, y)
          doc.setFont('helvetica', 'normal')
          y = writeWrappedParagraph(doc, block.value, y)
          y += 1
          break
        case 'list':
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          for (const item of block.items) {
            const bulletLines = doc.splitTextToSize(`• ${item}`, CONTENT_WIDTH - 4) as string[]
            y = writeLines(doc, bulletLines, PAGE_MARGIN + 2, y, LINE_HEIGHT)
          }
          y += 2
          break
      }
    }

    y += 4
  }

  const blob = doc.output('blob')
  downloadBlob(blob, buildRoadmapFilename(roadmap.metadata.careerGoal, 'pdf'))
}
