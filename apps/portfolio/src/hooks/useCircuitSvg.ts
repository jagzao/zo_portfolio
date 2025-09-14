import { useQuery } from '@tanstack/react-query'

const fetchCircuitSvg = async (): Promise<string> => {
  try {
    const response = await fetch('/assets/bg/circuit.svg')
    if (!response.ok) throw new Error('Failed to load circuit SVG')
    return await response.text()
  } catch (error) {
    console.warn('Could not load circuit SVG:', error)
    // Fallback to hardcoded paths
    return `
      <path d="M 1444 670 L 1443 671 L 1442 671 L 1439 674 L 1439 675 L 1438 676 L 1438 677 L 1438 676 L 1444 670 L 1445 670" fill="none" stroke="#7A1D1D" stroke-width="1" opacity="0.6" />
      <path d="M 1428 670 L 1429 670 L 1435 676 L 1435 678 L 1436 679 L 1437 679 L 1436 679 L 1435 678 L 1435 676 L 1434 675 L 1434 674 L 1431 671 L 1430 671 L 1429 670" fill="none" stroke="#7A1D1D" stroke-width="1" opacity="0.6" />
    `
  }
}

export const useCircuitSvg = () => {
  return useQuery({
    queryKey: ['circuit-svg'],
    queryFn: fetchCircuitSvg,
    staleTime: Infinity, // SVG won't change
    gcTime: Infinity,
  })
}