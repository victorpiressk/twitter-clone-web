export type OriginalPostPreviewProps = {
  post: {
    id: string
    author: {
      name: string
      username: string
      avatar: string
    }
    content: string
    createdAt: string
    images?: string[]
  }
  showConnector?: boolean
}
