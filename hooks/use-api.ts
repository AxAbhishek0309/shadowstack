import { useState, useEffect } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(url: string, options?: RequestInit): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers
          },
          ...options
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred'
        })
      }
    }

    fetchData()
  }, [url])

  return state
}

export function useRepositories() {
  return useApi('/api/repositories')
}

export function useScans() {
  return useApi('/api/scan')
}

export function useDeadCode(repositoryId?: string) {
  const url = repositoryId 
    ? `/api/dead-code?repositoryId=${repositoryId}`
    : '/api/dead-code'
  
  return useApi(url)
}

export function useSettings() {
  return useApi('/api/settings')
}

export async function createScan(repositoryId: string) {
  const response = await fetch('/api/scan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ repositoryId })
  })

  if (!response.ok) {
    throw new Error('Failed to create scan')
  }

  return response.json()
}

export async function updateSettings(settings: any) {
  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  })

  if (!response.ok) {
    throw new Error('Failed to update settings')
  }

  return response.json()
}

export async function resolveDeadCode(id: string, isResolved: boolean) {
  const response = await fetch('/api/dead-code', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, isResolved })
  })

  if (!response.ok) {
    throw new Error('Failed to update dead code')
  }

  return response.json()
}