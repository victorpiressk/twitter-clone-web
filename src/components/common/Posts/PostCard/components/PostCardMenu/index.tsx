// src/components/common/Posts/PostCard/components/PostCardMenu/index.tsx
import { useState, useRef } from 'react'
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react'
import { useAppSelector } from '../../../../../../store/hooks'
import { selectCurrentUser } from '../../../../../../store/slices/auth/authSlice'
import Popover from '../../../../../common/Popovers/BasePopover'
import Modal from '../../../../../common/Modals/BaseModal'
import { usePostActions } from '../../../../../../hooks/usePostActions'
import type { PostCardMenuProps } from './types'
import * as S from './styles'
import Button from '../../../../Button'

const PostCardMenu = ({ post, onEditClick }: PostCardMenuProps) => {
  const currentUser = useAppSelector(selectCurrentUser)
  const { deletePost } = usePostActions(post.id)

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // ✅ Só mostra menu se for o autor
  if (!currentUser || post.author.id !== currentUser.id) {
    return null
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPopoverOpen(false)
    onEditClick()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPopoverOpen(false)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    deletePost()
    if (!post.id) {
      setIsDeleteModalOpen(false)
    }
  }

  const handleCancel = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <S.MenuButton
        ref={menuButtonRef}
        onClick={(e) => {
          e.stopPropagation()
          setIsPopoverOpen(true)
        }}
        aria-label="Opções do post"
      >
        <MoreHorizontal size={20} />
      </S.MenuButton>

      <Popover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        triggerRef={menuButtonRef}
        position="bottom"
      >
        <S.MenuList>
          <S.MenuItem onClick={handleEdit}>
            <Edit2 size={18} />
            <span>Editar post</span>
          </S.MenuItem>

          <S.MenuItem onClick={handleDeleteClick} $danger>
            <Trash2 size={18} />
            <span>Excluir post</span>
          </S.MenuItem>
        </S.MenuList>
      </Popover>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        size="small"
        showOverlay
      >
        <S.ModalContent>
          <S.Title>Excluir post?</S.Title>
          <S.Description>
            Esta ação não pode ser desfeita. Tem certeza que deseja excluir este
            post?
          </S.Description>

          <S.Actions>
            <Button
              type="button"
              variant="secondary"
              onClick={handleConfirmDelete}
            >
              Excluir
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
          </S.Actions>
        </S.ModalContent>
      </Modal>
    </>
  )
}

export default PostCardMenu
