// src/types/api/index.ts
// ============================================
// EXPORTS CENTRALIZADOS
// ============================================

// Request types (Frontend → Backend)
export type {
  LoginRequest,
  RegisterRequest,
  CreatePostRequest,
  UpdatePostRequest,
  CreateCommentRequest,
  FollowRequest,
  LikeRequest
} from './requests'

// Response types (Backend → Frontend, já transformados)
export type { AuthResponse, PaginatedResponse } from './responses'

// Backend types (formato RAW do Django - snake_case)
export type {
  BackendUser,
  BackendPost,
  BackendPostMedia,
  BackendPoll,
  BackendPollOption,
  BackendLocation,
  BackendComment,
  BackendLike,
  BackendFollow,
  BackendAuthResponse,
  BackendPaginatedResponse,
  BackendRegisterRequest,
  BackendCreatePostRequest
} from './backend'
