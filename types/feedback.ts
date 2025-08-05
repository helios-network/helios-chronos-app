export type Variants =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
export interface Feedback {
  status: Variants
  message: React.ReactNode
}
