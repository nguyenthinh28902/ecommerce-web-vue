export interface Result<T> {
  isSuccess: boolean
  error?: string
  data?: T
}
